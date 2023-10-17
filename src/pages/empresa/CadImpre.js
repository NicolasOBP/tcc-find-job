import { Link, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import Logo2 from "../../imgs/findjobcopia.png";
import {
  collection,
  setDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db, auth, storage } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Input2, Input3 } from "../../components/input";
import { DropBox } from "../../components/dropdown";
import Modal1 from "../../components/modals";
import { useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function CadImpre() {
  const [modal, setModal] = useState(false);
  const [conteModal, setContModal] = useState("");
  const [showBtn, setShowBtn] = useState(true);

  const [nomeE, setNomeE] = useState("");
  const [emailE, setEmailE] = useState("");

  const [senhaE, setSenhaE] = useState("");
  const [confsenhaE, setConfSenhaE] = useState("");

  const [telE, setTelE] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [area, setArea] = useState([]);
  const [descE, setdescE] = useState("");
  const [ende, setEnde] = useState("");

  const [imgV, setImgV] = useState("");

  const [dados, setDados] = useState([]);

  useEffect(() => {
    getDadosC();
  }, []);

  async function getDadosC() {
    const docRef = doc(db, "tb05_area", "5");
    const docSnap = await getDoc(docRef);

    setDados(docSnap.data());
  }

  async function verificaCNPJ() {
    const q = query(collection(db, "tb03_empresa"), where("cnpj", "==", cnpj));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return false;
    } else {
      return true;
    }
  }

  const navigate = useNavigate();

  const msgErr = (errorCode) => {
    switch (errorCode) {
      case "auth/app-deleted":
        return "O banco de dados não foi localizado.";
      case "auth/expired-action-code":
        return "O código da ação o ou link expirou.";
      case "auth/invalid-action-code":
        return "O código da ação é inválido. Isso pode acontecer se o código estiver malformado ou já tiver sido usado.";
      case "auth/user-disabled":
        return "O usuário correspondente à credencial fornecida foi desativado.";
      case "auth/user-not-found":
        return "O usuário não correponde à nenhuma credencial.";
      case "auth/weak-password":
        return "A senha é muito fraca.";
      case "auth/email-already-in-use":
        return "Já existi uma conta com o endereço de email fornecido.";
      case "auth/invalid-email":
        return "O endereço de e-mail não é válido.";
      case "auth/operation-not-allowed":
        return "O tipo de conta correspondente à esta credencial, ainda não encontra-se ativada.";
      case "auth/account-exists-with-different-credential":
        return "E-mail já associado a outra conta.";
      case "auth/auth-domain-config-required":
        return "A configuração para autenticação não foi fornecida.";
      case "auth/credential-already-in-use":
        return "Já existe uma conta para esta credencial.";
      case "auth/operation-not-supported-in-this-environment":
        return "Esta operação não é suportada no ambiente que está sendo executada. Verifique se deve ser http ou https.";
      case "auth/timeout":
        return "Excedido o tempo de resposta. O domínio pode não estar autorizado para realizar operações.";
      case "auth/missing-android-pkg-name":
        return "Deve ser fornecido um nome de pacote para instalação do aplicativo Android.";
      case "auth/missing-continue-uri":
        return "A próxima URL deve ser fornecida na solicitação.";
      case "auth/missing-ios-bundle-id":
        return "Deve ser fornecido um nome de pacote para instalação do aplicativo iOS.";
      case "auth/invalid-continue-uri":
        return "A próxima URL fornecida na solicitação é inválida.";
      case "auth/unauthorized-continue-uri":
        return "O domínio da próxima URL não está na lista de autorizações.";
      case "auth/invalid-dynamic-link-domain":
        return "O domínio de link dinâmico fornecido, não está autorizado ou configurado no projeto atual.";
      case "auth/argument-error":
        return "Verifique a configuração de link para o aplicativo.";
      case "auth/invalid-persistence-type":
        return "O tipo especificado para a persistência dos dados é inválido.";
      case "auth/unsupported-persistence-type":
        return "O ambiente atual não suportar o tipo especificado para persistência dos dados.";
      case "auth/invalid-credential":
        return "A credencial expirou ou está mal formada.";
      case "auth/wrong-password":
        return "Senha incorreta.";
      case "auth/invalid-verification-code":
        return "O código de verificação da credencial não é válido.";
      case "auth/invalid-verification-id":
        return "O ID de verificação da credencial não é válido.";
      case "auth/custom-token-mismatch":
        return "O token está diferente do padrão solicitado.";
      case "auth/invalid-custom-token":
        return "O token fornecido não é válido.";
      case "auth/captcha-check-failed":
        return "O token de resposta do reCAPTCHA não é válido, expirou ou o domínio não é permitido.";
      case "auth/invalid-phone-number":
        return "O número de telefone está em um formato inválido (padrão E.164).";
      case "auth/missing-phone-number":
        return "O número de telefone é requerido.";
      case "auth/quota-exceeded":
        return "A cota de SMS foi excedida.";
      case "auth/cancelled-popup-request":
        return "Somente uma solicitação de janela pop-up é permitida de uma só vez.";
      case "auth/popup-blocked":
        return "A janela pop-up foi bloqueado pelo navegador.";
      case "auth/popup-closed-by-user":
        return "A janela pop-up foi fechada pelo usuário sem concluir o login no provedor.";
      case "auth/unauthorized-domain":
        return "O domínio do aplicativo não está autorizado para realizar operações.";
      case "auth/invalid-user-token":
        return "O usuário atual não foi identificado.";
      case "auth/user-token-expired":
        return "O token do usuário atual expirou.";
      case "auth/null-user":
        return "O usuário atual é nulo.";
      case "auth/app-not-authorized":
        return "Aplicação não autorizada para autenticar com a chave informada.";
      case "auth/invalid-api-key":
        return "A chave da API fornecida é inválida.";
      case "auth/network-request-failed":
        return "Falha de conexão com a rede.";
      case "auth/requires-recent-login":
        return "O último horário de acesso do usuário não atende ao limite de segurança.";
      case "auth/too-many-requests":
        return "As solicitações foram bloqueadas devido a atividades incomuns. Tente novamente depois que algum tempo.";
      case "auth/web-storage-unsupported":
        return "O navegador não suporta armazenamento ou se o usuário desativou este recurso.";
      case "auth/invalid-claims":
        return "Os atributos de cadastro personalizado são inválidos.";
      case "auth/claims-too-large":
        return "O tamanho da requisição excede o tamanho máximo permitido de 1 Megabyte.";
      case "auth/id-token-expired":
        return "O token informado expirou.";
      case "auth/id-token-revoked":
        return "O token informado perdeu a validade.";
      case "auth/invalid-argument":
        return "Um argumento inválido foi fornecido a um método.";
      case "auth/invalid-creation-time":
        return "O horário da criação precisa ser uma data UTC válida.";
      case "auth/invalid-disabled-field":
        return "A propriedade para usuário desabilitado é inválida.";
      case "auth/invalid-display-name":
        return "O nome do usuário é inválido.";
      case "auth/invalid-email-verified":
        return "O e-mail é inválido.";
      case "auth/invalid-hash-algorithm":
        return "O algoritmo de HASH não é uma criptografia compatível.";
      case "auth/invalid-hash-block-size":
        return "O tamanho do bloco de HASH não é válido.";
      case "auth/invalid-hash-derived-key-length":
        return "O tamanho da chave derivada do HASH não é válido.";
      case "auth/invalid-hash-key":
        return "A chave de HASH precisa ter um buffer de byte válido.";
      case "auth/invalid-hash-memory-cost":
        return "O custo da memória HASH não é válido.";
      case "auth/invalid-hash-parallelization":
        return "O carregamento em paralelo do HASH não é válido.";
      case "auth/invalid-hash-rounds":
        return "O arredondamento de HASH não é válido.";
      case "auth/invalid-hash-salt-separator":
        return "O campo do separador de SALT do algoritmo de geração de HASH precisa ser um buffer de byte válido.";
      case "auth/invalid-id-token":
        return "O código do token informado não é válido.";
      case "auth/invalid-last-sign-in-time":
        return "O último horário de login precisa ser uma data UTC válida.";
      case "auth/invalid-page-token":
        return "A próxima URL fornecida na solicitação é inválida.";
      case "auth/invalid-password":
        return "A senha é inválida, precisa ter pelo menos 6 caracteres.";
      case "auth/invalid-password-hash":
        return "O HASH da senha não é válida.";
      case "auth/invalid-password-salt":
        return "O SALT da senha não é válido.";
      case "auth/invalid-photo-url":
        return "A URL da foto de usuário é inválido.";
      case "auth/invalid-provider-id":
        return "O identificador de provedor não é compatível.";
      case "auth/invalid-session-cookie-duration":
        return "A duração do COOKIE da sessão precisa ser um número válido em milissegundos, entre 5 minutos e 2 semanas.";
      case "auth/invalid-uid":
        return "O identificador fornecido deve ter no máximo 128 caracteres.";
      case "auth/invalid-user-import":
        return "O registro do usuário a ser importado não é válido.";
      case "auth/invalid-provider-data":
        return "O provedor de dados não é válido.";
      case "auth/maximum-user-count-exceeded":
        return "O número máximo permitido de usuários a serem importados foi excedido.";
      case "auth/missing-hash-algorithm":
        return "É necessário fornecer o algoritmo de geração de HASH e seus parâmetros para importar usuários.";
      case "auth/missing-uid":
        return "Um identificador é necessário para a operação atual.";
      case "auth/reserved-claims":
        return "Uma ou mais propriedades personalizadas fornecidas usaram palavras reservadas.";
      case "auth/session-cookie-revoked":
        return "O COOKIE da sessão perdeu a validade.";
      case "auth/uid-alread-exists":
        return "O indentificador fornecido já está em uso.";
      case "auth/email-already-exists":
        return "O e-mail fornecido já está em uso.";
      case "auth/phone-number-already-exists":
        return "O telefone fornecido já está em uso.";
      case "auth/project-not-found":
        return "Nenhum projeto foi encontrado.";
      case "auth/insufficient-permission":
        return "A credencial utilizada não tem permissão para acessar o recurso solicitado.";
      case "auth/internal-error":
        return "O servidor de autenticação encontrou um erro inesperado ao tentar processar a solicitação.";
      default:
        return null;
    }
  };

  function getImg(event) {
    setImgV(event.target.files[0]);
  }
  async function cadImg() {
    if (!imgV) {
      setContModal("Escolha um arquivo");
      setShowBtn(true);
      setModal(true);
    }

    const storageRef = ref(storage, `/files/${imgV.name}`);
    setContModal("Carregando");
    setShowBtn(false);
    setModal(true);
    const uploadTask = await uploadBytesResumable(storageRef, imgV);
    let imageURL = await getDownloadURL(storageRef);

    return imageURL;
  }

  async function cad(ev) {
    ev.preventDefault();
    if (
      nomeE == "" ||
      emailE == "" ||
      senhaE == "" ||
      telE.length < 15 ||
      cnpj.length < 19 ||
      area == "" ||
      imgV == "" ||
      descE == ""
    ) {
      setContModal("Preencha todos os campos");
      setShowBtn(true);
      setModal(true);
    } else {
      if (senhaE.length < 7) {
        setContModal("Senha é muito curta");
        setShowBtn(true);
        setModal(true);
      } else {
        if (senhaE == confsenhaE) {
          try {
            const dupli = await verificaCNPJ();
            if (dupli == false) {
              const imageURl = await cadImg();
              createUserWithEmailAndPassword(auth, emailE, senhaE)
                .then((userCredential) => {
                  // Signed in
                  setContModal("Cadastrado com sucesso");
                  setShowBtn(false);
                  setModal(true);

                  const user = userCredential.user;

                  setDoc(doc(db, "tb03_empresa", user.uid), {
                    nomeE,
                    emailE,
                    telE,
                    cnpj,
                    area,
                    descE,
                    ende,
                    uid: user.uid,
                    tipo: "E",
                    logo: imageURl,
                  });
                  setTimeout(() => {
                    setModal(false);
                    navigate("/login");
                  }, 2000);
                })
                .catch((err) => {
                  const errorCode = err.code;
                  let errorMessage = msgErr(errorCode);

                  if (errorMessage == null) {
                    errorMessage = err.message;
                  }
                  setContModal(errorMessage);
                  setShowBtn(true);
                  setModal(true);
                });
            } else {
              setContModal("CNPJ já cadastrado.");
              setShowBtn(true);
              setModal(true);
            }
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        } else {
          setContModal("Senhas não se conferem");
          setShowBtn(true);
          setModal(true);
        }
      }
    }
  }

  return (
    <form onSubmit={(ev) => cad(ev)}>
      <Modal1 btn={showBtn} cont={conteModal} open={modal} setM={setModal} />
      <div className="space-y-12 p-10 grid h-screen place-items-center">
        <div className="caixa p-10">
          <h2 className="mb-5 text-center text-4xl font-bold leading-9 text-black-900">
            Cadastro de Empresa
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-6">
            <Input2
              set={setNomeE}
              get={nomeE}
              nomeLabel="Nome da empresa"
              tipo="text"
              placeh="Digite o nome da empresa"
            />

            <Input2
              set={setEmailE}
              get={emailE}
              nomeLabel="Email"
              tipo="email"
              placeh="Digite seu email"
            />
            <div className="sm:col-span-2">
              <label className="block text-md font-bold leading-6 text-black-900">
                Logo da Empresa
              </label>
              <div className="mt-2">
                <input
                  accept="image/*"
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={getImg}
                  type="file"
                />
              </div>
            </div>
            <Input2
              set={setSenhaE}
              get={senhaE}
              nomeLabel="Senha"
              tipo="password"
              placeh="Digite sua senha"
            />

            <Input2
              set={setConfSenhaE}
              get={confsenhaE}
              nomeLabel="Confirmar Senha"
              tipo="password"
              placeh="Repita a senha"
            />

            <div className="sm:col-span-1">
              <label className="block text-md font-bold leading-6 text-black-900">
                Telefone
              </label>
              <div className="mt-2">
                <InputMask
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={telE}
                  onChange={(ev) => setTelE(ev.target.value)}
                  mask="(99) 99999-9999"
                  placeholder="(__) _____-____"
                  maskChar={null}
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label className="block text-md font-bold leading-6 text-black-900">
                CNPJ
              </label>
              <div className="mt-2">
                <InputMask
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={cnpj}
                  onChange={(ev) => setCnpj(ev.target.value)}
                  mask="999.999.999/9999-99"
                  placeholder="___.___.___/____-__"
                  maskChar={null}
                />
              </div>
            </div>

            <DropBox
              dad={Object.values(dados)}
              label="Área da empresa"
              get={area}
              set={setArea}
            />

            <Input3
              set={setdescE}
              get={descE}
              nomeLabel="Descrição da Empresa"
              tipo="text"
            />
            <Input2 set={setEnde} get={ende} nomeLabel="Endereço" tipo="text" />
          </div>
          <div className="flex flex-col items-center justify-center mb-4">
            <button className="rounded-xl w-40 px-2 py-1.5 font-semibold text-white shadow-md botao mb-4">
              Cadastrar
            </button>
            <p className="text-center text-lg font-bold text-black-600 mb-4">
              Já tem cadastro?{" "}
              <Link to={"/login"} className="font-bold leading-3 textcolor">
                Volte para o Login.
              </Link>
            </p>
          </div>

          <div className="flex w-full justify-center text-center">
            <img src={Logo2} style={{ width: 75, borderRadius: 10 }} alt="a" />
          </div>
        </div>
      </div>
    </form>
  );
}
