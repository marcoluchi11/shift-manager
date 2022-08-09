import { nanoid } from "nanoid";

const ReservesByUser = ({ reservesList }) => {
  return reservesList.map((elem) => (
    <p key={nanoid()}>
      {elem.day} at {elem.time}
    </p>
  ));
};

export default ReservesByUser;
