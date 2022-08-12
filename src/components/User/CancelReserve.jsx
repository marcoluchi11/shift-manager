import { arrayRemove, doc, increment, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import styled from "styled-components";
import { db } from "../../firebaseConfig";
import { ShiftContext } from "./../../context/ShiftContext";

const Cancelar = styled.button`
  outline: 0;
  border: 0;
  background-color: #ef6c6c;
  color: #000;
  border-radius: 5px;
  padding: 0.5rem;
  margin: 0.5rem;
  cursor: pointer;
  transition: 1s background-color linear;
  transition: 1s color linear;
  &&:hover {
    background-color: #fff;
    color: #ef6c6c;
  }
`;
// EL METODO TIENE QUE REMOVER MAIL DE ARRAY, SUMAR EN EL SLOT, Y SUMAR EN LA CLASE

const CancelReserve = ({ target, updateData }) => {
  const { user } = useContext(ShiftContext);

  const cancelReserve = async () => {
    try {
      const dateRef = doc(db, "dates", `${target.day}`);
      const clientRef = doc(db, "clients", `${user.email}`);
      const newFieldsDate = {
        [`times.${target.time}.mail`]: arrayRemove(user.email),
        [`times.${target.time}.slots`]: increment(1),
      };
      const newFieldsClient = {
        clases: increment(1),
      };
      await updateDoc(clientRef, newFieldsClient);
      await updateDoc(dateRef, newFieldsDate);
      updateData();
    } catch (err) {
      console.log(`error bicho ${err}`);
    }
  };
  return (
    <div>
      <Cancelar onClick={cancelReserve}>X Cancelar </Cancelar>
    </div>
  );
};

export default CancelReserve;
