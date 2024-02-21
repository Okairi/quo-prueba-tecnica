import "./register.css";
import Link from "next/link";

function RegisterPage() {
  return (
    <section className="container-form">
      <h2 className="text-center mb-4">Bienvenido puede registrarse</h2>

      <form className="login-form form">
        <input type="text" className="input" placeholder="Ingrese su correo" />
        <input
          type="password"
          className="input"
          placeholder="Ingrese su contraseña"
        />

        <button type="submit" className="button">
          Registrar|
        </button>

        <span className="redirect text-[13px]">
          ¿Ya tienes una cuenta?
          <Link className="text-[blue]" href={"/login"}>
            Iniciar Sesión
          </Link>
        </span>
      </form>
    </section>
  );
}

export default RegisterPage;
