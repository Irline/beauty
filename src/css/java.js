const track = document.querySelector(".carousel-track");
const slides = Array.from(document.querySelectorAll(".carousel-slide"));
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.querySelector(".carousel-dots");
const carousel = document.querySelector(".carousel");

let index = 0;

// Создаем точки
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);

  dot.addEventListener("click", () => {
    index = i;
    updateSlide();
  });
});

const dots = Array.from(dotsContainer.children);

function updateSlide() {
  const slideWidth = carousel.offsetWidth;
  track.style.transform = `translateX(-${index * slideWidth}px)`;
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  updateSlide();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  updateSlide();
});

setInterval(() => {
  index = (index + 1) % slides.length;
  updateSlide();
}, 4000);

window.addEventListener("resize", updateSlide);
updateSlide();
