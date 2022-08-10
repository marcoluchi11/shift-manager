import { nanoid } from "nanoid";
import { setColon, translateMonth } from "../helpers";

const ReservesByUser = ({ reservesList }) => {
  return reservesList.map((elem) => {
    const mes = elem.day.split(" ");
    const today = new Date();
    if (today.getDate() > mes[0]) return null;
    //RESOLVER PROBLEMA CON EL MES
    return (
      <p key={nanoid()}>
        {mes[0]} de {translateMonth(mes[1])} a las {setColon(elem.time)}hs.
      </p>
    );
  });
};

export default ReservesByUser;
