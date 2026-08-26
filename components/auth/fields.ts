enum SignUpInputsName {
  NAME = "name",
  EMAIL = "email",
  PASSWORD = "password",
}

export const signUpInputs = [
  {
    id: SignUpInputsName.NAME,
    placeholder: "John",
    label: "Nombre",
    type: "text",
    minLength: 3,
    maxLength: 20,
    autoComplete: "name",
  },
  {
    id: SignUpInputsName.EMAIL,
    placeholder: "address@example.com",
    type: "email",
    label: "Correo electrónico",
    maxLength: 50,
    autoComplete: "email",
  },
];

enum SignInInputsName {
  EMAIL = "email",
  PASSWORD = "password",
}

export const signInInputs = [
  {
    id: SignInInputsName.EMAIL,
    label: "Correo electrónico",
    placeholder: "address@example.com",
    type: "email",
    maxLength: 50,
    autoComplete: "email",
  },
];

enum RecoveryPasswordInputsName {
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
}

export const recoveryPasswordInputs = [
  {
    id: RecoveryPasswordInputsName.PASSWORD,
    label: "Nueva Contraseña",
    placeholder: "********",
    type: "password",
    autoComplete: "new-password",
  },
  {
    id: RecoveryPasswordInputsName.CONFIRM_PASSWORD,
    label: "Confirmar Contraseña",
    placeholder: "********",
    type: "password",
    autoComplete: "new-password",
  },
];
