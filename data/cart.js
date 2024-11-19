export let cart=JSON.parse(localStorage.getItem('cart'));

if(!cart){

    cart=[{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }];
}


export function addToCart(productId,arr){
    let matchingitem;
          cart.forEach((item)=>{
              if(productId === item.productId){
                  matchingitem=item;
              }
          });
  
          if(matchingitem){
              matchingitem.quantity+=Number(arr.value);
          }else{
              cart.push({
                  productId:productId,
                  quantity: Number(arr.value),
                  deliveryOptionId: '1'
              });
          }
          saveToStorage();
  }

  function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
  }

  export function removeFromCart(productId){
    const newCart=[];

    cart.forEach((item)=>{
        if(productId!=item.productId)
            newCart.push(item);
    });
  
    cart=newCart;
    saveToStorage();
  }

  export function calculateCartQuantity(){
    let cartquantity=0;
    cart.forEach((item)=>{
      cartquantity+=item.quantity;
    });
    return cartquantity;
  }

  export function updateQuantity(productId,newQuantity){
    cart.forEach((item)=>{
        if(item.productId===productId){
            item.quantity=newQuantity;
        }
    });
    saveToStorage();
  }

  export function updateDeliveryOption(productId,deliveryOptionId){
    cart.forEach((item)=>{
        if(item.productId===productId){
            item.deliveryOptionId=deliveryOptionId;
        }
    });

    saveToStorage();
  }

  export function loadCart(fun){
    const xhr= new XMLHttpRequest();

    xhr.addEventListener('load', ()=>{
        console.log(xhr.response);
        fun();
    });

    xhr.open('GET','https://supersimplebackend.dev/cart');
    xhr.send();
  }