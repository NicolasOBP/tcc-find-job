import React, { useContext, useEffect, useState } from "react";
import Modal1 from "../../components/modals";
import { Input2, Input1 } from "../../components/input";
import Dropdown from "../../components/dropdown";
import { Link, useNavigate } from "react-router-dom";
import { Dados } from "../../context/context";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export default function CadVagas() {
  const [modal, setModal] = useState(false);
  const [conteModal, setContModal] = useState("");
  const [showBtn, setShowBtn] = useState(true);

  const { dados } = useContext(Dados);
  const { dadosCandi } = useContext(Dados);
  const { modifica } = useContext(Dados);

  const [tituloV, setTituloV] = useState(dadosCandi.tituloV);
  const [modeloV, setModeloV] = useState(dadosCandi.modeloV);

  const [numeroV, setNumeroV] = useState(dadosCandi.numeroV);
  const [benefV, setBenefV] = useState(dadosCandi.benefV);
  const [sal, setSal] = useState(dadosCandi.sal);

  const [localV, setLocalV] = useState(dadosCandi.localV);
  const [descV, setDescV] = useState(dadosCandi.descV);
  const [areaV, setAreaV] = useState(dadosCandi.areaV);
  const [reqV, setReqV] = useState(dadosCandi.reqV);

  const [cargaI, setCargaI] = useState(dadosCandi.cargaI);
  const [cargaF, setCargaF] = useState(dadosCandi.cargaF);

  const [imgV, setImgV] = useState(dadosCandi.imageURl);

  const [dadosDropA, setDadosDropA] = useState([]);
  const [dadosDropM, setDadosDropM] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    console.log(userLocalStorage);

    try {
      if (userLocalStorage.tipo === "E") {
        getDadosA();
        getDadosM();
      } else {
        alert("Não pode acessar essa página");
        navigate("/");
      }
    } catch (e) {
      alert("Não pode acessar essa página");
      navigate("/");
    }
  }, []);

  async function getDadosA() {
    const docRef = doc(db, "tb05_area", "5");
    const docSnap = await getDoc(docRef);

    setDadosDropA(docSnap.data());
  }
  async function getDadosM() {
    const docRef = doc(db, "tb10_modelo", "mod");
    const docSnap = await getDoc(docRef);

    setDadosDropM(docSnap.data());
  }

  function getImg(event) {
    setImgV(event.target.files[0]);
  }
  async function cadImg() {
    if (!imgV) {
      setContModal("Escolha um arquivo");
      setShowBtn(true);
      setModal(true);
      return;
    }

    console.log("IMGGG => ", Object.hasOwn(imgV, "name"));
    if (imgV.name) {
      const storageRef = ref(storage, `/files/${imgV.name}`);
      setContModal("Carregando");
      setShowBtn(false);
      setModal(true);
      const uploadTask = await uploadBytesResumable(storageRef, imgV);
      let imageURL = await getDownloadURL(storageRef);

      return imageURL;
    }

    return imgV;
  }

  async function cadV() {
    if (
      tituloV === "" ||
      modeloV === "" ||
      numeroV === "" ||
      benefV === "" ||
      localV === "" ||
      descV === "" ||
      areaV === "" ||
      cargaI === "" ||
      cargaF === "" ||
      sal === "" ||
      reqV === "" ||
      imgV === ""
    ) {
      setContModal("Preencha todos os campos");
      setShowBtn(true);
      setModal(true);
    } else {
      try {
        const imageURl = await cadImg();
        await setDoc(doc(db, "tb04_vaga", uuidv4()), {
          tituloV,
          modeloV,
          numeroV,
          benefV,
          localV,
          descV,
          areaV,
          cargaI,
          cargaF,
          imageURl,
          sal,
          cnpj: dados.cnpj,
          empresa: dados.nomeE,
          uidEmpre: dados.uid,
          reqV,
        });
        setContModal("Vaga Cadastrada");
        setShowBtn(false);
        setModal(true);

        setTimeout(() => {
          setModal(false);
          navigate("/perfil-empresa");
        }, 2000);
      } catch (e) {
        setContModal("Erro ao cadastrar vaga");
        setShowBtn(true);
        setModal(true);

        console.error("Error adding document: ", e);
      }
    }
  }
  async function atuaV() {
    if (
      tituloV === "" ||
      modeloV === "" ||
      numeroV === "" ||
      benefV === "" ||
      localV === "" ||
      descV === "" ||
      areaV === "" ||
      cargaI === "" ||
      cargaF === "" ||
      sal === "" ||
      reqV === "" ||
      imgV === ""
    ) {
      setContModal("Preencha todos os campos");
      setShowBtn(true);
      setModal(true);
    } else {
      try {
        const imageURl = await cadImg();
        await updateDoc(doc(db, "tb04_vaga", dadosCandi.id), {
          tituloV,
          modeloV,
          numeroV,
          benefV,
          localV,
          descV,
          areaV,
          cargaI,
          cargaF,
          imageURl,
          sal,
          cnpj: dados.cnpj,
          empresa: dados.nomeE,
          uidEmpre: dados.uid,
          reqV,
        });
        setContModal("Vaga Atualizada");
        setShowBtn(false);
        setModal(true);

        setTimeout(() => {
          setModal(false);
          navigate("/perfil-empresa");
        }, 2000);
      } catch (e) {
        setContModal("Erro ao atualizar vaga");
        setShowBtn(true);
        setModal(true);
        console.log(e);
      }
    }
  }
  return (
    <div className="space-y-12 p-10 grid h-screen place-items-center">
      <Modal1 btn={showBtn} cont={conteModal} open={modal} setM={setModal} />
      <div className="caixa p-10">
        <h2 className="mb-5 text-center text-4xl font-bold leading-9 text-black-900">
          Cadastro de Vagas
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5 mb-6">
          <Input2
            set={setTituloV}
            get={tituloV}
            nomeLabel="Titulo da vaga"
            tipo="text"
            placeh="Digite o titulo"
          />

          <Dropdown
            dad={Object.values(dadosDropM)}
            label="Modelo de trabalho"
            get={modeloV}
            set={setModeloV}
          />

          <Dropdown
            dad={Object.values(dadosDropA)}
            label="Área da vaga"
            get={areaV}
            set={setAreaV}
          />

          <Input1
            set={setNumeroV}
            get={numeroV}
            nomeLabel="Quantidade de vagas"
            tipo="number"
            placeh="Quantas vagas disponíveis"
          />

          <Input2
            set={setBenefV}
            get={benefV}
            nomeLabel="Benefícios"
            tipo="text"
            placeh="Coloque os benefícios da vaga"
          />

          <Input2
            set={setLocalV}
            get={localV}
            nomeLabel="Local de trabalho"
            tipo="text"
            placeh="Coloque o local que o trabalho que será realizado"
          />

          <Input1
            set={setSal}
            get={sal}
            nomeLabel="Salário inicial"
            tipo="number"
            placeh="Coloque salário inicial"
          />

          <Input2
            set={setDescV}
            get={descV}
            nomeLabel="Descrição da vaga"
            tipo="text"
            placeh="Coloque descrição da vaga"
          />

          <Input1
            set={setCargaI}
            get={cargaI}
            nomeLabel="Carga horária: Início"
            tipo="time"
            placeh=""
          />
          <Input1
            set={setCargaF}
            get={cargaF}
            nomeLabel="Carga horária: Fim"
            tipo="time"
            placeh=""
          />

          <Input2
            set={setReqV}
            get={reqV}
            nomeLabel="Requisitos para a vaga"
            tipo="text"
            placeh="O que é necessário para candidatar"
          />

          <div className="sm:col-span-2">
            {imgV ? (
              <label className="block text-md font-bold leading-6 text-black-900">
                Atualizar logo da empresa ou uma imagem que represente o
                trabalho
              </label>
            ) : (
              <label className="block text-md font-bold leading-6 text-black-900">
                Importar logo da empresa ou uma imagem que represente o trabalho
              </label>
            )}
            <div className="mt-2">
              <input
                accept="image/*"
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={getImg}
                type="file"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-around mb-4">
          {modifica ? (
            <button
              onClick={atuaV}
              className="rounded-xl w-40 px-2 py-1.5 font-semibold text-white text-center shadow-md botao mb-4"
            >
              Atualizar vaga
            </button>
          ) : (
            <button
              onClick={cadV}
              className="rounded-xl w-40 px-2 py-1.5 font-semibold text-white text-center shadow-md botao mb-4"
            >
              Criar nova vaga
            </button>
          )}

          <Link
            to={"/perfil-empresa"}
            className="rounded-xl w-20 px-2 py-1.5 font-semibold text-white text-center shadow-md botao mb-4"
          >
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}
