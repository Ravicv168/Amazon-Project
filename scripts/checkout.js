import {renderOrderSummary} from './checkout/orderSummary.js'
import { paymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
// import { loadProducts } from '../data/products.js';
// import { loadCart } from '../data/cart.js';
// import { loadProductsFetch } from '../data/products.js';
// import '../data/backend-practice.js';


// async function loadPage(){
//     try{
//         await loadProductsFetch();
        
//         await new Promise((resolve)=>{
//             loadCart(()=>{
//                 resolve();
//             });
//         });

//     }catch(error){
//         console.log("Unexpected error has occured, please try again later!");
//     }

//         renderCheckoutHeader();
//         renderOrderSummary();
//         paymentSummary();
// }

// loadPage();

// Promise.all([
//     loadProductsFetch,
//     new Promise((resolve)=>{
//         loadCart(()=>{
//             resolve();
//         });
//     })
// ]).then(()=>{
//     renderCheckoutHeader();
//     renderOrderSummary();
//     paymentSummary();
// });

// new Promise((resolve)=>{
//     loadProducts(()=>{
//         resolve();
//     });
// }).then(()=>{
//     renderCheckoutHeader();
//     renderOrderSummary();
//     paymentSummary();
// });

// loadProducts(()=>{
//     renderCheckoutHeader();
//     renderOrderSummary();
//     paymentSummary();
// });

renderCheckoutHeader();
renderOrderSummary();
paymentSummary();
