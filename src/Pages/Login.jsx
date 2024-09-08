import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      Login
      <button
        className="bg-sky-400 rounded-xl px-4 py-2"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Login;
