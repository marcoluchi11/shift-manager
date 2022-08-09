import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { ShiftContext } from "../../context/ShiftContext";
import { formatMoney, getReservas } from "../helpers";
import ReservesByUser from "./ReservesByUser";

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
const InfoUser = ({ current }) => {
  const { reserves, user } = useContext(ShiftContext);
  const [reservesList, setReservesList] = useState(null);
  useEffect(() => {
    const keys = Object.keys(reserves[0].times);
    setReservesList(getReservas(reserves, keys, user.email));
    //eslint-disable-next-line
  }, [reserves]);
  return (
    <>
      <div>
        <h2>Mis reservas</h2>
        {reservesList && <ReservesByUser reservesList={reservesList} />}
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
    </>
  );
};

export default InfoUser;
