import React from "react";
import img1 from "./imgs/findjobcopia.png";
import NavBar from "./components/navbarPortal";
import background from "./imgs/backcentral.gif";
import alunos from "./imgs/alunos.jpg";
import empresa from "./imgs/empresa.jpg";
import prof from "./imgs/professores.jpg";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backdropFilter: "blur",
      }}
      className="p-2"
    >
      <NavBar />

      <div className="p-10">
        <div className="flex justify-center">
          <h1 className="bg-white w-60 rounded-lg text-center text-xl font-bold mb-4 border border-2 border-blue-950">
            EQUIPE FINDJOB
          </h1>
        </div>
        <div className="flex justify-evenly opacity-90 bg-slate-50 border-blue-900 p-8 border-2 rounded-xl mb-6 shadow-xl drop-shadow-2xl">
          <div>
            <img className="rounded" src={alunos} alt="A" />
          </div>
          <div
            className="flex flex-col justify-center items-center"
            style={{ width: "40rem" }}
          >
            <h1 className=" text-xl font-bold mb-4">
              Você!!!! Aluno ou ex-aluno, esse site é para você!
            </h1>

            <h3>
              {" "}
              Bem-vindo(a) ao melhor site de busca de emprego! Com este site
              você que deseja achar um emprego poderá contar com ajuda dos seus
              professores para que eles colocaquem algumas de suas habilidades
              para o ajudar a ser contratado!!!{" "}
            </h3>
          </div>
        </div>

        <div className="flex justify-evenly opacity-90 bg-slate-50 border-blue-900 p-8 border-2 rounded-xl mb-6 shadow-xl drop-shadow-2xl">
          <div
            className="flex flex-col justify-center"
            style={{ width: "100rem" }}
          >
            <h1 className=" text-xl font-bold mb-4">
              Você! Empresa que quer melhorar a sua visibilidade, venha para o
              FindJob!
            </h1>
            <h3>
              Aqui você terá a chance de escolher os melhores candidatos! E com
              os comentário dos professores, não haverá risco de escolher alguém
              que só tem um bom currículo, poderá também conhecer mais do
              candidato e ver se atende melhor seus requisitos.
            </h3>
          </div>
          <div>
            <img alt="a" className="rounded" src={empresa} />
          </div>
        </div>

        <div className="flex justify-evenly opacity-90 bg-slate-50 border-blue-900 p-8 border-2 rounded-xl mb-6 shadow-xl drop-shadow-2xl">
          <div>
            <img alt="a" className="rounded h-60" src={prof} />
          </div>
          <div
            className="flex flex-col justify-center items-center"
            style={{ width: "40rem" }}
          >
            <h1 className=" text-xl font-bold mb-4">
              Você, Professor ou Professora! Os alunos precisam de você!!
            </h1>
            <h3>
              Já pensou em avaliar os seus alunos e ajuda-los a encontrar seu
              primeiro emprego? Aqui você pode fazer a diferença! Faça o seu
              cadastro e comece já!!
            </h3>
          </div>
        </div>

        <div className="flex flex-col items-center opacity-90 bg-slate-50 border-blue-900 p-8 border-2 rounded-xl mb-6 shadow-xl drop-shadow-2xl">
          <h1 className="text-xl justify-center items-center">
            Essas e outras funcionalidades estão disponíveis em nosso site, não
            perca tempo e{" "}
            <Link class="text-blue-800 hover:underline" to={"/selecao-usu"}>
              Cadastre-se já!
            </Link>
          </h1>
          <img alt="a" className="h-20 w-20 rounded-lg mt-2" src={img1} />
        </div>
      </div>
    </div>
  );
}
