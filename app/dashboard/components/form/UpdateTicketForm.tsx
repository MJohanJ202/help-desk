"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useImageUpload } from "@/hooks/useImageUpload";
import { ticketSchema, type TicketFormData } from "../../schemas/ticket.schema";
import { toast } from "@/components/ui/toast";
import { TicketFormFields } from "./TicketFormFields";
import { updateTicket } from "@/actions/ticket/update-ticket";
import { Ticket } from "@/interfaces/tickets";

export default function UpdateTicketForm({
  userId,
  imageUrl,
  ticketId,
  handleShowTicketForm,
  onTicketsUpdated,
  prevData,
}: {
  ticketId: string | undefined | null;
  imageUrl: string | undefined | null;
  userId: string | undefined | null;
  handleShowTicketForm: () => void;
  onTicketsUpdated?: (tickets: Ticket[]) => void;
  prevData?: TicketFormData | null;
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
    defaultValues: prevData ?? {
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

  const updateCurrentTicket = async (data: Partial<TicketFormData>) => {
    const formData = new FormData();
    formData.append("userId", userId!);
    formData.append("imageUrl", imageUrl || "");
    formData.append("ticketId", ticketId!);
    data.title && formData.append("title", data?.title);
    data.priority && formData.append("priority", data?.priority);
    data.status && formData.append("status", data?.status);
    data.description && formData.append("description", data?.description ?? "");
    selectedFile && formData.append("image", selectedFile!);

    try {
      const res = await updateTicket(formData);
      toast.add({
        title: "Ticket actualizado exitosamente",
        type: "success",
        description: "El ticket ha sido actualizado exitosamente",
      });

      return res;
    } catch (error: unknown) {
      console.error(error);
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Ocurrio un error al actualizar el ticket, intenta mas tarde.";
      toast.add({
        title: "Error al actualizar el ticket",
        type: "error",
        description: errorMsg,
      });
      return { success: false, data: [] };
    }
  };

  const onSubmitData = async (data: TicketFormData) => {
    if (!userId) {
      closeModal();
      return;
    }

    const res = await updateCurrentTicket(data);

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
            type="submit"
            disabled={!isValid || isSubmitting}
            className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-full cursor-pointer flex items-center gap-2 hover:opacity-90 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none transition-all duration-300 shadow-md text-sm"
          >
            Actualizar ticket
          </button>
        </div>
      </form>
    </section>
  );
}
