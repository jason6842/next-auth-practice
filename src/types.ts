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

export type PostFormValues = {
  title: string;
  content: string;
}

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
  }
}