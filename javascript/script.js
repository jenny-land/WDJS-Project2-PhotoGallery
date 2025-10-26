document.addEventListener("DOMContentLoaded", function () {
  // Add class to body to enable carousel mode
  document.body.classList.add("js-enabled");

  // Get all the elements we need
  const allSlides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const categoryBtns = document.querySelectorAll(".category-btn");
  
  // Track current state
  let currentCategory = "red";
  let currentIndex = 0;
  let categorySlides = [];
  let autoplayInterval;

  // Filter slides by category
  function filterSlidesByCategory(category) {
    categorySlides = Array.from(allSlides).filter(
      slide => slide.getAttribute("data-category") === category
    );
    return categorySlides;
  }

  // Show specific slide
  function goToSlide(index) {
    // Remove active class from all slides in current category
    categorySlides.forEach(slide => {
      slide.classList.remove("active");
    });
    // Add active class to the slide we want to show
    if (categorySlides[index]) {
      categorySlides[index].classList.add("active");
      currentIndex = index;
    }
  }

  // Navigate to next slide
  function goNext() {
    let nextIndex = (currentIndex + 1) % categorySlides.length;
    goToSlide(nextIndex);
  }

  // Navigate to previous slide
  function goPrev() {
    let prevIndex = (currentIndex - 1 + categorySlides.length) % categorySlides.length;
    goToSlide(prevIndex);
  }

  // Switch category
  function switchCategory(category) {
    // Stop autoplay
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }

    // Hide all slides
    allSlides.forEach(slide => {
      slide.classList.remove("active");
    });

    // Update current category
    currentCategory = category;
    currentIndex = 0;

    // Filter and show new category
    filterSlidesByCategory(category);
    goToSlide(0);

    // Update button states
    categoryBtns.forEach(btn => {
      btn.classList.remove("active");
      if (btn.getAttribute("data-category") === category) {
        btn.classList.add("active");
      }
    });

    // Restart autoplay
    startAutoplay();
  }

  // Start autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(goNext, 5000);
  }

  // Event listeners for navigation buttons
  nextBtn.addEventListener("click", function() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
    goNext();
    startAutoplay();
  });

  prevBtn.addEventListener("click", function() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
    goPrev();
    startAutoplay();
  });

  // Event listeners for category buttons
  categoryBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      const category = this.getAttribute("data-category");
      switchCategory(category);
    });
  });

  // Initialize - start with red category
  filterSlidesByCategory(currentCategory);
  goToSlide(0);
  startAutoplay();
});