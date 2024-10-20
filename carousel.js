let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const visibleSlides = 4; // Show 4 slides at a time

function moveSlide(n) {
  currentIndex += n;

  if (currentIndex > totalSlides - visibleSlides) {
    currentIndex = 0; // Loop back to the first slide
  } else if (currentIndex < 0) {
    currentIndex = totalSlides - visibleSlides; // Loop back to the last set of slides
  }

  const offset = -currentIndex * (100 / visibleSlides); // Adjust to fit 4 images
  document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;
}

// Auto Slide Feature (2 seconds)
setInterval(() => {
  moveSlide(1);
}, 2000); // Move every 2 seconds

// Manual Controls
document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
document.querySelector('.next').addEventListener('click', () => moveSlide(1));
