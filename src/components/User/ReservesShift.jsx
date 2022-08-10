import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { useContext } from "react";
import Spinner from "./../Spinner";
import { ShiftContext } from "../../context/ShiftContext";
import Error from "../Error";
import SelectShift from "./SelectShift";
import { useEffect, useState } from "react";
import styled from "styled-components";
const Container = styled.div`
  h3 {
    margin: 0.5rem 0;
    padding: 0;
  }
`;
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
  const [loadingShift, setLoadingShift] = useState(false);
  useEffect(() => {
    setLoadingShift(true);
    setTimeout(() => {
      setLoadingShift(false);
    }, 1000);
  }, [date]);
  return (
    <Container>
      <Calendar
        defaultActiveStartDate={date}
        onChange={setDate}
        value={date}
        minDate={new Date()}
      />
      <h3>Reserva tu turno</h3>
      <h4>Dia elegido : {format(date, `eeee d MMMM yyyy`)}</h4>
      {error.state && <Error message={error.message} />}

      {loadingShift ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <SelectShift
          setShiftTime={setShiftTime}
          shiftkeys={shiftkeys}
          shift={shift}
        />
      )}

      {/* <button onClick={createDates}>crear Turno</button> */}
      <button className="back" onClick={() => saveShift(user.email)}>
        Reservar Turno
      </button>
    </Container>
  );
};

export default ReservesShift;
