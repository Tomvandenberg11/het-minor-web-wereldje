export const randomizeItems = (min, max) => {
    const ball = document.querySelectorAll(".avatar");
    const AInummer = '0';
    ball.forEach((element) => {
      getRndInteger(min, max);
      element.style.setProperty("--topBallPos", getRndInteger(15, 85) + "vh");
  
      getRndInteger(min, max);
      element.style.setProperty("--leftBallPos", getRndInteger(10, 90) + "vw");
  
      getRndInteger(min, max);
      element.style.setProperty("--ballIndex", getRndInteger(2, ball.length + 1));

      getRndInteger(min, max);
      element.style.setProperty("--falltimer", getRndInteger(3000, 6000) + "ms");
    });
  };
  
  const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };