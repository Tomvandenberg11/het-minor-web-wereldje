export const randomizeItems = (min, max) => {
    const ball = document.querySelectorAll(".avatar");
    ball.forEach((element) => {
      getRndInteger(min, max);
      element.style.setProperty("--topBallPos", getRndInteger(45, 85));
  
      element.style.setProperty("--leftBallPos", getRndInteger(10, 90) + "vw");

      element.style.setProperty("--ballIndex", getRndInteger(2, ball.length + 1));

      element.style.setProperty("--falltimer", getRndInteger(3000, 6000) + "ms");
    });
  };
  
  const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };