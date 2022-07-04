import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { ShiftContext } from "../../context/ShiftContext";
import { db } from "../../firebaseConfig";
import { Container } from "../Admin/ScreenLogged";
import Sections from "./Sections";

const WelcomeUser = () => {
  const { user, setUsers } = useContext(ShiftContext);
  const clientsCollectionRef = collection(db, "clients");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(clientsCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
    // eslint-disable-next-line
  }, []);
  return (
    <Container>
      <h2>Hola {user.email}, Bienvenido a DF</h2>
      <Sections />
    </Container>
  );
};

export default WelcomeUser;
