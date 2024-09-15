// "use client"

// import { Button } from "@/components/ui/button"
// import { logoutAction } from "@/actions/logoutAction"

// const ButtonLogout = () => {
//   const handleClick = async () => {

//       await logoutAction()
    
//   }

//   return (
//     <Button type="button" onClick={handleClick} className="bg-[#791b6b] ">
//       Logout
//     </Button>
//   )
// }

// export default ButtonLogout

"use client"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
 
export function ButtonLogout() {
  return <Button onClick={() => signOut()}>Sign Out</Button>
}