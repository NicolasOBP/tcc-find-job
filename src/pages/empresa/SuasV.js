import React, { useEffect } from "react";
import SuasVag from "../../components/suasV";
import { useNavigate } from "react-router-dom";
import NavbarE from "../../components/navbarE";

export default function SuasV() {
  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    console.log(userLocalStorage);

    try {
      if (userLocalStorage.tipo === "E") {
      } else {
        alert("Não pode acessar essa página");
        navigate("/");
      }
    } catch (e) {
      alert("Não pode acessar essa página");
      navigate("/");
    }
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <NavbarE svaga={true} />
      <div className="flex min-h-full flex-1 flex-col px-6 py-14 lg:px-8 ">
        <SuasVag />
      </div>
    </div>
  );
}
