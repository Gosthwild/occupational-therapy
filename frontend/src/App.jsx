import { BrowserRouter, Routes, Route } from "react-router-dom";

// Asegúrate que estos componentes existan en src/pages y estén exportados correctamente
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import Customer from "./pages/Customer";
import Home from "./pages/Home";
import Formulario from "./pages/Formulario";
import Perfil from "./pages/Perfil";
import MisFormularios from "./pages/MisFormularios";
import Disclaimer from "./pages/Disclaimer";

// Componente para proteger rutas
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/home" element={<Home />} />

        {/* Rutas protegidas */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute>
              <Customer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/formulario"
          element={
            <ProtectedRoute>
              <Formulario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
        <Route
          path="/misformularios"
          element={
            <ProtectedRoute>
              <MisFormularios />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
