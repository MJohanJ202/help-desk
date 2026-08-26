"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { AuthFormProps } from "./AuthForm";
import { SignUpDto, signUpSchema } from "./schemas/sign-up.schemas";
import { toast } from "../ui/toast";
import { FieldGroup, Field, FieldLabel, FieldError } from "../ui/field";
import { signUpInputs } from "./fields";
import { InputPassword } from "./input";
import { signup } from "@/actions/auth/auth";

const SignUpForm = ({ setTypeSelected }: AuthFormProps) => {
  const [isLoading, setisLoading] = useState<boolean>(false);

  const form = useForm<SignUpDto>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (user: SignUpDto) => {
    setisLoading(true);

    try {
      const response = await signup(user);

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.add({
        type: "success",
        title: `✅ Hola ${user.name}! Se ha enviado un correo electrónico para validar tu cuenta.`,
        description: response.message,
        priority: "high",
        timeout: 4000,
      });

      setTypeSelected("sign-in");
      form.reset();
    } catch (error: any) {
      if (error.message.includes("User already registered")) {
        toast.add({
          type: "error",
          title: "Error",
          description: "Este correo electrónico ya está registrado",
          priority: "high",
          timeout: 4000,
        });
      } else if (
        error.message.includes("Password should be at least 6 characters")
      ) {
        toast.add({
          type: "error",
          title: "Error",
          description: "La contraseña debe tener al menos 6 caracteres",
          priority: "high",
          timeout: 4000,
        });
      } else if (error.message.includes("Invalid email")) {
        toast.add({
          type: "error",
          title: "Error",
          description: "Por favor ingresa un correo electrónico válido",
          priority: "high",
          timeout: 4000,
        });
      } else {
        toast.add({
          type: "error",
          title: "Error",
          description: error.message || "Error al registrar el usuario",
          priority: "high",
          timeout: 4000,
        });
      }
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full backdrop-blur-xl rounded-4xl pb-4">
        <header className="text-center">
          <h1 className="lg:text-5xl md:text-4xl text-3xl font-semibold text-center my-4">
            Crear Cuenta
          </h1>

          <p className="text-sm text-muted-foreground mb-8">
            Crea una cuenta para acceder a todo el contenido
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="mx-4">
          <div className="grid gap-2">
            <FieldGroup className="gap-3">
              {signUpInputs.map((input) => (
                <Controller
                  key={input.id}
                  name={input.id}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field className="mb-3" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        {input.label}
                      </FieldLabel>

                      <Input
                        {...field}
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
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="mb-3" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Contraseña</FieldLabel>
                    <InputPassword
                      {...field}
                      name="password"
                      id="password"
                      type="password"
                      autoComplete="password"
                      placeholder="********"
                      disabled={isLoading}
                      aria-invalid={!!fieldState.error}
                      minLength={8}
                      maxLength={16}
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

            <Button className="mt-6" type="submit" disabled={isLoading}>
              {isLoading && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Crear cuenta
            </Button>
          </div>
        </form>

        <footer>
          <p className="text-center text-sm mt-6 text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <span
              onClick={() => !isLoading && setTypeSelected("sign-in")}
              className="underline underline-offset-4 hover:text-primary cursor-pointer text-foreground font-medium"
            >
              Inicia Sesión
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SignUpForm;
