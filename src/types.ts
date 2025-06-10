export type User = {
    // _id: string;
    email: string;
    name: string;
    password: string;
}

export type AuthFormValues = {
  email: string;
  password: string;
  name?: string;
};