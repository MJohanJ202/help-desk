import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ComponentProps } from "react";
import { TicketFormData } from "../../schemas/ticket.schema";
import { ImagePreview } from "../image/ImagePreview";

type TicketFormFieldsProps = {
  register: UseFormRegister<TicketFormData>;
  errors: FieldErrors<TicketFormData>;
  imageProps: ComponentProps<typeof ImagePreview>;
};

export function TicketFormFields({
  register,
  errors,
  imageProps,
}: TicketFormFieldsProps) {
  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="title"
          className="text-sm font-semibold text-foreground"
        >
          Título <span className="text-destructive">*</span>
        </label>

        <input
          {...register("title")}
          id="title"
          type="text"
          placeholder="Escribe un título descriptivo para tu ticket"
          className={inputClass(!!errors.title)}
        />

        {errors.title && (
          <p className={errorClass}>⚠️ {errors.title.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="priority"
            className="text-sm font-semibold text-foreground"
          >
            Prioridad <span className="text-destructive">*</span>
          </label>

          <select
            {...register("priority")}
            id="priority"
            className={`${inputClass(!!errors.priority)} cursor-pointer`}
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
            <option value="critical">Urgente</option>
          </select>

          {errors.priority && (
            <p className={errorClass}>⚠️ {errors.priority.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="status"
            className="text-sm font-semibold text-foreground"
          >
            Estado <span className="text-destructive">*</span>
          </label>

          <select
            {...register("status")}
            id="status"
            className={`${inputClass(!!errors.status)} cursor-pointer`}
          >
            <option value="open">Abierto</option>
            <option value="in_progress">En proceso</option>
            <option value="waiting_parts">En espera de piezas</option>
            <option value="resolved">Resuelto</option>
            <option value="closed">Cerrado</option>
          </select>

          {errors.status && (
            <p className={errorClass}>⚠️ {errors.status.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="description"
          className="text-sm font-semibold text-foreground"
        >
          Descripción
        </label>

        <textarea
          {...register("description")}
          id="description"
          placeholder="Describe la falla o solicitud con el mayor detalle posible..."
          rows={4}
          className={`${inputClass(!!errors.description)} placeholder:text-muted-foreground resize-none`}
        />

        {errors.description && (
          <p className={errorClass}>⚠️ {errors.description.message}</p>
        )}
      </div>

      <ImagePreview {...imageProps} />
    </>
  );
}

const inputClass = (hasError: boolean) =>
  `px-4 py-3 rounded-xl border ${
    hasError
      ? "border-destructive focus:ring-destructive/40"
      : "border-border focus:ring-primary/40"
  } bg-background/50 text-foreground focus:ring-2 focus:border-transparent outline-none transition-all text-sm`;

const errorClass =
  "text-xs font-medium text-destructive mt-0.5 flex items-center gap-1";
