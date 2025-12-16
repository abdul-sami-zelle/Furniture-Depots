import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FaRegWindowMinimize } from "react-icons/fa";
import { faqData } from "../../Data/Data";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Footer from "../Footer/Footer";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Link from "next/link";

const HomeScreen = ({
  onClose,
  onOpenChatUs,
  onFaqClick,
  activeTab,
  onTabClick,
}) => {
  const [isTeamOnline, setIsTeamOnline] = useState(false);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [greeting, setGreeting] = useState("Good Morning!");
  const [allFaqs, setAllFaqs] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  useEffect(() => {
    const flatFaqs = faqData.flatMap(({ category, FAQs }) =>
      FAQs.map((faq) => ({ ...faq, category }))
    );

    setAllFaqs(flatFaqs);
  }, []);

  const groupedFaqs = allFaqs.reduce((acc, faq) => {
    if (!acc[faq.category]) acc[faq.category] = [];
    acc[faq.category].push(faq);
    return acc;
  }, {});

  const allCategoryNames = Object.keys(groupedFaqs);
  const visibleCategoryNames = showAllFaqs
    ? allCategoryNames
    : allCategoryNames.slice(0, 5);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning!");
    else if (hour < 18) setGreeting("Good Afternoon!");
    else setGreeting("Good Evening!");

    const online = Math.random() < 0.6;
    setIsTeamOnline(online);
  }, []);

  // Video
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="home-screen-container-main">
      <div className="home-screen-subcontainer">
        <div className="video-section-wrapper">

            <img
              className="background-placeholder"
              src={`https://devapi.myfurnituremecca.com/uploads/zoe/zoe.jpg`}
              alt="AI Chatbot Placeholder"
            />

          <div className="ai-label" onClick={toggleMute}>
            {!isMuted ? <HiSpeakerWave size={15} color="#6658f1" /> : <HiSpeakerXMark size={15} color="#6658f1" />}
          </div>
          
          <div className="video-overlay-content">
            <div className="headerssss">
              <FaRegWindowMinimize
                className="cross-iconxxxxx"
                onClick={onClose}
              />
            </div>

            <div>
              <div className="greeting">
                <h2>{greeting}</h2>
                <p>How can we help you today?</p>
              </div>

              <div className="ai-button-container" onClick={onOpenChatUs}>
                <div className="btn-overlay"></div>
                <div className="image-with-text">
                  <div className="ai-avatar-image-wrapper">
                    <div className="ai-label-text">AI</div>
                    <div className="online-dot"></div>
                    <div className="avatar-image-inner">
                      <img
                        src={`https://devapi.myfurnituremecca.com/uploads/zoe/zoe.jpg`}
                        alt="AI Avatar"
                        className="avatar-image"
                      />
                    </div>
                  </div>
                  <span className="talk-to-ai-text">
                    Chat with Digital Assistant
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="home-screen-box">

          <Link className="meeting-us-btn" href={'/book-an-appointment'}>
            <p >
              <MdOutlineCalendarToday className="meeting-us-icon" /> Book
              Meeting
            </p>
          </Link>

          
          <div className="support-people-list">
            <h2>Frequently Asked Questions</h2>
            <div className="faq">
              {visibleCategoryNames.map((category) => (
                <div key={category} className="faq-category-group">
                  <div
                    className="faq-category-title"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <span>{category}</span>
                    <span className="faq-toggle-icon">
                      {expandedCategory === category ? (
                        <AiOutlineMinus />
                      ) : (
                        <AiOutlinePlus />
                      )}
                    </span>
                  </div>

                  <div
                    className={`faq-questions-wrapper ${expandedCategory === category ? "open" : ""
                      }`}
                  >
                    <div className="faq-questions">
                      {groupedFaqs[category].map((faq) => (
                        <div
                          key={faq.id}
                          className="faqitem"
                          onClick={() => onFaqClick && onFaqClick(faq)}
                        >
                          {faq.question}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {!showAllFaqs && allCategoryNames.length > 5 && (
              <div
                className="view-all-faqs"
                onClick={() => setShowAllFaqs(true)}
              >
                See More
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer activeTab={activeTab} onTabClick={onTabClick} />
    </div>
  );
};

export default HomeScreen;
