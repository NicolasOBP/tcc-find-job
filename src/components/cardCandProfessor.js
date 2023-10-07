import React, { useEffect, useState, useContext } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  or,
  where,
  startAt,
  orderBy,
  endAt,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Dados } from "../context/context";
import Nvaga from "./nenhumavga";

export default function CardCandProfessor() {
  const [dadosC, setDadosC] = useState([]);

  const { setFilter, filternome, selecFilter, setSelecFilter } = useContext(Dados);

  useEffect(() => {
    selecFilter == "" && filternome == "" ? getCandiSF() : getCandiCF();
  }, [selecFilter, filternome]);

  function removerRepeticoes(array) {
    return Array.from(new Set(array));
  }

  function getCandiSF() {
    const cole = collection(db, "tb01_candidato");

    const unsub = onSnapshot(cole, (collection) => {
      let snapshotUsers = [];
      collection?.docs.forEach((d) => snapshotUsers.push(d.data()));
      setDadosC(snapshotUsers);

      setFilter(() => {
        const semrepetir = snapshotUsers.map((v) => v.escola);
        return removerRepeticoes(semrepetir);
      });
    });
  }
  async function getCandiCF() {
    let snapshotUsers = [];

    let q = "";

    if (selecFilter != "") {
      q = query(
        collection(db, "tb01_candidato"),
        orderBy("nomeC"),
        startAt(filternome),
        endAt(filternome + "\uf8ff"),
        where("escola", "==", selecFilter)
      );
    } else {
      q = query(
        collection(db, "tb01_candidato"),
        orderBy("nomeC"),
        startAt(filternome),
        endAt(filternome + "\uf8ff")
      );
    }

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => snapshotUsers.push(doc.data()));
    setDadosC(snapshotUsers);
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
    <div className="flex flex-wrap">
      {dadosC.length >= 1 ? (
        dadosC.map((v) => (
          <div
            key={i++}
            className="flex flex-col items-center p-5 shadow-xl rounded-xl m-5 w-60 border-2 border-gray-300"
          >
            {v.perfilimg ? (
              <img
                className="h-40 w-40 rounded-full my-4"
                src={v.perfilimg}
                alt=""
              />
            ) : (
              <IoPersonCircleSharp
                className="rounded-full"
                style={{ width: "13rem", height: "13rem" }}
              />
            )}

            <div className="flex-1 ">
              <h2 className="text-sm font-bold leading-9 text-black-900">
                Nome: {v.nomeC.split(" ").slice(0, 2).join(" ")}
              </h2>

              <h3 className="text-sm font-bold leading-9 text-black-900">
                Idade: {calcDate(v.dataC)}
              </h3>

              <h3 className="text-sm font-bold leading-9 text-black-900">
                Escola: {v.escola}
              </h3>
            </div>

            <div className="flex align-self-end justify-center items-end">
              <Link
                to={"/perfil-candidato-mostrar-professor"}
                state={{ uidC: v.uid }}
                className="p-3 bg-blue-900 font-bold border rounded-md text-white"
              >
                Ver candidato
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="flex w-screen justify-center">
          <Nvaga title={"Não há nenhum candidato na plataforma"} />
        </div>
      )}
    </div>
  );
}
