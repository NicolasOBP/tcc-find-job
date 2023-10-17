import React, { useEffect } from "react";
import NavbarC from "../../components/navbar";
import Vagascards from "../../components/vagascards";
import { useNavigate } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));

    try {
      if (userLocalStorage.tipo == "C") {
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
      <NavbarC />
      <Vagascards />
    </div>
  );
}
