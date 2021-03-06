import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { formatMoney, timeTable, timeSample as times } from "../helpers";
import { ShiftContext } from "./../../context/ShiftContext";
import Spinner from "./../../components/Spinner";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { nanoid } from "nanoid";
import { format } from "date-fns";
import { db } from "./../../firebaseConfig";

import { collection, doc, getDocs, setDoc, getDoc } from "firebase/firestore";
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
  const { users, user, loading, setLoading } = useContext(ShiftContext);
  const [current, setCurrent] = useState([]);
  const [date, setDate] = useState(new Date());
  const [shiftkeys, setShiftKeys] = useState({});
  const getShifts = async () => {
    const datesCollectionRef = collection(db, "dates");
    const data = await getDocs(datesCollectionRef);
    //data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setShift(data.docs.map((doc) => ({ ...doc.data() })));
  };
  const createDates = async () => {
    // const datesCollectionRef = collection(db, "dates", date);
    try {
      const docData = {
        // stringExample: "Hello world!",
        // booleanExample: true,
        // numberExample: 3.14159265,
        // dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
        // arrayExample: [5, true, "hello"],
        // nullExample: null,
        // objectExample: {
        //   a: 5,
        //   b: {
        //     nested: "foo",
        //   },
        // },
        times,
      };
      for (let i = 1; i < 30; i++) {
        await setDoc(doc(db, "dates", `${i} July`), docData);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setCurrent(users.filter((elem) => elem.email === user.email));
    // eslint-disable-next-line
  }, [users]);
  useEffect(() => {
    const getDia = async () => {
      setLoading(true);
      const month = date.toLocaleString("default", { month: "long" });

      const dateRef = doc(db, "dates", `${date.getDate()} ${month}`);

      const fechovich = await getDoc(dateRef);
      if (fechovich.exists()) {
        setShift(fechovich.data().times);
        setLoading(false);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getDia();
    // getShifts();
  }, [date]);

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
      <div>
        <Calendar
          defaultActiveStartDate={date}
          onChange={setDate}
          value={date}
        />
        <h3>Reserva tu turno</h3>

        <h4>Dia elegido : {format(date, `eeee d MMMM yyyy`)}</h4>
        {loading ? (
          <Spinner />
        ) : (
          <select name="dates" id="dates">
            {timeTable.map((elem) => {
              const rightNow = new Date();

              if (
                elem.split(":")[0] <= rightNow.getHours() &&
                elem.split(":")[0] <= rightNow.getMinutes()
              ) {
                return null;
              }
              return (
                <option key={nanoid()} value={elem}>
                  {elem} -
                  {shiftkeys.map((item) => {
                    const str = elem.split(":")[0] + elem.split(":")[1];
                    if (str === item) {
                      return ` ${shift[item].slots} disponibles de 7`;
                    }
                    return null;
                  })}
                </option>
              );
            })}
          </select>
        )}

        <button onClick={createDates}>Crear Fechas</button>
      </div>
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
