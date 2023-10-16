import { Link } from "react-router-dom";
import Logo2 from "../imgs/findjobcopia.png";
import { BsFillPeopleFill } from "react-icons/bs";
import { BiSolidBusiness } from "react-icons/bi";
import { GiTeacher } from "react-icons/gi";

export default function SelecCad() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen items-center">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm caixa p-5">
        <form className="space-y-6">
          <h2 className="text-center text-4xl font-bold leading-9 tracking-tight text-black-900 mb-10">
            Seleção de Usuário
          </h2>
          <Link
            to={"/cadastro-candidato"}
            className="flex justify-center items-center border-2 rounded p-2 caixaSelec text-3xl"
          >
            <BsFillPeopleFill className="mr-1" />
            Candidato
          </Link>

          <Link
            to={"/cadastro-empresa"}
            className="flex justify-center items-center border-2 rounded p-2 caixaSelec text-3xl"
          >
            <BiSolidBusiness className="mr-1" />
            Empresa
          </Link>

          <Link
            to={"/cadastro-professor"}
            className="flex justify-center items-center border-2 rounded p-2 caixaSelec text-3xl"
          >
            <GiTeacher className="mr-1" />
            Professor
          </Link>

          <p className="text-center text-lg font-bold text-black-600">
            Já tem cadastro?{" "}
            <Link to={"/login"} className="font-bold textcolor">
              Volte para o Login.
            </Link>
          </p>

          <p className="text-center text-lg font-bold text-black-600">
            Clicou sem querer?{" "}
            <Link to={"/"} className="font-bold textcolor">
              Volte para a Central.
            </Link>
          </p>

          <div className="flex w-full justify-center text-center">
            <img src={Logo2} style={{ width: 75, borderRadius: 10 }} alt="a" />
          </div>
        </form>
      </div>
    </div>
  );
}
