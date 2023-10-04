import React, { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Dados } from "../context/context";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { updateEmail } from "firebase/auth";

export default function AtualizaDados(props) {
  const [btn, setBtn] = useState(true);

  const { dados } = useContext(Dados);
  const { setDados } = useContext(Dados);

  async function atualizaDados() {
    let docRef = null;
    if (props.candi) docRef = doc(db, "tb01_candidato", dados.uid);
    if (props.prof) docRef = doc(db, "tb08_professor", dados.uid);
    if (props.empre) docRef = doc(db, "tb03_empresa", dados.uid);

    const docSnap = await getDoc(docRef);

    setDados(docSnap.data());

    localStorage.setItem("user", JSON.stringify(docSnap.data()));
  }

  async function salvaAutera() {
    if (props.candi) {
      if (props.tel < 15) {
        props.setC("Dados atualizados estão inválido");
        props.setM(false);
      } else {
        await updateEmail(auth.currentUser, props.email)
          .then(async () => {
            // Password reset email sent!
            await updateDoc(doc(db, "tb01_candidato", dados.uid), {
              escola: props.escola,
              telC: props.tel,
              emailC: props.email,
              gitlink: props.git
            });

            setBtn(false);
            props.setC(
              "Dados atualizado com sucesso. Caso você tenha mudado seu email, foi enviado para seu email antigo um aviso de alteração"
            );
            setTimeout(() => {
              props.setM(false);
              setBtn(true);
            }, 4000);

            atualizaDados();
          })
          .catch((err) => {
            props.setC(
              "Ops, algum erro ocorreu, bem provável que seja o fato de você ter feito o login a muito, por favo, deslogue e refaça o login"
            );
            // ..
          });
      }
    }

    if (props.prof) {
      if (props.tel < 15) {
        props.setC("Dados atualizados estão inválido");
        props.setM(false);
      } else {
        await updateEmail(auth.currentUser, props.email)
          .then(async () => {
            // Password reset email sent!
            await updateDoc(doc(db, "tb08_professor", dados.uid), {
              telP: props.tel,
              emailP: props.email,
            });

            setBtn(false);
            props.setC(
              "Dados atualizado com sucesso. Caso você tenha mudado seu email, foi enviado para seu email antigo um aviso de alteração"
            );
            setTimeout(() => {
              props.setM(false);
              setBtn(true);
            }, 4000);

            atualizaDados();
          })
          .catch((err) => {
            props.setC(
              "Ops, algum erro ocorreu, bem provável que seja o fato de você ter feito o login a muito, por favo, deslogue e refaça o login"
            );
            // ..
          });
      }
    }

    if (props.empre) {
      if (props.tel < 15) {
        props.setC("Dados atualizados estão inválido");
        props.setM(false);
      } else {
        await updateEmail(auth.currentUser, props.email)
          .then(async () => {
            // Password reset email sent!
            await updateDoc(doc(db, "tb03_empresa", dados.uid), {
              telE: props.tel,
              emailE: props.email,
              ende: props.ende,
              descE: props.desc,
            });
            setBtn(false);
            props.setC(
              "Dados atualizado com sucesso. Caso você tenha mudado seu email, foi enviado para seu email antigo um aviso de alteração"
            );
            setTimeout(() => {
              props.setM(false);
              setBtn(true);
            }, 4000);

            atualizaDados();
          })
          .catch((err) => {
            props.setC(
              "Ops, algum erro ocorreu, bem provável que seja o fato de você ter feito o login a muito, por favo, deslogue e refaça o login"
            );
            // ..
          });
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
                      {props.cont}
                    </div>
                  </div>
                </div>

                {btn ? (
                  <div className="flex justify-center space-x-5 m-3">
                    <button
                      className="rounded p-2 border-2 font-semibold border-blue-950"
                      onClick={salvaAutera}
                    >
                      Alterar
                    </button>
                    <button
                      className="rounded p-2 bg-blue-950 text-white"
                      onClick={() => props.setM(false)}
                    >
                      Voltar
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
