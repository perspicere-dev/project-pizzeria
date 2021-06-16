import {templates, select} from '../settings.js';


class Home {
  constructor(element){
    
    this.render(element);
    this.initWidgets();

  }
 


  render(element){
    const thisHome = this;
    const generatedHTML = templates.homeWidget();
   
    thisHome.dom ={};
    thisHome.dom.wrapper = element;
    thisHome.dom.wrapper.innerHTML = generatedHTML;
    thisHome.dom.options = element.querySelector('.options');
    console.log('thisHome.dom.options', thisHome.dom.options);


  }




  initWidgets(){
    const thisHome = this;

    thisHome.dom.options.addEventListener('click', function(event){//start booking/order?
    });

    

    const element = document.querySelector(select.widgets.carousel);
  
    const flkty = new Flickity(element, {
      cellAlign: 'left',
      contain: true
    });
 
    return flkty;
  }

}

export default Home;