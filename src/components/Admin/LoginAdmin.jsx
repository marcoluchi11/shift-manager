import styled from "styled-components";

const Formulary = styled.form`
  display: flex;
  justify-content: center;
  align-self: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.13);
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 30px rgba(8, 7, 16, 0.6);
  padding: 5rem;
  div {
    margin: 0.5rem;
    display: flex;
    flex-direction: column;
  }
  .email {
    margin-top: 1rem;
  }
  .pass {
    margin-top: 1rem;
  }
  input[type="password"],
  input[type="email"] {
    height: 1.5rem;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    margin-top: 0.5rem;
    padding: 0 0.5rem;

    outline: 0;
  }
  input::placeholder {
    font-weight: 100;
  }
  input[type="submit"] {
    margin-top: 1rem;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
  }
`;
const LoginAdmin = () => {
  return (
    <Formulary>
      <div>
        <label className="email" htmlFor="username">
          Nombre de Usuario
        </label>
        <input
          autoComplete="off"
          id="username"
          type="email"
          placeholder="Escribe tu email..."
        />
      </div>
      <div>
        <label className="pass" htmlFor="pass">
          Password
        </label>
        <input
          autoComplete="off"
          id="pass"
          type="password"
          placeholder="Escribe tu contrasenia..."
        />
      </div>
      <input type="submit" value="Ingresar" />
    </Formulary>
  );
};

export default LoginAdmin;
