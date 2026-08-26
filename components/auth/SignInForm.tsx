"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { AuthFormProps } from "./AuthForm";
import { SignInDto, signInSchema } from "./schemas/sign-in.schema";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { toast } from "../ui/toast";
import { signInInputs } from "./fields";
import { InputPassword } from "./input";
import { singIn } from "@/actions/auth/auth";

const SignInForm = ({ setTypeSelected }: AuthFormProps) => {
  const [isLoading, setisLoading] = useState<boolean>(false);

  const form = useForm<SignInDto>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (dto: SignInDto) => {
    setisLoading(true);

    try {
      const response = await singIn(dto);
      if (!response.success) {
        throw new Error(response.message);
      }
      window.location.reload();
    } catch (error) {
      if (error instanceof Error)
        return toast.add({
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
      <div className="w-full backdrop-blur-xl py-2 rounded-4xl">
        <header className="text-center">
          <h1 className="lg:text-5xl md:text-4xl text-3xl font-semibold text-center my-4">
            Iniciar Sesión
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Ingresa para acceder a todo el contenido
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="mx-4">
          <div className="grid gap-2">
            <FieldGroup className="gap-3">
              {signInInputs.map((input) => (
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

            <div
              onClick={() => setTypeSelected("recover-password")}
              className="underline text-muted-foreground hover:text-foreground mb-6 text-sm text-end cursor-pointer font-medium"
            >
              ¿Olvidaste tu contraseña?
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Ingresar
            </Button>
          </div>
        </form>

        <footer>
          <p className="text-center text-sm text-muted-foreground mt-6">
            ¿No tienes una cuenta?{" "}
            <span
              onClick={() => setTypeSelected("sign-up")}
              className="underline underline-offset-4 hover:text-primary cursor-pointer text-foreground font-medium"
            >
              Regístrate
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SignInForm;
