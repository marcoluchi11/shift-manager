import styled from "styled-components";
import Authentication from "./components/Auth/Authentication";
import Footer from "./components/Footer";
import Header from "./components/Header";
const Container = styled.div`
  main {
    display: flex;
    flex-direction: column;
  }
`;
function App() {
  return (
    <Container>
      <main>
        <Header />
        <Authentication />
      </main>
      <Footer />
    </Container>
  );
}

export default App;
