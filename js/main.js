console.log("Shopping cart by Durgesh rajput");

let logos = document.querySelector('#logo');
let cart = document.querySelector('.cart');
let close = document.querySelector('#close');

logos.onclick = () => {
    cart.classList.add('active');
}

close.onclick = () => {
    cart.classList.remove('active');
}

ready();

function ready(){
    var RemoveButton = document.getElementsByClassName('cart-remove');
    for(i=0;i<RemoveButton.length;i++){
        var Button = RemoveButton[i];
        Button.addEventListener('click', removeMe);
    }
}

function removeMe(event){
    var ButtonClicked = event.target;
    ButtonClicked.parentElement.remove();
    updateTotal();
}

// update Total

function updateTotal(){
    var CartContent = document.getElementsByClassName('cart-content')[0];
    var Cartboxes = CartContent.getElementsByClassName('cart-box');
    var total = 0;
     for(i=0;i<Cartboxes.length;i++) {
        var cartbox = Cartboxes[i];
        let cartPrice = cartbox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartbox.getElementsByClassName('quantity')[0];
        let quantity = quantityElement.value;
        var price = parseFloat(cartPrice.innerText.replace("$", ""));
        total = total + price * quantity;
    }
        // if price containt some cent value
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName('total-price')[0].innerText = "$" + total;
    
}

// quantity changes 

var quantityInput = document.getElementsByClassName('quantity');
for(i = 0; i<quantityInput.length;i++){
     var input = quantityInput[i];
     input.addEventListener('change', quantityChanged)
}


function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value || input.value <=0)){
      input.value  = 1;
    }
    updateTotal();
}


// add to cart

let addCart = document.getElementsByClassName('add-cart');

for(i=0;i<addCart.length;i++){
    var button = addCart[i];
    button.addEventListener('click', addCartClicked);
}

function addCartClicked(event){
    var button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let ProductImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductCart(title, price, ProductImg);
    updateTotal();
}

function addProductCart(title, price, ProductImg){
 let cartShopBox = document.createElement('div');  
 cartShopBox.classList.add('cart-box');
 let cartItems = document.getElementsByClassName('cart-content')[0];
 let cartItemNames = document.getElementsByClassName('cart-product-title');
 for(i=0;i<cartItemNames.length;i++){
    if(cartItemNames[i].innerText == title){
    alert('you have all ready add this to cart');
    return;
}
 }  

var cartBoxContent  = `
               <img src="${ProductImg}" alt="product" class="cart-img">
               <div class="detail-box">
                  <div class="cart-product-title">${title}</div>
                  <div class="cart-price">${price}</div>
                  <input type="number" value="1" class="quantity">
               </div>
               <i class='bx bxs-trash-alt cart-remove'></i>
`;

   cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeMe);
cartShopBox.getElementsByClassName('quantity')[0].addEventListener('change', quantityChanged);
}


// buy bottom works 

 document.getElementsByClassName('buy')[0].addEventListener('click', buyButtonClicked)

 function buyButtonClicked(){
    alert("Your Order is Placed");
    let cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
 }