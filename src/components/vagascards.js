import React, { useContext } from "react";
import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import Modal1 from "./modals";
import { Dados } from "../context/context";
import Nvaga from "./nenhumavga";

export default function Vagascards() {
  const [modal1, setModal1] = useState(false);
  const [cont, setContModal] = useState("");
  const [showbtn, setShowBtn] = useState(true);

  const [dadosV, setDadosV] = useState([]);

  const { dados } = useContext(Dados);

  const { setFilter } = useContext(Dados);

  const { selecFilter } = useContext(Dados);

  const cole = collection(db, "tb04_vaga");

  useEffect(() => {
    selecFilter == "" ? getVagasSF() : getVagasCF();
  }, [selecFilter]);

  function removerRepeticoes(array) {
    return Array.from(new Set(array));
  }

  function getVagasSF() {
    const unsub = onSnapshot(cole, (collection) => {
      let snapshotUsers = [];
      collection?.docs.forEach((doc) => {
        snapshotUsers.push({ ...doc.data(), id: doc.id });
      });
      setDadosV(snapshotUsers);

      console.log(snapshotUsers);

      setFilter(() => {
        const semrepetir = snapshotUsers.map((v) => v.areaV);
        return removerRepeticoes(semrepetir);
      });
    });
  }
  async function getVagasCF() {
    let snapshotUsers = [];
    const q = query(
      collection(db, "tb04_vaga"),
      where("areaV", "==", selecFilter)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      snapshotUsers.push({ ...doc.data(), id: doc.id });
    });
    setDadosV(snapshotUsers);
    console.log(snapshotUsers);
  }

  async function enviaCurri(cnpj, empresa, uidEmpre, tituloV, areaV, id) {
    console.log(id);
    const docReferencia = doc(db, "tb07_vagasApli", id + dados.uid);
    const docSnap = await getDoc(docReferencia);

    console.log(docSnap.exists());

    if (docSnap.exists()) {
      setContModal("Vaga já enviada");
      setShowBtn(true);
      setModal1(true);
    } else {
      setDoc(doc(db, "tb07_vagasApli", id + dados.uid), {
        curriculo: dados.curriculo,
        cpfCand: dados.cpfC,
        emailCand: dados.emailC,
        nomeCand: dados.nomeC,
        telCand: dados.telC,
        cnpj,
        empresa,
        dataNasc: dados.dataC,
        uidCand: dados.uid,
        uidEmpre,
        tituloV,
        areaV,
        areaCandi: dados.areaAtua,
      });

      setContModal(
        'Curriculo enviado. Caso clicou sem querer, vá até as "Vagas Aplciadas" e delete a vaga aplicada'
      );
      setShowBtn(true);
      setModal1(true);
    }
  }
  let i = 0;
  return (
    <>
      <Modal1 btn={showbtn} cont={cont} open={modal1} setM={setModal1} />
      <div className="flex flex-wrap h-70 justify-content-center justify-center">
        {dadosV.length >= 1 ? (
          dadosV.map((v) => (
            <div key={i++} className="p-2">
              <div className="p-5 flex shadow-xl rounded-xl w-full m-5 h-full max-w-xs max-h-xs grid w-80 border-2  shadow-xl border-gray-300">
                <img src={v.imageURl} className="w-auto h-auto rounded" />
                <div className="flex flex-col font-bold space-y-2">
                  <h1 className="text-center mb-4 font-bold">{v.tituloV}</h1>
                  <h2>Salário: R${v.sal},00</h2>
                  <h2>Empresa: {v.empresa}</h2>
                  <h2>Modelo de trabalho: {v.modeloV}</h2>
                  <h2>Localização: {v.localV}</h2>
                  <h2>Número de Vagas: {v.numeroV}</h2>
                  <h2>Requisitso para vaga: {v.reqV}</h2>
                  <h2>Descrição da vaga: {v.descV}</h2>
                </div>
                <div className="flex align-self-end justify-center items-end">
                  <button
                    onClick={() => {
                      enviaCurri(
                        v.cnpj,
                        v.empresa,
                        v.uidEmpre,
                        v.tituloV,
                        v.areaV,
                        v.id
                      );
                    }}
                    className="p-3 bg-blue-900 font-bold border rounded-md text-white"
                  >
                    Enviar currículo
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Nvaga title={"Não há nehuma vaga em aberto no momento"} />
        )}
      </div>
    </>
  );
}
