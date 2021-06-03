import {templates, select} from '../settings.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js'; 

class Booking {
  constructor(element){
    this.render(element);
    this.initWidgets();
  }

  render(element){
    const generatedHTML = templates.bookingWidget();
   
    this.dom ={};
    this.dom.wrapper = element;
    this.dom.wrapper.innerHTML = generatedHTML;
    this.dom.peopleAmount = document.querySelector(select.booking.peopleAmount);
    this.dom.hoursAmount = document.querySelector(select.booking.hoursAmount);
    this.dom.DatePicker = document.querySelector(select.widgets.datePicker.wrapper);
    this.dom.HourPicker = document.querySelector(select.widgets.hourPicker.wrapper);
  }

  initWidgets(){
    this.peopleAmountAmountWidget = new AmountWidget(this.dom.peopleAmount);
    this.hoursAmountAmountWidget = new AmountWidget(this.dom.hoursAmount);
    this.DatePickerWidget = new DatePicker(this.dom.DatePicker);
    this.HourPicker = new HourPicker(this.dom.HourPicker);

    this.dom.peopleAmount.addEventListener('updatedProdutcsQuantity', function(){});
    this.dom.hoursAmount.addEventListener('updatedProdutcsQuantity', function(){});
  }
}

export default Booking;