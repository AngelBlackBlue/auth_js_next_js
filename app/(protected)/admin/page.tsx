import { auth } from "@/auth"
import { ButtonLogout } from "@/components/ButtonLogout";


const AdminPage = async() => {
  const session = await auth();

  if (session?.user?.role !== 'ADMIN') {
    return (
      <div>
        <h1>Access Denied, You are not an administrator </h1>
      </div>
    )

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
  );
};


export default AdminPage