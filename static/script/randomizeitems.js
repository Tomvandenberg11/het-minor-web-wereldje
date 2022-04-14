export const randomizeItems = (min, max) => {
    const ball = document.querySelectorAll(".avatar");
    ball.forEach((element) => {
      getRndInteger(min, max);
      element.style.setProperty("--topBallPos", getRndInteger(54, 85));
  
      element.style.setProperty("--leftBallPos", getRndInteger(5, 90) + "vw");

      element.style.setProperty("--falltimer", getRndInteger(3000, 6000) + "ms");

      element.style.setProperty("--Alienturner", getRndInteger(-840, 840) + "deg");

      element.style.setProperty("--walkingLeft", getRndInteger(10, 90));
      
      element.style.setProperty("--transitionWalkingTime", getRndInteger(30, 50));

        const lopen = () => {
          setTimeout(() => {
            element.classList.add('avatarLopen')
            element.querySelector('.poppetje').src = "../images/lopen"+ getRndInteger(1, 6) +".gif"
            setTimeout(() => {
              element.style.setProperty("--walkingLeft", getRndInteger(10, 90));
              element.style.setProperty("--transitionWalkingTime", getRndInteger(30, 50));
              lopen()
            }, getRndInteger(1000, 15000));
          }, getRndInteger(9000, 30000));
        }
        lopen()
      });
  };
  
  const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };