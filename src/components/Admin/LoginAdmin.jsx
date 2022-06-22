import { useContext } from "react";
import { ShiftContext } from "../../context/ShiftContext";

const LoginAdmin = () => {
  const { login, setLogin } = useContext(ShiftContext);
  return (
    <div>
      <h1>Sign in Admin</h1>
      <div>
        <label className="email" htmlFor="username">
          Nombre de Usuario
        </label>
        <input
          onChange={(e) =>
            setLogin({ ...login, [e.target.name]: e.target.value })
          }
          autoComplete="off"
          name="email"
          id="username"
          type="email"
          value={login.email}
          placeholder="Escribe tu email..."
        />
      </div>
      <div>
        <label className="pass" htmlFor="pass">
          Password
        </label>
        <input
          onChange={(e) =>
            setLogin({ ...login, [e.target.name]: e.target.value })
          }
          autoComplete="off"
          id="pass"
          name="password"
          type="password"
          value={login.password}
          placeholder="Escribe tu contrasenia..."
        />
      </div>
    </div>
  );
};

export default LoginAdmin;
