import styled from "styled-components";
import { formatearDinero } from "../helpers";
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
  return (
    <div>
      <div>
        <h2>Mis reservas</h2>
        <p>Jueves 30 de Junio, 9:30am</p>
        <p>Viernes 31 de Junio, 9:30am</p>
      </div>
      <hr />

      <div>
        <Pack>Mi pack</Pack>
        <h3>4 veces por semana</h3>
        <p>Clases restantes: 4/16</p>
        <hr />
      </div>

      <Owing>
        <h2>Mi saldo a pagar</h2>
        <h3>{formatearDinero(2000)}</h3>
      </Owing>
      <hr />
    </div>
  );
};

export default Sections;
