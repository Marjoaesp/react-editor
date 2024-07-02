import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Email from "~/components/Icons/Email";
import Password from "~/components/Icons/Password";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const iconStyle = {
    padding: "9px",
    verticalAlign: "middle",
    width: "50px",
    height: "50px",
    backgroundColor: "black"
  }; 
  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    // Lógica de registro aquí
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    navigate("/login"); // Navegar a la página de login después de registrarse
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 w-full">
      <div className="w-80 bg-gray-900 text-white p-6  shadow-lg">
        <h2 className="text-2xl mb-4 text-center">Registrarse</h2>

        <form onSubmit={handleRegister} className="flex flex-col space-y-4">
          <div className="flex items-center">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 "
              placeholder="Username"
            />
          </div>

          <div className="flex items-center">
            <Email size={24} style={iconStyle} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 "
              placeholder="Email"
            />
          </div>

          <div className="flex items-center">
            <Password size={24} style={iconStyle}  />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 "
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="bg-gray-600 text-white py-2  hover:bg-gray-700 transition duration-300"
          >
            Registrarse
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="bg-black text-white py-2 mt-4 hover:bg-gray-800 transition duration-300"
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
