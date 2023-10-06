import React, { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Input1, Input2, Input3 } from "../components/input";
import { Dados } from "../context/context";
import InputMask from "react-input-mask";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import NavbarE from "../components/navbarE";
import Modal1 from "../components/modals";

export default function PerfilCandiShowE() {
  const [modal, setModal] = useState(false);

  const [dadosComent, setDadosComent] = useState([]);

  const { dadosCandi } = useContext(Dados);
  const { setDadosCandi } = useContext(Dados);

  const location = useLocation();

  useEffect(() => {
    const dadi = getC();

    setDadosCandi(dadi);
    console.log(dadosCandi);
  }, []);

  async function getC() {
    try {
      const { uidC } = location.state;

      const cole = collection(db, "tb01_candidato/" + uidC + "/comentario");

      console.log(uidC);

      const docRef = doc(db, "tb01_candidato", uidC);
      const docSnap = await getDoc(docRef);

      console.log(docSnap.data());

      if (docSnap.exists()) {
        setDadosCandi(docSnap.data());

        const unsub = onSnapshot(cole, (collection) => {
          let snapshotUsers = [];

          collection?.docs.forEach((d) => snapshotUsers.push(d.data()));

          setDadosComent(snapshotUsers);
          console.log(snapshotUsers);
        });
      } else {
        alert("Não pode acessar essa página no momento");
        navigate("/central");
      }
    } catch (e) {
      alert("Não pode acessar essa página no momento");
      navigate("/central");
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
  let i = 0;
  return (
    <div>
      <NavbarE svaga={true} />
      <Modal1
        open={modal}
        setM={setModal}
        cont="Gostou desse candidato, entre em contato com ele. Por email ou mensagem"
        btn={true}
      />
      <div className="flex min-h-full flex-1 flex-col items-center lg:px-8 mt-12">
        <div className="flex flex-col items-center overflow-hidden mb-2">
          <FaUserCircle
            style={{ width: "15rem", height: "15rem", marginBottom: 5 }}
          />

          <div className="flex justify-center">
            <a
              target="blank"
              href={dadosCandi.curriculo}
              className="rounded-xl px-3 py-3 font-semibold text-lg text-purple border border-blue-900 shadow-md mb-4"
            >
              Ver currículo
            </a>
            <button
              onClick={() => setModal(true)}
              className="rounded-xl px-3 py-3 font-semibold text-lg text-purple border border-blue-900 shadow-md mb-4 ml-4"
            >
              Se interessou? Clique aqui!
            </button>
          </div>
        </div>
        <div className="flex p-5 justify-center space-y-4">
          <div className="p-5 comentario h-80">
            {dadosComent.length >= 1 ? (
              dadosComent.map((v) => (
                <div
                  key={i++}
                  className="mb-4 p-3 border border-blue-950 rounded-xl shadow-xl"
                >
                  <div className="flex items-center">
                    <FaUserCircle style={{ width: "5rem", height: "5rem" }} />

                    <h1>Professor: {v.nomeP}</h1>
                  </div>
                  <h3 className="my-2">Comentário: {v.coment}</h3>
                  <h3>Habilidades: {v.habili.map((a) => a + "; ")}</h3>
                </div>
              ))
            ) : (
              <div>
                <h1>Nehum Comentário Adicionado</h1>
              </div>
            )}
          </div>
          <div className="bg-gray-200 rounded-xl flex flex-col shadow-xl h-44">
            <div className="p-2 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-5">
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

              <Input1
                disa={true}
                nomeLabel="Idade"
                tipo="text"
                get={calcDate(dadosCandi.dataC)}
              />

              <div className="sm:col-span-2">
                <label className="block text-md font-bold leading-6 text-black-900">
                  Link GitHub
                </label>
                <div className="mt-2">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={dadosCandi.gitlink}
                    className="block rounded-md border-0 py-1.5 px-1.5 text-black-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    {dadosCandi.gitlink}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
