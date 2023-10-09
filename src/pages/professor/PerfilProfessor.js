import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dados } from "../../context/context";
import InputMask from "react-input-mask";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Input2, Input3 } from "../../components/input";
import NavbarP from "../../components/navbarP";
import AtualizaDados from "../../components/atualizaDados";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Modal1 from "../../components/modals";

export default function PerfilProfessor() {
  const [modal, setModal] = useState(false);
  const [conteModal, setContModal] = useState("");

  const [confDel, setConfDel] = useState(false);
  const [contDel, setContDel] = useState("");
  const [delImg, setDelImg] = useState(false);

  const [modalA, setModalA] = useState(false);
  const [conteModalA, setContModalA] = useState("");
  const [showBtn, setShowBtn] = useState(false);

  const { dados, setDados } = useContext(Dados);

  const [tel, setTel] = useState(dados.telP);
  const [email, setEmail] = useState(dados.emailP);

  const [telC, setTelC] = useState(dados.telP);
  const [emailC, setEmailC] = useState(dados.emailP);

  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));

    try {
      if (userLocalStorage.tipo == "P") {
        setTel(userLocalStorage.telP);
        setEmail(userLocalStorage.emailP);

        setTelC(userLocalStorage.telP);
        setEmailC(userLocalStorage.emailP);
      } else {
        alert("Não pode acessar essa página");
        navigate("/central");
      }
    } catch (e) {
      alert("Não pode acessar essa página");
      navigate("/central");
    }
  }, []);

  const navigate = useNavigate();

  function salvaAutera() {
    if (tel.length < 15) {
      setContModalA("Número de telefone invaido");
      setShowBtn(true);
      setModalA(true);
    } else {
      setContModal("Tem certeza que deseja altera seus dados?");
      setModal(true);
    }
  }

  async function atualizaDados() {
    const docRef = doc(db, "tb08_professor", dados.uid);
    const docSnap = await getDoc(docRef);

    setDados(docSnap.data());

    localStorage.setItem("user", JSON.stringify(docSnap.data()));
  }
  async function getImg(event) {
    await cadImg(event.target.files[0]);
  }
  async function cadImg(img) {
    if (!img) {
      setContModalA("Escolha um arquivo");
      setShowBtn(true);
      setModalA(true);
    }

    const storageRef = ref(storage, `/files/${img.name}`);
    setContModalA("Carregando");
    setModalA(true);
    const uploadTask = await uploadBytesResumable(storageRef, img);

    let imageURL = await getDownloadURL(storageRef);

    await updateDoc(doc(db, "tb08_professor", dados.uid), {
      perfilimg: imageURL,
    });

    setContModalA("Imagem inserida");
    setShowBtn(true);
    setModalA(true);

    atualizaDados();
  }

  function deletaImg() {
    setContModalA("Tem certeza que deseja remover sua imagem de perfil?");
    setContDel("Deletar imagem");
    setDelImg(true);
    setConfDel(true);
    setModalA(true);
  }

  return (
    <div>
      <NavbarP logout={true} />
      <AtualizaDados
        email={email}
        tel={tel}
        cont={conteModal}
        open={modal}
        setC={setContModal}
        setM={setModal}
        prof={true}
      />
      <Modal1
        cont={conteModalA}
        setCont={setContModalA}
        open={modalA}
        setM={setModalA}
        btn={showBtn}
        conf={confDel}
        delImg={delImg}
        setDelImg={setDelImg}
        contDel={contDel}
        setConfDel={setConfDel}
        prof
      />
      <div className="flex h-screen min-h-full flex-1 flex-col items-center lg:px-8">
        <div className="flex overflow-hidden mb-2">
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
        </div>
        {dados.perfilimg ? (
          <button
            onClick={deletaImg}
            className="rounded-xl mb-6 text-center px-3 py-3 font-semibold text-lg text-purple border border-4 border-blue-900 shadow-md transition-colors duration-300 hover:bg-indigo-100"
          >
            Remover foto
          </button>
        ) : (
          <></>
        )}
        <div className="bg-gray-200 rounded-xl flex flex-col shadow-xl">
          <div className=" p-2 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
            <Input2
              disa={true}
              nomeLabel="Nome"
              tipo="text"
              get={dados.nomeP}
            />

            <Input3 nomeLabel="Email" tipo="email" set={setEmail} get={email} />

            <Input2 disa={true} nomeLabel="CPF" tipo="text" get={dados.cpfP} />

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
          </div>
          {tel != telC || email != emailC ? (
            <div className="flex w-full justify-center mt-5">
              <button
                onClick={salvaAutera}
                className="rounded-xl px-2 py-1.5 font-semibold bg-blue-900 text-white shadow-md botao m-5"
              >
                Salvar alterações
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
