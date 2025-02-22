import React from 'react';

const Home = () => {
  return (
    <>
      {/* Define Fonts & Animations Using CSS */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Jockey+One&family=Josefin+Sans:wght@400;700&display=swap');

          .font-jockey {
            font-family: 'Jockey One', sans-serif;
          }

          .font-josefin {
            font-family: 'Josefin Sans', sans-serif;
          }

          /* Animations */
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes glowPulse {
            0% {
              text-shadow: 0 0 4px rgba(255, 255, 255, 0.45);
            }
            50% {
              text-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
            }
            100% {
              text-shadow: 0 0 4px rgba(255, 255, 255, 0.45);
            }
          }

          .animate-fadeInFirst {
            animation: fadeInDown 1s ease-out 0.5s backwards, glowPulse 3s infinite;
          }

          .animate-fadeInSecond {
            animation: fadeInDown 1s ease-out 0.7s backwards, glowPulse 3s infinite;
          }

          .animate-fadeInText {
            animation: fadeInDown 1s ease-out 0.9s backwards;
          }
        `}
      </style>

      {/* Home Component Content */}
      <div className="flex flex-col justify-center items-center fixed inset-0 pt-[150px] pb-[160px]">
        <h1 className="text-[140px] font-[400] leading-[0.88] font-jockey text-[#c7c7c7] animate-fadeInFirst">
          FINE ARTS
        </h1>
        <h1 className="text-[140px] font-[400] leading-[0.88] font-jockey text-[#8a8a8a] animate-fadeInSecond">
          SOCIETY
        </h1>
        <p className="mt-4 text-[2em] font-josefin text-[#c7c7c7] animate-fadeInText">
          Where The Creativity Begins
        </p>
      </div>
    </>
  );
};

export default Home;
