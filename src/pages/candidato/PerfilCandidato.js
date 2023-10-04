import React, { useContext, useEffect, useState } from "react";
import { Dados } from "../../context/context";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { Input2, Input3 } from "../../components/input";
import { db, storage } from "../../firebase/config";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import NavbarC from "../../components/navbar";
import AtualizaDados from "../../components/atualizaDados";
import Modal1 from "../../components/modals";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Nvaga from "../../components/nenhumavga";

export default function PerfilCandidato() {
  const [modalCu, setModalCu] = useState(false);
  const [conteModalCu, setContModalCu] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  const [confDel, setConfDel] = useState(false);

  const [modal, setModal] = useState(false);
  const [conteModal, setContModal] = useState("");

  const [dadosComent, setDadosComent] = useState([]);
  console.log(dadosComent);

  const { dados } = useContext(Dados);
  const { setDados } = useContext(Dados);

  const [escola, setEscola] = useState(dados.escola);
  const [tel, setTel] = useState(dados.telC);
  const [email, setEmail] = useState(dados.emailC);

  const [github, setGitHub] = useState(dados.gitlink);

  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    console.log(userLocalStorage);

    try {
      if (userLocalStorage.tipo === "C") {
        const cole = collection(
          db,
          "tb01_candidato/" + userLocalStorage.uid + "/comentario"
        );

        setEscola(userLocalStorage.escola);
        setTel(userLocalStorage.telC);
        setEmail(userLocalStorage.emailC);
        setGitHub(userLocalStorage.gitlink);

        const unsub = onSnapshot(cole, (collection) => {
          let snapshotUsers = [];

          collection?.docs.forEach((d) => snapshotUsers.push(d.data()));

          setDadosComent(snapshotUsers);
          console.log(snapshotUsers);
        });
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

  function salvaAutera() {
    setContModal("Tem certeza que deseja alterar seus dados?");
    setModal(true);
  }

  function verifCurri() {
    setContModalCu("Cadastre um currículo primeiramente");
    setConfDel(false);
    setShowBtn(true);
    setModalCu(true);
  }

  async function deletaCurr() {
    setContModalCu("Tem certeza que deseja deletar seu currículo atual?");
    setConfDel(true);
    setModalCu(true);
  }

  async function atualizaDados() {
    const docRef = doc(db, "tb01_candidato", dados.uid);
    const docSnap = await getDoc(docRef);

    setDados(docSnap.data());

    localStorage.setItem("user", JSON.stringify(docSnap.data()));
  }

  async function getImg(event) {
    await cadImg(event.target.files[0]);
  }
  async function cadImg(img) {
    if (!img) {
      setContModalCu("Escolha um arquivo");
      setShowBtn(true);
      setModalCu(true);
    }

    const storageRef = ref(storage, `/files/${img.name}`);
    setContModalCu("Carregando");
    setModalCu(true);
    const uploadTask = await uploadBytesResumable(storageRef, img);

    let imageURL = await getDownloadURL(storageRef);

    await updateDoc(doc(db, "tb01_candidato", dados.uid), {
      perfilimg: imageURL,
    });

    setContModalCu("Imagem inserida");
    setShowBtn(true);
    setModalCu(true);

    atualizaDados();
  }

  let i = 0;
  console.log(dados.imageURL);
  return (
    <div>
      <NavbarC logout={true} />
      <AtualizaDados
        email={email}
        tel={tel}
        escola={escola}
        cont={conteModal}
        open={modal}
        setC={setContModal}
        setM={setModal}
        candi={true}
        git={github}
      />
      <Modal1
        cont={conteModalCu}
        setCont={setContModalCu}
        open={modalCu}
        setM={setModalCu}
        conf={confDel}
        btn={showBtn}
        contDel={"Deletar Currículo"}
        deletaCurri
      />
      <div className="flex min-h-full flex-1 flex-col items-center lg:px-8">
        <div className="flex flex-col items-center -space-x-2 overflow-hidden">
          <label htmlFor="file-input">
            {dados.perfilimg ? (
              <img
                className="h-60 w-60 rounded-full mb-4"
                src={dados.perfilimg}
                style={{ cursor: "pointer" }}
                alt=""
              />
            ) : (
              <IoPersonCircleSharp
                className="rounded-xxl mb-4"
                style={{ width: "15rem", height: "15rem", cursor: "pointer" }}
              />
            )}
          </label>
          <input
            onChange={getImg}
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
          />

          <div className="flex flex-col justify-center">
            {dados.curriculo ? (
              <div className="flex items-center">
                <a
                  href={dados.curriculo}
                  target="blank"
                  className=" rounded-xl text-center px-3 py-3 font-semibold text-lg text-purple border border-2 border-blue-900 shadow-md"
                >
                  Seu currículo
                </a>
                <FaRegTrashAlt
                  onClick={deletaCurr}
                  className="text-red-800 ml-4"
                  style={{ width: "3rem", height: "3rem", cursor: "pointer" }}
                />
              </div>
            ) : (
              <button
                onClick={verifCurri}
                className="rounded-xl text-center px-3 py-3 font-semibold text-lg text-purple border border-4 border-blue-900 shadow-md transition-colors duration-300 hover:bg-indigo-100"
              >
                Seu currículo
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap p-5 justify-center space-y-4">
          <div className="p-5 comentario h-80">
            {dadosComent.length >= 1 ? (
              dadosComent.map((v) => (
                <div
                  key={i++}
                  className="mb-4 p-3 border border-blue-950 rounded-xl shadow-xl"
                >
                  <div className="flex items-center">
                    {v.img ? (
                      <img
                        className="h-20 w-20 rounded-full mr-2"
                        src={v.img}
                        alt=""
                      />
                    ) : (
                      <IoPersonCircleSharp
                        style={{ width: "5rem", height: "5rem" }}
                      />
                    )}
                    <h1>Professor: {v.nomeP}</h1>
                  </div>
                  <h3 className="my-2">Comentário: {v.coment}</h3>
                  <h3>Habilidades: {v.habili.map((a) => a + "; ")}</h3>
                </div>
              ))
            ) : (
              <Nvaga title={"Nenhuma professor colocou um comentário ainda"} />
            )}
          </div>
          <div className="bg-gray-200 rounded-xl flex flex-col shadow-xl ">
            <div className=" p-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
              <Input3
                disa={true}
                nomeLabel="Nome"
                tipo="text"
                get={dados.nomeC}
              />

              <Input3
                nomeLabel="Email"
                tipo="email"
                set={setEmail}
                get={email}
              />

              <Input2
                disa={true}
                nomeLabel="CPF"
                tipo="text"
                get={dados.cpfC}
              />

              <div className="sm:col-span-3">
                <label className="block text-md font-bold leading-6 text-black-900">
                  Telefone
                </label>
                <div className="mt-2">
                  <InputMask
                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={tel}
                    onChange={(ev) => setTel(ev.target.value)}
                    mask="(99) 99999-9999"
                    placeholder="(__) _____-____"
                    maskChar={null}
                  />
                </div>
              </div>
              <Input3
                nomeLabel="Escola"
                tipo="text"
                set={setEscola}
                get={escola}
              />
              <Input3
                nomeLabel="Link GitHub"
                tipo="url"
                set={setGitHub}
                get={github}
                placeh="Adicione o Link do seu GitHub aqui"
              />
            </div>
            <div className="flex w-full justify-center mt-3">
              <button
                onClick={salvaAutera}
                className="rounded-xl px-2 py-1.5 font-semibold bg-blue-900 text-white shadow-md botao m-5"
              >
                Salvar alterações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
