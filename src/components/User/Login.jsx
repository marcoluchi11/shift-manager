import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect } from "react";
import { ShiftContext } from "../../context/ShiftContext";
import auth from "../../firebaseConfig";
import LoginAdmin from "../Admin/LoginAdmin";
import { Formulary } from "../Admin/WelcomeAdmin";
import WelcomeUser from "./WelcomeUser";

const Login = () => {
  const { user, setUser, login } = useContext(ShiftContext);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const usuario = await signInWithEmailAndPassword(
        auth,
        login.email,
        login.password
      );
      setUser(usuario);
      console.log(usuario);
    } catch (error) {
      console.log(error.message);
    }
  };
  return user ? (
    <WelcomeUser />
  ) : (
    <Formulary onSubmit={handleSubmit}>
      <LoginAdmin header="Ingresa para reservar tu clase" />
      <input type="submit" value="Ingresar" />
    </Formulary>
  );
};

export default Login;
