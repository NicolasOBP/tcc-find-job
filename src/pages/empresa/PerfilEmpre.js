import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dados } from "../../context/context";
import InputMask from "react-input-mask";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Input2, Input3 } from "../../components/input";
import NavbarE from "../../components/navbarE";
import AtualizaDados from "../../components/atualizaDados";
import Modal1 from "../../components/modals";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function PerfilEmpre() {
  const [modal, setModal] = useState(false);
  const [conteModal, setContModal] = useState("");

  const [modalCu, setModalCu] = useState(false);
  const [conteModalCu, setContModalCu] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  const [confDel, setConfDel] = useState(false);

  const { dados } = useContext(Dados);
  const { setDados } = useContext(Dados);

  const [tel, setTel] = useState(dados.telE);
  const [email, setEmail] = useState(dados.emailE);
  const [ende, setEnde] = useState(dados.ende);
  const [desc, setDesc] = useState(dados.descE);

  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    console.log(userLocalStorage);

    try {
      if (userLocalStorage.tipo === "E") {
        setTel(userLocalStorage.telE);
        setEmail(userLocalStorage.emailE);
        setEnde(userLocalStorage.ende);
        setDesc(userLocalStorage.descE);
      } else {
        alert("Não pode acessar essa página");
        navigate("/");
      }
    } catch (e) {
      alert("Não pode acessar essa página");
      navigate("/");
    }
  }, []);

  function salvaAutera() {
    setContModal("Tem certeza que deseja alterar seus dados?");
    setModal(true);
  }

  async function atualizaDados() {
    const docRef = doc(db, "tb03_empresa", dados.uid);
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

    await updateDoc(doc(db, "tb03_empresa", dados.uid), {
      logo: imageURL,
    });

    setContModalCu("Imagem inserida");
    setShowBtn(true);
    setModalCu(true);

    atualizaDados();
  }

  const navigate = useNavigate();
  return (
    <div>
      <NavbarE logout={true} />
      <AtualizaDados
        email={email}
        ende={ende}
        desc={desc}
        tel={tel}
        cont={conteModal}
        open={modal}
        setC={setContModal}
        setM={setModal}
        empre={true}
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
      <div className="flex min-h-full flex-1 flex-col items-center lg:px-8 ">
        <div className="flex flex-row -space-x-2 overflow-hidden mb-2">
          <label htmlFor="file-input">
            {dados.logo ? (
              <img
                className="h-60 w-60 rounded-full mb-4"
                src={dados.logo}
                style={{ cursor: "pointer" }}
                alt=""
              />
            ) : (
              <IoPersonCircleSharp
                style={{ width: "15rem", height: "15rem" }}
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
        </div>
        <div className="bg-gray-200 m-5 rounded-xl">
          <div className=" p-2 grid grid-cols-1 gap-x-6 sm:grid-cols-5">
            <Input2
              disa={true}
              nomeLabel="Nome"
              tipo="text"
              get={dados.nomeE}
            />

            <Input3
              nomeLabel="Email"
              tipo="email"
              set={setEmail}
              get={dados.emailE}
            />

            <Input2 disa={true} nomeLabel="CNPJ" tipo="text" get={dados.cnpj} />

            <Input3 nomeLabel="Endereco" tipo="text" set={setEnde} get={ende} />

            <div className="sm:col-span-2">
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
              nomeLabel="Descrição"
              tipo="text"
              set={setDesc}
              get={desc}
            />
          </div>
          <div className="flex w-full justify-center mt-5">
            <button
              onClick={salvaAutera}
              className="rounded-xl px-2 py-1.5 font-semibold bg-blue-900 text-white shadow-md botao mb-4"
            >
              Salvar alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
