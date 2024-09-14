import { auth } from "@/auth"
 
const DashboardPage = async() => {
  const session = await auth()
 
  if (!session) {
    return <div>Not authenticated</div>
  }
 
  return (
    <div className="container">
        <pre>{JSON.stringify(session, null, 2)}</pre> //session, filtro, identación
    </div>
  )
}

export default DashboardPage