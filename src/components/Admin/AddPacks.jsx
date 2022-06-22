import styled from "styled-components";

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-self: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.13);
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 30px rgba(8, 7, 16, 0.6);
  padding: 5rem;
`;
const AddPacks = () => {
  return (
    <Form>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>
      <div>
        <select name="packs" id="packs">
          <option value="--Seleccionar--"></option>
          <option value="2">2 veces por semana</option>
          <option value="3"> 3 veces por semana</option>
          <option value="4">4 veces por semana</option>
          <option value="5">5 veces por semana</option>
          <option value="6">6 veces por semana</option>
        </select>
      </div>
      <input type="submit" value="Agregra Pack" />
    </Form>
  );
};

export default AddPacks;
