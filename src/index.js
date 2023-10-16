//to create: npx create-react-app tccfj
//to run: npm start
import React from "react";
import ReactDOM from "react-dom/client";
import "./css/global.css";
import "./css/seleccad.css";
import "./css/cardvaga.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DadosProvider from "./context/context";

import Login from "./pages/Login";
import SelecCad from "./pages/SelecCad";
import CadCandi from "./pages/candidato/CadCandi";
import CadImpre from "./pages/empresa/CadImpre";
import CadProfe from "./pages/professor/CadProfe";
import MonteCurriculo from "./pages/candidato/MonteCurriculo";

import VagasApli from "./pages/candidato/VagasApli";
import Home from "./pages/candidato/home";
import PerfilCandidato from "./pages/candidato/PerfilCandidato";

import PerfilEmpre from "./pages/empresa/PerfilEmpre";
import CandidatosEmpre from "./pages/empresa/CandidatosEmpre";
import CadVagas from "./pages/empresa/CadVagas";
import SuasV from "./pages/empresa/SuasV";
import PerfilCandiShowE from "./pages/PerfilCandiShowE";

import PerfilProfessor from "./pages/professor/PerfilProfessor";
import SelecaoCandidato from "./pages/professor/SelecaoCandidato";
import PerfilCandiShowP from "./pages/PerfilCandiShowP";

import App from "./App";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "selecao-usu",
    element: <SelecCad />,
  },
  {
    path: "/cadastro-candidato",
    element: <CadCandi />,
  },
  {
    path: "/cadastro-empresa",
    element: <CadImpre />,
  },
  {
    path: "/cadastro-professor",
    element: <CadProfe />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/perfil-empresa",
    element: <PerfilEmpre />,
  },
  {
    path: "/perfil-candidato",
    element: <PerfilCandidato />,
  },
  {
    path: "/candidatos-empresa",
    element: <CandidatosEmpre />,
  },
  {
    path: "/candastro-vagas",
    element: <CadVagas />,
  },
  {
    path: "/suas-vagas",
    element: <SuasV />,
  },
  {
    path: "/perfil-candidato-mostrar-empresa",
    element: <PerfilCandiShowE />,
  },
  {
    path: "/vagas-aplicadas",
    element: <VagasApli />,
  },
  {
    path: "/perfil-professor",
    element: <PerfilProfessor />,
  },
  {
    path: "/selecao-candidato",
    element: <SelecaoCandidato />,
  },
  {
    path: "/perfil-candidato-mostrar-professor",
    element: <PerfilCandiShowP />,
  },
  {
    path: "/montar-currículo",
    element: <MonteCurriculo />,
  },
  {
    path: "/",
    element: <App />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <DadosProvider>
    <RouterProvider router={router} />
  </DadosProvider>
);
