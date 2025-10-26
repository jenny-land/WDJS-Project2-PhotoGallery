/*      V2       */

// getElementById() - Get the lightbox and its elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const imageCaption = document.getElementById('image-caption');

// querySelectorAll() - Get all gallery items
const galleryItems = document.querySelectorAll('.gallery-item');

// Add click event to each gallery item
galleryItems.forEach(function(item) {
    // addEventListener() - Add click event to open lightbox
    item.addEventListener('click', function() {
        // querySelector() - Get the image and caption within this item
        const img = item.querySelector('img');
        const caption = item.querySelector('p');
        
        lightbox.classList.add('active');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        
        // createTextNode() - Create text node for caption
        const captionText = document.createTextNode(caption.textContent);
        imageCaption.textContent = '';
        // appendChild() - Add caption text to lightbox
        imageCaption.appendChild(captionText);
    });
});

// querySelector() - Get close button
const closeBtn = document.querySelector('.close');

// addEventListener() - Close lightbox on click
closeBtn.addEventListener('click', function() {
    lightbox.classList.remove('active');
});

// getElementsByTagName() - Get all images (example usage)
const allImages = document.getElementsByTagName('img');
console.log('Total images on page:', allImages.length);

// getElementsByTagName() - Get all paragraphs (example usage)
const allParagraphs = document.getElementsByTagName('p');
console.log('Total paragraphs:', allParagraphs.length);

/*      V3       */

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  // Wrap around if out of bounds
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  slides.forEach((slide, i) => {
    slide.style.display = (i === currentSlide) ? "block" : "none";
  });
}

function changeSlide(direction) {
  showSlide(currentSlide + direction);
}
function loadSlides() {
  const listContainers = document.querySelectorAll(".list-container");

  listContainers.forEach((listContainer, i) => {
    listContainer.classList.add("hidden")
  });

   const slideshowContainers = document.querySelectorAll(".slideshow-container");

  slideshowContainers.forEach((slideshowContainer, i) => {
    slideshowContainer.classList.remove("hidden")
  });
}


loadSlides()

// Initial display
showSlide(currentSlide);

// V2 -------------------------------------------------------
//
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let current = 0;
  const total = slides.length;

  function goToSlide(index) {
    slides.forEach(slide => {
      slide.classList.remove("active");
    });
    slides[index].classList.add("active");
    current = index;
  }

  function goNext() {
    let nextIndex = (current + 1) % total;
    goToSlide(nextIndex);
  }

  function goPrev() {
    let prevIndex = (current - 1 + total) % total;
    goToSlide(prevIndex);
  }

  nextBtn.addEventListener("click", goNext);
  prevBtn.addEventListener("click", goPrev);

  // Optional: auto-play
  let autoplay = true;
  let interval = 5000;
  if (autoplay) {
    setInterval(goNext, interval);
  }
});