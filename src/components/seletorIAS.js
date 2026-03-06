import React from "react";
export default function Selects(props) {
  function IAselecionada(e) {
    if (e.target.id === "selectIA1") {
      props.trocarIA1(e.target.value);
    } else if (e.target.id === "selectIA2") {
      props.trocarIA2(e.target.value);
    } else {
      props.trocarArbitro(e.target.value);
    }
  }

  return (
    <div className="selects">
      <select id="selectIA1" value={props.IA1} onChange={IAselecionada}>
        <option value="">Escolha a primeira IA</option>
        <option value="Chatgpt">Chat GPT</option>
        <option value="Gemini">Gemini</option>
        <option value="Grok">Grok</option>
        <option value="deepseek">Deepseek</option>
      </select>

      <select id="selectIA2" value={props.IA2} onChange={IAselecionada}>
        <option value="">Escolha a segunda IA</option>
        <option value="Chatgpt">Chat GPT</option>
        <option value="Gemini">Gemini</option>
        <option value="Grok">Grok</option>
        <option value="deepseek">Deepseek</option>
      </select>

      <select id="selectArbitro" value={props.arbitro} onChange={IAselecionada}>
        <option value="">Escolha o Árbitro</option>
        <option value="Chatgpt">Chat GPT</option>
        <option value="Gemini">Gemini</option>
        <option value="Grok">Grok</option>
        <option value="deepseek">Deepseek</option>
      </select>
    </div>
  );
}
