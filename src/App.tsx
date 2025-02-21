import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import DashboardLayout from "./components/layout/DashboardLayout";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="project/:id" element={<Project />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
