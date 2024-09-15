"use server"

import { signOut } from "@/auth"

export const logoutAction = async () => {
  try {
    await signOut()
  } catch (error) {
    console.error("Logout failed:", error)
  }
}
