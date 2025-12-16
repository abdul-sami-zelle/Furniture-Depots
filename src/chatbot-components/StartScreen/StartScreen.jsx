import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { IoChatbubbleOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

const StartScreen = ({ onOpen, onChatUsClick, onStartScreenClose, source }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="chatbot-wrapper">
      <div className="chatbot-frame">
        <div className="animated-border">
          <div className="chatbot-inner">

            {/* {!videoLoaded && ( */}
              <img
                className="background-placeholder"
                src={`https://devapi.myfurnituremecca.com/uploads/zoe/zoe.jpg`}
                alt="AI Chatbot Placeholder"
              />

            <div className="ai-label" onClick={toggleMute}>
              {!isMuted ? <HiSpeakerWave size={15} color="#6658f1" /> : <HiSpeakerXMark size={15} color="#6658f1" />}
            </div>
            <RxCross2
              className="RxCross2"
              onClick={(e) => {
                e.stopPropagation();
                onStartScreenClose();
              }}
            />

            <div className="chatbot-content">
              <div className="chatbot-text">We're online!</div>
              <div className="chatbot-buttons">
                <button
                  className="chat-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChatUsClick();
                  }}
                >
                  <IoChatbubbleOutline className="chat-us-icon" />
                  Chat Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
