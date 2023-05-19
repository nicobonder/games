import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import youwin from "../assets/youWin.gif"
import { useNavigate } from "react-router-dom";

const IMAGES = [
  "https://icongr.am/jam/google.svg?size=128&color=f038b6",
  "https://icongr.am/jam/instagram.svg?size=128&color=f038b6",
  "https://icongr.am/jam/linkedin.svg?size=128&color=f038b6",
  "https://icongr.am/jam/messenger.svg?size=128&color=f038b6",
  "https://icongr.am/jam/napster.svg?size=128&color=f038b6",
  "https://icongr.am/jam/opera.svg?size=128&color=f038b6",
  "https://icongr.am/jam/shopify.svg?size=128&color=f038b6",
  "https://icongr.am/jam/spotify.svg?size=128&color=f038b6",
  "https://icongr.am/jam/stackoverflow.svg?size=128&color=f038b6",
  "https://icongr.am/jam/trello.svg?size=128&color=f038b6",
  "https://icongr.am/jam/twitch.svg?size=128&color=f038b6",
  "https://icongr.am/jam/twitter.svg?size=128&color=f038b6",
  "https://icongr.am/jam/vimeo.svg?size=128&color=f038b6",
  "https://icongr.am/jam/wordpress.svg?size=128&color=f038b6",
  "https://icongr.am/jam/youtube.svg?size=128&color=f038b6",

  // ].flatMap((image) => [image, image])
]
  .flatMap((image) => [`a|${image}`, `b|${image}`]) //esto sirve para poder distinguir cual
  // de las 2 es la que estoy dando vueltas
  //pero eso hace q ahora la url quede mal, asi que hay que hacer un split
  .sort(() => Math.random() - 0.5); //para que se ordenen de forma random
//flatMap es una funcion que nos permite hacer un flat de un array. Permite tomar los elementos,
//y hacer un solo nivel de todos los niveles que tengo que devolver.
//si tengo una array de varios niveles, la transforma en una array de un solo nivel.
//en este caso la uso para que devuelva dos veces la misma imagen.

export default function MemoBrand() {
  const [guessed, setGuessed] = useState([]); //son los que ya adivine y tienen que quedar mostrandose
  const [selected, setSelected] = useState([]); //se dan vuelta temporalmente
  const [resetGame, setResetGame] = useState(false);

   const navigate = useNavigate();

  const gotoMemoTech = () => {
    navigate("/memotech");
  };
  const gotoMemoFood = () => {
    navigate("/memofood");
  };

  const youWin = () => {
    Swal.fire({
      imageUrl: youwin,
      imageHeight: 150,
      imageWidth: 200,
      imageAlt: "You win!.",
      title: "You Win!",
      html: "<h3>Congrats! You Win!</h3>",
      footer: "<p>Keep playing with us.</p>",
      showConfirmButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Se hace clic en el botón "Ok"
        setResetGame(true);
      }
    });
  };

  //Necesito que solo me permita dar vuelta 2 cartas
  useEffect(() => {
    if (selected.length === 2) {
      if (selected[0].split("|")[1] === selected[1].split("|")[1]) {
        //si las 2 cartas son iguales, las concateno en guessed
        setGuessed((guessed) => guessed.concat(selected));
      }
      setTimeout(() => setSelected([]), 1200); //si no pongo el setTimeout, sino son iguales las cartas
      //borra la primera antes de q de vuelta la segunda
      //limpio los selected despues de 2 segundos
    }
  }, [selected]);

  useEffect(() => {
    if (resetGame) {
      setGuessed([]);
      setSelected([]);
      setResetGame(false); // Desactivar el reinicio del juego
    }
  }, [resetGame]);

  useEffect(() => {
    if(guessed.length === IMAGES.length) {
      youWin()
    } 
  }, [guessed])

  return (
    <>
      <h1 style={{ textAlign: "center", margin: 14 }}>MEMOBRAND</h1>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, minmax(128px, 1fr))",
          gap: 14,
          marginBottom: 24,
          justifyContent: "center",
        }}
      >
        {IMAGES.map((image) => {
          const [, url] = image.split("|"); //hago el split para poder tomar
          //como url lo que esta despues del |
          return (
            <li
              key={image}
              style={{
                padding: 16,
                width: 95,
                cursor: "pointer",
                border: "1px solid #20dcdf",
                borderRadius: 6,
              }}
              onClick={() =>
                selected.length < 2 &&
                setSelected((selected) => selected.concat(image))
              }
              //con selected.length < 2 digo que solo puedo hacer click si no hay + de 2 cartas dadas vueltas
            >
              {selected.includes(image) || guessed.includes(image) ? (
                <img src={url} alt='icon' />
              ) : (
                <img
                  alt='icon'
                  src='https://icongr.am/jam/apple.svg?size=128&color=20dcdf'
                />
              )}
            </li>
          );
        })}
      </ul>

      <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
        <button
          className="btn_brand"
          style={{
            height: 40,
            width: 95,
            borderRadius: 8,
            border: "1px solid black",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "2px 2px 2px #0bbcbf",
            color: "black",
            transition: "background 0.3s ease-in-out, color 0.3s ease-in-out",
            marginBottom: 12
            
          }}
          onClick={gotoMemoTech}
        >
          MemoTech
        </button>

        <button
          className="btn_brand"
          style={{
            height: 40,
            width: 95,
            borderRadius: 8,
            border: "1px solid black",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "2px 2px 2px #0bbcbf",
            color: "black",
            transition: "background 0.3s ease-in-out, color 0.3s ease-in-out",
            
          }}
          onClick={gotoMemoFood}
        > MemoFood
          </button>
      </div>

    </>
  );
}
