import { Link, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import Logo2 from "../../imgs/findjobcopia.png";
import { Input1, Input2, Input3 } from "../../components/input";
import Dropdown, { DropBox } from "../../components/dropdown";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  setDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../../firebase/config";
import { useState } from "react";
import Modal1 from "../../components/modals";
import { useEffect } from "react";

export default function CadCandi() {
  const [modal, setModal] = useState(false);
  const [conteModal, setContModal] = useState("");
  const [showBtn, setShowBtn] = useState(true);

  const [nomeC, setNomeC] = useState("");
  const [emailC, setEmailC] = useState("");

  const [senhaC, setSenhaC] = useState("");
  const [confsenhaC, setConfSenhaC] = useState("");

  const [telC, setTelC] = useState("");
  const [cpfC, setCpfC] = useState("");
  const [dataC, setDataC] = useState("");
  const [genC, setGenC] = useState("");
  const [esco, setEsco] = useState("");

  const [area, setArea] = useState([]);

  const navigate = useNavigate();

  const [dados, setDados] = useState([]);
  const [dados2, setDados2] = useState([]);
  const [dados3, setDados3] = useState([]);

  const cole = collection(db, "tb11_escolas");

  useEffect(() => {
    getDadosC();
    getDadosH();
    const unsub = onSnapshot(cole, (collection) => {
      let snapshotUsers = [];

      collection?.docs.forEach((doc) =>
        snapshotUsers.push({ ...doc.data(), id: doc.id })
      );

      setDados3(snapshotUsers);
    });
  }, []);
  console.log(dados3);
  async function getDadosC() {
    const docRef = doc(db, "tb02_genero", "gen");
    const docSnap = await getDoc(docRef);

    setDados(docSnap.data());
  }

  async function getDadosH() {
    const docRef = doc(db, "tb05_area", "5");
    const docSnap = await getDoc(docRef);

    setDados2(docSnap.data());
  }

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

  async function verificaCPF() {
    const q = query(
      collection(db, "tb01_candidato"),
      where("cpfC", "==", cpfC)
    );
    const querySnapshot = await getDocs(q);

    const q2 = query(
      collection(db, "tb08_professor"),
      where("cpfP", "==", cpfC)
    );
    const querySnapshot2 = await getDocs(q2);

    if (querySnapshot.empty && querySnapshot2.empty) {
      return false;
    } else {
      return true;
    }
  }

  async function cad(ev) {
    ev.preventDefault();
    if (
      nomeC == "" ||
      emailC == "" ||
      senhaC == "" ||
      telC.length < 15 ||
      cpfC.length < 14 ||
      dataC == "" ||
      esco == "" ||
      area == "" ||
      genC == ""
    ) {
      setContModal("Preencha todos os campos");
      setShowBtn(true);
      setModal(true);
    } else {
      if (senhaC == confsenhaC) {
        try {
          const dupli = await verificaCPF();
          if (dupli == false) {
            createUserWithEmailAndPassword(auth, emailC, senhaC)
              .then((userCredential) => {
                // Signed in
                setContModal("Cadastrado com sucesso");
                setShowBtn(false);
                setModal(true);

                const user = userCredential.user;

                setDoc(doc(db, "tb01_candidato", user.uid), {
                  nomeC,
                  emailC,
                  telC,
                  cpfC,
                  dataC,
                  genC,
                  uid: user.uid,
                  tipo: "C",
                  escola: esco,
                  areaAtua: area,
                });
                setTimeout(() => {
                  setModal(false);
                  navigate("/");
                }, 1500);
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
            setContModal("CPF já cadastrado.");
            setShowBtn(true);
            setModal(true);
          }
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      } else {
        setContModal("Senha não conferem");
        setShowBtn(true);
        setModal(true);
      }
    }
  }
  return (
    <form onSubmit={(ev) => cad(ev)}>
      <Modal1 btn={showBtn} cont={conteModal} open={modal} setM={setModal} />
      <div className="space-y-12 p-10 grid h-screen place-items-center">
        <div className="caixa p-10">
          <h2 className="mb-5 text-center text-4xl font-bold leading-9 text-black-900">
            Cadastro de Candidato
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-6">
            <Input3
              set={setNomeC}
              get={nomeC}
              nomeLabel="Nome Completo"
              tipo="text"
              placeh="Digite seu Nome"
            />

            <Input3
              set={setEmailC}
              get={emailC}
              nomeLabel="Email"
              tipo="email"
              placeh="Digite seu email"
            />

            <Input2
              set={setSenhaC}
              get={senhaC}
              nomeLabel="Senha"
              tipo="password"
              placeh="Digite sua senha"
            />

            <Input2
              set={setConfSenhaC}
              get={confsenhaC}
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
                  value={telC}
                  onChange={(ev) => setTelC(ev.target.value)}
                  mask="(99) 99999-9999"
                  placeholder="(__) _____-____"
                  maskChar={null}
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label className="block text-md font-bold leading-6 text-black-900">
                CPF
              </label>
              <div className="mt-2">
                <InputMask
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={cpfC}
                  onChange={(ev) => setCpfC(ev.target.value)}
                  mask="999.999.999-99"
                  placeholder="___.___.___-__"
                  maskChar={null}
                />
              </div>
            </div>

            <Dropdown
              dad={Object.values(dados)}
              label="Genero"
              get={genC}
              set={setGenC}
            />

            <Input1
              set={setDataC}
              get={dataC}
              nomeLabel="Data de nascimento"
              tipo="date"
              max="2007-01-12"
              min="1998-01-12"
            />

            <div className="sm:col-span-2 ">
              <label className="block text-md font-bold leading-6 text-black-900">
                Escola em que estuda ou foi feita o Ensino Médio
              </label>
              <div className="mt-2">
                <select
                  className="block w-full rounded-md border-0 py-2 px-1.5 text-black-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-black-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={esco}
                  onChange={(ev) => setEsco(ev.target.value)}
                >
                  <option value={""}>Selecione</option>
                  {dados3.map((v) => (
                    <>
                      <option
                        className="bg-blue-300 text-center text-lg font-bold"
                        value={""}
                      >
                        {v.id}
                      </option>
                      {Object.values(v).map(
                        (b) =>
                          ["ETECs", "Fatecs"].includes(b) == false && (
                            <option>{b}</option>
                          )
                      )}
                    </>
                  ))}
                </select>
              </div>
            </div>

            <DropBox
              dad={Object.values(dados2)}
              label="Área que deseja agir"
              get={area}
              set={setArea}
            />
          </div>
          <div className="flex flex-col items-center justify-center mb-4">
            <button className="rounded-xl w-40 px-2 py-1.5 font-semibold text-white shadow-md botao mb-4">
              Cadastrar
            </button>
            <p className="text-center text-lg font-bold text-black-600 mb-4">
              Já tem cadastro?{" "}
              <Link to={"/"} className="font-bold leading-3 textcolor">
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
