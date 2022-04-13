// source: https://www.kirupa.com/html5/drag.htm
import { randomizeItems } from "./randomizeitems.js";

const installServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/service.js')
    } catch (error) {
      console.error(`Registration failed with ${error}`)
    }
  }
}

installServiceWorker()

randomizeItems()

const container = document.querySelector("#field");
let activeItem = null;
let active = false;

const dragStart = (e) => {
  if (e.target !== e.currentTarget) {
    active = true;

    // this is the item we are interacting with
    activeItem = e.target;

    if (activeItem !== null) {
      if (!activeItem.xOffset) {
        activeItem.xOffset = 0;
      }

      if (!activeItem.yOffset) {
        activeItem.yOffset = 0;
      }

      if (e.type === "touchstart") {
        activeItem.querySelector('.poppetje').src = "../images/vasthouden.gif"
        activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
        activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
      } else {
        activeItem.querySelector('.poppetje').src = "../images/vasthouden.gif"

        // if (activeItem.dataset.stars == 0) {
        //   console.log('dood'+activeItem.dataset.stars)
        //   activeItem.querySelector('.avatarImg').src = "../images/hoofdboem.gif"
        //   activeItem.querySelector('.avatarImg').style.transform = 'scale(1.5) translateX(2px)'
        // } else {
        //   console.log('leeft'+activeItem.dataset.stars)
        // }


        activeItem.initialX = e.clientX - activeItem.xOffset;
        activeItem.initialY = e.clientY - activeItem.yOffset;
      }
    }
  }
};

const dragEnd = (e) => {
  if (activeItem !== null) {
    const rectItem = activeItem.getBoundingClientRect();
    activeItem.querySelector('.poppetje').src = "../images/idle.png"
    activeItem.classList.remove('falling')
    activeItem.initialX = activeItem.currentX;
    activeItem.initialY = activeItem.currentY;

    if ( rectItem.bottom / window.innerHeight * 100 < 63 ) {
        console.log('dood');
        activeItem.querySelector('.poppetje').src = "../images/vasthouden.gif"
        activeItem.classList.add('falling')
    }

  } 

  active = false;
  activeItem = null;
};

const drag = (e) => {
  if (active) {
    if (e.type === "touchmove") {
      //Mobile
      const rectItem = activeItem.getBoundingClientRect();
      if (
        rectItem.top > 520 &&
        rectItem.top < 660 &&
        rectItem.left > 180 &&
        rectItem.left < 280
      ) {
        if (!list.includes(activeItem.id)) {
          list.push(activeItem.id);
        }
      }

      e.preventDefault();

      activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
      activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
    } else {
      //Desktop
      const rectItem = activeItem.getBoundingClientRect();

      activeItem.currentX = e.clientX - activeItem.initialX;
      activeItem.currentY = e.clientY - activeItem.initialY;
    }

    activeItem.xOffset = activeItem.currentX;
    activeItem.yOffset = activeItem.currentY;

    setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
  }
};

const setTranslate = (xPos, yPos, el) => {
  const rectItem = activeItem.getBoundingClientRect();
  let scaleyPos = rectItem.top / 670
  let indexPos = rectItem.top / 10 + 2

  if ( scaleyPos < .64 || rectItem.top < 260) {
    scaleyPos = .64;
  }

  if ( indexPos < 1) {
    indexPos = 1;
  }

  el.style.transform =
    "translate3d(" + xPos + "px, " + yPos + "px, 0) scale("+ scaleyPos +")";
  console.log(indexPos.toFixed(0));
  el.style.zIndex = indexPos.toFixed(0);
};

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);