import { auth } from "@/auth"
import {ButtonLogout} from "@/components/ButtonLogout"
 
const DashboardPage = async() => {
  const session = await auth()
 
  if (!session) {
    return <div>Not authenticated</div>
  }
 
  return (
    <div className="relative z-10">

    <div className="container">
        {/* session, filtro, identación */}
        <pre>{JSON.stringify(session, null, 2)}</pre> 
        
    </div>
    <div>
        <ButtonLogout />

    </div>
    </div>
  )
}

export default DashboardPage