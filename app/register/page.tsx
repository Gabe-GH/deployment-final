import { AuthForm } from "../components/";

import { RegisterUser } from "../db/controllers";

const Register = () => {
  return (
    <div className="flex flex-col h-screen mt-10 p-16">
      <AuthForm action="register"/>
    </div>
  );
};

export default Register;
