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

  const { dados, setFilter, selecFilter } = useContext(Dados);

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
  }

  async function enviaCurri(cnpj, empresa, uidEmpre, tituloV, areaV, id) {
    if (dados.curriculo) {
      const docReferencia = doc(db, "tb07_vagasApli", id + dados.uid);
      const docSnap = await getDoc(docReferencia);

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
          'Curriculo enviado. Caso clicou sem querer, vá até as "Vagas Aplicadas" e delete a vaga aplicada'
        );
        setShowBtn(true);
        setModal1(true);
      }
    } else {
      setContModal("Cadastre um currículo primeiro");
      setShowBtn(true);
      setModal1(true);
    }
  }
  let i = 0;
  return (
    <>
      <Modal1 btn={showbtn} cont={cont} open={modal1} setM={setModal1} />
      <div className="flex flex-wrap h-70 justify-center">
        {dadosV.length >= 1 ? (
          dadosV.map((v) => (
            <div key={i++} className="p-2">
              <div className="p-5 flex shadow-xl rounded-xl m-4 h-full grid w-80 border-2 border-gray-300">
                <div>
                  <img
                    alt="a"
                    src={v.imageURl}
                    className="w-auto h-auto rounded"
                  />
                </div>
                <div className="space-y-2 texto">
                  <h1 className="text-center mb-4 font-bold texto">
                    {v.tituloV}
                  </h1>
                  <h2>
                    Salário: R$
                    {Intl.NumberFormat("pt-BR").format(v.sal)},00
                  </h2>
                  <h2>Empresa: {v.empresa}</h2>
                  <h2>Modelo de trabalho: {v.modeloV}</h2>
                  <h2>Localização: {v.localV}</h2>
                  <h2>Número de Vagas: {v.numeroV}</h2>
                  <h2>Requisitso para vaga: {v.reqV}</h2>
                  <h2>Descrição da vaga: {v.descV}</h2>
                  <h2>Benefícios da vaga: {v.benefV}</h2>
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
