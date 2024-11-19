import { cart, addToCart,calculateCartQuantity} from "../data/cart.js";
import { products} from "../data/products.js";

// const products=[{
//     image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
//     name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
//     rating: {
//         stars: 4.5,
//         count: 87,
//     },
//     priceCents: 1090,
// },{
//     image: 'images/products/intermediate-composite-basketball.jpg',
//     name: 'Intermediate Size Basketball',
//     rating: {
//         stars: 4,
//         count: 127,
//     },
//     priceCents: 2095,
// },{
//     image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//     name: 'Adults Plain Cotton T-Shirt - 2 Pack',
//     rating: {
//         stars: 4.5,
//         count: 56,
//     },
//     priceCents: 799,
// },{
//     image: 'images/products/black-2-slot-toaster.jpg',
//     name: '2 Slot Toaster - Black',
//     rating: {
//         stars: 5,
//         count: 2197
//     },
//     priceCents: 1899
// },{
//     image: 'images/products/6-piece-white-dinner-plate-set.jpg',
//     name: '6 Piece White Dinner Plate Set',
//     rating: {
//         stars: 4,
//         count: 37
//     },
//     priceCents: 2067
// }];

// loadProducts(renderProductsGrid);

  let productsHTML = "";

      products.forEach((product)=>{
          productsHTML+=`
          <div class="product-container">
                <div class="product-image-container">
                  <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                  ${product.name}
                </div>

                <div class="product-rating-container">
                  <img class="product-rating-stars"
                    src="${product.getStarsURL()}">
                  <div class="product-rating-count link-primary">
                    ${product.rating.count}
                  </div>
                </div>

                <div class="product-price">
                  $${product.getPrice()}
                </div>

                <div class="product-quantity-container">
                  <select class="js-product-quantity-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                ${product.extraInfoHTML()}
                <div class="product-spacer"></div>

                <div class="added-to-cart js-added-to-cart-${product.id}">
                  <img src="images/icons/checkmark.png">
                  Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
                  Add to Cart
                </button>
              </div>
              `;
      });

      document.querySelector(".js-product-list").innerHTML=productsHTML;



function updateCartQuantity(){
  const cartquantity=calculateCartQuantity();
  document.querySelector(".js-cart-quantity").innerText=cartquantity;
}

function timeOut(addedmessage){
    setTimeout(()=>{
      addedmessage.classList.remove('added-to-cart-visible');
  },2000);
}

document.querySelectorAll(".js-add-to-cart-button")
.forEach((button)=>{
    button.addEventListener("click",()=>{
        const productId=button.dataset.productId;
        let arr=document.querySelector(`.js-product-quantity-${productId}`);
        let addedmessage=document.querySelector(`.js-added-to-cart-${productId}`);
        addedmessage.classList.add('added-to-cart-visible');

        timeOut(addedmessage);
        addToCart(productId,arr);
        updateCartQuantity();
    });
});


updateCartQuantity();
