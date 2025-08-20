import { BrowserRouter, Routes, Route } from "react-router-dom";

import Registro from "./pages/Registro";
import Login from "./pages/Login";
import Customer from "./pages/Customer";
import Home from "./pages/Home";
import Formulario from "./pages/Formulario";
import Perfil from "./pages/Perfil";
import Resultados from "./pages/Resultados";
import Disclaimer from "./pages/Disclaimer";




function App() {
  return (
    <BrowserRouter>
      <Routes>
    
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer" element={<Customer/>}/>
        <Route path="/formulario" element={<Formulario/>}/>
        <Route path="/perfil" element={<Perfil/>}/>
        <Route path="/resultados" element={<Resultados/>}/>
        <Route path="/disclaimer" element={<Disclaimer/>}/> 
        <Route path="/home" element={<Home/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
