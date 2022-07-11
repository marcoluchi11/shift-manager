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
    mail: "asd@gmail.com",
  },
  700: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  730: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  800: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  830: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  900: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  930: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  1000: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  1030: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  1100: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  1130: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  1200: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  1230: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  1300: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  1330: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  1400: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  1430: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  1500: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  1530: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  1600: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  1630: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  1700: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  1730: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  1800: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  1830: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  1900: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  1930: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  2000: {
    slots: 5,
    mail: "asd@gmail.com",
  },
  2030: {
    slots: 5,
    mail: "asd@gmail.com",
  },
};
