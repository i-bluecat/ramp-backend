// Elementos del DOM
const cryptoList = document.getElementById("crypto-list");
const fiatList = document.getElementById("fiat-list");
const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("total");
const checkoutButton = document.getElementById("checkout");

// Variables del carrito
let cart = [];
let total = 0;

// Función para cargar precios desde el backend
async function loadPrices() {
  try {
    const response = await fetch("http://localhost:5000/api/prices"); // Cambia la URL si es necesario.
    if (!response.ok) throw new Error("Error fetching prices");

    const prices = await response.json();

    // Separar precios en cryptos y fiat
    const cryptoPrices = prices.filter((p) => p.symbol.endsWith("USDT"));
    const fiatPrices = prices.filter((p) => !p.symbol.endsWith("USDT"));

    // Mostrar precios en la página
    displayAssets(cryptoPrices, cryptoList);
    displayAssets(fiatPrices, fiatList);
  } catch (error) {
    console.error("Error cargando precios:", error);
    cryptoList.innerHTML = "Error loading cryptos.";
    fiatList.innerHTML = "Error loading fiat.";
  }
}

// Función para mostrar activos en la página
function displayAssets(prices, container) {
  container.innerHTML = ""; // Limpiar el contenedor
  prices.forEach((asset) => {
    const assetElement = document.createElement("div");
    assetElement.classList.add("asset");
    assetElement.innerHTML = `
      <h3>${asset.symbol}</h3>
      <p>Price: $${parseFloat(asset.price).toFixed(2)}</p>
      <input type="number" placeholder="Amount in USD" min="1" />
      <button onclick="addToCart('${asset.symbol}', ${asset.price}, this)">Add</button>
    `;
    container.appendChild(assetElement);
  });
}

// Función para añadir al carrito
function addToCart(symbol, price, button) {
  const input = button.previousElementSibling;
  const usdAmount = parseFloat(input.value);

  if (!usdAmount || usdAmount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  const existing = cart.find((item) => item.symbol === symbol);
  if (existing) {
    existing.amount += usdAmount;
  } else {
    cart.push({ symbol, price, amount: usdAmount });
  }

  updateCart();
}

// Función para actualizar el carrito
function updateCart() {
  cartItems.innerHTML = "";
  total = 0;

  cart.forEach((item) => {
    total += item.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.symbol}: $${item.amount.toFixed(2)}
      <button onclick="removeFromCart('${item.symbol}')">Remove</button>
    `;
    cartItems.appendChild(li);
  });

  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Función para eliminar del carrito
function removeFromCart(symbol) {
  cart = cart.filter((item) => item.symbol !== symbol);
  updateCart();
}

// Evento del botón de checkout
checkoutButton.addEventListener("click", async () => {
  if (total <= 0) {
    alert("Your cart is empty. Add items before proceeding to checkout.");
    return;
  }

  alert("Checkout is disabled for now.");
});

// Llama a loadPrices al iniciar
loadPrices();
