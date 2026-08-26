"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { AuthFormProps } from "./AuthForm";
import { toast } from "../ui/toast";
import { Field, FieldError, FieldLabel } from "../ui/field";
import {
  ForgotPasswordDto,
  forgotPasswordSchema,
} from "./schemas/forgot-password.schema";
import { sendRecoveredEmail } from "@/actions/auth/auth";

const ForgotPasswordForm = ({ setTypeSelected }: AuthFormProps) => {
  const [isLoading, setisLoading] = useState<boolean>(false);

  const form = useForm<ForgotPasswordDto>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { handleSubmit, formState, control } = form;
  const { errors } = formState;

  const onSubmit = async (user: ForgotPasswordDto) => {
    const response = await sendRecoveredEmail(user.email);

    setisLoading(true);

    try {
      if (!response.success) {
        throw new Error(response.message);
      }

      toast.add({
        type: "success",
        title: "✅ Correo enviado exitosamente",
        description: response.message,
        priority: "high",
        timeout: 2500,
      });

      form.reset();
    } catch (error: any) {
      toast.add({
        type: "error",
        title: "❌ Error",
        description: error.message,
        priority: "high",
        timeout: 2500,
      });
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full backdrop-blur-xl py-6 rounded-4xl">
        <div className="rounded-xl px-6">
          <div className="text-center">
            <h1 className="lg:text-5xl md:text-4xl text-3xl font-semibold text-center my-4">
              Recuperar Contraseña
            </h1>
            <p className="text-sm text-muted-foreground mb-8">
              Te enviaremos un correo para recuperar tu contraseña
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Field className="mb-3">
                    <FieldLabel>Correo</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoComplete="email"
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <FieldError
                        className="mt-2 text-red-300"
                        errors={[errors.email]}
                      />
                    )}
                  </Field>
                )}
              />

              <Button className="my-6" type="submit" disabled={isLoading}>
                {isLoading && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                Recuperar
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            <span
              onClick={() => setTypeSelected("sign-in")}
              className="underline underline-offset-4 hover:text-primary cursor-pointer text-foreground font-medium"
            >
              Volver al inicio de sesión
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
