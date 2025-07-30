
const images=document.querySelectorAll('.header-slider ul img');
const prev_btn=document.querySelector(".control_prev");
const next_btn=document.querySelector(".control_next");
let n=0;
function changeSlide(){
    for (let i=0;i<images.length;i++){
        images[i].style.display="none";
    }
    images[n].style.display='block';
}
changeSlide();


prev_btn.addEventListener('click',(e)=>{
    if(n>0){
        n--;

    }else{
        n=images.length-1;

    }
    changeSlide();

})

next_btn.addEventListener('click',(e)=>{
    if(n<images.length-1){
        n++;

    }else{
        n=0;

    }
    changeSlide();

})

// ✅ Load cart from localStorage (or use empty array)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ✅ Add to cart from home page (using .pro class and #cart icon)
document.querySelectorAll('#cart').forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    const product = this.closest('.pro');
    const img = product.querySelector('img').getAttribute('src');
    const name = product.querySelector('h5').textContent.trim();
    const priceText = product.querySelector('h4').textContent.trim();
    const unitPrice = parseInt(priceText.replace(/[^\d]/g, ''));

    const existingItem = cart.find(item => item.name === name && item.unitPrice === unitPrice);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, unitPrice, img, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // ✅ Save cart
    displayCart();
  });
});

// ✅ Add to cart from product detail page
document.getElementById('detail-cart')?.addEventListener('click', function () {
  const product = document.querySelector('#productdeatils');
  if (!product) return;

  const img = product.querySelector('.single-pro-image img').getAttribute('src');
  const name = product.querySelector('.single-pro-details h4').textContent.trim();
  const priceText = product.querySelector('.single-pro-details h3').textContent.trim();
  const quantityInput = product.querySelector('input[type="number"]');
  const quantity = parseInt(quantityInput.value) || 1;
  const unitPrice = parseInt(priceText.replace(/[^\d]/g, ''));

  const existingItem = cart.find(item => item.name === name && item.unitPrice === unitPrice);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, unitPrice, img, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart)); // ✅ Save cart
  displayCart();
});

// ✅ Display the cart
function displayCart() {
  const container = document.getElementById('cart-items');
  if (!container) return;

  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = '<p style="color: black;">Your cart is empty.</p>';
    return;
  }

  cart.forEach((item, index) => {
    const totalPrice = item.unitPrice * item.quantity;
    const html = `
      <div style="display:flex;align-items:center;gap:10px;margin:10px 0;">
        <span style="font-weight:bold;width:20px; color:#333">${index + 1}.</span>
        <img src="${item.img}" style="width:50px;height:50px;border-radius:5px;object-fit:cover;">
        <div style="flex: 1;">
          <p style="margin: 0; font-size: 14px; color:#333; font-weight:600;">${item.name}</p>
          <p style="margin: 0; font-size: 13px; color:#333;">Rs ${totalPrice}</p>
          <div style="display: flex; align-items: center; gap: 6px; margin-top: 5px;">
            <button class="qty-btn" data-index="${index}" data-action="decrease" style="padding:2px 6px;">−</button>
            <span style="min-width: 20px; text-align:center; display:inline-block; color:#333">${item.quantity}</span>
            <button class="qty-btn" data-index="${index}" data-action="increase" style="padding:2px 6px;">+</button>
          </div>
        </div>
        <button class="remove-item" data-index="${index}" style="background:red;color:white;border:none;padding:4px 8px;border-radius:4px;"><i class="fa fa-trash"></i></button>
      </div>`;
    container.innerHTML += html;
  });

  // ✅ Quantity buttons
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const index = parseInt(this.dataset.index);
      const action = this.dataset.action;

      if (action === 'increase') {
        cart[index].quantity += 1;
      } else if (action === 'decrease' && cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      }

      localStorage.setItem("cart", JSON.stringify(cart)); // ✅ Save updated cart
      displayCart();
    });
  });

  // ✅ Remove buttons
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', function () {
      const index = parseInt(this.dataset.index);
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart)); // ✅ Save updated cart
      displayCart();
    });
  });
}

