import React from "react";

export default function PerguntaResposta(props) {
  function bloquearCampo(e) {
    props.bloquearResposta(e.target.checked);
  }
  return (
    <div className="campo">
      <div className="input">
        <input
          type="text"
          placeholder="pergunta:"
          className="perguntaResposta"
          value={props.quest}
          onChange={(e) => props.setquest(e.target.value)}
        />
        <input
          disabled={!props.checkbox}
          type="text"
          placeholder="resposta:"
          className="perguntaResposta"
          value={props.answer}
          onChange={(e) => props.setanswer(e.target.value)}
        />
      </div>
      <div>
        <button className="enviar" onClick={() => props.fluxoComunicacao()}>
          enviar
        </button>
        <br />
        <input
          type="checkbox"
          className="checkBox"
          checked={props.checkbox}
          onChange={bloquearCampo}
        />
      </div>
    </div>
  );
}
