import React from "react";
import { useNavigate } from "react-router-dom";

import '../styles/memo.css';

export default function Memotest() {
  const navigate = useNavigate();

  const gotoMemoTech = () => {
    navigate("/memotech");
  };

  const gotoMemoFood = () => {
    navigate("/memofood");
  };


  const gotoMemoBrand = () => {
    navigate("/memobrand");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: 24 }}>Choose your Memotest</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
        <button
          className="btn_memo"
          style={{
            height: 40,
            width: 95,
            borderRadius: 8,
            border: "1px solid black",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "2px 2px 2px red",
            color: "white",
            transition: "background 0.3s ease-in-out, color 0.3s ease-in-out",
            
          }}
          onClick={gotoMemoTech}
        >
          MemoTech
        </button>
        <button
          className="btn_memo"
          style={{
            height: 40,
            width: 95,
            borderRadius: 8,
            border: "1px solid black",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "2px 2px 2px red",
            color: "white",
            transition: "background 0.3s ease-in-out, color 0.3s ease-in-out",
          }}
          onClick={gotoMemoFood}
        >
          MemoFood
        </button>

        <button
          className="btn_memo"
          style={{
            height: 40,
            width: 95,
            borderRadius: 8,
            border: "1px solid black",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "2px 2px 2px red",
            color: "white",
            transition: "background 0.3s ease-in-out, color 0.3s ease-in-out",
            
          }}
          onClick={gotoMemoBrand}
        > MemoBrand
          </button>
      </div>
    </div>
  );
}
