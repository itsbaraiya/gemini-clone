import React, { useContext } from 'react'
import './main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

function main() {
    
const {onSent, recentPrompt,showResult,loading, resultData,setInput, input} = useContext(Context)

  return (
    <div className='main'>
      <div className="nav">
        <p>GEMINI</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult
        ?<>
        <div className="greet">
            <p><span>Hello Developer,</span></p>
            <p>How Can I Help You Today?</p>
        </div>
        <div className="cards">
    {[
        { text: "Suggest Beautiful places to go with your friends...", icon: assets.compass_icon },
        { text: "Briefly Tell: Will Ai takeover the world and it's future??", icon: assets.bulb_icon },
        { text: "Brainstorm team bonding activities and how to improve your coding skills...", icon: assets.message_icon },
        { text: "Suggest some programming tips to improve your programming...", icon: assets.code_icon },
    ].map((card, index) => (
        <div key={index} onClick={() => onSent(card.text)} className="card">
            <p>{card.text}</p>
            <img src={card.icon} alt="" />
        </div>
    ))}
</div>

        </>
        :<div className="result">
            <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading? 
                <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                </div> 
                :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
            </div>
        </div>
        }      
        <div className="main-bottom">
            <div className="search-box">
                <input type="text" onChange={(e) =>setInput(e.target.value)} value={input} placeholder='Enter Prompt Here' />
                <div className="">
                    <img onClick={()=> onSent()} src={assets.send_icon} alt="" />
                </div>
            </div>
            <p className='bottom-info'>
                Gemini may display in appropriate info about people, places or any other topics so please double check.
            </p>
        </div>
      </div>
    </div>
  )
}

export default main
