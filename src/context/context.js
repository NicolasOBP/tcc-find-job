import React, { useState, createContext } from "react";
import { useEffect } from "react";

export const Dados = createContext({});

export default function DadosProvider({ children }) {
  const [dados, setDados] = useState({});
  const [modifica, setModifica] = useState(false);
  const [dadosCandi, setDadosCandi] = useState({ a: "s" });
  const [filter, setFilter] = useState([]);
  const [selecFilter, setSelecFilter] = useState([]);
  const [filternome, setFilternome] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) setDados(user);
  }, []);

  return (
    <Dados.Provider
      value={{
        dados,
        setDados,
        dadosCandi,
        setDadosCandi,
        modifica,
        setModifica,
        filter,
        setFilter,
        selecFilter,
        setSelecFilter,
        filternome,
        setFilternome,
      }}
    >
      {children}
    </Dados.Provider>
  );
}
