import {templates, select, settings} from '../settings.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js'; 
import {utils} from '../utils.js';

class Booking {
  constructor(element){
    this.render(element);
    this.initWidgets();
    this.getData();
  }

  getData(){
    
    const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(this.datePickerWidget.minDate);
    const endDateParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(this.datePickerWidget.maxDate);
    
    const params = {
      booking: [
        startDateParam,
        endDateParam
      ],
      eventsCurrent: [
        settings.db.notRepeatParam,
        startDateParam,
        endDateParam,      
      ],
      eventsRepeat: [
        settings.db.repeatParam,
        endDateParam,      
      ],
    };

    console.log('params', params);

    const urls = {
      booking:       settings.db.url + '/' + settings.db.bookings  + '?' + params.booking.join('&'),
      eventsCurrent: settings.db.url + '/' + settings.db.events    + '?' + params.eventsCurrent.join('&'),
      eventsRepeat:  settings.db.url + '/' + settings.db.events    + '?' + params.eventsRepeat.join('&'),
    };

    console.log('urls', urls);

    Promise.all([
      fetch(urls.booking),
      fetch(urls.eventsCurrent),
      fetch(urls.eventsRepeat),
    ])
      .then(function(allResponses){
        const bookingResponse = allResponses[0];
        const eventsCurrentResponse = allResponses[1];
        const eventsRepeatResponse = allResponses[2];

        return Promise.all([
          bookingResponse.json(),
          eventsCurrentResponse.json(),
          eventsRepeatResponse.json(),
        ]); 
      })
      .then(function([bookings, eventsCurrent, eventsRepeat]){
        console.log('bookings', bookings);
        console.log('eventsCurrent', eventsCurrent);
        console.log('eventsRepeat', eventsRepeat);
      });
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
    this.datePickerWidget = new DatePicker(this.dom.DatePicker);
    this.hourPicker = new HourPicker(this.dom.HourPicker);

    this.dom.peopleAmount.addEventListener('updatedProdutcsQuantity', function(){});
    this.dom.hoursAmount.addEventListener('updatedProdutcsQuantity', function(){});
  }
}

export default Booking;