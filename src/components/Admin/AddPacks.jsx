import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ShiftContext } from "../../context/ShiftContext";
import Error from "../Error";
import { doc, updateDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Spinner from "./../Spinner";
const Form = styled.form`
  display: flex;
  justify-content: center;
  align-self: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.13);
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 30px rgba(8, 7, 16, 0.6);
  padding: 5rem;
  div {
    display: flex;
    flex-direction: column;
    margin: 0.5rem;
    label {
      margin: 0.5rem 0;
    }
    input[type="email"] {
      height: 2rem;
      background-color: rgba(255, 255, 255, 0.07);
      border-radius: 3px;
      margin-top: 0.5rem;
      padding: 0 0.5rem;
      outline: 0;
      color: #fff;
    }
    select {
      height: 2rem;
      background-color: rgba(255, 255, 255, 0.07);
      border-radius: 3px;
      margin-top: 0.5rem;
      padding: 0 0.5rem;
      font-size: 1.2rem;
      outline: 0;
      color: #fff;
    }
  }
  input[type="submit"],
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
`;
const AddPacks = () => {
  const { clases, setClases, setError, error, setSuccess, success } =
    useContext(ShiftContext);
  const [users, setUsers] = useState([]);

  const clientsCollectionRef = collection(db, `clients`);
  const updateUser = async (email, pack) => {
    try {
      const client = users.map((user) => {
        if (user.email === email) {
          return user.id;
        } else {
          return false;
        }
      });
      const filtered = client.filter((cli) => cli !== false);
      console.log(filtered);
      if (filtered.length === 0) {
        return false;
      }

      setError({ state: false, message: "" });
      const clientDoc = doc(db, "clients", filtered[0]);
      const newFields = { pack: Number(pack) };
      await updateDoc(clientDoc, newFields);
      setError({ state: false, message: "" });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      // setClases({ email: "", pack: "" });
    } catch (err) {
      setError({ state: true, message: "There was an error in server" });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //VALIDACION LOCAL
    if ([clases.email, clases.pack].includes("")) {
      setError({ state: true, message: "Completa todos los campos" });
      return;
    }
    //VALIDACION LOCAL
    //UPDATE USER
    updateUser(clases.email, clases.pack)
      .then((data) => {
        if (data === false) {
          setError({
            state: true,
            message: "No existe email en base de datos",
          });
          return;
        }
      })
      .catch((err) => {
        setError({ state: true, message: err.message });
      });
  };

  const handleChange = (e) =>
    setClases({ ...clases, [e.target.name]: e.target.value });
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(clientsCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
    // eslint-disable-next-line
  }, []);
  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          id="email"
          value={clases.email}
        />
      </div>
      <div>
        <label htmlFor="pack">Tipo de Pack</label>
        <select
          name="pack"
          id="pack"
          onChange={handleChange}
          value={clases.pack}
        >
          <option value="">--Seleccionar--</option>
          <option value="2">2 veces por semana</option>
          <option value="3"> 3 veces por semana</option>
          <option value="4">4 veces por semana</option>
          <option value="5">5 veces por semana</option>
          <option value="6">6 veces por semana</option>
        </select>
      </div>
      {error.state && <Error message={error.message} />}
      {success && <p className="exito">Pack añadido exitosamente</p>}
      <input type="submit" value="Agregar Pack" />
      <Link to="/admin">
        <button>Atras</button>
      </Link>
    </Form>
  );
};

export default AddPacks;
