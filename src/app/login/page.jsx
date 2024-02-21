import "./login.css";
import Link from "next/link";

function LoginPage() {
  return (
    <section className="container-form">
      <h2 className="text-center mb-4">Bienvenido, puede iniciar sesión</h2>

      <form className="login-form form">
        <input type="text" className="input" placeholder="Ingrese su correo" />
        <input
          type="password"
          className="input"
          placeholder="Ingrese su contraseña"
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
