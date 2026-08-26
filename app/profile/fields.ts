enum AccountInputsName {
  NAME = "name",
  EMAIL = "email",
  PHONE = "phone",
}

export const accountInputs = [
  {
    id: AccountInputsName.EMAIL,
    placeholder: "address@example.com",
    type: "email",
    label: "Correo electrónico",
    autoComplete: "email",
  },
  {
    id: AccountInputsName.NAME,
    placeholder: "John Doe",
    label: "Nombre completo",
    type: "text",
    autoComplete: "name",
  },
];
