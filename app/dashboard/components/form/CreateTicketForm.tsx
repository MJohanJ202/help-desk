"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useImageUpload } from "@/hooks/useImageUpload";
import { saveTicket } from "@/actions/ticket/save-ticket";
import { toast } from "@/components/ui/toast";
import { TicketFormData, ticketSchema } from "../../schemas/ticket.schema";
import { TicketFormFields } from "./TicketFormFields";
import { Ticket } from "@/interfaces/tickets";

export default function CreateTicketForm({
  userId,
  handleShowTicketForm,
  onTicketsUpdated,
}: {
  userId: string | undefined | null;
  handleShowTicketForm: () => void;
  onTicketsUpdated?: (tickets: Ticket[]) => void;
}) {
  const {
    selectedFile,
    previewUrl,
    isExpanded,
    handlePreview,
    isDragging,
    errorMsg,
    fileInputRef,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRemoveImage,
  } = useImageUpload();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      priority: "medium",
      status: "open",
      description: "",
    },
  });

  const closeModal = () => {
    reset();
    handleRemoveImage();
    handleShowTicketForm();
  };

  const createNewTicket = async (data: TicketFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("priority", data.priority);
    formData.append("status", data.status);
    formData.append("description", data.description ?? "");
    formData.append("userId", userId!);
    formData.append("image", selectedFile!);

    try {
      const res = await saveTicket(formData);
      toast.add({
        title: "Ticket creado exitosamente",
        type: "success",
        description: "El ticket ha sido creado exitosamente",
      });
      return res;
    } catch (error: unknown) {
      console.error(error);
      toast.add({
        title: "Error al crear el ticket",
        type: "error",
        description: "El ticket no pudo ser creado",
      });
      return { success: false, data: [] };
    }
  };

  const onSubmitData = async (data: TicketFormData) => {
    if (!userId) {
      closeModal();
      return;
    }

    const res = await createNewTicket(data);

    if (res.success && res.data) {
      onTicketsUpdated?.(res.data);
      closeModal();
    }
  };

  const handleFormReset = () => {
    reset();
    handleRemoveImage();
  };

  return (
    <section className="w-full">
      <form
        onSubmit={handleSubmit(onSubmitData)}
        onReset={handleFormReset}
        className="grid gap-5"
      >
        <TicketFormFields
          register={register}
          errors={errors}
          imageProps={{
            handlePreview,
            isExpanded,
            fileInputRef,
            selectedFile,
            previewUrl,
            errorMsg,
            isDragging,
            onFileChange: handleFileChange,
            onDragOver: handleDragOver,
            onDragLeave: handleDragLeave,
            onDrop: handleDrop,
            onRemove: handleRemoveImage,
            onChangeImage: () => fileInputRef.current?.click(),
          }}
        ></TicketFormFields>
        <div className="flex items-center justify-between sm:justify-end gap-3 mt-2">
          <button
            type="reset"
            className="bg-muted text-muted-foreground hover:text-foreground font-semibold px-5 py-2.5 rounded-full cursor-pointer flex items-center gap-2 hover:bg-muted/80 active:scale-95 transition-all duration-200 text-sm"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-full cursor-pointer flex items-center gap-2 hover:opacity-90 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none transition-all duration-300 shadow-md text-sm"
          >
            Crear ticket
          </button>
        </div>
      </form>
    </section>
  );
}
