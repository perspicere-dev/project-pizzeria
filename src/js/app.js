import {settings, select, classNames} from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import Booking from './components/Booking.js';
import Home from './components/Home.js';

export const app = {
  
  initBooking: function(){
    const thisApp = this;

    thisApp.bookingWrapper = document.querySelector(select.containerOf.booking);

    thisApp.bookingWidget = new Booking(thisApp.bookingWrapper);

  },

  initHome: function(){
    const thisApp = this;

    thisApp.homeWrapper = document.querySelector(select.containerOf.home);
    // console.log('thisApp.homeWrapper', thisApp.homeWrapper);

    thisApp.homeWrapper = new Home(thisApp.homeWrapper);
  },
  
  initaPages: function (){
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    
    const idFromHash = window.location.hash.replace('#/', '');
    console.log('idFromHash', idFromHash);
    let pageMatchingHash =  thisApp.pages[0].id;

    for(let page of thisApp.pages){
      if (page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }
    thisApp.activatePage(pageMatchingHash);

    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();

        //get id from href attribute
        const id = clickedElement.getAttribute('href').replace('#', '');

        //run thisApp.ctivatePage with that id
        thisApp.activatePage(id);

        //change URL hash
        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function(pageId){
    const thisApp = this;

    //add class active to matching pages, remove class from non-matching
    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    
    //add class active to matching links, remove class from non-matching
    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active, 
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  initMenu: function(){
    const thisApp = this;
    for (let productData in thisApp.data.products){
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
      //console.log(`"for in" in thisApp.data.products for productData: ${ productData }; in "thisApp.data.products[productData]" [] means value of key ${ productData } and equals to ${ thisApp.data.products[productData] }`);
      //console.log('data', thisApp.data);
    }
  },

  initData: function(){
    const thisApp = this;

    thisApp.data = {};

    const url = settings.db.url + '/' + settings.db.products;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        //console.log('parsedResponse', parsedResponse);
        thisApp.data.products = parsedResponse;
        thisApp.initMenu();
      });
    //console.log('thisApp.data', JSON.stringify(thisApp.data));
  },

  initCart: function(){
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);

    thisApp.productList.addEventListener('add-to-cart', function(event){
      app.cart.add(event.detail.product.prepareCartProduct());
    });
  },

  init: function(){
    const thisApp = this;
    
    thisApp.initaPages();
    thisApp.initData();
    thisApp.initCart();
    thisApp.initBooking();
    thisApp.initHome();
   
  },

};

app.init();
