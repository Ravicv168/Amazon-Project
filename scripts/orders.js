import { calculateCartQuantity } from "../data/cart.js";
import { orders } from "../data/Order.js"
import { getProduct } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";



const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


let ordersHtml ="";


   orders.forEach((order)=>{
    const datestring = new Date(order.orderTime);
    ordersHtml+=`
    <div class="orders-grid">
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${months[datestring.getMonth()]} - ${datestring.getDate()}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div> `;
      let prods = order.products;
      prods.forEach((prod)=>{
        let item= getProduct(prod.productId);
        const datestring1 = new Date(prod.estimatedDeliveryTime);
        ordersHtml+=`<div class="order-details-grid">
            <div class="product-image-container">
              <img src="${item.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${item.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${months[datestring1.getMonth()]}  ${datestring1.getDate()}
              </div>
              <div class="product-quantity">
                Quantity: ${prod.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${prod.productId}">
                <button class="track-package-button button-secondary js-track">
                  Track package
                </button>
              </a>
            </div>
        </div>
      </div>
    `;
      });    
    });


document.querySelector('.js-order-grid').innerHTML=ordersHtml;

let cartquantity = calculateCartQuantity();
document.querySelector('.js-cart-quantity1').innerText=cartquantity;

export function getOrder(orderId) {
    let matchingOrder;
  
    orders.forEach((order) => {
      if (order.id === orderId) {
        matchingOrder = order;
      }
    });
  
    return matchingOrder;
  }

