// Mobile Toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navWrapper = document.getElementById("nav-wrapper");

  if (menuToggle && navWrapper) {
    function toggleMenu() {
      navWrapper.classList.toggle("active");
      menuToggle.classList.toggle("active");
    }

    menuToggle.addEventListener("click", toggleMenu);
  } else {
    console.error("menuToggle or navWrapper element not found");
  }
});

// Add To Card 
document.addEventListener("DOMContentLoaded", function () {
    const productCards = document.querySelectorAll(".product-card");
    const showMoreBtn = document.querySelector(".show-more");
    const hiddenCards = Array.from(productCards).slice(4); // Get cards 5-8

    hiddenCards.forEach(card => {
        card.style.display = "none"; // Keep initially hidden
    });

    showMoreBtn.addEventListener("click", function () {
        hiddenCards.forEach((card, index) => {
            card.style.display = "block"; // Ensure it's in the DOM
            setTimeout(() => {
                card.classList.add("fade-in");
            }, index * 100); // Staggered effect
        });

        showMoreBtn.classList.add("fade-out");
        setTimeout(() => showMoreBtn.style.display = "none", 500); // Hide smoothly
    });
});


class ShoppingCart {
    constructor() {
        this.cartValueElements = document.querySelectorAll("#value"); // Select all elements with id "value"
        this.cartButtons = document.querySelectorAll(".add-to-cart");
        this.cartItems = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from local storage

        this.init();
    }

    // Initialize cart state
    init() {
        this.updateCartUI();
        this.addEventListeners();
    }

    // Attach event listeners to all product buttons
    addEventListeners() {
        this.cartButtons.forEach((button) => {
            const productId = button.closest(".product-card").dataset.id; // Get product ID from dataset

            // Set initial button state
            if (this.cartItems.includes(productId)) {
                button.textContent = "Remove from Cart";
                button.classList.add("remove");
            }

            // Handle click to add/remove from cart
            button.addEventListener("click", () => this.toggleCartItem(productId, button));
        });
    }

    // Toggle cart item (add/remove)
    toggleCartItem(productId, button) {
        if (this.cartItems.includes(productId)) {
            this.removeFromCart(productId);
            button.textContent = "Add to Cart";
            button.classList.remove("remove");
        } else {
            this.addToCart(productId);
            button.textContent = "Remove from Cart";
            button.classList.add("remove");
        }
    }

    // Add item to cart
    addToCart(productId) {
        this.cartItems.push(productId);
        this.updateCart();
    }

    // Remove item from cart
    removeFromCart(productId) {
        this.cartItems = this.cartItems.filter(id => id !== productId);
        this.updateCart();
    }

    // Update cart count and store in local storage
    updateCart() {
        localStorage.setItem("cart", JSON.stringify(this.cartItems));
        this.updateCartUI();
    }

    // Update cart UI
    updateCartUI() {
        this.cartValueElements.forEach(cartValue => {
            cartValue.textContent = this.cartItems.length;
            cartValue.style.display = this.cartItems.length > 0 ? "inline-block" : "none";
        });
    }
}

// Initialize the cart when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    new ShoppingCart();
});

// Slider
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const nextButton = document.querySelector('.slider-controls .next');
const dotsContainer = document.querySelector('.slider-dots');

let currentSlide = 0;

// Clone first and last slides for infinite effect
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

const allSlides = document.querySelectorAll('.slide');
const totalSlides = allSlides.length;

// Generate dots
slides.forEach((slide, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) {
        dot.classList.add('active');
    }
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlides();
    });
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateSlides() {
    allSlides.forEach((slide, index) => {
        slide.style.transform = `translateX(calc(-${(currentSlide + 1) * 100}% - ${currentSlide}rem))`;
        slide.classList.toggle('active', index === currentSlide + 1);
        slide.querySelector('.slide-wrapper').classList.toggle('active', index === currentSlide + 1);
        slide.querySelector('img').classList.toggle('active', index === currentSlide + 1);
    });
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

nextButton.addEventListener('click', () => {
    currentSlide++;
    updateSlides();
    if (currentSlide === slides.length) {
        setTimeout(() => {
            slider.style.transition = 'none';
            currentSlide = 0;
            updateSlides();
            setTimeout(() => {
                slider.style.transition = 'transform 0.5s ease';
            }, 0);
        }, 500);
    }
});

updateSlides();
