import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import youwin from "../assets/youWin.gif";
import { useNavigate } from "react-router-dom";
import '../styles/memo.css';

const IMAGES = [
  "https://icongr.am/fontawesome/apple.svg?size=128&color=f3f1f1",
  "https://icongr.am/fontawesome/beer.svg?size=128&color=f3f1f1",
  "https://icongr.am/fontawesome/birthday-cake.svg?size=128&color=f3f1f1",
  "https://icongr.am/fontawesome/cutlery.svg?size=128&color=f3f1f1",
  "https://icongr.am/jam/pizza-slice.svg?size=128&color=f3f1f1",
  "https://icongr.am/clarity/fish.svg?size=128&color=f3f1f1",
  "https://icongr.am/clarity/savings.svg?size=128&color=f3f1f1",
  "https://icongr.am/material/bowl-mix.svg?size=128&color=f3f1f1"

].flatMap((image) => [`a|${image}`, `b|${image}`])
  .sort(() => Math.random() - 0.5); 

  export default function MemoFood() {
    const [guessed, setGuessed] = useState([]);
    const [selected, setSelected] = useState([]);
    const [resetGame, setResetGame] = useState(false);
    const [shuffledImages, setShuffledImages] = useState([]);
  
    const navigate = useNavigate();
  
    const gotoMemoTech = () => {
      navigate("/memotech");
    };
  
    const gotoMemoBrand = () => {
      navigate("/memobrand");
    };
  
    useEffect(() => {
      if (selected.length === 2) {
        if (selected[0].split("|")[1] === selected[1].split("|")[1]) {
          setGuessed((guessed) => guessed.concat(selected));
        }
        setTimeout(() => setSelected([]), 1200);
      }
    }, [selected]);
  
    function youWin() {
      Swal.fire({
        imageUrl: youwin,
        imageHeight: 150,
        imageWidth: 200,
        imageAlt: "You win!.",
        title: "You Win!",
        html: "<h3>Congrats! You Win!</h3>",
        footer: "<p>Keep playing with us.</p>",
        showConfirmButton: true,
        confirmButtonText: "Restart",
        confirmButtonColor: "#d5ce0b",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
  
    useEffect(() => {
      if (guessed.length === IMAGES.length) {
        youWin();
      }
    }, [guessed]);
  
    useEffect(() => {
      if (resetGame) {
        setGuessed([]);
        setSelected([]);
        setResetGame(false);
      }
    }, [resetGame]);
  
    useEffect(() => {
      setShuffledImages(shuffleArray(IMAGES));
    }, []);
  
    const shuffleArray = (array) => {
      const shuffledArray = array.slice();
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ];
      }
      return shuffledArray;
    };
    
    return (
      <>
        <h1 style={{ textAlign: "center", margin: 14 }}>MEMOFOOD</h1>
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(128px, 1fr))",
            gap: 14,
            marginBottom: 24,
            justifyContent: "center",
          }}
        >
          {IMAGES.map((image) => {
            const [, url] = image.split("|");
            return (
              <li
                key={image}
                style={{
                  padding: 16,
                  width: 118,
                  cursor: "pointer",
                  border: "1px solid #eee617",
                  borderRadius: 6,
                }}
                onClick={() =>
                  selected.length < 2 &&
                  setSelected((selected) => selected.concat(image))
                }
              >
                {selected.includes(image) || guessed.includes(image) ? (
                  <img src={url} alt="icon" />
                ) : (
                  <img
                    alt="icon"
                    src="https://icongr.am/clarity/favorite.svg?size=128&color=eee617"
                  />
                )}
              </li>
            );
          })}
        </ul>
  
        <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
          <button
            className="btn_food"
            style={{
              height: 40,
              width: 95,
              borderRadius: 8,
              border: "1px solid black",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              boxShadow: "2px 2px 2px #d5ce0b",
              color: "black",
              transition:
                "background 0.3s ease-in-out, color 0.3s ease-in-out",
              marginBottom: 12,
            }}
            onClick={gotoMemoTech}
          >
            MemoTech
          </button>
  
          <button
            className="btn_food"
            style={{
              height: 40,
              width: 95,
              borderRadius: 8,
              border: "1px solid black",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              boxShadow: "2px 2px 2px #d5ce0b",
              color: "black",
              transition:
                "background 0.3s ease-in-out, color 0.3s ease-in-out",
            }}
            onClick={gotoMemoBrand}
          >
            MemoBrand
          </button>
        </div>
      </>
    );
  }