import React, { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Modal1 from "../components/modals";
import { Dados } from "../context/context";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Cadcurriculo(props) {
  const [modal1, setModal1] = useState(false);
  const [cont, setContModal] = useState("");
  const [showbtn, setShowBtn] = useState(true);

  const [arq, setArq] = useState("");

  const { dados, setDados } = useContext(Dados);

  async function atualizaDados() {
    const docRef = doc(db, "tb01_candidato", dados.uid);
    const docSnap = await getDoc(docRef);

    setDados(docSnap.data());

    localStorage.setItem("user", JSON.stringify(docSnap.data()));
  }

  function getFile(event) {
    setArq(event.target.files[0]);
  }

  async function cadCurri() {
    if (!arq) {
      setContModal("Escolha um arquivo");
      setShowBtn(true);
      setModal1(true);
    }

    const storageRef = ref(storage, `/files/${arq.name}`);
    setContModal("Carregando");
    setShowBtn(false);
    setModal1(true);
    const uploadTask = await uploadBytesResumable(storageRef, arq);
    let fileURL = await getDownloadURL(storageRef);

    return fileURL;
  }

  async function enviaF() {
    if (arq == "") {
      setContModal("Escolha um arquivo");
      setShowBtn(true);
      setModal1(true);
    } else {
      try {
        const fileURL = await cadCurri();
        updateDoc(doc(db, "tb01_candidato", dados.uid), {
          curriculo: fileURL,
        });
        setContModal("Curriculo cadastrado");
        setShowBtn(false);
        setModal1(true);

        atualizaDados();

        setTimeout(() => {
          setModal1(false);
          props.setM(false);
        }, 2000);
      } catch (e) {
        console.error("Error adding document: ", e);
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white space-x-4 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <Modal1
                  btn={showbtn}
                  cont={cont}
                  open={modal1}
                  setM={setModal1}
                />
                <label className="block text-lg p-2 font-bold leading-6 text-black-900">
                  Cadastrar Currículo
                </label>

                <div className="flex justify-center mb-4">
                  <input
                    accept="application/pdf"
                    className="block rounded-md border-0 py-1.5 px-1.5 text-black-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={getFile}
                    type="file"
                  />
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    type="button"
                    onClick={enviaF}
                    className="flex justify-center rounded-lg px-3 py-2 font-semibold text-lg text-white bg-blue-950 border-blue-900 shadow-md mb-4"
                  >
                    Enviar
                  </button>
                  <button
                    type="button"
                    onClick={() => props.setM(false)}
                    className="flex rounded-lg px-3 py-2 font-semibold text-lg text-purple border border-2 border-blue-950 shadow-md mb-4"
                  >
                    Voltar
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
