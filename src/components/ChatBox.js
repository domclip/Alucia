import React from "react";
export default function ChatBox(props) {
  return (
    <textarea
      style={{ color: "white" }}
      className="chat"
      value={props.resp || ""}
      readOnly
    />
  );
}
