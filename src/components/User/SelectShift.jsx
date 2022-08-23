import { nanoid } from "nanoid";
import styled from "styled-components";
import { timeTable } from "../helpers";
const Selectovich = styled.select`
  width: 100%;
  padding: 0.5rem 0;
  font-size: 1rem;
  font-weight: 400;
  border-radius: 5px;
  outline: none;
`;
const SelectShift = ({ fecha, shiftkeys, shift, setShiftTime }) => {
  return (
    <Selectovich
      name="dates"
      id="dates"
      onChange={(e) => setShiftTime(e.target.value)}
    >
      {timeTable.map((elem) => {
        const rightNow = new Date();
        if (rightNow.getDate() === fecha.getDate()) {
          if (elem.split(":")[0] <= rightNow.getHours()) return null;
        }
        return (
          <option value={elem} key={nanoid()}>
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
    </Selectovich>
  );
};

export default SelectShift;
