import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { ReactComponent as DiceLogo } from '../assets/icon-dice.svg';

const CardAdvice = () => {
  const initialDataAdvice = {
    id: 0,
    advice: ""
  }
  const [dataAdvice, setDataAdvice] = useState(initialDataAdvice);
  const [startAnimation, setStartAnimation] = useState(false);

  const fetchDataAdvice = (id) => {

    axios.get(`https://api.adviceslip.com/advice/${id}`)
      .then(res => {
        const data = res.data;
        setStartAnimation(true);
        if (data.message) {
          setDataAdvice({
            id: id,
            advice: data.message.text
          });
        } else {
          setDataAdvice(data.slip);

        }

        setTimeout(() => {
          setStartAnimation(false);
        }, 2000)

      })
      .catch(error => {
        console.log(error);
      })

  }

  useEffect(() => {
    fetchDataAdvice(117);
  }, [])

  return (
    dataAdvice?.id > 0 ? (
      <div className={`advice-card cw ${startAnimation ? "anim" : ""}`}>
        <h2>ADVICE #{dataAdvice.id}</h2>
        <p>
          “
          {dataAdvice.advice}
          ”
        </p>
        <div className="separator"></div>
        <button
          className='dice'
          aria-label='dice'
          onClick={() => fetchDataAdvice(Math.floor(Math.random() * 200))}
        >
          <DiceLogo />
        </button>
      </div>
    ) : (
      <div className='advice-card cw'>
        <h2>Loading ...</h2>
        <p>

        </p>
      </div>
    )
  )



}

export default CardAdvice