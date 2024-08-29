import { UserFormValidationMessages } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const {
  name: { min: nameMinChar, max: nameMaxChar },
  email: { invalid: emailInvalid },
  phone: { invalid: phoneInvalid },
} = UserFormValidationMessages;

export const userFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: nameMinChar,
    })
    .max(50, {
      message: nameMaxChar,
    }),
  email: z.string().email(emailInvalid),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), phoneInvalid),
});

export const useUserForm = () => {
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  return { form };
};
