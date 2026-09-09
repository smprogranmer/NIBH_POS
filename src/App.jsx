import { Routes, Route, BrowserRouter } from "react-router";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./components/AdminLayout";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<AdminLayout />} >
            <Route index element={<Dashboard />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/customers" element={<Customers />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
