import { AuthForm } from "../components/";

import { FindUser } from "../db/controllers";

const Login = () => {
  return (
    <div className="flex flex-col h-screen mt-10 p-16">
      <AuthForm action="login"/>
    </div>
  );
};

export default Login;
