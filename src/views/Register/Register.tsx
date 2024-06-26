import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Email from "~/components/Icons/Email";
import Password from "~/components/Icons/Password";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    // Lógica de registro aquí
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    navigate("/login"); // Navegar a la página de login después de registrarse
  };

  const iconStyle = {
    padding: "9px",
    verticalAlign: "middle",
    width: "24px",
    height: "24px",
    backgroundColor: "black"
  }; // Estilo para los iconos

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#161616"
      }}
    >
      <div
        style={{
          width: "300px",
          backgroundColor: "#161616",
          textAlign: "center",
          padding: "30px",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#ffffff" }}>Registrarse</h2>

        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ marginBottom: "15px", width: "100%", display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: "100%", padding: "13px", boxSizing: "border-box", border: "1px solid #ccc" }}
              placeholder="Username"
            />
          </div>

          <div style={{ marginBottom: "15px", width: "100%", display: "flex", alignItems: "center" }}>
            <Email size={24} style={iconStyle} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "13px", boxSizing: "border-box", border: "1px solid #ccc" }}
              placeholder="Email"
            />
          </div>

          <div style={{ marginBottom: "15px", width: "100%", display: "flex", alignItems: "center" }}>
            <Password size={24} style={iconStyle} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              style={{ width: "100%", padding: "13px", boxSizing: "border-box", border: "1px solid #ccc" }}
            />
          </div>

          <button
            type="submit"
            style={{
              color: "#ffffff",
              width: "100%",
              padding: "10px",
              backgroundColor: "#7b7b7b",
              border: "none",
              cursor: "pointer"
            }}
          >
            Registrarse
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{
              width: "100%",
              marginTop: "25%",
              padding: "10px",
              backgroundColor: "#000000",
              color: "#ffffff",
              border: "none",
              cursor: "pointer"
            }}
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
