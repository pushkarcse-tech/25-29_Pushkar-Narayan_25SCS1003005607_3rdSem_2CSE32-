const API_URL = "http://localhost:5001/api/products";

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("category-filter");

const cartBtn = document.getElementById("cart-btn");
const cartCount = document.getElementById("cart-count");

const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const closeCartBtn = document.getElementById("close-cart");

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

const productModal = document.getElementById("product-modal");
const modalProduct = document.getElementById("modal-product");
const closeModalBtn = document.getElementById("close-modal");

let products = [];
let cart = JSON.parse(localStorage.getItem("localStoreCart")) || [];


// =========================
// LOAD PRODUCTS
// =========================

async function fetchProducts() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        products = await response.json();

        createCategories();

        displayProducts(products);

        updateCart();

    } catch (error) {

        console.error(error);

        productList.innerHTML = `
            <p class="no-products">
                Unable to load products.
                Please make sure the backend server is running.
            </p>
        `;
    }
}


// =========================
// DISPLAY PRODUCTS
// =========================

function displayProducts(data) {

    productList.innerHTML = "";

    if (data.length === 0) {

        productList.innerHTML = `
            <p class="no-products">
                No products found.
            </p>
        `;

        return;
    }


    data.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
            >

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="product-price">
                        ₹${Number(product.price).toLocaleString("en-IN")}
                    </span>

                    <div class="product-actions">

                        <button
                            class="view-button"
                            onclick="viewProduct('${product._id}')">
                            View
                        </button>

                        <button
                            class="add-button"
                            onclick="addToCart('${product._id}')">
                            Add to Cart
                        </button>

                    </div>

                </div>

            </div>
        `;

        productList.appendChild(card);
    });
}


// =========================
// CREATE CATEGORY FILTER
// =========================

function createCategories() {

    const categories = [
        ...new Set(
            products.map(product => product.category)
        )
    ];

    categoryFilter.innerHTML = `
        <option value="all">
            All Categories
        </option>
    `;

    categories.forEach(category => {

        const option = document.createElement("option");

        option.value = category;

        option.textContent = category;

        categoryFilter.appendChild(option);
    });
}


// =========================
// SEARCH + FILTER
// =========================

function filterProducts() {

    const searchTerm =
        searchInput.value.toLowerCase().trim();

    const selectedCategory =
        categoryFilter.value;

    const filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayProducts(filteredProducts);
}


searchInput.addEventListener(
    "input",
    filterProducts
);

categoryFilter.addEventListener(
    "change",
    filterProducts
);


// =========================
// ADD TO CART
// =========================

function addToCart(id) {

    const product = products.find(
        product => product._id === id
    );

    if (!product) {
        return;
    }

    const existingItem = cart.find(
        item => item._id === id
    );


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();

    updateCart();

    openCart();
}


// =========================
// REMOVE FROM CART
// =========================

function removeFromCart(id) {

    cart = cart.filter(
        item => item._id !== id
    );

    saveCart();

    updateCart();
}


// =========================
// CHANGE QUANTITY
// =========================

function changeQuantity(id, amount) {

    const item = cart.find(
        item => item._id === id
    );

    if (!item) {
        return;
    }

    item.quantity += amount;

    if (item.quantity <= 0) {

        removeFromCart(id);

        return;
    }

    saveCart();

    updateCart();
}


// =========================
// UPDATE CART UI
// =========================

function updateCart() {

    const totalItems = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "₹0";

        return;
    }


    let totalPrice = 0;


    cart.forEach(item => {

        totalPrice +=
            Number(item.price) * item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
                class="cart-item-image"
            >

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p class="cart-item-price">
                    ₹${Number(item.price).toLocaleString("en-IN")}
                </p>

                <div>

                    <button
                        onclick="changeQuantity('${item._id}', -1)">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity('${item._id}', 1)">
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-cart-item"
                onclick="removeFromCart('${item._id}')">
                Remove
            </button>

        `;

        cartItems.appendChild(cartItem);
    });


    cartTotal.textContent =
        `₹${totalPrice.toLocaleString("en-IN")}`;
}


// =========================
// SAVE CART
// =========================

function saveCart() {

    localStorage.setItem(
        "localStoreCart",
        JSON.stringify(cart)
    );
}


// =========================
// OPEN CART
// =========================

function openCart() {

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");
}


// =========================
// CLOSE CART
// =========================

function closeCart() {

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");
}


cartBtn.addEventListener(
    "click",
    openCart
);

closeCartBtn.addEventListener(
    "click",
    closeCart
);

cartOverlay.addEventListener(
    "click",
    closeCart
);


// =========================
// VIEW PRODUCT
// =========================

function viewProduct(id) {

    const product = products.find(
        product => product._id === id
    );

    if (!product) {
        return;
    }


    modalProduct.innerHTML = `

        <div class="modal-product">

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div>

                <span class="product-category">
                    ${product.category}
                </span>

                <h2>
                    ${product.name}
                </h2>

                <p>
                    ${product.description}
                </p>

                <div class="modal-price">
                    ₹${Number(product.price).toLocaleString("en-IN")}
                </div>

                <button
                    class="add-button"
                    onclick="addToCart('${product._id}')">
                    Add to Cart
                </button>

            </div>

        </div>

    `;


    productModal.classList.add("active");
}


// =========================
// CLOSE PRODUCT MODAL
// =========================

function closeProductModal() {

    productModal.classList.remove("active");
}


closeModalBtn.addEventListener(
    "click",
    closeProductModal
);


productModal.addEventListener(
    "click",
    function (event) {

        if (event.target === productModal) {
            closeProductModal();
        }

    }
);


// =========================
// CHECKOUT
// =========================

checkoutBtn.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;
        }

        alert(
            "Thank you for shopping with Local Store!"
        );

        cart = [];

        saveCart();

        updateCart();

        closeCart();
    }
);


// =========================
// INITIAL LOAD
// =========================

fetchProducts();