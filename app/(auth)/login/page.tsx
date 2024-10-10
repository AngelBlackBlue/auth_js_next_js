import FormLogin from "@/components/FormLogin"


const LoginPage = ({
  searchParams
}: {
  searchParams: { verified: string }
}) => {
  const isVerified = searchParams.verified === 'true'
  return (
    <FormLogin isVerified={isVerified}/>
  )
}

export default LoginPage