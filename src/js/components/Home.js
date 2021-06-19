import {templates, select} from '../settings.js';
import {app} from '../app.js';



class Home {
  constructor(element){
    
    this.render(element);
    this.initWidgets();
    this. activateNavLinks();

  }
 
  render(element){
    const thisHome = this;
    const generatedHTML = templates.homeWidget();
   
    thisHome.dom ={};
    thisHome.dom.wrapper = element;
    thisHome.dom.wrapper.innerHTML = generatedHTML;
    thisHome.dom.order = element.querySelector('.order-online');
    thisHome.dom.booking = element.querySelector('.book-online');
    console.log('thisHome.dom.order', thisHome.dom.order);
  }

  activateNavLinks(){

    this.dom.order.addEventListener('click', function(){
      app.activatePage('order');
    });

    this.dom.booking.addEventListener('click', function(){
      app.activatePage('booking');
    });
  }




  initWidgets(){

    const element = document.querySelector(select.widgets.carousel);
  
    const flkty = new Flickity(element, {
      cellAlign: 'left',
      contain: true,
      autoPlay: true,
      prevNextButtons: false,
      
    });
 
    return flkty;
  }

}

export default Home;