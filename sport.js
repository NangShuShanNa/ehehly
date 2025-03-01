


document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded for Women Page!");

    /*** 🔹 Highlight Active Navigation Link ***/
    const navLinks = document.querySelectorAll("nav a");
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage || (currentPage === "" && link.getAttribute("href") === "index.html")) {
            link.classList.add("active");
        }
    });

    /*** 🔹 Carousel Slider ***/
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;
    const slideContainer = document.querySelector(".slides");

    function showSlide(index) {
        if (!slideContainer) return;
        const newIndex = (index + totalSlides) % totalSlides;
        slideContainer.style.transform = `translateX(-${newIndex * 100}%)`;
        slideIndex = newIndex;
    }

    document.querySelector(".prev")?.addEventListener("click", () => showSlide(slideIndex - 1));
    document.querySelector(".next")?.addEventListener("click", () => showSlide(slideIndex + 1));

    setInterval(() => showSlide(slideIndex + 1), 3000);

    /*** 🔹 Category Click Event ***/
    document.querySelectorAll(".category").forEach(category => {
        category.addEventListener("click", () => {
            alert(`You clicked on ${category.dataset.name}`);
        });
    });

    /*** 🔹 Product "Add to Cart" Alert ***/
    document.querySelectorAll('.view').forEach(button => {
        button.addEventListener('click', () => {
            alert('Product added to cart!');
        });
    });

    const products = [
        { img: "assets/sports.jpg", name: "Summer Dress", price: "500 THB" },
        { img: "assets/sports.jpg", name: "Casual Top", price: "350 THB" },
        { img: "assets/sports.jpg", name: "Skinny Jeans", price: "600 THB" },
        { img: "assets/sports.jpg", name: "High Heels", price: "1200 THB" },
        { img:"assets/sports.jpg", name: "Handbag",  oldPrice: "400 THB", newPrice: "350 THB" },
        { img: "assets/sports.jpg", name: "Denim Jacket", oldPrice: "400 THB", newPrice: "350 THB" },
        { img: "assets/sports.jpg", name: "Silk Scarf", price: "300 THB" },
        { img: "assets/sports.jpg", name: "Elegant Watch", price: "1500 THB" },
        { img: "assets/sports.jpg", name: "Sun Hat", price: "250 THB" },
        { img: "assets/sports.jpg", name: "Designer Sunglasses", price: "850 THB" },
        { img:"assets/sports.jpg", name: "Pearl Earrings", price: "700 THB" },
        { img: "assets/sports.jpg", name: "Gold Ring",  oldPrice: "400 THB", newPrice: "350 THB" },
        { img: "assets/sports.jpg", name: "Evening Gown", price: "1500 THB" },
        { img: "assets/sports.jpg", name: "Crop Top", price: "400 THB" },
        { img: "assets/sports.jpg", name: "Bootcut Jeans", price: "700 THB" },
        { img:"assets/sports.jpg", name: "Sneakers", price: "900 THB" },
        { img: "assets/sports.jpg", name: "Clutch", price: "600 THB" },
        { img: "assets/sports.jpg", name: "Leather Jacket", price: "1200 THB" },
        { img: "assets/sports.jpg", name: "Wool Scarf", price: "350 THB" },
        { img: "assets/sports.jpg", name: "Sport Watch", price: "800 THB" }
    ];
    
    const productsPerPage = 16; // 4 rows x 4 products per row
    let currentPageNum = 1;
    const totalPages = Math.ceil(products.length / productsPerPage);
    const productContainer = document.getElementById("products-container");
    const pageNumbers = document.getElementById("page-numbers");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    function displayProducts(page) {
        if (!productContainer) return;
        productContainer.innerHTML = "";
        const start = (page - 1) * productsPerPage;
        const paginatedProducts = products.slice(start, start + productsPerPage);

        paginatedProducts.forEach(product => {
            const productHTML = `
                <div class="product">
                    <img src="${product.img}" alt="${product.name}">
                    <p>${product.name}</p>
                    ${product.oldPrice ? `<span class="old-price">${product.oldPrice}</span>` : ""}
                    <span class="new-price">${product.newPrice || product.price}</span>
                    <button class="view">View</button>
                </div>
            `;
            productContainer.innerHTML += productHTML;
        });

        updatePaginationButtons();
    }

    function updatePaginationButtons() {
        if (!pageNumbers) return;
        pageNumbers.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.innerHTML += `<button class="page-btn ${i === currentPageNum ? "active" : ""}" data-page="${i}">${i}</button>`;
        }
        prevBtn.disabled = currentPageNum === 1;
        nextBtn.disabled = currentPageNum === totalPages;
    }

    prevBtn?.addEventListener("click", () => {
        if (currentPageNum > 1) {
            currentPageNum--;
            displayProducts(currentPageNum);
        }
    });

    nextBtn?.addEventListener("click", () => {
        if (currentPageNum < totalPages) {
            currentPageNum++;
            displayProducts(currentPageNum);
        }
    });

    pageNumbers?.addEventListener("click", (e) => {
        if (e.target.classList.contains("page-btn")) {
            currentPageNum = parseInt(e.target.dataset.page);
            displayProducts(currentPageNum);
        }
    });

    displayProducts(currentPageNum);

    /*** 🔹 Email Subscription ***/
    const subscribeButton = document.getElementById("subscribe-btn");
    const emailInput = document.getElementById("email");
    const feedbackContainer = document.getElementById("subscribe-feedback");

    if (subscribeButton && emailInput && feedbackContainer) {
        subscribeButton.addEventListener("click", function () {
            const email = emailInput.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            feedbackContainer.innerHTML = ""; // Clear previous feedback

            if (emailPattern.test(email)) {
                feedbackContainer.innerHTML = "<p style='color: green;'>✅ Thank you for subscribing!</p>";
                emailInput.value = ''; // Clear the input
                console.log("Email Submitted: " + email);
            } else {
                feedbackContainer.innerHTML = "<p style='color: red;'>❌ Please enter a valid email address.</p>";
            }
        });
    } else {
        console.error("❌ Subscription elements are missing in the HTML.");
    }
    // Add event listener to search input
document.getElementById('searchInput').addEventListener('input', function(event) {
    const query = event.target.value.trim();

    // If there's a search query, redirect to the search results page
    if (query.length > 0) {
        // Redirect to a search results page with the query as a URL parameter
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    } else {
        // If the query is empty, you can clear any displayed results or suggestions
        clearSearchSuggestions();
    }
});

// Function to handle clearing search suggestions
function clearSearchSuggestions() {
    // This could be implemented if you have suggestions displayed elsewhere in your UI
    console.log("Clear search suggestions or results");
    // Example: Hide suggestion list or clear any dynamically displayed results
    // document.getElementById('suggestions').style.display = 'none';
}
function displayProducts(page) {
    if (!productContainer) return;
    productContainer.innerHTML = "";
    const start = (page - 1) * productsPerPage;
    const paginatedProducts = products.slice(start, start + productsPerPage);

    paginatedProducts.forEach(product => {
        const productHTML = `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <p>${product.name}</p>
                <span class="price-container">
                    ${product.oldPrice ? `<span class="old-price">${product.oldPrice}</span>` : ""}
                    <span class="new-price">${product.newPrice || product.price}</span>
                </span>
                <button class="view">View</button>
            </div>
        `;
        productContainer.innerHTML += productHTML;
    });

    updatePaginationButtons();
}


});