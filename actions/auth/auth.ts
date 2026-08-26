"use server";

import { createClient } from "@/lib/supabase/server";
import { SignInDto } from "@/components/auth/schemas/sign-in.schema";
import { SignUpDto } from "@/components/auth/schemas/sign-up.schemas";

export async function singIn(shape: SignInDto) {
  const supabase = await createClient();
  const { error, data } = await supabase.auth.signInWithPassword(shape);

  if (error) {
    return {
      data: null,
      success: false,
      message: error.message,
    };
  }

  return {
    data,
    success: true,
    message: "Inicio de sesión exitoso",
  };
}

export async function signup(shape: SignUpDto) {
  const supabase = await createClient();
  const { error, data } = await supabase.auth.signUp({
    email: shape.email,
    password: shape.password,
    options: {
      data: {
        name: shape.name,
      },
    },
  });

  if (error) {
    return {
      data: null,
      success: false,
      message: error.message,
    };
  }

  return {
    data,
    success: true,
    message: "Registro exitoso",
  };
}

export async function singOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      data: null,
      success: false,
      message: error.message,
    };
  }

  return {
    data: null,
    success: true,
    message: "Cierre de sesión exitoso",
  };
}

export async function sendRecoveredEmail(email: string) {
  const supabase = await createClient();
  const { error, data } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return {
      data: null,
      success: false,
      message: error.message,
    };
  }

  return {
    data,
    success: true,
    message:
      "Email de recuperación enviado exitosamente, revisa tu correo electrónico",
  };
}

export async function recoveryPassword(password: string) {
  const supabase = await createClient();
  const { error, data } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return {
      data: null,
      success: false,
      message: error.message,
    };
  }

  return {
    data,
    success: true,
    message: "Contraseña actualizada exitosamente",
  };
}
