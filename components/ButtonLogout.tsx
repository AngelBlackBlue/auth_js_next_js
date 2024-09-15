"use client"
import { signOut } from "next-auth/react" // del lado del client
import { Button } from "@/components/ui/button"

export const ButtonLogout = () => {
  const handleClick = async () => {
    await signOut({
      callbackUrl: "/login",
      
    })
  }
  return <Button onClick={handleClick} className="bg-[#791b6b]">Sign Out</Button>
}