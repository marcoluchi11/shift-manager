import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { formatMoney } from "../helpers";
import { ShiftContext } from "./../../context/ShiftContext";
import Spinner from "./../../components/Spinner";
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
      <hr />
    </div>
  ) : (
    <Spinner />
  );
};

export default Sections;
