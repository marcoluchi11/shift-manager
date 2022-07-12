import { nanoid } from "nanoid";
import { timeTable } from "../helpers";

const SelectShift = ({ shiftkeys, shift, setShiftTime }) => {
  return (
    <select
      name="dates"
      id="dates"
      onChange={(e) => setShiftTime(e.target.value)}
    >
      {timeTable.map((elem) => {
        const rightNow = new Date();

        if (
          elem.split(":")[0] <= rightNow.getHours() &&
          elem.split(":")[0] <= rightNow.getMinutes()
        ) {
          return null;
        }
        return (
          <option key={nanoid()} value={elem}>
            {elem} -
            {shiftkeys.map((item) => {
              const str = elem.split(":")[0] + elem.split(":")[1];
              if (str === item) {
                return ` ${shift[item].slots} disponibles de 7`;
              }
              return null;
            })}
          </option>
        );
      })}
    </select>
  );
};

export default SelectShift;
