import styled from "styled-components";
import Authentication from "./components/Auth/Authentication";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import WelcomeAdmin from "./components/Admin/WelcomeAdmin";
import CreateUser from "./components/Admin/CreateUser";
import AddPacks from "./components/Admin/AddPacks";
import Reserves from "./components/Admin/Reserves";
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
          <Route path="/admin" element={<WelcomeAdmin />} />
          <Route path="/admin/createuser" element={<CreateUser />} />
          <Route path="/admin/addpacks" element={<AddPacks />} />
          <Route path="/admin/reserves" element={<Reserves />} />
        </Routes>
      </main>
      <Footer />
    </Container>
  );
}

export default App;