// ✅ Toggle cart box
document.getElementById('cart-toggle')?.addEventListener('click', function (e) {
  e.preventDefault();
  const cartBox = document.getElementById('cart-box');
  if (cartBox) {
    cartBox.style.display = (cartBox.style.display === 'block') ? 'none' : 'block';
  }
});

// ✅ On load: show cart if items exist
window.addEventListener("DOMContentLoaded", () => {
  displayCart();
});

  const translations = {
  English: {
    "delivery-to": "Delivery To",
    "location": "Karnataka",
    "all": "All",
    "hello-sign-in": "Hello, {name}",
    "account-list": "Account & List",
    "return": "Return",
    "orders": "& orders",
    "cart": "Cart",
    "addcart":"Add to cart",
    "cart-items": "Cart Items",
    "home": "Home",
    "shop": "Shop",
    "blog": "Blog",
    "about": "About",
    "contact": "Contact",
    "featured-product": "Featured Product",
    "dairy-products": "The Dairy products",
    "brand-nandini": "Nandini",
    "product-special-milk": "Special Milk",
    "price-rs40": "Rs 40",
    "featured": "Featured Product",
    "dairy": "The Dairy products",
    "special_milk": "Special Milk",
    "ghee": "Ghee",
   "curd": "Curd",
    "cheese": "Cheese",
    "chocolates": "Chocolates",
    "beverages": "Beverages",
    "normal_milk": "Normal Milk",
    "buffalo_ghee": "Buffalo Ghee",
    "slice": "Slice",
    "peda": "Peda",
    "buttermilk": "Buttermilk",
  "pistel_drink": "Pistel Drink",
    "icecream": "Special Ice Cream",
    "tender_coconut": "Tender Coconut Powder",
    "cone": "Cone",
    "candy": "Candy",
    "mysore_pak": "Mysore Pak",
   " scooping": "Scooping",
   "page1": "1",  
    "page1": "1",
      "page2": "2",
      "newsletter-title": "Sign up for NewsLetter",
      "newsletter-desc": "Get E-mail updates on our latest Products And",
      "special-offer": "special offer",
      "signin-btn": "Sign in",
      "contact": "Contact",
      "address": "Bangalore Rajajinagar 8th cross",
      "hours": "4AM - 12PM All days",
      "follow-us": "Follow Us",
      "about": "About",
      "about-us": "About Us",
      "delivery-info": "Delivery Information",
      "privacy-policy": "Privacy Policy",
      "terms": "Terms And Conditions",
      "contact-us": "Contact Us",
      "my-account": "My Account",
      "signin": "Sign In",
      "view-cart": "View Cart",
      "wishlist": "My Wishlist",
      "track-order": "Track My Order",
      "install-app": "Install App",
      "download-app": "From App Store or Google Play",
      "secure-pay": "Secured Payment Gateway",
      "new-products": "New Products",
     "dairy-products": "The Dairy products",
     "Productdetails":"Product Details",
     "history":"Order-history",
     "info":"Nandini Ice Cream offers a delicious and refreshing dessert made from pure milk and quality ingredients. Available in a variety of flavors like vanilla, strawberry, chocolate, and mango, it caters to all taste preferences. Its smooth and creamy texture delights both kids and adults alike. Perfect for celebrations or a quick sweet treat, Nandini Ice Cream combines taste, quality, and tradition in every scoop."},
      Kannada:{
    "delivery-to": "ವಿತರಣೆಗೆ",
    "location": "ಕರ್ನಾಟಕ",
    "all": "ಎಲ್ಲಾ",
    "hello-sign-in": "ನಮಸ್ಕಾರ, {name}",
    "account-list": "ಖಾತೆ ಮತ್ತು ಪಟ್ಟಿ",
    "return": "ಹಿಂತಿರುಗು",
    "orders": "ಆದೇಶಗಳು",
    "cart": "ಕಾರ್ಟ್",
    "cart-items": "ಕಾರ್ಟ್ ಐಟಂಗಳು",
    "home": "ಮುಖಪುಟ",
    "shop": "ಅಂಗಡಿ",
    "blog": "ಬ್ಲಾಗ್",
    "about": "ಬಗ್ಗೆ",
    "contact": "ಸಂಪರ್ಕಿಸಿ",
    "featured-product": "ಪ್ರಮುಖ ಉತ್ಪನ್ನಗಳು",
    "dairy-products": "ಹಾಲು ಉತ್ಪನ್ನಗಳು",
    "brand-nandini": "ನಂದಿನಿ",
    "product-special-milk": "ವಿಶೇಷ ಹಾಲು",
    "price-rs40": "ರೂ ೪೦",
    " featured": "ಪ್ರಮುಖ ಉತ್ಪನ್ನ",
    "dairy": "ಹಾಲು ಉತ್ಪನ್ನಗಳು",
    "special_milk": "ವಿಶೇಷ ಹಾಲು",
    "ghee": "ತುಪ್ಪ",
    "curd": "ಮೊಸರು",
    "cheese": "ಚೀಸ್",
    "chocolates": "ಚಾಕೊಲೇಟ್‌ಗಳು",
    "beverages": "ಪಾನೀಯಗಳು",
    "normal_milk": "ಸಾಮಾನ್ಯ ಹಾಲು",
    "buffalo_ghee": "ಎಮ್ಮೆ ತುಪ್ಪ",
    "slice": "ಸ್ಲೈಸ್",
    "peda": "ಪೇಡಾ",
    "buttermilk": "ಮಜ್ಜಿಗೆ",
    "pistel_drink": "ಪಿಸ್ತಾ ಪಾನೀಯ",
    "icecream": "ಐಸ್ ಕ್ರೀಮ್",
    "tender_coconut": "ತೆಳುವು ತೆಂಗಿನಕಾಯಿ ಪುಡಿ",
    "cone": "ಕೊನ್",
    "candy": "ಕ್ಯಾಂಡಿ",
    "mysore_pak": "ಮೈಸೂರು ಪಾಕ್",
    "scooping": "ಸ್ಕೂಪಿಂಗ್",
          "page1": "೧",
      "page2": "೨",
      "newsletter-title": "ನ್ಯೂಸ್‌ಲೆಟರ್‌ಗೆ ಸೈನ್ ಅಪ್ ಮಾಡಿ",
      "newsletter-desc": "ನಮ್ಮ ಇತ್ತೀಚಿನ ಉತ್ಪನ್ನಗಳು ಮತ್ತು",
      "special-offer": "ವಿಶೇಷ ಆಫರ್",
      "signin-btn": "ಸೈನ್ ಇನ್",
      "contact": "ಸಂಪರ್ಕಿಸಿ",
      "address": "ಬೆಂಗಳೂರು ರಾಜಾಜಿನಗರ ೮ನೇ ಕ್ರಾಸ್",
      "hours": "ಸಕಾಲ ೪ ರಿಂದ ಮಧ್ಯಾಹ್ನ ೧೨ ರವರೆಗೆ ಪ್ರತಿದಿನವೂ",
      "follow-us": "ನಮ್ಮನ್ನು ಅನುಸರಿಸಿ",
      "about": "ಬಗ್ಗೆ",
      "about-us": "ನಮ್ಮ ಬಗ್ಗೆ",
      "delivery-info": "ವಿತರಣಾ ಮಾಹಿತಿ",
      "privacy-policy": "ಗೌಪ್ಯತಾ ನೀತಿ",
      "terms": "ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು",
      "contact-us": "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
      "my-account": "ನನ್ನ ಖಾತೆ",
      "signin": "ಲಾಗಿನ್",
      "view-cart": "ಕಾರ್ಟ್ ವೀಕ್ಷಿಸಿ",
      "wishlist": "ಇಚ್ಛಿತ ಪಟ್ಟಿ",
      "track-order": "ಆರ್ಡರ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
      "install-app": "ಅ್ಯಪ್ ಅನ್ನು ಸ್ಥಾಪಿಸಿ",
      "download-app": "ಅ್ಯಪ್ ಸ್ಟೋರ್ ಅಥವಾ ಗೂಗಲ್ ಪ್ಲೇನಿಂದ",
      "secure-pay": "ಸುರಕ್ಷಿತ ಪಾವತಿ ದ್ವಾರ",
      "new-products": "ಹೊಸ ಉತ್ಪನ್ನಗಳು",
      "dairy-products": "ಹಾಲು ಉತ್ಪನ್ನಗಳು",
      "addcart":"ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ",
      "Productdetails":"ಉತ್ಪನ್ನ ವಿವರಗಳು",
      "history":"ಆದೇಶ ಇತಿಹಾಸ",
      "info":"ನಂದಿನಿ ಐಸ್ ಕ್ರೀಮ್ ಶುದ್ಧ ಹಾಲು ಮತ್ತು ಗುಣಮಟ್ಟದ ಪದಾರ್ಥಗಳಿಂದ ತಯಾರಿಸಲಾದ ರುಚಿಕರ ಮತ್ತು ತಾಜಾ ಡೆಸೆಟ್ ಅನ್ನು ನೀಡುತ್ತದೆ. ವಾನಿಲ್ಲಾ, ಸ್ಟ್ರಾಬೆರಿ, ಚಾಕೋಲೇಟ್ ಮತ್ತು ಮಾವು ಸೇರಿದಂತೆ ವಿವಿಧ ರುಚಿಗಳಲ್ಲಿ ಲಭ್ಯವಿರುವ ಈ ಐಸ್ ಕ್ರೀಮ್ ಎಲ್ಲಾ ರುಚಿಗೆ ತಕ್ಕಂತೆ ಇರುತ್ತದೆ. ಇದರ ಸಿಹಿಯಾದ, ನಯವಾದ ತೆಯಾರಿ ಮಕ್ಕಳಿಗೂ ವಯಸ್ಕರಿಗೂ ರುಚಿ ಉಂಟುಮಾಡುತ್ತದೆ. ಉತ್ಸವಗಳು ಅಥವಾ ತಕ್ಷಣದ ಸಿಹಿ ತಿನಿಸುಗಳಿಗೆ ಪರಿಪೂರ್ಣವಾದ ನಂದಿನಿ ಐಸ್ ಕ್ರೀಮ್ ಪ್ರತಿಯೊಂದು ಸ್ಕೂಪ್‌ನಲ್ಲೂ ರುಚಿ, ಗುಣಮಟ್ಟ ಮತ್ತು ಸಂಪ್ರದಾಯವನ್ನು ಒಳಗೊಂಡಿದೆ."}
};


  function toggleDropdown() {
    document.getElementById("dropdown-list").classList.toggle("show");
  }

  function selectItem(element,event) {
    event?.preventDefault();
    const lang = element.innerText;
    const elements = document.querySelectorAll("[data-key]");
    elements.forEach(el => {
      const key = el.getAttribute("data-key");
      if (translations[lang] && translations[lang][key]) {
        el.innerText = translations[lang][key];
      }
    });
    document.getElementById("dropdown-list").classList.remove("show");
    document.querySelector(".dropdown-selected").innerText = lang + " ▼";
  }

  window.onclick = function (event) {
    if (!event.target.matches('.dropdown-selected')) {
      const dropdownList = document.getElementById("dropdown-list");
      if (dropdownList && dropdownList.classList.contains('show')) {
        dropdownList.classList.remove('show');
      }
    }
  }


 function searchProduct() {
  const input = document.getElementById("search-box").value.toLowerCase().trim();
  const products = document.querySelectorAll(".pro");
  const currentLang = localStorage.getItem("selectedLanguage") || "English";

  for (let pro of products) {
    const nameElement = pro.querySelector('h5');
    if (!nameElement) continue;

    const englishKey = nameElement.getAttribute("data-key");
    if (!englishKey) continue;

    const translated = translations[currentLang]?.[englishKey]?.toLowerCase();
    const inputMatch = translated && translated.includes(input);

    if (inputMatch || englishKey.toLowerCase().includes(input)) {
      const fileToOpen = pro.getAttribute("data-file");
      if (fileToOpen) {
        window.location.href = fileToOpen;
        return;
      }
    }
  }

  alert("❌ Product not found!");
}

