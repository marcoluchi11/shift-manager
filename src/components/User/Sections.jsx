import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Error from "./../Error";
import { formatMoney, timeSample as times } from "../helpers";
import { ShiftContext } from "./../../context/ShiftContext";
import Spinner from "./../../components/Spinner";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { db } from "./../../firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import SelectShift from "./SelectShift";
const ContainerCalendar = styled.div``;
const Owing = styled.div`
  background-color: #ff0039;
  border-radius: 5px;
`;
const Pack = styled.h2`
  background-color: #2780e3;
  border-radius: 5px;
  padding: 0.3rem 0;
  margin: 0;
`;
const Sections = () => {
  const [shift, setShift] = useState([]);
  const { users, user, loading, setLoading, error, setError } =
    useContext(ShiftContext);
  const [current, setCurrent] = useState([]);
  const [date, setDate] = useState(new Date());
  const [shiftkeys, setShiftKeys] = useState({});
  const [shiftTime, setShiftTime] = useState("");
  const saveShift = async (email) => {
    if (shiftTime === "") {
      setError({ state: true, message: "Elegi un horario" });
      return;
    }
    try {
      setError({ state: false, message: "" });
      const month = date.toLocaleString("default", { month: "long" });
      const dateRef = doc(db, "dates", `${date.getDate()} ${month}`);
      const hora = shiftTime.split(":")[0] + shiftTime.split(":")[1];
      //SI ES EL MISMO MAIL, LO PISA. SLOTS SE RESTA CORRECTAMENTE.
      const newFields = {
        [`times.${hora}.mail`]: arrayUnion(email),
        [`times.${hora}.slots`]: increment(-1),
      };
      await updateDoc(dateRef, newFields);
      getDia();
    } catch (err) {
      console.log("error bicho");
    }
  };
  const createDates = async () => {
    //FUNCION PARA ADMIN
    try {
      const docData = {
        times,
      };
      for (let i = 1; i < 30; i++) {
        await setDoc(doc(db, "dates", `${i} August`), docData);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setCurrent(users.filter((elem) => elem.email === user.email));
    // eslint-disable-next-line
  }, [users]);
  const getDia = async () => {
    const month = date.toLocaleString("default", { month: "long" });

    const dateRef = doc(db, "dates", `${date.getDate()} ${month}`);

    const fechovich = await getDoc(dateRef);
    if (fechovich.exists()) {
      setShift(fechovich.data().times);
    } else {
      console.log("Error bicho");
    }
  };
  useEffect(() => {
    getDia();
    // eslint-disable-next-line
  }, [date, setLoading]);

  useEffect(() => {
    setShiftKeys(Object.keys(shift));
  }, [shift]);

  return current.length ? (
    <div>
      <div>
        <h2>Mis reservas</h2>
        <p>Jueves 30 de Junio, 9:30am</p>
        <p>Viernes 31 de Junio, 9:30am</p>
      </div>
      <hr />

      <div>
        <Pack>Mi pack</Pack>
        <h3> {current[0].pack} veces por semana</h3>
        <p>Clases restantes: 4/16</p>
      </div>
      <hr />

      <Owing>
        <h2>Mi saldo a pagar</h2>
        <h3>{formatMoney(current[0].price)}</h3>
      </Owing>
      <ContainerCalendar>
        <Calendar
          defaultActiveStartDate={date}
          onChange={setDate}
          value={date}
          minDate={new Date()}
        />
        <h3>Reserva tu turno</h3>

        <h4>Dia elegido : {format(date, `eeee d MMMM yyyy`)}</h4>
        {error.state && <Error message={error.message} />}
        {loading ? (
          <Spinner />
        ) : (
          <SelectShift
            setShiftTime={setShiftTime}
            shiftkeys={shiftkeys}
            shift={shift}
          />
        )}

        <button onClick={createDates}>crear Turno</button>
        <button onClick={() => saveShift(user.email)}>Reservar Turno</button>
      </ContainerCalendar>
      <div>
        <h3>Turnos Reservados</h3>
        <hr />
      </div>
      <hr />
    </div>
  ) : (
    <Spinner />
  );
};

export default Sections;
// SI RESERVO LA MISMA CLASE QUE YA ESTOY ANOTADO, ME  TIENE QUE DAR ERROR
// SI NO HAY SLOTS EN ESA CLASE, ME TIENE QUE DAR ERROR
// MOSTRAR LOS TURNOS RESERVADOS QUE TENGO
