import { useContext, useState } from "react";
import styled from "styled-components";
import { ShiftContext } from "../../context/ShiftContext";
import auth from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import CreateUser from "./CreateUser";
import { Link } from "react-router-dom";
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.13);
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 30px rgba(8, 7, 16, 0.6);
  padding: 5rem;
  a {
    text-decoration: none;
  }
  ul {
    display: flex;
    @media (max-width: 720px) {
      flex-direction: column;
    }
    list-style-type: none;
    li {
      @media (max-width: 720px) {
        margin: 1rem 0;
      }
      border-radius: 5px;
      margin: 0 1rem;
      cursor: pointer;
      background-color: #fff;
      color: #000;
      padding: 0.3rem 1rem;
    }
  }
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5rem;
  h3 {
    margin: 0 1rem;
    padding: 0;
  }
  button {
    padding: 0 0.5rem;
    margin: 0;
    background-color: #ffffff;
    color: #080710;
    border: 0;
    font-weight: 600;
    border-radius: 5px;
    outline: 0;
    cursor: pointer;
  }
`;
const ScreenLogged = () => {
  const { user } = useContext(ShiftContext);
  const [create, setCreate] = useState(false);
  const logout = async (e) => {
    e.preventDefault();
    await signOut(auth);
  };

  return (
    <Container>
      <Header>
        <h3>Welcome {user.email}</h3>
        <button onClick={logout}>Cerrar Sesion</button>
      </Header>
      <div>
        {create ? (
          <CreateUser setCreate={setCreate} />
        ) : (
          <ul>
            <Link to="/admin/createuser">
              <li>Crear Usuario</li>
            </Link>
            <Link to="/admin/addpacks">
              <li>Agregar Pack de clases</li>
            </Link>
            <Link to="/admin/reserves">
              <li>Ver reservas del dia</li>
            </Link>
          </ul>
        )}
      </div>
    </Container>
  );
};

export default ScreenLogged;
