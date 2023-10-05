import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { BsSearch } from "react-icons/bs";
import { Dados } from "../context/context";
import { Link } from "react-router-dom";
import Nvaga from "./nenhumavga";

export default function CardCandEmpre() {
  const [dadosV, setDadosV] = useState([]);

  const { setFilter } = useContext(Dados);

  const { selecFilter } = useContext(Dados);

  let snapshotUsers = [];

  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));

    selecFilter == ""
      ? getCandiSF(userLocalStorage)
      : getCandiCF(userLocalStorage);
  }, [selecFilter]);

  function removerRepeticoes(array) {
    return Array.from(new Set(array));
  }
  async function getCandiSF(dados) {
    console.log("passou lá");
    try {
      const q = query(
        collection(db, "tb07_vagasApli"),
        where("cnpj", "==", dados.cnpj)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => snapshotUsers.push(doc.data()));

      setDadosV(snapshotUsers);

      setFilter(() => {
        const semrepetir = Object.values(snapshotUsers).map((v) => v.areaCandi);
        return removerRepeticoes(semrepetir.flat());
      });

      console.log(snapshotUsers);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function getCandiCF(dados) {
    console.log("passou aqui");
    const q = query(
      collection(db, "tb07_vagasApli"),
      where("cnpj", "==", dados.cnpj),
      where("areaCandi", "array-contains-any", selecFilter)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => snapshotUsers.push(doc.data()));
    console.log(snapshotUsers);
    setDadosV(snapshotUsers);

    console.log("passou aqui dnv");
  }

  function calcDate(data) {
    var dob = new Date(data);
    var month_diff = Date.now() - dob.getTime();
    var age_d = new Date(month_diff);
    var year = age_d.getUTCFullYear();
    var age = Math.abs(year - 1970);
    return age;
  }

  let i = -1;
  return (
    <div className="flex flex-wrap ">
      {dadosV.length >= 1 ? (
        dadosV.map((v) => (
          <div
            key={i++}
            className="flex flex-col p-5 shadow-xl rounded-xl m-5 w-60 border-2 border-gray-300"
          >
            <BsSearch style={{ width: "7rem", height: "7rem" }} />

            <div className="flex-1 ">
              <h2 className="text-sm font-bold leading-9 text-black-900">
                Nome: {v.nomeCand.split(" ").slice(0, 2).join(" ")}
              </h2>

              <h3 className="text-sm font-bold leading-9 text-black-900">
                Idade: {calcDate(v.dataNasc)}
              </h3>

              <h3 className="text-sm font-bold leading-9 text-black-900">
                Vaga: {v.tituloV}
              </h3>
            </div>

            <div className="flex align-self-end justify-center items-end ">
              <Link
                to={"/perfil-candidato-mostrar-empresa"}
                state={{ uidC: v.uidCand }}
                className="p-3 bg-blue-900 font-bold border rounded-md text-white"
              >
                Ver candidato
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="flex w-screen justify-center">
          <Nvaga
            title={"Não há nenhum candidato que enviou o currículo para vaga"}
          />
        </div>
      )}
    </div>
  );
}
