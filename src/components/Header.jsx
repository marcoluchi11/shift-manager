import styled from "styled-components";

const Container = styled.header`
  text-align: center;
`;
const Header = () => {
  return (
    <Container>
      <h1>Gestion de Turnos</h1>
    </Container>
  );
};

export default Header;
