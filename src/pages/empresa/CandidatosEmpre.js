import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardCandEmpre from "../../components/cardCandEmpre";
import NavbarE from "../../components/navbarE";

export default function CandidatosEmpre() {
  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));

    try {
      if (userLocalStorage.tipo == "E") {
      } else {
        alert("Não pode acessar essa página");
        navigate("/central");
      }
    } catch (e) {
      alert("Não pode acessar essa página");
      navigate("/central");
    }
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <NavbarE />
      <div className="flex flex-row px-6 lg:px-8">
        <CardCandEmpre />
      </div>
    </div>
  );
}
