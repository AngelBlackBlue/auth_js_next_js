import FormLogin from "@/components/FormLogin"


const LoginPage = ({
  searchParams
}: {
  searchParams: { veryfield: string }
}) => {
  const isVerified = searchParams.veryfield === 'true'
  return (
    <FormLogin isVerified/>
  )
}

export default LoginPage