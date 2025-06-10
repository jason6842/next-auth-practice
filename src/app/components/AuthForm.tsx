"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthFormValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  mode: "login" | "register";
  onSubmit: (values: AuthFormValues) => void;
};

function AuthForm({ mode, onSubmit }: Props) {
  const loginSchema = z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const registerSchema = loginSchema.extend({
    name: z.string().min(1, "Name is required"),
  });

  const formSchema = mode === "register" ? registerSchema : loginSchema;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "register"
        ? { email: "", password: "", name: "" }
        : { email: "", password: "" },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-gray-50 rounded-lg md:p-10"
      >
        <div>
          <h2 className="text-2xl font-bold">User Profile Form</h2>
        </div>

        {mode === "register" && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  {/* Form managed by react form, this field has properties of form properties */}
                  <Input {...field} className="bg-white" />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                {/* Form managed by react form, this field has properties of form properties */}
                <Input {...field} className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                {/* Form managed by react form, this field has properties of form properties */}
                <Input {...field} type="password" className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-purple-600">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default AuthForm;
