import { useContext } from "react";
import { ShiftContext } from "../../context/ShiftContext";
import { Container } from "../Admin/ScreenLogged";
import Sections from "./Sections";

const WelcomeUser = () => {
  const { user } = useContext(ShiftContext);
  return (
    <Container>
      <h2>Hola {user.email}, Bienvenido a DF</h2>
      <Sections />
    </Container>
  );
};

export default WelcomeUser;
