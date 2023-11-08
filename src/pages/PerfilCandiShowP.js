import React, { useContext, useEffect, useState } from "react";
import { FaUserCircle, FaTrash } from "react-icons/fa";
import { Input2 } from "../components/input";
import { Dados } from "../context/context";
import AdComentario from "../components/adComentario";
import InputMask from "react-input-mask";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarP from "../components/navbarP";
import {
  collection,
  doc,
  getDoc,
  query,
  onSnapshot,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

export default function PerfilCandiShowP() {
  const [modal, setModal] = useState(false);
  const [coment, setComent] = useState([]);

  const { dadosCandi, setDadosCandi } = useContext(Dados);

  const location = useLocation();

  useEffect(() => {
    const { uidC, uidP } = location.state;
    getComents(uidC, uidP);
    getC(uidC);
  }, []);

  async function getComents(uidC, uidP) {
    try {
      const cole = query(
        collection(db, "tb01_candidato/" + uidC + "/comentario"),
        where("uidP", "==", uidP)
      );

      const unsub = onSnapshot(cole, (collection) => {
        let snapshotUsers = [];
        collection?.docs.forEach((doc) => {
          snapshotUsers.push({ ...doc.data(), id: doc.id });
        });
        setComent(snapshotUsers);
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function getC(uidC) {
    try {
      const docRef = doc(db, "tb01_candidato", uidC);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDadosCandi(docSnap.data());

        return docSnap.data();
      } else {
        alert("Não pode acessar essa página no momento");
        navigate("/");
      }
    } catch (e) {
      alert("Não pode acessar essa página no momento");
      navigate("/");
    }
  }

  const navigate = useNavigate();

  function calcDate(data) {
    var dob = new Date(data);
    var month_diff = Date.now() - dob.getTime();
    var age_d = new Date(month_diff);
    var year = age_d.getUTCFullYear();
    var age = Math.abs(year - 1970);
    return age;
  }

  async function delComent(id, uidC) {
    try {
      await deleteDoc(doc(db, "tb01_candidato/" + uidC + "/comentario", id));
    } catch (e) {
      console.log(e);
    }
  }
  let i = 0;
  return (
    <div>
      <NavbarP svaga={true} />
      <AdComentario open={modal} setM={setModal} />
      <div className="flex min-h-full flex-1 flex-col items-center lg:px-8 mt-12">
        <div className="flex flex-col overflow-hidden mb-2">
          {dadosCandi.perfilimg ? (
            <img
              className="h-60 w-60 rounded-full my-4"
              src={dadosCandi.perfilimg}
              alt=""
            />
          ) : (
            <FaUserCircle style={{ width: "15rem", height: "15rem" }} />
          )}

          <div className="flex flex-col justify-center">
            <button
              onClick={() => setModal(true)}
              className="rounded-xl px-3 py-3 font-semibold text-lg text-purple border border-blue-900 shadow-md mb-4"
            >
              Adicionar Comentário
            </button>
          </div>
        </div>
        <div className="flex flex-wrap p-5 justify-center space-y-4">
          <div className="p-5 comentario h-80 ">
            {coment.length >= 1 ? (
              coment.map((v) => (
                <div
                  key={i++}
                  className="mb-4 p-3 border border-blue-950 rounded-xl shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    {v.img ? (
                      <img
                        className="h-20 w-20 rounded-full mr-2"
                        src={v.img}
                        alt=""
                      />
                    ) : (
                      <FaUserCircle style={{ width: "5rem", height: "5rem" }} />
                    )}
                    <h1>Professor: {v.nomeP}</h1>
                    <FaTrash
                      style={{
                        width: "2rem",
                        height: "2rem",
                        cursor: "pointer",
                      }}
                      color="red"
                      onClick={() => delComent(v.id, v.uid)}
                    />
                  </div>
                  <h3 className="my-2">Comentário: {v.coment}</h3>
                  <h3>Habilidades: {v.habili.map((a) => a + "; ")}</h3>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
          <div className="bg-gray-200 rounded-xl flex flex-col shadow-xl h-40">
            <div className=" p-2 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <Input2
                disa={true}
                nomeLabel="Nome"
                tipo="text"
                get={dadosCandi.nomeC}
              />

              <Input2
                disa={true}
                nomeLabel="Email"
                tipo="email"
                get={dadosCandi.emailC}
              />

              <div className="sm:col-span-2">
                <label className="block text-md font-bold leading-6 text-black-900">
                  Telefone
                </label>
                <div className="mt-2">
                  <InputMask
                    disabled={true}
                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={dadosCandi.telC}
                    mask="(99) 99999-9999"
                    placeholder="(__) _____-____"
                    maskChar={null}
                  />
                </div>
              </div>
              <Input2
                disa={true}
                nomeLabel="Idade"
                tipo="text"
                get={calcDate(dadosCandi.dataC)}
              />
              <Input2
                disa={true}
                nomeLabel="Escola"
                tipo="text"
                get={dadosCandi.escola}
              />

              {dadosCandi.gitlink ? (
                <div className="sm:col-span-2">
                  <label className="block text-md font-bold leading-6 text-black-900">
                    Link GitHub
                  </label>
                  <div className="mt-2">
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href={dadosCandi.gitlink}
                      className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      {dadosCandi.gitlink}
                    </a>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
