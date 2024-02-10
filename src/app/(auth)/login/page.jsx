import { handlegithublogin } from "@/lib/action";

const LoginPage = async() => {
  
  return (
    <div>
      <form action={handlegithublogin}>
        <button>Login with Github</button>
      </form>
    </div>
  )
}

export default LoginPage