// document.getElementById('place-order-btn')?.addEventListener('click', function () {
//   const messageBox = document.getElementById('order-message');
//   if (cart.length === 0) {
//     messageBox.innerHTML = "<p style='color:red;'>Your cart is empty!</p>";
//     return;
//   }

//   let message = `<h3 style="margin:0; font-weight:bold; color:black;">✅ Order Placed!</h3><div>Thank you for your purchase!</div>`;
//   cart.forEach(item => {
//     message += `
//       <div style="display:flex;align-items:center;margin:10px 0;gap:10px;">
//         <img src="${item.img}" style="width:60px;height:60px;border-radius:6px;object-fit:cover;">
//         <div>
//           <p style="margin:0;font-weight:bold; color:black">${item.name}</p>
//           <p style="margin:0; color:black">Quantity: ${item.quantity}</p>
//         </div>
//       </div>
//     `;
//   });
//   message += `<h3 style="margin:0; font-weight:bold; color:black;">Thank u for ur order</h3><div>Thank you for your purchase!</div>`;

//   messageBox.innerHTML = message;

//   // Optional: clear the cart after order placed
//   cart.length = 0;
//   displayCart(); // refresh the cart UI
// });
// emailjs.init("cgx5WwSyM-3WyOQzE");
// document.getElementById('place-order-btn')?.addEventListener('click', function () {
//   const messageBox = document.getElementById('order-message');
//   if (cart.length === 0) {
//     messageBox.innerHTML = "<p style='color:red;'>Your cart is empty!</p>";
//     return;
//   }

