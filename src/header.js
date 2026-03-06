import React from "react";

export default function Header({ abrirModal }) {
  return (
    <div className="Header">
      <div></div>
      <h3>AlucIA</h3>
      <div>
        <button
          onClick={abrirModal}
          style={{ cursor: "pointer", border: "none", background: "none" }}
        >
          <img
            className="BotaoImagem"
            src="https://img.icons8.com/?size=100&id=2969&format=png&color=000000"
            alt="Logotipo do App"
          />
        </button>
      </div>
    </div>
  );
}
