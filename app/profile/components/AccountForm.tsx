"use client";

import { useState, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { CircleUserRound, Loader2, LoaderCircle, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ProfileDto, profileSchema } from "../schemas/profile.schema";
import { toast } from "@/components/ui/toast";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { accountInputs } from "../fields";
import { Input } from "@/components/ui/input";
import "intl-tel-input/styles";
import PhoneInput from "./PhoneInput";
import { updateAvatar } from "@/actions/auth/update-avatar";
import { getImageUrl } from "@/lib/utils";
import { updateProfile } from "@/actions/auth/update-profile";

export default function AccountForm({
  user,
  onSuccess,
}: {
  user: any;
  onSuccess?: () => void;
}) {
  const [isLoading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    user?.avatar_url || null,
  );
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);

  const form = useForm<ProfileDto>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      avatar_url: user?.avatar_url ?? "",
      phone: user?.phone ?? "",
      country_code: user?.country_code ?? "VE",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        avatar_url: user.avatar_url || null,
        phone: user.phone || "",
        country_code: user.country_code || "VE",
      });
      setAvatarUrl(user.avatar_url || null);
    }
  }, [user, form]);

  async function onSubmit(values: ProfileDto) {
    try {
      setLoading(true);
      const response = await updateProfile({
        name: values.name,
        phone: values.phone,
        country_code: values.country_code,
        id: user.id,
      });
      if (!response.success) {
        throw response;
      }

      toast.add({
        title: "Success",
        description: "Perfil actualizado correctamente",
        type: "success",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.add({
        title: "Error",
        description: "Error al actualizar el perfil.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  // ======== Choose a profile image ========
  const chooseImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validar tipo de archivo
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!validTypes.includes(file.type)) {
      toast.add({
        title: "Error",
        description: "Formato no válido. Use JPG, PNG o WebP.",
        type: "error",
      });
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.add({
        title: "Error",
        description: "La imagen es muy grande. Máximo 5MB.",
        type: "error",
      });
      return;
    }
    setIsLoadingImage(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", user.id);

      const res = await updateAvatar(formData);
      if (res.url) {
        setAvatarUrl(res.url);
        toast.add({
          title: "Success",
          description: "Imagen de perfil actualizada correctamente",
          type: "success",
        });
      }
    } catch (error: unknown) {
      toast.add({
        title: "Error",
        description: "Error al actualizar la imagen de perfil.",
        type: "error",
      });
    } finally {
      setIsLoadingImage(false);
      // Limpiar el input file
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {isLoadingImage ? (
        <div className="flex justify-center items-center">
          <LoaderCircle className="w-14 h-14 animate-spin mb-3" />
        </div>
      ) : (
        <>
          <div className="relative w-26 h-26 mx-auto mb-3">
            {avatarUrl ? (
              <Image
                className="object-cover w-full h-full rounded-full"
                src={getImageUrl(avatarUrl)}
                width={1000}
                height={1000}
                alt="user-img"
                onError={() => setAvatarUrl("")} // Si hay error, mostrar icono por defecto
              />
            ) : (
              <CircleUserRound className="w-full h-full" />
            )}

            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div>
                <input
                  id="files"
                  type="file"
                  className="hidden"
                  accept="image/png, image/webp, image/jpeg, image/jpg"
                  onChange={chooseImage}
                  disabled={isLoadingImage}
                />
                <label htmlFor="files">
                  <div className="w-10 h-7 cursor-pointer rounded-full text-slate-950 bg-white flex justify-center items-center hover:bg-gray-100 transition-colors">
                    {isLoadingImage ? (
                      <LoaderCircle className="w-4.5 h-4.5 animate-spin" />
                    ) : (
                      <Pencil className="w-4.5 h-4.5" />
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>
        </>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup className="gap-3">
          {accountInputs.map((input) => (
            <Controller
              key={input.id}
              name={input.id}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="mb-3" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>{input.label}</FieldLabel>

                  <Input
                    {...field}
                    value={field.value ?? ""}
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    autoComplete={input.autoComplete}
                    disabled={isLoading}
                    aria-invalid={!!fieldState.error}
                  />

                  {fieldState.error && (
                    <FieldError
                      className="mt-2 text-red-300"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          ))}
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="mb-3" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Telefono</FieldLabel>

                <PhoneInput
                  {...field}
                  value={field.value ?? ""}
                  name="phone"
                  id="phone"
                />

                {fieldState.error && (
                  <FieldError
                    className="mt-2 text-red-300"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button type="submit" className="w-full my-4" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Guardando..." : "Actualizar Perfil"}
        </Button>
      </form>
    </div>
  );
}
