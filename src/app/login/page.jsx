"use client";
import { useState } from "react";
import "./login.css";
import Link from "next/link";
import { login } from "../services/bankService";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const respLogin = await login(formData);

    sessionStorage.setItem("idToken", respLogin.data.token);

    console.log("Datos del formulario:", formData);
  };

  return (
    <section className="container-form">
      <h2 className="text-center mb-4">Bienvenido, puede iniciar sesión</h2>

      <form className="login-form form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Ingrese su correo"
          value={formData.email}
          onChange={handleInputChange}
          name="email"
        />
        <input
          type="password"
          className="input"
          name="password"
          placeholder="Ingrese su contraseña"
          value={formData.password}
          onChange={handleInputChange}
        />

        <button type="submit" className="button">
          Ingresar
        </button>

        <span className="redirect text-[13px]">
          ¿Todavía no tienes cuenta?
          <Link className="text-[blue]" href={"/register"}>
            Registraté aquí
          </Link>
        </span>
      </form>
    </section>
  );
}

export default LoginPage;
