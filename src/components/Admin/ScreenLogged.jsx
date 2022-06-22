import { useContext } from "react";
import styled from "styled-components";
import { ShiftContext } from "../../context/ShiftContext";
import auth from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import CreateUser from "./CreateUser";
import { Link } from "react-router-dom";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.13);
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 30px rgba(8, 7, 16, 0.6);
  padding: 5rem;
  button {
    margin-top: 1rem;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
  }
  ul {
    display: flex;
    @media (max-width: 720px) {
      flex-direction: column;
    }
    list-style-type: none;
    li {
      margin: 0 1rem;
      cursor: pointer;
      background-color: #fff;
      color: #000;
      padding: 0.3rem 1rem;
    }
  }
`;
const ScreenLogged = () => {
  const { user } = useContext(ShiftContext);
  const logout = async (e) => {
    e.preventDefault();
    await signOut(auth);
  };
  return (
    <Container>
      <h1>Welcome, {user.email}</h1>
      <button onClick={logout}>Cerrar Sesion</button>
      <div>
        <ul>
          <Link to="/admin/createuser">
            <li>Crear Usuario</li>
          </Link>
          <li>Agregar Pack de clases</li>
          <li>Ver reservas del dia</li>
        </ul>
      </div>
    </Container>
  );
};

export default ScreenLogged;
