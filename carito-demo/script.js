// Base URL del backend
const API_URL = "https://ramp-backend-lzl8.onrender.com";

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
      const response = await fetch(`${API_URL}/api/prices`);
      const prices = await response.json();
      // Procesar datos
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
      <input type="number" placeholder="Amount in units" min="0.01" step="0.01" />
      <button onclick="addToCart('${asset.symbol}', ${asset.price}, this)">Add</button>
    `;
    container.appendChild(assetElement);
  });
}

// Función para añadir al carrito
function addToCart(symbol, price, button) {
  const input = button.previousElementSibling;
  const units = parseFloat(input.value); // Lo que ingresa el usuario como cantidad de unidades

  if (!units || units <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  const usdAmount = units * price; // Multiplicar por el precio para obtener el total en USD

  const existing = cart.find((item) => item.symbol === symbol);
  if (existing) {
    existing.units += units; // Incrementar unidades
    existing.amount += usdAmount; // Incrementar el total en USD
  } else {
    cart.push({
      symbol,
      price,
      units, // Cantidad de unidades
      amount: usdAmount, // Total en USD calculado
    });
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
      ${item.symbol}: ${item.units.toFixed(4)} units ($${item.amount.toFixed(2)})
      <button class="remove-button" onclick="removeFromCart('${item.symbol}')">Remove</button>
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

  const totalAmount = Math.round(total * 100); // Convertir a centavos

  try {
    // Crear PDF en el backend
    const response = await fetch(`${baseURL}/api/pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart, total }),
    });

    const result = await response.json();

    if (result.path) {
      // Descargar el PDF
      const link = document.createElement("a");
      link.href = `${baseURL}/${result.path}`;
      link.download = "receipt.pdf";
      link.click();
    } else {
      throw new Error("PDF generation failed.");
    }
  } catch (err) {
    console.error("Error en el checkout:", err.message);
    alert("Something went wrong while generating the PDF.");
  }
});

// Llama a loadPrices al iniciar
loadPrices();