//   let totalAmount = 0;
//   let message = `<h3 style="margin:0; font-weight:bold; color:black;">✅ Order Placed!</h3><div>Thank you for your purchase!</div>`;

//   cart.forEach(item => {
//     const itemTotal = item.price * item.quantity;
//     totalAmount += itemTotal;

//     message += `
//       <div style="display:flex;align-items:center;margin:10px 0;gap:10px;">
//         <img src="${item.img}" style="width:60px;height:60px;border-radius:6px;object-fit:cover;">
//         <div>
//           <p style="margin:0;font-weight:bold; color:black">${item.name}</p>
//           <p style="margin:0; color:black">Quantity: ${item.quantity}</p>
//           <p style="margin:0; color:black">Price: ₹${item.price}</p>
//           <p style="margin:0; color:black">Total: ₹${itemTotal}</p>
//         </div>
//       </div>
//     `;
//   });

//   message += `<h4 style="color:black;">Grand Total: ₹${totalAmount}</h4>`;
//   message += `<h3 style="margin:0; font-weight:bold; color:black;">🧡 Thank you for your order!</h3>`;

//   messageBox.innerHTML = message;

//   // Send order summary to user's email if logged in (email saved from login page)
//   const userEmail = localStorage.getItem("userEmail"); // should be saved from login page
//   if (userEmail) {
//     const orderDetails = cart.map(item => `${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}`).join('\n');
//     const emailMessage = `
//       ✅ Your order has been placed!

