import React, { Fragment, useContext } from "react";
import { Dados } from "../context/context";
import { Dialog, Transition } from "@headlessui/react";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function Modal1(props) {
  const { dados } = useContext(Dados);
  const { setDados } = useContext(Dados);

  async function atualizaDados() {
    const docRef = doc(db, "tb01_candidato", dados.uid);
    const docSnap = await getDoc(docRef);

    setDados(docSnap.data());

    localStorage.setItem("user", JSON.stringify(docSnap.data()));
  }

  async function deletaCurri() {
    await updateDoc(doc(db, "tb01_candidato", dados.uid), {
      curriculo: "",
    });
    atualizaDados();
    props.setCont("Curriculo deletado");
    setTimeout(() => {
      props.setM(false);
    }, 2000);
  }

  async function deletaVaga() {
    if (props.apli) {
      await deleteDoc(doc(db, "tb07_vagasApli", props.nome));

      props.setCont("Vaga deletada");

      setTimeout(() => {
        props.setM(false);
      }, 2000);
    } else {
      await deleteDoc(doc(db, "tb04_vaga", props.nome));

      props.setCont("Vaga deletada");

      setTimeout(() => {
        props.setM(false);
        props.auta(true);
      }, 2000);
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
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {props.cont}
                      </Dialog.Title>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 justify-center sm:flex sm:flex-row-reverse sm:px-6">
                  {props.conf ? (
                    <div className="flex justify-center space-x-5 m-3">
                      <button
                        className="rounded p-2 border-2 font-semibold border-blue-950"
                        onClick={props.deletaCurri ? deletaCurri : deletaVaga}
                      >
                        {props.contDel}
                      </button>
                      <button
                        className="rounded p-2 bg-blue-950 text-white"
                        onClick={() => props.setM(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : props.btn ? (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 sm:ml-3 sm:w-auto"
                      onClick={() => props.setM(false)}
                    >
                      Ok
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
