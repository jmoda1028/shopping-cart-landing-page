// toggle cart
const backdrop = document.querySelector('.backdrop');
const cartBtn = document.querySelector('.cart-icon');
const cartModal = document.querySelector('.cart-modal--menu');
const btnExit = document.querySelector('.exit-btn');

const toggleCart = () => {
    backdrop.classList.toggle('show-backdrop');
    cartModal.classList.toggle('show__cart-modal--menu');
}

cartBtn.addEventListener("click", toggleCart);
backdrop.addEventListener("click", toggleCart);
btnExit.addEventListener("click", toggleCart)


//disable purchase
// const cartQuantity = document.getElementsByClassName('cart-quantity')[0];
// const btnBuy = document.querySelector('.btn__buy');

// console.log(cartQuantity);

// if(cartQuantity.textContent === '0'){
//   btnBuy.setAttribute('disabled', '');
//   btnBuy.classList.add("empty--cart");

//   console.log('nakadisable');
// } else{
//   btnBuy.removeAttribute('disabled');
//   btnBuy.classList.remove("empty--cart");

//   console.log('hindi');
// }


// update total price
const cartQuantity = document.getElementsByClassName('cart-quantity')[0];

const updateCartPrice = () => {
  let total = 0
  let i;
  for (i = 0; i < productRow.length; ++i) {
    cartRow = productRow[i]
  let priceElement = cartRow.getElementsByClassName('cart-price')[0]
  let quantityElement = cartRow.getElementsByClassName('product-quantity')[0]
  let price = parseFloat(priceElement.innerText.replace('₱', ''))
  let quantity = quantityElement.value
  total = total + (price * quantity )
    
  }
  document.getElementsByClassName('total-price')[0].innerText =  '₱' + total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  cartQuantity.textContent = i /= 2;

  console.log(i);
  console.log(total);

  //disable purchase
const btnBuy = document.querySelector('.btn__buy');

if(i && i !== 0){
  btnBuy.removeAttribute('disabled');
  btnBuy.classList.remove("empty--cart");
}

if(total === 0){
  btnBuy.setAttribute('disabled', '');
  btnBuy.classList.add("empty--cart");
}
}





// update quantity input
let quantityInput = document.getElementsByClassName('product-quantity')[0];

const changeQuantity = (event) => {
  let input = event.target
  if (isNaN(input.value) || input.value <= 0){
    input.value = 1
  }
  updateCartPrice()
}

for (let i = 0; i < quantityInput; i++){
  input = quantityInput[i]
  input.addEventListener('change', changeQuantity)
}


// add products to cart
const productRow = document.getElementsByClassName('product-row');
const addToCart = document.getElementsByClassName('add-to--cart');

const addItemToCart = (price, imageSrc, productTitle) => {
    let productRow = document.createElement('div');
    productRow.classList.add('product-row');
    let productRows = document.getElementsByClassName('product-rows')[0];
    let cartImage = document.getElementsByClassName('cart-image');

    for (let i = 0; i < cartImage.length; i++){
      if (cartImage[i].src == imageSrc){
        alert ('This item has already been added to the cart')
        return;
      }
    }
    
    let cartRowItems = `
      <div class="product-row">
        <div class="cart-product--image">
            <img class="cart-image" src="${imageSrc}" alt="">
        </div>
        <div class='cart--detail'>
            <p class='cart-title'>${productTitle}</p>
            <span class ="cart-price">${price}</span>
            <input class="product-quantity" type="number" value="1" />
        </div>
          <div class='remove-btn'>
            <button>Remove</button>
          </div>
         
        
      </div>    
        `
    productRow.innerHTML = cartRowItems;
    productRows.append(productRow);
    productRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeItem)
    productRow.getElementsByClassName('product-quantity')[0].addEventListener('change', changeQuantity)
    updateCartPrice()
  }

const addToCartClicked = (event) => {
    button = event.target;
    let cartItem = button.parentElement.parentElement.parentElement;
    let price = cartItem.getElementsByClassName('product-price')[0].innerText;
    let productTitle = cartItem.getElementsByClassName('product-title')[0].innerText
    let imageSrc = cartItem.getElementsByClassName('product-image')[0].src;
    addItemToCart (price, imageSrc, productTitle);
    // updateCartPrice()
  }

for (let i = 0; i < addToCart.length; i++) {
    button = addToCart[i];
    button.addEventListener('click', addToCartClicked)
  }


// Remove products from cart
const removeBtn = document.getElementsByClassName('remove-btn');

const removeItem = (event) => {
  btnClicked = event.target
  btnClicked.parentElement.parentElement.parentElement.remove()
  updateCartPrice()
}

for (let i = 0; i < removeBtn.length; i++) {
  button = removeBtn[i]
  button.addEventListener('click', removeItem)
}


// purchase items
const purchaseBtn = document.querySelector('.purchase-btn');

const purchaseBtnClicked = () => {
  alert ('Thank you for your purchase');
  
 let cartItems = document.getElementsByClassName('product-rows')[0]
 while (cartItems.hasChildNodes()) {
   cartItems.removeChild(cartItems.firstChild)
 }
  updateCartPrice()
  toggleCart()
}

purchaseBtn.addEventListener('click', purchaseBtnClicked)