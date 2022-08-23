import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { ShiftContext } from "../../context/ShiftContext";
import auth, { db } from "../../firebaseConfig";
import LoginAdmin from "../Admin/LoginAdmin";
import { Formulary } from "../Admin/WelcomeAdmin";
import WelcomeUser from "./WelcomeUser";

const Login = () => {
  const { user, setUser, login, setUsers, setReserves } =
    useContext(ShiftContext);
  const clientsCollectionRef = collection(db, "clients");
  const getUsers = async () => {
    const data = await getDocs(clientsCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const getReserves = async () => {
    const reservesRef = collection(db, "dates");

    const reserve = await getDocs(reservesRef);

    setReserves(reserve.docs.map((doc) => ({ ...doc.data(), day: doc.id })));
  };
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      getReserves();
      getUsers();
    });
    // eslint-disable-next-line
  }, [setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const usuario = await signInWithEmailAndPassword(
        auth,
        login.email,
        login.password
      );
      setUser(usuario.user);
      if (usuario) {
        getUsers();
        getReserves();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return user ? (
    <WelcomeUser getUsers={getUsers} getReserves={getReserves} />
  ) : (
    <Formulary onSubmit={handleSubmit}>
      <LoginAdmin header="Ingresa para reservar tu clase" />
      <input type="submit" value="Ingresar" />
    </Formulary>
  );
};

export default Login;
