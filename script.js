// Initialize EmailJS
(function () {
    emailjs.init("PcAyLiveKhG4NZAZE"); // Replace with your EmailJS Public Key
})();

// Cart Data
let cart = [];

// Add to Cart Functionality
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
        const itemName = this.dataset.name;
        const itemPrice = parseFloat(this.dataset.price);
        addToCart(itemName, itemPrice);
        updateCartUI();
    });
});

// Add Item to Cart
function addToCart(name, price) {
    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
        existingItem.subtotal = existingItem.quantity * existingItem.price;
    } else {
        cart.push({ name, price, quantity: 1, subtotal: price });
    }
}

// Update Cart UI
function updateCartUI() {
    const cartItems = document.querySelector("#cart-items tbody");
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>Ksh ${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>Ksh ${item.subtotal.toFixed(2)}</td>
            <td><button class="remove-item" data-index="${index}">Remove</button></td>
        `;
        cartItems.appendChild(row);
    });

    const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
    document.getElementById("cart-total").textContent = total.toFixed(2);

    document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", function () {
            const index = parseInt(this.dataset.index, 10);
            cart.splice(index, 1);
            updateCartUI();
        });
    });
}
