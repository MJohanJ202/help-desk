import type { RefObject } from "react";
import { FolderSync, Maximize2, UploadCloud, X } from "lucide-react";
import { ImageLightbox } from "./ImageLightbox";

interface ImagePreviewProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  selectedFile: File | null;
  previewUrl: string | null;
  errorMsg: string | null;
  isDragging: boolean;
  isExpanded: boolean;
  handlePreview: () => void;

  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;

  onRemove: () => void;
  onChangeImage: () => void;
}

export function ImagePreview({
  fileInputRef,
  selectedFile,
  previewUrl,
  errorMsg,
  isDragging,
  isExpanded,
  handlePreview,
  onFileChange,
  onDragOver,
  onDragLeave,
  onDrop,
  onRemove,
  onChangeImage,
}: ImagePreviewProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-foreground">
          Imagen adjunta
        </label>

        <span className="text-xs text-muted-foreground font-normal">
          Opcional (Máx 2MB)
        </span>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        id="image"
        name="image"
        accept="image/png, image/jpeg, image/webp, image/jpg"
        onChange={onFileChange}
        className="hidden"
      />

      {!previewUrl ? (
        <div
          onClick={onChangeImage}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 text-center ${
            isDragging
              ? "border-primary bg-primary/10 scale-[1.01]"
              : "border-border/80 bg-muted/20 hover:bg-muted/40 hover:border-primary/50"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2 shadow-xs">
            <UploadCloud className="w-6 h-6" />
          </div>

          <p className="text-sm font-medium text-foreground">
            Haz clic o arrastra una imagen aquí
          </p>

          <p className="text-xs text-muted-foreground mt-1">
            PNG, JPG, JPEG o WEBP (hasta 2MB)
          </p>
        </div>
      ) : (
        <div className="relative border border-border/80 rounded-2xl bg-card flex items-center gap-4 shadow-sm transition-all overflow-hidden">
          {/* Thumbnail */}
          <div
            onClick={handlePreview}
            className="relative w-full h-32 rounded-xl overflow-hidden border border-border/50 shrink-0 bg-muted/40 group cursor-pointer"
          >
            <img
              src={previewUrl}
              alt="Previsualización de imagen"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-200">
              <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-xs">
                <Maximize2 className="w-4 h-4" />
                <span>Expandir vista</span>
              </div>
            </div>
          </div>

          {/* Change image */}
          <button
            type="button"
            onClick={onChangeImage}
            className="absolute bottom-3 right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background/90 hover:bg-background text-foreground border border-border flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md z-10"
            title="Cambiar imagen"
          >
            <FolderSync className="w-4.5 h-4.5" />
          </button>

          {/* Remove */}
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-3 right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-destructive/90 hover:bg-destructive text-destructive-foreground flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md z-10"
            title="Eliminar imagen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {errorMsg && (
        <p className="text-xs font-medium text-destructive mt-1 flex items-center gap-1">
          ⚠️ {errorMsg}
        </p>
      )}

      {isExpanded && previewUrl && (
        <ImageLightbox
          previewUrl={previewUrl}
          selectedFile={selectedFile}
          onClose={handlePreview}
          onRemove={onRemove}
        />
      )}
    </div>
  );
}
