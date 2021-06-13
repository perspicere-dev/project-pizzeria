import {templates, select, settings, classNames} from '../settings.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js'; 
import {utils} from '../utils.js';

class Home {
  constructor(element){
    
    this.render(element);
    // this.initWidgets();
    // this.getData();
  }
  
  //   getData(){
  //     const thisBooking = this;
  //     const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePickerWidget.minDate);
  //     const endDateParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePickerWidget.maxDate);

  //     const params = {
  //       booking: [
  //         startDateParam,
  //         endDateParam
  //       ],
  //       eventsCurrent: [
  //         settings.db.notRepeatParam,
  //         startDateParam,
  //         endDateParam,      
  //       ],
  //       eventsRepeat: [
  //         settings.db.repeatParam,
  //         endDateParam,      
  //       ],
  //     };
  //   }


  render(element){
    const generatedHTML = templates.homeWidget();
   
    this.dom ={};
    this.dom.wrapper = element;
    this.dom.wrapper.innerHTML = generatedHTML;
    // this.dom.peopleAmount = this.dom.wrapper.querySelector(select.booking.peopleAmount);
    // this.dom.hoursAmount = this.dom.wrapper.querySelector(select.booking.hoursAmount);
    // this.dom.DatePicker = this.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);
    // this.dom.HourPicker = this.dom.wrapper.querySelector(select.widgets.hourPicker.wrapper);
    // this.dom.tables = this.dom.wrapper.querySelectorAll(select.booking.tables);
    // this.dom.tablesDiv = this.dom.wrapper.querySelector(select.booking.tablesDiv);
    // this.dom.bookTable = this.dom.wrapper.querySelector(select.booking.form);
    // this.dom.phone = this.dom.wrapper.querySelector(select.booking.phone); // czy to ok,e w cart i booking zbiera te samne dane?
    // this.dom.address = this.dom.wrapper.querySelector(select.booking.address);
    // this.dom.starters = this.dom.wrapper.querySelectorAll(select.booking.starters);

  }

  //   initWidgets(){
  //     const thisBooking = this;
    
  //     thisBooking.peopleAmountAmountWidget = new AmountWidget(this.dom.peopleAmount);
  //     thisBooking.hoursAmountAmountWidget = new AmountWidget(this.dom.hoursAmount);
  //     thisBooking.datePickerWidget = new DatePicker(this.dom.DatePicker);
  //     thisBooking.hourPicker = new HourPicker(this.dom.HourPicker);

  //     thisBooking.dom.peopleAmount.addEventListener('updatedProdutcsQuantity', function(){
  //     });
  //     thisBooking.dom.hoursAmount.addEventListener('updatedProdutcsQuantity', function(){});

  //     thisBooking.dom.wrapper.addEventListener('updatedProdutcsQuantity', function(){
  //       thisBooking.updateDOM();
  //       thisBooking.selectedTableId = -1;
  //       thisBooking.refreshTablesView();
  //       console.log('selectedTableId', thisBooking.selectedTableId);
  //     });  

  //     thisBooking.dom.tablesDiv.addEventListener('click', function(event){
      
  //       thisBooking.setSelectedTables(event);
  //     });

  //     thisBooking.dom.bookTable.addEventListener('submit', function (event) {
  //       event.preventDefault();
  //       thisBooking.sendBooking();
  //     });
  //   }

}

export default Home;