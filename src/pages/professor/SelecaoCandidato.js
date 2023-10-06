import React, { useEffect } from "react";
import CardCandProfessor from "../../components/cardCandProfessor";
import { useNavigate } from "react-router-dom";
import NavbarP from "../../components/navbarP";

export default function SelecaoCandidato() {
  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    console.log(userLocalStorage);

    try {
      if (userLocalStorage.tipo == "P") {
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
      <NavbarP svaga={false} />
      <div className="flex flex-row px-6 lg:px-8">
        <CardCandProfessor />
      </div>
    </div>
  );
}
