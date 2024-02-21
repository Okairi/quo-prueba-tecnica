import { useState } from "react";
import "./AuthPage.css";
import Link from "next/link";
import { login, register } from "../services/bankService";
import { useRouter } from "next/navigation";

function AuthPage({ isLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const respLogin = await login(formData);
        sessionStorage.setItem("idToken", respLogin.data.token);
        router.push("/");
      } else {
        const respRegister = await register(formData);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    console.log("Datos del formulario:", formData);
  };

  return (
    <section className="container-form">
      <h2 className="text-center mb-4">
        {isLogin ? "Iniciar sesión" : "Registrarse"}
      </h2>

      <form className="login-form form" onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            className="input"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleInputChange}
            name="name"
          />
        )}
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

        <button type="submit" className="button" disabled={loading}>
          {loading ? "Cargando..." : isLogin ? "Ingresar" : "Registrarse"}
        </button>

        <span className="redirect text-[13px]">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
          <Link className="text-[blue]" href={isLogin ? "/register" : "/login"}>
            {isLogin ? "Regístrate aquí" : "Inicia sesión aquí"}
          </Link>
        </span>
      </form>
    </section>
  );
}

export default AuthPage;