//       🧺 Items:
//       ${orderDetails}

//       💵 Grand Total: ₹${totalAmount}
//       📍 Shipping: 2-3 days

//       Thank you for shopping with Nandini Dairy!
//     `;

//     // send using emailjs (you must configure emailjs first)
//     emailjs.send("default_service", "template_hk6htjt", {
//       to_email: userEmail,
//       message: emailMessage
//     }).then(() => {
//       console.log("✅ Email sent to", userEmail);
//     }).catch(error => {
//       console.error("❌ Email sending failed:", error);
//     });
//   }

//   cart.length = 0; // clear cart
//   displayCart();
// });
// document.addEventListener("DOMContentLoaded", function () {
//   emailjs.init("cgx5WwSyM-3WyOQzE");

 
//   document.getElementById('place-order-btn')?.addEventListener('click', function () {
//     const messageBox = document.getElementById('order-message');
//     if (cart.length === 0) {
//       messageBox.innerHTML = "<p style='color:red;'>Your cart is empty!</p>";
//       return;
//     }

//     let totalAmount = 0;
//     let message = `<h3 style="margin:0; font-weight:bold; color:black;">✅ Order Placed!</h3><div>Thank you for your purchase!</div>`;

//     cart.forEach(item => {
//       const itemTotal = item.unitPrice * item.quantity;
//       totalAmount += itemTotal;

