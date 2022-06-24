import styled from "styled-components";
import data from "./../../data.json";
const Container = styled.section`
  display: flex;
  justify-content: center;
  align-self: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.13);
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 30px rgba(8, 7, 16, 0.6);
  padding: 5rem;
  table {
    display: flex;
    td {
      h1 {
        text-align: center;
      }
    }
    tr,
    td {
      border: 1px solid #fff;
      padding: 0.5rem;
    }
  }
`;
const Reserves = () => {
  return (
    <Container>
      <table>
        <tr>
          <td colspan="4">
            <h1>Reservas del dia</h1>
          </td>

          <tr>
            <td>Name</td>

            <td>Surname</td>

            <td>Time</td>

            <td>Owe</td>
          </tr>
          {data.map((elem) => (
            <tr>
              <td>{elem.first_name}</td>
              <td>{elem.last_name}</td>
              <td>{elem.time}</td>
              <td>{elem.owe}</td>
            </tr>
          ))}
        </tr>
      </table>
    </Container>
  );
};

export default Reserves;
