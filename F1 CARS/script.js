// script.js

const slides = document.querySelectorAll(".slide");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const currentNum = document.getElementById("current-num");
const totalNum = document.getElementById("total-num");

const progress = document.querySelector(".progress");
const glow = document.querySelector(".bg-glow");

let index = 0;
const totalSlides = slides.length;
totalNum.textContent = `0${totalSlides}`;

/* MAIN UPDATE */
function updateSlide(n){

  slides[index].classList.remove("active");

  if(n >= totalSlides) index = 0;
  else if(n < 0) index = totalSlides - 1;
  else index = n;

  slides[index].classList.add("active");

  /* Motion Blur */
  const car = slides[index].querySelector(".car-img");
  car.classList.add("blur-effect");
  setTimeout(()=> car.classList.remove("blur-effect"), 450);

  /* Counter */
  currentNum.textContent = `0${index+1}`;

  /* Progress */
  const percent = ((index+1)/totalSlides)*100;
  progress.style.width = `${percent}%`;

  /* Accent Theme */
  const accent = slides[index].style.getPropertyValue("--accent");
  document.documentElement.style.setProperty("--current-accent", accent);

  glow.style.background =
    `radial-gradient(circle at top, ${accent}55, transparent 60%)`;

  /* Scramble Text */
  const textEl = slides[index].querySelector(".scramble");
  scrambleText(textEl);
}

/* SCRAMBLE EFFECT */
function scrambleText(element){
  const original = element.innerText;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let i = 0;

  const interval = setInterval(()=>{
    element.innerText = original.split("")
      .map((letter, idx)=>{
        if(idx < i) return original[idx];
        return chars[Math.floor(Math.random()*chars.length)];
      })
      .join("");

    if(i >= original.length) clearInterval(interval);
    i += 0.5;
  },30);
}

/* EVENTS */
nextBtn.addEventListener("click", ()=> updateSlide(index+1));
prevBtn.addEventListener("click", ()=> updateSlide(index-1));

document.addEventListener("keydown",(e)=>{
  if(e.key==="ArrowRight") updateSlide(index+1);
  if(e.key==="ArrowLeft") updateSlide(index-1);
});

/* AUTO PLAY (Advanced Feature) */
setInterval(()=> updateSlide(index+1), 6000);

/* INIT */
updateSlide(0);