//       message += `
//         <div style="display:flex;align-items:center;margin:10px 0;gap:10px;">
//           <img src="${item.img}" style="width:60px;height:60px;border-radius:6px;object-fit:cover;">
//           <div>
//             <p style="margin:0;font-weight:bold; color:black">${item.name}</p>
//             <p style="margin:0; color:black">Quantity: ${item.quantity}</p>
//             <p style="margin:0; color:black">Price: ₹${item.unitPrice}</p>
//             <p style="margin:0; color:black">Total: ₹${itemTotal}</p>
//           </div>
//         </div>
//       `;
//     });

//     message += `<h4 style="color:black;">Grand Total: ₹${totalAmount}</h4>`;
//     message += `<h3 style="margin:0; font-weight:bold; color:black;">🧡 Thank you for your order!</h3>`;
//     messageBox.innerHTML = message;

//     if (userEmail && userName) {
//       const orderDetails = cart.map(item =>
//         `${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}`
//       ).join('\n');

//       const emailMessage = `
// ✅ Your order has been placed!

// 🧺 Items:
// ${orderDetails}

// 💵 Grand Total: ₹${totalAmount}
// 📍 Shipping: 2-3 days

// Thank you for shopping with Nandini Dairy!
//       `;

//       emailjs.send("service_sxhzguu", "template_w0gp7ln", {
//         to_email: userEmail,
//         to_name: userName,
//         message: emailMessage
//       }).then(() => {
//         console.log("✅ Email sent to", userEmail);
//       }).catch(error => {
//         console.error("❌ Email sending failed:", error);
//       });
//     }

//     cart.length = 0; // Clear cart
//     displayCart();
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   emailjs.init("cgx5WwSyM-3WyOQzE");

//   // ✅ Load user details from localStorage correctly here
//   const userEmail = localStorage.getItem("loggedInUserEmail");
//   const userName = localStorage.getItem("loggedInUserName");

//   document.getElementById('place-order-btn')?.addEventListener('click', function () {
//     const messageBox = document.getElementById('order-message');
//     if (cart.length === 0) {
//       messageBox.innerHTML = "<p style='color:red;'>Your cart is empty!</p>";
//       return;
//     }

//     let totalAmount = 0;
//     let message = `<h3 style="margin:0; font-weight:bold; color:black;">✅ Order Placed!</h3><div>Thank you for your purchase!</div>`;

//     cart.forEach(item => {
//       const itemTotal = item.unitPrice * item.quantity;
//       totalAmount += itemTotal;

//       message += `
//         <div style="display:flex;align-items:center;margin:10px 0;gap:10px;">
//           <img src="${item.img}" style="width:60px;height:60px;border-radius:6px;object-fit:cover;">
//           <div>
//             <p style="margin:0;font-weight:bold; color:black">${item.name}</p>
//             <p style="margin:0; color:black">Quantity: ${item.quantity}</p>
//             <p style="margin:0; color:black">Price: ₹${item.unitPrice}</p>
//             <p style="margin:0; color:black">Total: ₹${itemTotal}</p>
//           </div>
//         </div>
//       `;
//     });

//     message += `<h4 style="color:black;">Grand Total: ₹${totalAmount}</h4>`;
//     message += `<h3 style="margin:0; font-weight:bold; color:black;">🧡 Thank you for your order!</h3>`;
//     messageBox.innerHTML = message;

//     // ✅ Only send email if userEmail is valid
//     if (userEmail && userName) {
//       const orderDetails = cart.map(item =>
//         `${item.name} (x${item.quantity}) - ₹${item.unitPrice * item.quantity}`
//       ).join('\n');

