import styled from "styled-components";
import Authentication from "./components/Auth/Authentication";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginAdmin from "./components/Admin/LoginAdmin";
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
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/admin" element={<LoginAdmin />} />
        </Routes>
      </main>
      <Footer />
    </Container>
  );
}

export default App;
