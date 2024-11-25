import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Navbar } from "./components/Navbar";
import { Error } from "./pages/Errorpage";
import { AdminLayout } from "./layouts/Admin-Layout";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";
import { Footer } from "./components/Footer/Footer";
import { AdminUpdate } from "./pages/Admin-Update";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="*" element={<Error />} />
        <Route path="/admin" element={<AdminLayout/>} > 
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;