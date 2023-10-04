import React from "react";
import NavbarC from "../../components/navbar";
import Videoscurri from "../../components/vídeoscurri";

export default function MonteCurriculo() {
  return (
    <div>
      <NavbarC perf={true} />
      <div className="p-10">
        <Videoscurri
          texto="Nele, a autora Adriana Cubas compartilha dicas e orientações sobre como criar um currículo atraente e eficaz para o mercado de trabalho. Ela aborda tópicos como pretensão salarial, resumo profissional, idiomas e formação acadêmica"
          url={"https://www.youtube.com/embed/tAQCmXvmvAk?si=_lCYKR6ZLzZ3i1Gl"}
        />
        <Videoscurri
          texto="Nesse vídeo você vai aprender Como Fazer Um Currículo Perfeito em um Passo a Passo simples e fácil. Vou te mostrar os 10 passos de como fazer um currículo atrativo e atualizado."
          url={"https://www.youtube.com/embed/Yu9oe8UJGak?si=PBYcHiR0ePIqtftw"}
        />
        <Videoscurri
          texto="Muitas pessoas sentem dificuldade em fazer um currículo, pensando nisso, nós do PAP cursos decidimos mostrar um modelo de currículo que utilizamos para nosso alunos de mentoria, que fazem com que eles conquistem o emprego em até 4 meses."
          url={"https://www.youtube.com/embed/kUtEXc3enKo?si=wxyA5R2DY-xo3E_B"}
        />
      </div>
    </div>
  );
}
