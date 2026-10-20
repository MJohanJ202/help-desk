import { ImageIcon, Trash2, X } from "lucide-react";

interface ImageLightboxProps {
  previewUrl: string;
  selectedFile: File | null;
  onClose: () => void;
  onRemove: () => void;
}

function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function ImageLightbox({
  previewUrl,
  selectedFile,
  onClose,
  onRemove,
}: ImageLightboxProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between h-screen overflow-hidden animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Header */}
      <div
        className="w-full bg-black/60 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 z-20 text-white"
        onClick={(event) => event.stopPropagation()}
      >
        {/* File info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <ImageIcon className="w-5 h-5 text-primary" />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold truncate text-white">
              {selectedFile?.name || "Previsualización de imagen"}
            </span>

            {selectedFile && (
              <span className="text-xs text-white/60">
                {formatFileSize(selectedFile.size)}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onRemove}
            className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 hover:text-white border border-rose-500/40 px-3.5 py-2 rounded-full flex items-center gap-2 cursor-pointer font-medium text-xs sm:text-sm active:scale-95 transition-all shadow-md"
            title="Eliminar esta imagen"
          >
            <Trash2 className="w-4 h-4 text-rose-400" />
            <span>Eliminar</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3.5 py-2 rounded-full flex items-center gap-2 cursor-pointer font-medium text-xs sm:text-sm active:scale-95 transition-all shadow-md"
            title="Cerrar vista completa"
          >
            <X className="w-4 h-4" />
            <span>Cerrar</span>
          </button>
        </div>
      </div>

      {/* Image */}
      <img
        src={previewUrl}
        alt={selectedFile?.name || "Vista ampliada de la imagen"}
        className="h-full w-full object-contain rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
        onClick={(event) => event.stopPropagation()}
      />

      {/* Footer */}
      <div className="w-full py-2.5 px-4 bg-black/40 text-center text-xs text-white/50 border-t border-white/5 pointer-events-none">
        Presiona ESC o haz clic en la pantalla para cerrar
      </div>
    </div>
  );
}
