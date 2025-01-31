document.addEventListener("DOMContentLoaded", function () {
    // Mobile Toggle
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

    // Add To Cart 
    class ShoppingCart {
        constructor() {
            this.cartValueElements = document.querySelectorAll("#value");
            this.cartButtons = document.querySelectorAll(".add-to-cart");
            this.cartItems = JSON.parse(localStorage.getItem("cart")) || [];

            this.init();
        }

        init() {
            this.updateCartUI();
            this.addEventListeners();
        }

        addEventListeners() {
            this.cartButtons.forEach((button) => {
                const productId = button.closest(".product-card").dataset.id;

                if (this.cartItems.includes(productId)) {
                    button.textContent = "Remove from Cart";
                    button.classList.add("remove");
                }

                button.addEventListener("click", () => this.toggleCartItem(productId, button));
            });
        }

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

        addToCart(productId) {
            this.cartItems.push(productId);
            this.updateCart();
        }

        removeFromCart(productId) {
            this.cartItems = this.cartItems.filter(id => id !== productId);
            this.updateCart();
        }

        updateCart() {
            localStorage.setItem("cart", JSON.stringify(this.cartItems));
            this.updateCartUI();
        }

        updateCartUI() {
            this.cartValueElements.forEach(cartValue => {
                cartValue.textContent = this.cartItems.length;
                cartValue.style.display = this.cartItems.length > 0 ? "inline-block" : "none";
            });
        }
    }

    new ShoppingCart();

    // Show More button 
    const productCards = document.querySelectorAll(".product-card");
    const showMoreBtn = document.querySelector(".show-more");
    const hiddenCards = Array.from(productCards).slice(4);

    hiddenCards.forEach(card => {
        card.style.display = "none";
    });

    showMoreBtn.addEventListener("click", function () {
        hiddenCards.forEach((card, index) => {
            card.style.display = "block"; 
            setTimeout(() => {
                card.classList.add("fade-in");
            }, index * 100);
        });

        showMoreBtn.classList.add("fade-out");
        setTimeout(() => showMoreBtn.style.display = "none", 500);
    });

    // Slider
    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.slider');
    const nextButton = document.querySelector('.slider-controls .next');
    const dotsContainer = document.querySelector('.slider-dots');

    let currentSlide = 0;

    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);

    const allSlides = document.querySelectorAll('.slide');
    const totalSlides = allSlides.length;

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
            },0);
        }
    });

    updateSlides();
});