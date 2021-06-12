import {settings, select, classNames, templates } from '../settings.js';
import {utils} from '../utils.js';
import CartProduct from './CartProduct.js';

class Cart {
  constructor(element){
    const thisCart = this;
    thisCart.products = [];
    thisCart.getElements(element);
    thisCart.initActions();
  } 

  getElements(element){
    const thisCart = this;
    thisCart.dom = {};
    thisCart.dom.wrapper = element;
      
    thisCart.dom.toggleTrigger = element.querySelector(select.cart.toggleTrigger);
    thisCart.dom.productList = element.querySelector(select.cart.productList);
    thisCart.dom.deliveryFee = element.querySelector(select.cart.deliveryFee);
    thisCart.dom.subTotalPrice = element.querySelector(select.cart.subtotalPrice);
    thisCart.dom.totalPrice = element.querySelectorAll(select.cart.totalPrice);
    thisCart.dom.totalNumber = element.querySelector(select.cart.totalNumber);
    thisCart.dom.form = element.querySelector(select.cart.form);
    thisCart.dom.formAddress = thisCart.dom.form.querySelector(select.cart.address);
    thisCart.dom.formPhone = thisCart.dom.form.querySelector(select.cart.phone);
  }

  initActions(){
    const thisCart = this;

    thisCart.dom.toggleTrigger.addEventListener('click', function () {
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });
    thisCart.dom.productList.addEventListener('updatedProdutcsQuantity', function(){
      thisCart.update();
    });
    thisCart.dom.productList.addEventListener('remove', function(event){            // line 427. This listener listes for event remove dipached by CartProduct.remove()
      thisCart.remove(event.detail.cartProduct);                                    // and it sends to the remove method in Cart, argument which is 
    }); 
    thisCart.dom.form.addEventListener('submit', function(event){
      event.preventDefault();
      thisCart.sendOrder();
    });                                                                            // new object in CustomEvent 'remove' properties in detail key. This is the cartProduct: thisCartProduct 
  }

  sendOrder(){ 
    const thisCart = this;
    const url = settings.db.url + '/' + settings.db.orders;      

    const payload = {
      address: thisCart.dom.formAddress.value,
      phone: thisCart.dom.formPhone.value,
      totalPrice: thisCart.totalPrice,
      subTotalPrice: thisCart.subTotalPrice,
      totalNumber: thisCart.totalNumber,
      deliveryFee: thisCart.deliveryFee,
      products: [],
    };
    console.log('payload', payload);
    for(let cartProduct of thisCart.products) {
      payload.products.push(cartProduct.getData()); // speak loud 
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    fetch(url, options)
      .then(function(response){
        return response.json();
      })
      .then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
      });    
  }

  add(menuProduct){
    const thisCart = this;
    console.log('adding product', menuProduct);
    const generatedHTML = templates.cartProduct(menuProduct);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    thisCart.dom.productList.appendChild(generatedDOM);
    thisCart.products.push(new CartProduct(menuProduct, generatedDOM));
    console.log('thisCart.prducts []', thisCart.products );
    thisCart.update();
  }

  update(){
     
    const thisCart = this;
    thisCart.deliveryFee = settings.cart.defaultDeliveryFee;
    thisCart.totalNumber = 0;
    thisCart.subTotalPrice = 0;

    for (let product of thisCart.products){
      thisCart.subTotalPrice += product.price;
      thisCart.totalNumber += product.amount;
    }
    if (thisCart.totalNumber == 0){
      thisCart.totalprice = 0;
    } else {
      thisCart.totalPrice = thisCart.subTotalPrice + thisCart.deliveryFee;
    }
    thisCart.dom.totalNumber.innerHTML = thisCart.totalNumber;
    thisCart.dom.deliveryFee.innerHTML = thisCart.deliveryFee;
    thisCart.dom.subTotalPrice.innerHTML = thisCart.subTotalPrice;
    for (let price of thisCart.dom.totalPrice){
      price.innerHTML = thisCart.totalPrice;
    }    
    console.log('deliveryFee: ', thisCart.deliveryFee);
    console.log('thisCart.totalNumber', thisCart.totalNumber);
    console.log('thisCart.subTotalPrice', thisCart.subTotalPrice);
    console.log('thisCart.totalprice', thisCart.totalPrice);
  }

  remove(justName){
    const thisCart = this;
    const indexOfppp = thisCart.products.indexOf(justName); 
    thisCart.products.splice(indexOfppp, 1);

    // for(let product of thisCart.products){
    //   if(product === justName){
    //     thisCart.products.splice(product, 1);
    //   }
    // }

    justName.dom.wrapper.remove();
    thisCart.update();
    console.log('justName', justName);
  }
}

export default Cart;