export function formatMoney(dinero) {
  return dinero.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
export function pricePerMonth(times) {
  switch (times) {
    case 2:
      return 4000;
    case 3:
      return 4500;
    case 4:
      return 5000;
    case 5:
      return 5200;
    case 6:
      return 5500;
    default:
      return;
  }
}

export const timeTable = [
  "6:30",
  "7:00",
  "7:30",
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];
export const timeSample = {
  630: {
    slots: 5,
    mail: [],
  },
  700: {
    slots: 5,
    mail: [],
  },
  730: {
    slots: 5,
    mail: [],
  },
  800: {
    slots: 5,
    mail: [],
  },
  830: {
    slots: 5,
    mail: [],
  },
  900: {
    slots: 5,
    mail: [],
  },
  930: {
    slots: 5,
    mail: [],
  },
  1000: {
    slots: 5,
    mail: [],
  },
  1030: {
    slots: 5,
    mail: [],
  },
  1100: {
    slots: 5,
    mail: [],
  },
  1130: {
    slots: 5,
    mail: [],
  },
  1200: {
    slots: 5,
    mail: [],
  },
  1230: {
    slots: 5,
    mail: [],
  },
  1300: {
    slots: 5,
    mail: [],
  },
  1330: {
    slots: 5,
    mail: [],
  },
  1400: {
    slots: 5,
    mail: [],
  },
  1430: {
    slots: 5,
    mail: [],
  },
  1500: {
    slots: 5,
    mail: [],
  },
  1530: {
    slots: 5,
    mail: [],
  },
  1600: {
    slots: 5,
    mail: [],
  },
  1630: {
    slots: 5,
    mail: [],
  },
  1700: {
    slots: 5,
    mail: [],
  },
  1730: {
    slots: 5,
    mail: [],
  },
  1800: {
    slots: 5,
    mail: [],
  },
  1830: {
    slots: 5,
    mail: [],
  },
  1900: {
    slots: 5,
    mail: [],
  },
  1930: {
    slots: 5,
    mail: [],
  },
  2000: {
    slots: 5,
    mail: [],
  },
  2030: {
    slots: 5,
    mail: [],
  },
};

export const getReservas = (reserva, keys, email) => {
  let reservation = [];
  reserva.forEach((elem) => {
    keys.forEach((llaves) => {
      if (elem.times[llaves].mail.length === 0) {
        return;
      } else {
        elem.times[llaves].mail.forEach((turno) => {
          if (turno !== email) return;
          const turnovich = { day: elem.day, time: llaves };
          reservation = [...reservation, turnovich];
        });
      }
    });
  });
  return reservation;
};

export const translateMonth = (month, day = false) => {
  switch (month) {
    case "January":
      return "Enero";
    case "February":
      return "Febrero";
    case "March":
      return "Marzo";
    case "April":
      return "Abril";
    case "May":
      return "Mayo";
    case "June":
      return "Junio";
    case "July":
      return "Julio";
    case "August":
      return "Agosto";
    case "September":
      return "Septiembre";
    case "October":
      return "Octubre";
    case "November":
      return "Noviembre";
    case "December":
      return "December";
    default:
  }
};
export const translateDay = (day) => {
  switch (day) {
    case "Monday":
      return "Lunes";
    case "Tuesday":
      return "Martes";
    case "Wednesday":
      return "Miercoles";
    case "Thursday":
      return "Jueves";
    case "Friday":
      return "Viernes";
    case "Saturday":
      return "Sabado";
    case "Sunday":
      return "Domingo";
    default:
      return;
  }
};
export const setColon = (time) => {
  if (time.length > 3) {
    const hora = time.split("");
    hora.splice(2, 0, ":");
    return hora.join().replaceAll(",", "");
  } else {
    const hora = time.split("");
    hora.splice(1, 0, ":");
    return hora.join().replaceAll(",", "");
  }
};
