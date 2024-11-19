import { cart, removeFromCart,calculateCartQuantity, updateQuantity, updateDeliveryOption} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from "../../data/deliveryOptions.js";
import {paymentSummary} from "./paymentSummary.js"
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary(){
let cartSummaryHTML="";
cart.forEach((item)=>{
    const productId=item.productId;
    let matchingitem;
    products.forEach((product)=>{
        if(product.id===productId)
            matchingitem=product;
    });
   
    let matchingoption;
    deliveryOptions.forEach((option)=>{
        if(item.deliveryOptionId===option.id)
            matchingoption=option;
    });

    const today=dayjs();
    const deliverydate=today.add(
        matchingoption.deliveryDays,
        'days'
    );
    const datestring=deliverydate.format('dddd, MMMM D');

    cartSummaryHTML+=`
    <div class="cart-item-container js-cart-item-container-${matchingitem.id}">
            <div class="delivery-date">
              Delivery date: ${datestring}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingitem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingitem.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingitem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingitem.id}">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id=${matchingitem.id}>
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingitem.id}">
                  <span class="save-quantity-link link-primary js-save-link" data-product-id=${matchingitem.id}>Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingitem.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHTML(matchingitem,item)}
              </div>
            </div>
          </div>`;
          // updateCartQuantity();
          renderCheckoutHeader();
});

document.querySelector(".js-order-summary").innerHTML=cartSummaryHTML;

function deliveryOptionHTML(matchingitem,item){

    let html='';
    deliveryOptions.forEach((deliveryOption)=>{
        const today=dayjs();
        const deliverydate=today.add(
            deliveryOption.deliveryDays,
            'days'
        );
        const datestring=deliverydate.format('dddd, MMMM D');
        const pricestring= deliveryOption.priceCents === 0? 'FREE':`$${formatCurrency(deliveryOption.priceCents)} -`; 

        const ischecked= deliveryOption.id===item.deliveryOptionId;
        html+=`
        <div class="delivery-option js-delivery-option" data-product-id="${matchingitem.id}"
        data-delivery-option-id='${deliveryOption.id}'>
            <input type="radio" 
            ${ischecked ? 'checked':''}
            class="delivery-option-input" name="delivery-option-${matchingitem.id}">
            <div>
                <div class="delivery-option-date">
                    ${datestring}
                </div>
                <div class="delivery-option-price">
                    ${pricestring} Shipping
                </div>
            </div>
        </div>`;
    });
     return html;
}

document.querySelectorAll(".js-delete-link")
.forEach((link)=>{
    link.addEventListener("click",()=>{
        const productId=link.dataset.productId;
        removeFromCart(productId);

        // const container=document.querySelector(`.js-cart-item-container-${productId}`);
        // container.remove();
        renderOrderSummary();
        // updateCartQuantity();
        renderCheckoutHeader();
        paymentSummary();
    });
});

document.querySelectorAll(".js-update-link")
.forEach((link)=>{
    link.addEventListener("click",()=>{
        const productId=link.dataset.productId;

        const container=document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');
    });
});

document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove('is-editing-quantity');

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const newQuantity = Number(quantityInput.value);
      if (newQuantity < 0 || newQuantity >= 1000) {
        alert('Quantity must be at least 0 and less than 1000');
        return;
      }
      updateQuantity(productId,newQuantity);

      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerText = newQuantity;

      // updateCartQuantity();
      renderCheckoutHeader();
      paymentSummary();

    });
  });

// function updateCartQuantity(){
// const cartquantity=calculateCartQuantity();
// document.querySelector(".js-return-to-home").innerHTML=`${cartquantity} items`;
// }

document.querySelectorAll(".js-delivery-option")
.forEach((element)=>{
    element.addEventListener("click",()=>{
        const {productId,deliveryOptionId}= element.dataset;
        updateDeliveryOption(productId,deliveryOptionId);
        renderOrderSummary();
        paymentSummary();
    })
})

}

