import React, { useState, useEffect, useRef } from 'react';
import './Remember.css';
const Remember = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const cardsContainerRef = useRef(null);

  const backgroundImages = [
    './image1.png',
    '/image2.png',
    '/image3.png',
    '/image2.png'
  ];
  
  // נתוני כרטיסי הזיכרון
  const memorialCards = [
    {
      title: "אל\"מ רועי יוסף לוי ז\"ל",
      description: "לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. לאמית לפרומי בלוף קינץ תתיח לרעח. לת צשחמי צש מנכם למטכין נשואי מורך.",
      fullDescription: "לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. לאמית לפרומי בלוף קינץ תתיח לרעח. לת צשחמי צש מנכם למטכין נשואי מנורך. גולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, ושבעגט ליבם סולגק. בראיט ולחת צורק מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג ישבעס.",
      image: "/roei.png"
    },
    {
      title: "סמ״ר ניסים מיטל",
      description: "מונחף בגורריש ועמעם מונבאזיטרם סולגק. סתוטם ניחא, לכנוץ בעריר גק ליץ, ומעיוט לפוס בסורשט לתיג ברורק.",
      fullDescription: "מונחף בגורריש ועמעם מונבאזיטרם סולגק. סתוטם ניחא, לכנוץ בעריר גק ליץ, ומעיוט לפוס בסורשט לתיג ברורק. להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר, בנפת נפקט למסון בלרק.",
      image: "/nisim.jpg"
    },
    {
      title: "סגן יונתן גוטין ז״ל",
      description: "להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי סחטיר בלובק.",
      fullDescription: "להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי סחטיר בלובק. אבל יאקרשס לפאמם בלינך רוגצה. לפמעט מוסן מנת. להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים.",
      image: "/yoni.png"
    },
    {
      title: "סגן יונתן גוטין ז״ל",
      description: "להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי סחטיר בלובק.",
      fullDescription: "להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי סחטיר בלובק. אבל יאקרשס לפאמם בלינך רוגצה. לפמעט מוסן מנת. להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים.",
      image: "/yoni.png"
    },
    {
      title: "סרן יהונתן קרן ז״ל",
      description: "תצטנפל בלינדו למרקל אס לכימפו דול, צוט ונחית. קוויז דומור ליאמום בלינך רוגצה. לפמעט מוסן מנת.",
      fullDescription: "תצטנפל בלינדו למרקל אס לכימפו דול, צוט ונחית. קוויז דומור ליאמום בלינך רוגצה. לפמעט מוסן מנת. נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר, בנפת נפקט למסון בלרק - וענוף לפרומי בלוף קינץ תתיח לרעח. לת צשחמי צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק.",
      image: "/roei.png"
    }
  ];

  // Function to handle action button click
  const handleActionButtonClick = (action, e) => {
    e.stopPropagation(); 
    console.log(`${action} button clicked for:`, selectedCard.title);
    // Add your specific action logic here
  };

  // Effect for background image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Effect for handling screen resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // טיפול לחיצה על כרטיס
  const handleCardClick = (index) => {
    setActiveCardIndex(index);
    scrollToCard(index);
    // Open modal with full details
    setSelectedCard(memorialCards[index]);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedCard(null);
  };

  const scrollToCard = (index) => {
    if (!cardsContainerRef.current) return;
    
    const container = cardsContainerRef.current;
    const cards = Array.from(container.children);
    
    if (!cards[index]) return;
    
    const card = cards[index];
    
    const containerCenter = container.offsetWidth / 2;
    const cardCenter = card.offsetWidth / 2;
    
    const scrollPosition = card.offsetLeft - containerCenter + cardCenter;
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  };

  const scrollCards = (direction) => {
    if (!cardsContainerRef.current) return;
    
    const container = cardsContainerRef.current;
    const currentScroll = container.scrollLeft;
    const cardWidth = 300 + 30;

    const scrollAmount = direction === 'right' ? -cardWidth : cardWidth;
    
    container.scrollTo({
      left: currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  };

  const getBackgroundStyle = (image) => {
    // For ultra-wide screens, use cover with custom positioning
    if (screenWidth > 1920) {
      return { 
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      };
    }
    
    // Default style
    return { backgroundImage: `url(${image})` };
  };

  return (
    <section className="rememb-section">
      {/* Background slider */}
      <div className="hero-background-containerr">
        {backgroundImages.map((bgImage, index) => (
          <div
            key={index}
            className={`hero-background ${index === currentBgIndex ? 'active' : ''}`}
            style={getBackgroundStyle(bgImage)}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="hero-container">
        <div className="hero-content">
          <div className="logo-container">
            <img src="/logo.png" alt="Military Emblem" className="logounit" />
          </div>
         
          <h1 className="hero-title">עמוד יזכור</h1>
          <p className="hero-description"> עמוד "יזכור" נועד להנצחת זכרם של נופלים, חללים או דמויות יקרות ללב שנפטרו. העמוד מהווה מקום שקט ומכובד שבו גולשים יכולים להתחבר לזיכרון, להדליק נר וירטואלי, לקרוא אודות חייהם ופועלם של המונצחים, ולשתף זיכרונות אישיים.

אתר ניהול הידע של היחידה הרב ממדית המאגד את כלל הנהלים , הפקודות והתרבות הארגונית של היחידה.
          </p>
        </div>
      </div>

      {/* Memorial Cards Section */}
      <div className="memorial-cards-wrapper">
        <div className='rem-die'>
        <p className="rem-description">לזכרם של הנופלים</p>
        <div className="candle">
            <img src="./candle.png" alt="Military Emblem" className="candlelogo" />
          </div>
        </div>
        
        
        <div className="memorial-cards-container">
          <button 
            className="scroll-button scroll-left" 
            onClick={() => scrollCards('left')}
            aria-label="גלול שמאלה"
          >
            &#10095;
          </button>
          
          <div className="memorial-cards-scroll" ref={cardsContainerRef}>
            {memorialCards.map((card, index) => (
              <div 
                className={`memorial-card ${activeCardIndex === index ? 'active' : ''}`}
                key={index}
                onClick={() => handleCardClick(index)}
                role="button"
                tabIndex="0"
                aria-label={`כרטיס זיכרון של ${card.title}`}
              >
                <div className="memorial-card-picture">
                  <img src={card.image} alt={card.title} />
                  
                  <img
                    src="/candle.png"
                    alt="נר נשמה"
                    className="ner-candle"
                  />
                </div>
                
                <div className="memorial-card-info">
                  <h3 className="memorial-card-title">{card.title}</h3>
                  <p className="memorial-card-description">{card.description}</p>
                </div>
              </div>
            ))}
            </div>

          
          <button 
            className="scroll-button scroll-right" 
            onClick={() => scrollCards('right')}
            aria-label="גלול ימינה"
          >
            &#10094;
          </button>
        </div>
        
        {/* Indicator dots for card groups */}
        <div className="cards-indicator">
          {memorialCards.map((_, index) => (
            <div 
              key={index} 
              className={`indicator-dot ${activeCardIndex === index ? 'active' : ''}`}
              onClick={() => {
                setActiveCardIndex(index);
                scrollToCard(index);
              }}
              role="button"
              tabIndex="0"
              aria-label={`עבור לכרטיס ${index + 1}`}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Memorial Card Modal */}
      {showModal && selectedCard && (
        <div className="memorial-modal-overlay" onClick={closeModal}>
          <div className="memorial-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={closeModal} aria-label="סגור">×</button>
            
            <div className="memorial-modal-content">
              <div className="memorial-modal-image">
                <img src={selectedCard.image} alt={selectedCard.title} />
              </div>
              
              <div className="memorial-modal-info">
                <h2 className="memorial-modal-title">{selectedCard.title}</h2>
                <div className="memorial-modal-description">
                  <p>{selectedCard.fullDescription}</p>
                </div>
                
                {/* 3 buttons in a row at the bottom of the modal */}
                <div className="modal-buttons-container">
                  <button 
                    className="modal-action-button"
                    onClick={(e) => handleActionButtonClick('תחקיר', e)}>
                    לתחקיר
                  </button>
                  <button 
                    className="modal-action-button"
                    onClick={(e) => handleActionButtonClick('הנצחה', e)}>
                    לסיפור חייו
                  </button>
                  <button 
                    className="modal-action-button"
                    onClick={(e) => handleActionButtonClick('שיתוף', e)}>
                    מקום מנוחתו
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Remember;