import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { useContext } from "react";

import { ShiftContext } from "../../context/ShiftContext";
import Error from "../Error";
import SelectShift from "./SelectShift";

const ReservesShift = ({
  createDates,
  date,
  setDate,
  saveShift,
  shift,
  setShiftTime,
  shiftkeys,
  user,
}) => {
  const { error } = useContext(ShiftContext);

  return (
    <div>
      <Calendar
        defaultActiveStartDate={date}
        onChange={setDate}
        value={date}
        minDate={new Date()}
      />
      <h3>Reserva tu turno</h3>

      <h4>Dia elegido : {format(date, `eeee d MMMM yyyy`)}</h4>
      {error.state && <Error message={error.message} />}

      <SelectShift
        setShiftTime={setShiftTime}
        shiftkeys={shiftkeys}
        shift={shift}
      />

      <button onClick={createDates}>crear Turno</button>
      <button onClick={() => saveShift(user.email)}>Reservar Turno</button>
    </div>
  );
};

export default ReservesShift;
