import api from "./../api.js";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import axios from "axios";

function Home() {
  const [perguntas, setPerguntas] = useState([]);
  const [logged, setLogged] = useState(null);
  const [login, setLogin] = useState("");

  useEffect(() => {
    async function a() {
      api
        .get("/perguntas/getQuestions")
        .then((res) => {
          setPerguntas(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      //Autenticação de usuario
      if (Cookies.get("user_id") && Cookies.get("token")) {
        let id = Cookies.get("user_id");
        let token = Cookies.get("token");
        //Decodificando o token e buscando as informações no DB
        let user = jwt.decode(token, process.env.JWT_SECRET);
        if (user.id == id) {
          let infos = {
            id: user.id,
            email: user.email,
          };
          await api.post("/getUser", infos).then((res) => {
            setLogin(res.data);
          });
          setLogged(true);
        } else {
          setLogged(false);
        }
      } else {
        setLogged(false);
      }
    }
    a();
  }, []);

  function signout() {
    Cookies.remove("user_id")
    Cookies.remove("token")
    window.location.reload()
  }
  return (
    <>
      {logged ? (
        <nav className="nav2">
          <h1 className="logo">AnsTion</h1>
          <div className="user-name">
            <p className="signin-1">
              <BiUserCircle />
              {login.name}
            </p>
            <ul className="dropdown-content">
              <a href={`/profile/${login.id}`} className="link-pro">Perfil</a>
              <p onClick={signout} className="pointer" >Sair</p>
            </ul>
          </div>
        </nav>
      ) : (
        <nav className="nav1">
          <button
            className="btn-login"
            onClick={() => (window.location.href = "/login")}
          >
            Entrar
          </button>
        </nav>
      )}

      <div className="container">
        {perguntas.map((pergunta) => (
          <div className="container-p" key={pergunta.id}>
            <a href={`/pergunta/${pergunta.id}`}>
              <h2 className="per-title">
                {`${pergunta.pergunta}`.substring(0, 33)}
              </h2>
            </a>
            <button
              className="btn-res"
              onClick={() =>
                (window.location.href = `/pergunta/${pergunta.id}`)
              }
            >
              Responder
            </button>
          </div>
        ))}
      </div>
      <a href="/askAQuestion" className="ask" title="Fazer uma pergunta">
        <BsFileEarmarkPlus className="icon-ask" />
      </a>
    </>
  );
}

export default Home;
