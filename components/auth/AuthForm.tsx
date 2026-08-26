"use client";

import ForgotPasswordForm from "./ForgotPasswordForm";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

export interface AuthFormProps {
  setTypeSelected: Dispatch<
    SetStateAction<"sign-up" | "sign-in" | "recover-password">
  >;
}

interface AuthModalProps {
  type: "sign-up" | "sign-in" | "recover-password";
}

const AuthForm = ({ type }: AuthModalProps) => {
  const [typeSelected, setTypeSelected] = useState<
    "sign-up" | "sign-in" | "recover-password"
  >(type);

  return (
    <div className="mx-auto bg-card text-card-foreground w-full max-w-lg border border-border shadow-lg mt-6 p-6 sm:p-8 rounded-3xl">
      {typeSelected === "sign-in" && (
        <SignInForm setTypeSelected={setTypeSelected} />
      )}
      {typeSelected === "sign-up" && (
        <SignUpForm setTypeSelected={setTypeSelected} />
      )}
      {typeSelected === "recover-password" && (
        <ForgotPasswordForm setTypeSelected={setTypeSelected} />
      )}
    </div>
  );
};

export default AuthForm;
