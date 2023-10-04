import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import NavbarC from "../../components/navbar";
import { FaTrash } from "react-icons/fa";
import Modal1 from "../../components/modals";
import Nvaga from "../../components/nenhumavga";

export default function VagasApli() {
  const [modal, setModal] = useState(false);
  const [conteModal, setContModal] = useState("");

  const [id, setIdV] = useState("");

  const [dadosV, setDadosV] = useState([]);

  let snapshotUsers = [];

  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    console.log(userLocalStorage);

    try {
      if (userLocalStorage.tipo === "C") {
        getVaga(userLocalStorage);
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

  async function getVaga(dados) {
    try {
      const q = query(
        collection(db, "tb07_vagasApli"),
        where("uidCand", "==", dados.uid)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) =>
        snapshotUsers.push({ ...doc.data(), id: doc.id })
      );

      setDadosV(snapshotUsers);

      console.log(snapshotUsers);
      console.log(dadosV);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function deletaVagaApli(v) {
    setIdV(v.id);

    setContModal("Deseja deletar essa Vaga Aplicada?");
    setModal(true);
  }

  let i = -1;
  return (
    <div>
      <NavbarC perf={true} />
      <div className="flex justify-content-center justify-center px-6 py-14 lg:px-8">
        <Modal1
          setCont={setContModal}
          open={modal}
          setM={setModal}
          cont={conteModal}
          conf={true}
          contDel={"Deletar Vaga"}
          nome={id}
          apli={true}
        />
        {dadosV.length >= 1 ? (
          dadosV.map((v) => (
            <table className="border-2 border-black">
              <tr className="text-xl">
                <th className="rounded-full border-2 border-black">Vaga</th>
                <th className="border-2 border-black">Área da vaga</th>
                <th className="border-2 border-black">Excluir</th>
              </tr>

              <tr key={i++} className="border-2 rounded border-blue-950">
                <td className="border-2 rounded border-blue-950 text-center text-lg">
                  {v.tituloV}
                </td>
                <td className="border-2 rounded border-blue-950 text-center text-lg">
                  {v.areaV}
                </td>
                <td className="p-2 flex justify-evenly">
                  <FaTrash
                    onClick={() => deletaVagaApli(v)}
                    style={{ cursor: "pointer" }}
                    className=" text-red-600 w-8 h-8"
                  />
                </td>
              </tr>
            </table>
          ))
        ) : (
          <Nvaga title={"Não há nenhuma vaga aplicdada no momento"} />
        )}
      </div>
    </div>
  );
}
