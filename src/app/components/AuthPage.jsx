import { useForm } from "react-hook-form";
import "./AuthPage.css";
import Link from "next/link";
import { login, register } from "../services/bankService";
import { useRouter } from "next/navigation";

function AuthPage({ isLogin }) {
  const {
    register: formRegister,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (formData) => {
    try {
      if (isLogin) {
        const respLogin = await login(formData);
        sessionStorage.setItem("idToken", respLogin.data.token);
        router.push("/");
      } else {
        const respRegister = await register(formData);
        router.push("/login");
      }
    } catch (error) {}
  };

  return (
    <section className="container-form">
      <h2 className="text-center mb-4">
        {isLogin ? "Iniciar sesión" : "Registrarse"}
      </h2>

      <form className="login-form form" onSubmit={handleSubmit(onSubmit)}>
        {!isLogin && (
          <input
            type="text"
            className="input"
            placeholder="Nombre"
            {...formRegister("name", { required: "El nombre es requerido" })}
          />
        )}
        {errors.name && <p className="error-message">{errors.name.message}</p>}
        <input
          type="text"
          className="input"
          placeholder="Ingrese su correo"
          {...formRegister("email", {
            required: "El correo es requerido",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Ingrese un correo electrónico válido",
            },
          })}
        />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
        <input
          type="password"
          className="input"
          placeholder="Ingrese su contraseña"
          {...formRegister("password", {
            required: "La contraseña es requerida",
          })}
        />
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}

        <button type="submit" className="button" disabled={isSubmitting}>
          {isSubmitting ? "Cargando..." : isLogin ? "Ingresar" : "Registrarse"}
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
