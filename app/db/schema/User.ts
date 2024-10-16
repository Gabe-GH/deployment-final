import { z } from "zod";

const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "Username cannot exceed 30 characters" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(30, { message: "Password cannot exceed 30 characters" }) // Adjust this based on your requirements
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

export default userSchema;