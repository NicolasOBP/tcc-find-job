import React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import Modal1 from "./modals";
import { useNavigate } from "react-router-dom";
import { Dados } from "../context/context";
import { useContext } from "react";

export default function SuasVag() {
  const [modal, setModal] = useState(false);
  const [conteModal, setContModal] = useState("");

  const { setDadosCandi } = useContext(Dados);
  const { setModifica } = useContext(Dados);

  const [atualiza, setAtualiza] = useState(false);

  const [dadosV, setDadosV] = useState([]);

  const [nomeV, setNomeV] = useState("");

  const navigate = useNavigate();

  let snapshotUsers = [];

  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));

    getVaga(userLocalStorage);
  }, [atualiza]);

  async function getVaga(dados) {
    setAtualiza(false);
    try {
      const q = query(
        collection(db, "tb04_vaga"),
        where("cnpj", "==", dados.cnpj)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        snapshotUsers.push({ ...doc.data(), id: doc.id });
      });

      setDadosV(snapshotUsers);

      console.log(snapshotUsers);
      console.log(dadosV);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  function deletaVaga(v) {
    setNomeV(v.id);

    setContModal("Deseja deletar essa vaga?");
    setModal(true);
  }
  function alteraVaga(v) {
    setDadosCandi(v);
    setModifica(true);

    navigate("/candastro-vagas");
  }

  let i = 0;
  return (
    <table>
      <Modal1
        setCont={setContModal}
        open={modal}
        setM={setModal}
        cont={conteModal}
        conf={true}
        contDel={"Deletar Vaga"}
        nome={nomeV}
        auta={setAtualiza}
      />
      <tr className="text-xl">
        <th className="border-4 border-black">Vaga</th>
        <th className="border-4 border-black">Área da vaga</th>
        <th className="border-4 border-black">Excluir / Editar</th>
      </tr>
      {dadosV.length >= 1 ? (
        dadosV.map((v) => (
          <tr key={i++} className="border-4 border-gray-500">
            <td className="border-4 border-gray-500 text-center text-lg">
              {v.tituloV}
            </td>
            <td className="border-4 border-gray-500 text-center text-lg">
              {v.areaV}
            </td>
            <td className="p-2 flex justify-evenly">
              <FaTrash
                onClick={() => deletaVaga(v)}
                style={{ cursor: "pointer" }}
                className=" text-red-600 w-8 h-8"
              />
              <FaPencilAlt
                onClick={() => alteraVaga(v)}
                style={{ cursor: "pointer" }}
                className=" w-8 h-8"
              />
            </td>
          </tr>
        ))
      ) : (
        <div>
          <h3>Você não possui nenhuma vaga</h3>
        </div>
      )}
    </table>
  );
}
