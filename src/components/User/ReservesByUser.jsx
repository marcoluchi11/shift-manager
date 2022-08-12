import { nanoid } from "nanoid";
import styled from "styled-components";
import { setColon, translateMonth } from "../helpers";
import CancelReserve from "./CancelReserve";
const Container = styled.div`
  display: flex;
`;
const ReservesByUser = ({ reservesList, updateData }) => {
  return reservesList.map((elem) => {
    const mes = elem.day.split(" ");
    const today = new Date();
    if (today.getDate() > mes[0]) return null;
    //RESOLVER PROBLEMA CON EL MES
    return (
      <Container key={nanoid()}>
        <p>
          {mes[0]} de {translateMonth(mes[1])} a las {setColon(elem.time)}hs.
        </p>
        <CancelReserve
          reservesList={reservesList}
          target={elem}
          updateData={updateData}
        />
      </Container>
    );
  });
};

export default ReservesByUser;
