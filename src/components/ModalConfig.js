import React from "react";

export default function ModalConfig(props) {
  if (!props.open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#252533",
          width: "90%",
          maxWidth: "360px",
          height: "360px",
          position: "relative",
        }}
      >
        <button
          onClick={props.close}
          style={{
            position: "absolute",
            width: "40px",
            height: "30px",
            top: "12px",
            right: "12px",
            cursor: "pointer",
            border: "none",
            borderRadius: "5px",
          }}
        >
          X
        </button>
        <input
          type="text"
          placeholder="Defina o prefixo da pergunta"
          style={{
            marginTop: "140px",
            width: "80%",
            marginLeft: "7%",
            borderRadius: "8px",
            padding: "8px",
            border: "none",
          }}
          onChange={(e) => props.mudarPergunta(e.target.value)}
        ></input>
        <button
          onClick={() =>
            props.mudarPergunta(
              "responda como se fosse um estudante do ensino medio tecnico de forma resumida, em ate 5 linhas, sem girias antigas, com tom humanizado, sem girias e sem emojis para a seguinte pergunta: ",
            )
          }
          style={{
            marginTop: "10px",
            width: "80%",
            marginLeft: "9%",
            borderRadius: "8px",
            padding: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Voltar ao padrao
        </button>
      </div>
    </div>
  );
}