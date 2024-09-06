import { object, string } from "zod"
 
export const registerSchema = object({
  name: string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(18, "Name must be at most 18 characters"),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(12, "Password must be less than 18 characters"),
})