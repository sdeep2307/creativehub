// =============================
// Creative Hub - script.js
// =============================

const cart = [];

// -----------------------------
// Add Product
// -----------------------------
function addToCart(productName){

    const existing = cart.find(p => p.name === productName);

    if(existing){
        existing.qty++;
    }else{
        cart.push({
            name:productName,
            qty:1
        });
    }

    updateCart();
}

// -----------------------------
// Update Cart
// -----------------------------
function updateCart(){

    const list = document.getElementById("cart-list");
    const counter = document.getElementById("cart-count");
    const cartBox = document.getElementById("cartItems");

    list.innerHTML="";

    let totalItems=0;
    let summary="";

    cart.forEach((item,index)=>{

        totalItems += item.qty;

        summary += `${item.name} x ${item.qty}\n`;

        const li=document.createElement("li");

        li.innerHTML=`

        <b>${item.name}</b>

        <br>

        Qty:

        <button onclick="decreaseQty(${index})">-</button>

        ${item.qty}

        <button onclick="increaseQty(${index})">+</button>

        <button onclick="removeItem(${index})">

        ❌

        </button>

        `;

        list.appendChild(li);

    });

    counter.innerText=totalItems;

    cartBox.value=summary;

}

// -----------------------------
// Increase Quantity
// -----------------------------
function increaseQty(index){

    cart[index].qty++;

    updateCart();

}

// -----------------------------
// Decrease Quantity
// -----------------------------
function decreaseQty(index){

    cart[index].qty--;

    if(cart[index].qty<=0){

        cart.splice(index,1);

    }

    updateCart();

}

// -----------------------------
// Remove Item
// -----------------------------
function removeItem(index){

    cart.splice(index,1);

    updateCart();

}

// -----------------------------
// Checkout Form
// -----------------------------
document.getElementById("orderForm").addEventListener("submit",function(e){

e.preventDefault();

const customer=document.getElementById("name").value;

const phone=document.getElementById("phone").value;

const address=document.getElementById("address").value;

if(cart.length===0){

alert("Please add products to cart.");

return;

}

let products="";

cart.forEach(item=>{

products += `${item.name} x ${item.qty}\n`;

});

// -------------------------
// EMAIL
// -------------------------

const subject="New Order - Creative Hub";

const body=

`Customer Name : ${customer}

Phone : ${phone}

Address :

${address}

----------------------

Products Ordered

----------------------

${products}

`;

window.location.href=

`mailto:creativehub.handmade@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

});

// -----------------------------
// Auto Scroll Carousel
// -----------------------------

const carousel=document.querySelector(".carousel");

let scrollAmount=0;

setInterval(()=>{

if(!carousel) return;

scrollAmount += 320;

if(scrollAmount>=carousel.scrollWidth-carousel.clientWidth){

scrollAmount=0;

}

carousel.scrollTo({

left:scrollAmount,

behavior:"smooth"

});

},3000);

// -----------------------------
// WhatsApp Order (Optional)
// -----------------------------
function sendWhatsApp(){

if(cart.length===0){

alert("Cart is empty");

return;

}

let msg="Hello Creative Hub,%0A%0AI would like to order:%0A%0A";

cart.forEach(item=>{

msg += `${item.name} x ${item.qty}%0A`;

});

window.open(

"https://wa.me/9821845366?text="+msg,

"_blank"

);

}
