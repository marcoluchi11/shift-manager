import { useContext } from "react";
import styled from "styled-components";
import { ShiftContext } from "../../context/ShiftContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth, { db } from "../../firebaseConfig";
import { Link } from "react-router-dom";
import Error from "../Error";
import Spinner from "./../Spinner";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
const Formulary = styled.form`
  display: flex;
  position: relative;
  justify-content: center;
  align-self: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.13);
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 30px rgba(8, 7, 16, 0.6);
  padding: 5rem;
  h1 {
    position: absolute;
    top: 1rem;
    left: 15rem;
  }
  div {
    margin: 0.5rem;
    display: flex;
    flex-direction: column;
    .exito {
      background-color: limegreen;
      color: #fff;
      margin: 1rem 0;
      padding: 0.3rem 1rem;
      border-radius: 5px;
    }
  }
  .email {
    margin-top: 1rem;
  }
  .pass {
    margin-top: 1rem;
  }
  input[type="password"],
  input[type="email"] {
    height: 1.5rem;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    margin-top: 0.5rem;
    padding: 0 0.5rem;
    color: #fff;
    outline: 0;
  }
  input::placeholder {
    font-weight: 300;
    color: #fff;
  }
  input[type="submit"] {
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
`;
const CreateUser = () => {
  const {
    register,
    setRegister,
    error,
    setError,
    setSuccess,
    success,
    loading,
    setLoading,
  } = useContext(ShiftContext);

  const clientsCollectionRef = collection(db, `clients`);

  const createUser = async (e) => {
    e.preventDefault();
    //validacion
    if ([register.email, register.password].includes("")) {
      setError({ state: true, message: "Completa todos los campos" });
      return;
    }
    setError({ state: false, message: "" });
    try {
      setLoading(true);
      const docData = { email: register.email };
      await setDoc(doc(db, "clients", `${register.email}`), docData);
      await createUserWithEmailAndPassword(
        auth,
        register.email,
        register.password
      );
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3500);
    } catch (err) {
      console.log("There was an error!");
      setError({ message: err.message, state: true });
    }
    setRegister({ email: "", password: "" });
  };
  return (
    <Formulary onSubmit={createUser}>
      <h2>Crear nuevo alumno</h2>
      <div>
        <label className="email" htmlFor="username">
          Nombre de Usuario
        </label>
        <input
          onChange={(e) =>
            setRegister({ ...register, [e.target.name]: e.target.value })
          }
          autoComplete="off"
          name="email"
          id="username"
          type="email"
          value={register.email}
          placeholder="Escribe tu email..."
        />
      </div>
      <div>
        <label className="pass" htmlFor="pass">
          Password
        </label>
        <input
          onChange={(e) =>
            setRegister({ ...register, [e.target.name]: e.target.value })
          }
          autoComplete="off"
          id="pass"
          name="password"
          type="password"
          value={register.password}
          placeholder="Escribe tu contrasenia..."
        />
        {loading && <Spinner />}
        {success && <p className="exito">Usuario creado exitosamente</p>}
        {error.state && <Error message={error.message} />}
      </div>
      <input type="submit" value="Crear usuario" />
      <Link to="/admin">
        <button className="back">Atrás</button>
      </Link>
    </Formulary>
  );
};

export default CreateUser;
