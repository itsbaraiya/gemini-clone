import React, { useContext, useState } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context';

function Sidebar() {
const [extended, setExtended] = useState(false);
const { onSent, previousPrompts, setRecentPrompt, newChat } = useContext(Context)

const loadPrompt = async (prompt) => { 
    setRecentPrompt(prompt)
    await onSent(prompt)
}

  return (
    <div className='sidebar'>
      <div className="top">    
        <img className='menu' src={assets.menu_icon} alt="" onClick={()=> setExtended(prev =>!prev)} />
        <div className="new-chat" onClick={()=>newChat()}>
          <img className='' src={assets.plus_icon} alt="" />
          {extended?<p>New Chat</p>:null}
        </div>

        {extended?
        <div className="recent">
                <p className='recent-title'>Recent</p>
                {previousPrompts?.map((item, index) => (
                    <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                        <img className='' src={assets.message_icon} alt="" />
                        <p>{item.slice(0, 18)} ...</p>
                    </div>
                ))}

            </div>
        :null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
            <img className='' src={assets.question_icon} alt="" />
            {extended?<p>Help</p>:null}
        </div>
        <div className="bottom-item recent-entry">
            <img className='' src={assets.history_icon} alt="" />
            {extended?<p>Activity</p>:null}
        </div>
        <div className="bottom-item recent-entry">
            <img className='' src={assets.setting_icon} alt="" />
            {extended?<p>Settings</p>:null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
