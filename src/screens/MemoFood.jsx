import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import youwin from "../assets/youWin.gif"
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

// ].flatMap((image) => [image, image]) 
].flatMap((image) => [`a|${image}`, `b|${image}`]) //esto sirve para poder distinguir cual
                                                // de las 2 es la que estoy dando vueltas
                                                //pero eso hace q ahora la url quede mal, asi que hay que hacer un split
  .sort(() => Math.random() - 0.5); //para que se ordenen de forma random
//flatMap es una funcion que nos permite hacer un flat de un array. Permite tomar los elementos, 
//y hacer un solo nivel de todos los niveles que tengo que devolver.
//si tengo una array de varios niveles, la transforma en una array de un solo nivel.
//en este caso la uso para que devuelva dos veces la misma imagen.

export default function MemoFood() {
  const [guessed, setGuessed] = useState([]); //son los que ya adivine y tienen que quedar mostrandose
  const [selected, setSelected] = useState([]); //se dan vuelta temporalmente
  const navigate = useNavigate();

  const gotoMemoTech = () => {
    navigate("/memotech");
  };
  const gotoMemoBrand = () => {
    navigate("/memobrand");
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
      showConfirmButton: true // Agregamos esta opción
    }).then((result) => {
      if (result.isConfirmed) {
        // Se ha hecho clic en el botón "Ok"
        location.reload();
      }
    });
  };

  //Necesito que solo me permita dar vuelta 2 cartas
  useEffect(() => {
   if(selected.length === 2) {
       if(selected[0].split("|")[1] === selected[1].split("|")[1]) { //si las 2 cartas son iguales, las concateno en guessed
        setGuessed((guessed) => guessed.concat(selected)); 
       }
       setTimeout(() => setSelected([]), 1200);//si no pongo el setTimeout, sino son iguales las cartas
                        //borra la primera antes de q de vuelta la segunda
                        //limpio los selected despues de 2 segundos
       }  
  }, [selected])

  useEffect(() => {
    if(guessed.length === IMAGES.length) {
      alert("You Win!");
      location.reload();
    } 
  }, [guessed])

  // const [images, setImages] = useState(IMAGES);

  return (
    <>
      <h1 style={{textAlign: "center",  margin: 14}}>MEMOFOOD</h1>
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
          const [, url] = image.split("|"); //hago el split para poder tomar 
                                            //como url lo que esta despues del |
          return (
          <li 
            key={image} 
            style={{padding: 16, width: 118, cursor: "pointer", border:"1px solid #eee617", borderRadius: 6}}
            onClick={() => selected.length < 2 && setSelected((selected) => selected.concat(image))} 
                        //con selected.length < 2 digo que solo puedo hacer click si no hay + de 2 cartas dadas vueltas
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
          )
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
            transition: "background 0.3s ease-in-out, color 0.3s ease-in-out",
            marginBottom: 12
            
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
            transition: "background 0.3s ease-in-out, color 0.3s ease-in-out",
            
          }}
          onClick={gotoMemoBrand}
        > MemoBrand
          </button>
      </div>

    </>
  );
}
