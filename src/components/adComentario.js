import React, { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Dados } from "../context/context";
import Modal1 from "./modals";
import { DropBox } from "./dropdown";
import { FaUserCircle } from "react-icons/fa";
import { addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { Input3 } from "./input";

export default function AdComentario(props) {
  const [modal, setModal] = useState(false);
  const [conteModal, setContModal] = useState("");
  const [showBtn, setShowBtn] = useState(true);

  const [dadosDrop, setDadosDrop] = useState([]);
  const [habili, setHabili] = useState([]);

  const [coment, setComent] = useState("");

  const { dados } = useContext(Dados);
  const { dadosCandi } = useContext(Dados);

  useEffect(() => {
    getDadosC();
  }, []);

  async function getDadosC() {
    const docRef = doc(db, "tb09_habilidades", "habili");
    const docSnap = await getDoc(docRef);

    setDadosDrop(docSnap.data());
  }

  async function adComent() {
    if (habili.length == 0 || coment == "") {
      console.log(habili);
      setContModal("Informação faltando");
      setShowBtn(true);
      setModal(true);
    } else {
      try {
        if (dados.perfilimg) {
          await setDoc(
            doc(
              db,
              "tb01_candidato/" + dadosCandi.uid + "/comentario/",
              "coment" + Math.random()
            ),
            {
              uid: dadosCandi.uid,
              habili,
              coment,
              nomeP: dados.nomeP,
              img: dados.perfilimg,
            }
          );
        } else {
          await setDoc(
            doc(
              db,
              "tb01_candidato/" + dadosCandi.uid + "/comentario/",
              "coment" + Math.random()
            ),
            {
              uid: dadosCandi.uid,
              habili,
              coment,
              nomeP: dados.nomeP,
            }
          );
        }

        setContModal("Comentário adicionado");
        setShowBtn(true);
        setModal(true);

        setHabili("");
        setComent("");

        setTimeout(() => {
          setModal(false);
          props.setM(false);
        }, 1500);
      } catch (e) {
        setContModal("Erro");
        setShowBtn(true);
        setModal(true);
        console.log(e);
      }
    }
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.setM}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Modal1
                        open={modal}
                        setM={setModal}
                        cont={conteModal}
                        btn={showBtn}
                      />
                      <Dialog.Title
                        as="h3"
                        className="flex justify-center text-base font-semibold leading-6 text-gray-900"
                      >
                        <FaUserCircle
                          style={{ width: "5rem", height: "5rem" }}
                        />
                        {dados.nomeP}
                      </Dialog.Title>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col bg-gray-50 px-4 py-3 justify-center sm:flex sm:px-6">
                  <DropBox
                    dad={Object.values(dadosDrop)}
                    label="Habilidades pre-definidas"
                    get={habili}
                    set={setHabili}
                  />
                  <Input3
                    set={setComent}
                    get={coment}
                    nomeLabel="Comentário"
                    tipo="textarea"
                    placeh="Coloque algum comentário a respeito do seu Aluno"
                  />
                </div>
                <div className="flex justify-center space-x-5 m-3">
                  <button
                    className="rounded p-2 bg-blue-950 text-white"
                    onClick={() => props.setM(false)}
                  >
                    Voltar
                  </button>
                  <button
                    className="rounded p-2 border-2 font-semibold border-blue-950"
                    onClick={adComent}
                  >
                    Enviar Comentário
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
