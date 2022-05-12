import React, { useEffect, useState } from 'react'
import { BsFileEarmarkPlus } from 'react-icons/bs'
import axios from 'axios'

function Home() {
const [perguntas, setPerguntas] = useState([])
const [loading, setLoading] = useState(true)

useEffect(() => {
    axios.get('/perguntas/getQuestions').then(res => {
        setPerguntas(res.data)
        setLoading(false)
    })
}, [])

  return (
    <>
    <div className="container">
      {loading ? (
        <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      ) : (
        <>
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
        </>
      )}
        
      </div>
      <a href="/askAQuestion" className="ask" title="Fazer uma pergunta">
        <BsFileEarmarkPlus className="icon-ask" />
      </a>
    </>
  )
}

export default Home