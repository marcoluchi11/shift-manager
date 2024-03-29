import { useContext, useEffect, useState } from "react";
import { ShiftContext } from "./../../context/ShiftContext";
import Spinner from "./../../components/Spinner";
import "react-calendar/dist/Calendar.css";
import { db } from "./../../firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import InfoUser from "./InfoUser";
import ReservesShift from "./ReservesShift";

const Sections = ({ getUsers, getReserves }) => {
  const [shift, setShift] = useState([]);
  const { users, user, setLoading, setError, success, setSuccess, loading } =
    useContext(ShiftContext);
  const [current, setCurrent] = useState([]);
  const [date, setDate] = useState(new Date());
  const [shiftkeys, setShiftKeys] = useState({});
  const [shiftTime, setShiftTime] = useState("");
  const saveShift = async (email) => {
    //CADA VEZ QUE RESERVO, SE ACTUALIZA TODO EN LOS ESTADOS. CLASES, NUEVO TURNO EN LA LISTA, EN EL SELECT SE RESTA CORRECTAMENTE.
    const hora = shiftTime.split(":")[0] + shiftTime.split(":")[1];
    if (shiftTime === "") {
      setError({ state: true, message: "Elegi un horario" });
      return;
    }
    if (current[0].clases <= 0) {
      setError({
        state: true,
        message: "Error - No tienes clases disponibles",
      });
      return;
    }
    if (!shift[hora].slots) {
      setError({
        state: true,
        message: " Error - No hay lugar en ese horario",
      });
      return;
    }
    if (Array.isArray(shift[hora].mail)) {
      const probation = shift[hora].mail.filter((elem) => elem === user.email);
      if (probation.length) {
        setError({
          state: true,
          message: "Error - Ya reservaste en ese horario",
        });
        return;
      }
    }

    try {
      setLoading(true);
      setError({ state: false, message: "" });
      const month = date.toLocaleString("default", { month: "long" });
      const dateRef = doc(db, "dates", `${date.getDate()} ${month}`);
      const clientRef = doc(db, "clients", `${user.email}`);
      //SI ES EL MISMO MAIL, LO PISA. SLOTS SE RESTA CORRECTAMENTE.
      const newFields = {
        [`times.${hora}.mail`]: arrayUnion(email),
        [`times.${hora}.slots`]: increment(-1),
      };

      const newFieldsClient = {
        clases: increment(-1),
      };
      await updateDoc(clientRef, newFieldsClient);
      await updateDoc(dateRef, newFields);
      setLoading(false);
      setSuccess(true);

      getDia();
      setTimeout(() => {
        setSuccess(false);
      }, 4500);
      updateData();
    } catch (err) {
      console.log("error bicho");
    }
  };

  useEffect(() => {
    setCurrent(users.filter((elem) => elem.email === user.email));
    // eslint-disable-next-line
  }, [users, user]);

  const getDia = async () => {
    const month = date.toLocaleString("default", { month: "long" });
    const dateRef = doc(db, "dates", `${date.getDate()} ${month}`);
    const fechovich = await getDoc(dateRef);
    if (fechovich.exists()) {
      setShift(fechovich.data().times);
    } else {
      console.log("Error bicho");
    }
  };
  useEffect(() => {
    getDia();
    // eslint-disable-next-line
  }, [date]);
  const updateData = () => {
    getDia();
    getUsers();
    getReserves();
  };
  useEffect(() => {
    setShiftKeys(Object.keys(shift));
  }, [shift]);

  return current.length ? (
    <div>
      <InfoUser current={current} updateData={updateData} />
      <ReservesShift
        date={date}
        setDate={setDate}
        shift={shift}
        saveShift={saveShift}
        shiftkeys={shiftkeys}
        setShiftTime={setShiftTime}
        user={user}
      />

      <hr />
      {loading && <Spinner />}
      {success && <p className="exito"> Turno reservado correctamente</p>}
    </div>
  ) : (
    <Spinner />
  );
};

export default Sections;
