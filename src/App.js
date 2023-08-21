import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import Anasayfa from "./pages/Anasayfa";
import YoklamaOlustur from "./pages/YoklamaOlustur";
import Liste from "./pages/OgrenciListesi";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="/anasayfa" element={<Anasayfa />} />
          <Route path="/yoklama-olustur" element={<YoklamaOlustur />} />
          <Route path="/ogrenci-listesi" element={<Liste />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