//       const emailMessage = `
// ✅ Your order has been placed!

// 🧺 Items:
// ${orderDetails}

// 💵 Grand Total: ₹${totalAmount}
// 📍 Shipping: 2-3 days

// Thank you for shopping with Nandini Dairy!
//       `;

//       emailjs.send("service_sxhzguu", "template_w0gp7ln", {
//         to_email: userEmail,
//         to_name: userName,
//         message: emailMessage
//       }).then(() => {
//         console.log("✅ Email sent to", userEmail);
//       }).catch(error => {
//         console.error("❌ Email sending failed:", error);
//       });
//     } else {
//       console.warn("⚠️ Email not sent. User email or name missing in localStorage.");
//     }

//     cart.length = 0; // Clear cart
//     displayCart();
//   });
// });

document.getElementById("login-btn")?.addEventListener("click", () => {
  const name = document.getElementById("user-name")?.value.trim();
  const email = document.getElementById("user-email")?.value.trim();

  if (!name || !email) {
    alert("Please enter both name and email.");
    return;
  }

  localStorage.setItem("loggedInUserName", name);
  localStorage.setItem("loggedInUserEmail", email);
  alert(`✅ Logged in as ${name}`);
});

// ✅ Order placement and EmailJS integration
document.getElementById("place-order-btn")?.addEventListener("click", () => {
  const userName = localStorage.getItem("loggedInUserName");
  const userEmail = localStorage.getItem("loggedInUserEmail");
  const messageBox = document.getElementById("order-message");

  if (!userName || !userEmail) {
    alert("Please login first.");
    return;
  }

  if (cart.length === 0) {
    alert("🛒 Cart is empty.");
    return;
  }

    let totalAmount = 0;
    let message = `<h3 style="margin:0; font-weight:bold; color:black;">✅ Order Placed!</h3><div>Thank you for your purchase!</div>`;

    cart.forEach(item => {
      const itemTotal = item.unitPrice * item.quantity;
      totalAmount += itemTotal;

      message += `
        <div style="display:flex;align-items:center;margin:10px 0;gap:10px;">
          <img src="${item.img}" style="width:60px;height:60px;border-radius:6px;object-fit:cover;">
          <div>
            <p style="margin:0;font-weight:bold; color:black">${item.name}</p>
            <p style="margin:0; color:black">Quantity: ${item.quantity}</p>
            <p style="margin:0; color:black">Price: ₹${item.unitPrice}</p>
            <p style="margin:0; color:black">Total: ₹${itemTotal}</p>
          </div>
        </div>
      `;
    });

    message += `<h4 style="color:black;">Grand Total: ₹${totalAmount}</h4>`;
    message += `<h3 style="margin:0; font-weight:bold; color:black;">🧡 Thank you for your order!</h3>`;
    messageBox.innerHTML = message;
 if (userEmail && userName) {
      const orderDetails = cart.map(item =>
        `${item.name} (x${item.quantity}) - ₹${item.unitPrice * item.quantity}`
      ).join('\n');

      const emailMessage = `
✅ Your order has been placed!

🧺 Items:
${orderDetails}

💵 Grand Total: ₹${totalAmount}
📍 Shipping: 2-3 days

Thank you for shopping with Nandini Dairy!
      `;

      emailjs.send("service_sxhzguu", "template_w0gp7ln", {
        to_email: userEmail,
        to_name: userName,
        message: emailMessage
      }).then(() => {
        console.log("✅ Email sent to", userEmail);
      }).catch(error => {
        console.error("❌ Email sending failed:", error);
      });
    } else {
      console.warn("⚠️ Email not sent. User email or name missing in localStorage.");
    }
    // Save to order history
const existingHistory = JSON.parse(localStorage.getItem("orderHistory") || "[]");

const newOrder = {
  user: userName,
  email: userEmail,
  date: new Date().toLocaleString(),
  items: [...cart],
  total: totalAmount
};

existingHistory.push(newOrder);
localStorage.setItem("orderHistory", JSON.stringify(existingHistory));

    cart.length = 0; // Clear cart
    displayCart();
  });

