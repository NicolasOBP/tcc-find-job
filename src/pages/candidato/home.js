import React, { useEffect } from "react";
import NavbarC from "../../components/navbar";
import Vagascards from "../../components/vagascards";
import { useNavigate } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    console.log(userLocalStorage);

    try {
      if (userLocalStorage.tipo == "C") {
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
      <NavbarC />
      <Vagascards />
    </div>
  );
}
