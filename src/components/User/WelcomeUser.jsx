import { useContext, useEffect } from "react";
import { ShiftContext } from "../../context/ShiftContext";
import { Container } from "../Admin/ScreenLogged";
import Sections from "./Sections";

const WelcomeUser = ({ getUsers, getReserves }) => {
  const { user } = useContext(ShiftContext);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);
  return (
    <Container>
      <h2>Hola {user.email}, Bienvenido a DF</h2>
      <Sections getUsers={getUsers} getReserves={getReserves} />
    </Container>
  );
};

export default WelcomeUser;
