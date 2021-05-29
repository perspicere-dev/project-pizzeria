import {templates, select} from '../settings.js';
import AmountWidget from './AmountWidget.js'; 

class Booking {
  constructor(element){
    this.render(element);
    this.initWidgets();
  }

  render(element){
    const generatedHTML = templates.bookingWidget();
   
    this.dom ={
      wrapper: element,
    };
    this.dom.wrapper.innerHTML = generatedHTML;
    this.dom.peopleAmount = document.querySelector(select.booking.peopleAmount);
    this.dom.hoursAmount = document.querySelector(select.booking.hoursAmount);

  }

  initWidgets(){
    this.peopleAmountAmountWidget = new AmountWidget(this.dom.peopleAmount);
    this.hoursAmountAmountWidget = new AmountWidget(this.dom.hoursAmount);

    this.dom.peopleAmount.addEventListener('updatedProdutcsQuantity', function(){});
    this.dom.hoursAmount.addEventListener('updatedProdutcsQuantity', function(){});
  }
}

export default Booking;