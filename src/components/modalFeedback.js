import React from "react";

export default function ModalFeedback(props) {
  if (!props.open) return null;

  return (
    <div className="modalOverlay">
      <div className="modalFeedback">
        <div className="modalHeader">
          <h2>Feedback</h2>
          <button
            className="closeBtn"
            onClick={() => props.setOpenFeedback(false)}
            aria-label="Fechar modal"
          >
            X
          </button>
        </div>
        <textarea
          placeholder="Digite seu feedback sobre as respostas..."
          value={props.feedback}
          onChange={(e) => props.setFeedback(e.target.value)}
          className="feedbackTextarea"
          style={{ resize: "none" }}
        />
        <div className="modalFooter">
          <button
            style={{ margin: "20px", marginLeft: "0" }}
            onClick={() => {
              props.salvarEmArquivo();
              props.setOpenFeedback(false);
            }}
            className="salvarBtn"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
