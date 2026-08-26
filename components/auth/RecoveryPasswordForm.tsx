"use client";

import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

import Link from "next/link";
import {
  RecoveryPasswordDto,
  recoveryPasswordSchema,
} from "./schemas/recovery-password.schema";
import { toast } from "../ui/toast";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { InputPassword } from "./input";
import { recoveryPasswordInputs } from "./fields";
import { recoveryPassword } from "@/actions/auth/auth";
import { useRouter } from "next/navigation";
import { PROFILE_ROUTES } from "@/lib/routes/auth";

const RecoveryPasswordForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<RecoveryPasswordDto>({
    resolver: zodResolver(recoveryPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, formState, control } = form;
  const { errors } = formState;

  const onSubmit = async (dto: RecoveryPasswordDto) => {
    setIsLoading(true);

    try {
      const response = await recoveryPassword(dto.password);
      if (!response.success) {
        throw new Error(response.message);
      }

      toast.add({
        type: "success",
        title: "✅ Contraseña actualizada exitosamente",
        description: response.message,
        priority: "high",
        timeout: 2500,
      });

      form.reset();
      router.push(PROFILE_ROUTES.PROFILE);
    } catch (error: any) {
      toast.add({
        type: "error",
        title: "❌ Error",
        description: error.message,
        priority: "high",
        timeout: 2500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md backdrop-blur-xl bg-background py-6 rounded-4xl lg:border lg:border-white/50">
      <div className="rounded-xl px-6">
        <header className="text-center">
          <h1 className="lg:text-5xl md:text-4xl text-3xl font-semibold text-center my-4">
            Nueva Contraseña
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Ingresa tu nueva contraseña
          </p>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="grid gap-2">
            {recoveryPasswordInputs.map((input) => (
              <Controller
                key={input.id}
                name={input.id}
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="mb-3" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>{input.label}</FieldLabel>

                    <InputPassword
                      {...field}
                      name={input.id}
                      id={input.id}
                      type={input.type}
                      autoComplete={input.autoComplete}
                      placeholder={input.placeholder}
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
          </FieldGroup>
          <div className="flex items-center justify-around">
            <Button
              className="mt-6 cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Actualizar Contraseña
            </Button>

            <Link
              href="/profile"
              className="text-center text-sm text-white mt-3 hover:underline underline-offset-4 hover:text-primary cursor-pointer"
            >
              Volver
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoveryPasswordForm;
