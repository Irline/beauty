console.log("JS loaded successfully!");

// === Бургер-меню ===
const burger = document.getElementById('burger');
const menu = document.querySelector('.menu');
const submenuLinks = document.querySelectorAll('.has-submenu > a');

// Открытие/закрытие основного меню
if (burger && menu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
  });
}

// Открытие/закрытие подменю при клике
if (submenuLinks.length > 0) {
  submenuLinks.forEach(link => {
    link.addEventListener('click', e => {
      // Отменяем переход по ссылке "#"
      e.preventDefault();

      // Закрываем другие подменю
      submenuLinks.forEach(otherLink => {
        if (otherLink !== link) {
          otherLink.parentElement.classList.remove('show-submenu');
        }
      });

      // Переключаем текущее подменю
      const parent = link.parentElement;
      parent.classList.toggle('show-submenu');
    });
  });
}

// === Карусель (только если элементы существуют) ===
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.querySelector(".carousel-dots");
const carousel = document.querySelector(".carousel");

// Проверяем, есть ли элементы карусели на странице
if (track && slides.length > 0 && prevBtn && nextBtn && dotsContainer && carousel) {
  let index = 0;
  const slidesArray = Array.from(slides);

  // Создаем точки
  slidesArray.forEach((_, i) => {
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
    if (dots[index]) {
      dots[index].classList.add("active");
    }
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % slidesArray.length;
    updateSlide();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + slidesArray.length) % slidesArray.length;
    updateSlide();
  });

  setInterval(() => {
    index = (index + 1) % slidesArray.length;
    updateSlide();
  }, 4000);

  window.addEventListener("resize", updateSlide);
  updateSlide();
}