import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { formatMoney, timeTable } from "../helpers";
import { ShiftContext } from "./../../context/ShiftContext";
import Spinner from "./../../components/Spinner";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { nanoid } from "nanoid";
import { format } from "date-fns";

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
  const { users, user } = useContext(ShiftContext);
  const [current, setCurrent] = useState([]);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    setCurrent(users.filter((elem) => elem.email === user.email));
    // eslint-disable-next-line
  }, [users]);

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
          // onClickDay={(value, event) =>

          // }
        />
        <h3>Reserva tu turno</h3>
        {/*  //=> 'November' */}
        <h4>Dia elegido : {format(date, `eeee d MMMM yyyy`)}</h4>
        <select name="dates" id="dates">
          {timeTable.map((elem) => (
            <option key={nanoid()} value={elem}>
              {elem} - Disponible 5 de 7
            </option>
          ))}
        </select>
      </div>
      <hr />
    </div>
  ) : (
    <Spinner />
  );
};

export default Sections;
