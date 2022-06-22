import styled from "styled-components";

const Container = styled.div`
  margin: 1rem 0;
  padding: 0 1rem;
  border: 1px solid red;
  background-color: #e95c5c;
  border-radius: 5px;
  color: #fff;
  text-align: center;
`;
const Error = ({ message }) => {
  return (
    <Container>
      <p>{message}</p>
    </Container>
  );
};

export default Error;
