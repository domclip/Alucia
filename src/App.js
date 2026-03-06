import React from "react";
import { useState } from "react";

import ChatBox from "./components/ChatBox";
import Selects from "./components/seletorIAS";
import PerguntaResposta from "./components/PerguntaResposta";
import Header from "./header";

import { prepararPergunta } from "./utils/manipulacoesString";
import {
  chamarChatGPT,
  chamarGemini,
  chamarGrok,
  chamarDeepseek,
} from "./utils/APIchats";

import "./App.css";

import ModalConfig from "./components/ModalConfig";
import ModalFeedback from "./components/modalFeedback";

export default function App() {
  const [IA1, setIA1] = React.useState("");
  const [IA2, setIA2] = React.useState("");
  const [arbitro, setarbitro] = React.useState("");

  const [open, isOpen] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);

  const [pergunta, setPergunta] = React.useState("");
  const [resposta, setResposta] = React.useState("");
  const [respostaArbitro, setRespostaArbitro] = React.useState("");
  const [trocarVerdadeiro, settrocarVerdadeiro] = React.useState(false);
  const [respostaIA1, setRespostaIA1] = React.useState("");
  const [respostaIA2, setRespostaIA2] = React.useState("");

  const [prefixo, setPrefixo] = React.useState(
    "responda como se fosse um estudante do ensino médio Técnico de uma forma resumida que não passe de 5 linhas sem gírias antigas, humanizado, sem girias e sem emojis esta seguinte pergunta: ",
  );

  const [prefixoArbitro, setPrefixoArbitro] = React.useState("");
  const [feedback, setFeedback] = React.useState(""); // feedback do usario

  const todasIASResponderam =
    respostaIA1.trim() && respostaIA2.trim() && respostaArbitro.trim(); // respondeu?

  // chamadda pra todas as ias
  let fia = [];

  fia["Grok"] = (perguntaMontada, isArbiter) =>
    chamarGrok(perguntaMontada, isArbiter);
  fia["Gemini"] = (perguntaMontada, isArbiter) =>
    chamarGemini(perguntaMontada, isArbiter);
  fia["Chatgpt"] = (perguntaMontada, isArbiter) =>
    chamarChatGPT(perguntaMontada, isArbiter);
  fia["deepseek"] = (perguntaMontada, isArbiter) =>
    chamarDeepseek(perguntaMontada, isArbiter);

  async function chamarFuncaoPorNome(nome, perguntaPreparada) {
    let fSelect = fia[nome];
    let resp = await fSelect(perguntaPreparada, false);
    setRespostaArbitro(resp.resp);
    return resp.resp;
  }

  async function fluxoComunicacao() {
    if (!IA1 || !IA2 || !arbitro) {
      alert("Por favor selecione todas as IAs e o arbitro");
      return;
    }

    let perguntaPreparada = prepararPergunta(pergunta, prefixo);

    let RIA1 = await chamarFuncaoPorNome(IA1, perguntaPreparada);
    let RIA2 = await chamarFuncaoPorNome(IA2, perguntaPreparada);

    setRespostaIA1(RIA1);
    setRespostaIA2(RIA2);

    let textoArbitro =
      pergunta +
      " Resposta primeira IA: " +
      RIA1 +
      " Resposta segunda IA: " +
      RIA2;

    if (resposta.trim()) {
      textoArbitro += " Resposta do usuário: " + resposta;
    }
    textoArbitro +=
      " verifique se existe algum tipo de erro, alucinações ou se faltam informações nas respostas das IAs, faça uma pequena análise dos erros, que não passe de 20 linhas";

    // salva o texto do arbitro
    setPrefixoArbitro(textoArbitro);

    // chama o arbitro e salva a resposta final
    let RArbitro = await chamarFuncaoPorNome(arbitro, textoArbitro);
    setRespostaArbitro(RArbitro);
    setFeedback(""); // limpa o feedback
  }

  // gerar o arquivo com as respostas e o feedback do usuario
  function salvarEmArquivo() {
    //verificar se as respostas ja existem
    if (!pergunta || !respostaIA1 || !respostaIA2 || !respostaArbitro) {
      alert("Por favor envie a pergunta primeiro");
      return;
    }

    // montar o arquivo
    const conteudo = `PERGUNTA:\n${pergunta}\n\n${resposta ? `RESPOSTA DO USUÁRIO:\n${resposta}\n\n` : ""}RESPOSTA IA 1 (${IA1}):\n${respostaIA1}\n\nRESPOSTA IA 2 (${IA2}):\n${respostaIA2}\n\nANÁLISE DO ÁRBITRO (${arbitro}):\n${respostaArbitro}${feedback ? `\n\nFEEDBACK:\n${feedback}` : ""}\n\n${"=".repeat(50)}\nData: ${new Date().toLocaleString("pt-BR")}`;

    // isso daqui funciona, obrigado indiano do youtube :)
    const elemento = document.createElement("a");
    const arquivo = new Blob([conteudo], { type: "text/plain" });
    elemento.href = URL.createObjectURL(arquivo);
    elemento.download = `feedback_${Date.now()}.txt`;
    document.body.appendChild(elemento);
    elemento.click();
    document.body.removeChild(elemento);

    alert("Arquivo salvo com sucesso");
  }

  return (
    <div>
      {/* modal pra mudar o prefixo da pergunta (Para a IA1 e IA2, o arbitro nao muda o prefixo)*/}
      <ModalConfig
        className="ModalApp"
        mudarPergunta={setPrefixo}
        open={open}
        close={() => isOpen(false)}
      ></ModalConfig>

      <div className="caixa">
        {/* botao pra abrir as configuracoes */}
        <Header abrirModal={() => isOpen(true)} />
        <div className="caixaPrincipal">
          {/* chat com a resposta do arbitro */}
          <ChatBox resp={prefixoArbitro + respostaArbitro} />

          {/* seletor das ias */}
          <Selects
            id=""
            IA1={IA1}
            IA2={IA2}
            arbitro={arbitro}
            trocarIA1={setIA1}
            trocarIA2={setIA2}
            trocarArbitro={setarbitro}
          />
        </div>
        {/* botao de feedback (so aparece quando todas o arbitro responde) */}
        {todasIASResponderam && (
          <button className="feedbackBtn" onClick={() => setOpenFeedback(true)}>
            Dar Feedback e salvar
          </button>
        )}
        {/* modal pra escrever feedback e salvar */}
        <ModalFeedback
          className="ModalApp"
          open={openFeedback && todasIASResponderam}
          setOpenFeedback={setOpenFeedback}
          feedback={feedback}
          setFeedback={setFeedback}
          salvarEmArquivo={salvarEmArquivo}
        ></ModalFeedback>
        {/* area do usuario perguntar e mandar a resposta */}
        <PerguntaResposta
          id=""
          quest={pergunta}
          answer={resposta}
          setquest={setPergunta}
          setanswer={setResposta}
          checkbox={trocarVerdadeiro}
          bloquearResposta={settrocarVerdadeiro}
          fluxoComunicacao={fluxoComunicacao}
        />
      </div>
    </div>
  );
}
