import {templates, select, settings, classNames} from '../settings.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js'; 
import {utils} from '../utils.js';

class Booking {
  constructor(element){
    
    this.render(element);
    this.initWidgets();
    this.getData();
    this.selectedTableId = -1;
  }

  getData(){
    const thisBooking = this;
    const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePickerWidget.minDate);
    const endDateParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePickerWidget.maxDate);
    
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

    // console.log('params', params);

    const urls = {
      booking:       settings.db.url + '/' + settings.db.bookings  + '?' + params.booking.join('&'),
      eventsCurrent: settings.db.url + '/' + settings.db.events    + '?' + params.eventsCurrent.join('&'),
      eventsRepeat:  settings.db.url + '/' + settings.db.events    + '?' + params.eventsRepeat.join('&'),
    };

    // console.log('urls', urls);

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
        // console.log('bookings', bookings);
        // console.log('eventsCurrent', eventsCurrent);
        // console.log('eventsRepeat', eventsRepeat);
        thisBooking.parseData(bookings, eventsCurrent, eventsRepeat);
      });
  }
  

  parseData(bookings, eventsCurrent, eventsRepeat){
    this.booked = {};

    for(let item of bookings){
      this.makebooked(item.date, item.hour, item.duration, item.table);
    }
    
    for(let item of eventsCurrent){
      this.makebooked(item.date, item.hour, item.duration, item.table);
    }

    const minDate = this.datePickerWidget.minDate;
    const maxDate = this.datePickerWidget.maxDate;
    // console.log('min', minDate);
    // console.log('max', maxDate);
    
    for(let item of eventsRepeat){
      if(item.repeat == 'daily'){
        for(let loopDate = minDate; loopDate <= maxDate; loopDate = utils.addDays(loopDate, 1)){
          this.makebooked(utils.dateToStr(loopDate), item.hour, item.duration, item.table);
        }
      }
    }
    // console.log('this.booked', this.booked);
    this.updateDOM();
  }

  makebooked(date, hour, duration, table){

    if(typeof this.booked[date] == 'undefined'){
      this.booked[date] = {};
    }

    const startHour = utils.hourToNumber(hour);

    
    for(let hourblock = startHour ; hourblock < startHour + duration; hourblock += 0.5){
      // console.log('loop', hourblock)
      if(typeof this.booked[date][hourblock] == 'undefined'){
        this.booked[date][hourblock] = [];
      }
  
      this.booked[date][hourblock].push(table);
    }
  }

  updateDOM() {
    const thisBooking = this;

    thisBooking.date = thisBooking.datePickerWidget.value;
    thisBooking.hour = utils.hourToNumber(thisBooking.hourPicker.value);

    let allAvailable = false;

    if (
      typeof thisBooking.booked[thisBooking.date] == 'undefined'
        ||
        typeof thisBooking.booked[thisBooking.date][thisBooking.hour] == 'undefined'
    ) {
      allAvailable = true;
    }
    for (let table of thisBooking.dom.tables) {
      let tableId = table.getAttribute(settings.booking.tableIdAttribute);
      if (!isNaN(tableId)) {
        tableId = parseInt(tableId);
      }

      if (
        !allAvailable
            &&
            thisBooking.booked[thisBooking.date][thisBooking.hour].includes(tableId)
      ) {
        table.classList.add(classNames.booking.tableBooked);
      } else {
        table.classList.remove(classNames.booking.tableBooked);
      }
    }
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
    this.dom.tables = this.dom.wrapper.querySelectorAll(select.booking.tables);
    this.dom.tablesDiv = document.querySelector(select.booking.tablesDiv);
  }

  initWidgets(){
    const thisBooking = this;
    
    thisBooking.peopleAmountAmountWidget = new AmountWidget(this.dom.peopleAmount);
    thisBooking.hoursAmountAmountWidget = new AmountWidget(this.dom.hoursAmount);
    thisBooking.datePickerWidget = new DatePicker(this.dom.DatePicker);
    thisBooking.hourPicker = new HourPicker(this.dom.HourPicker);

    thisBooking.dom.peopleAmount.addEventListener('updatedProdutcsQuantity', function(){
    });
    thisBooking.dom.hoursAmount.addEventListener('updatedProdutcsQuantity', function(){});

    thisBooking.dom.wrapper.addEventListener('updatedProdutcsQuantity', function(){
      thisBooking.updateDOM();
    });  

    thisBooking.dom.tablesDiv.addEventListener('click', function(event){
      
      thisBooking.setSelectedTables(event);
      // if(event.target.classList.contains(classNames.booking.isTable)){
      //   const tableView = event.target;        
      //   const tableId = tableView.getAttribute(settings.booking.tableIdAttribute);
        
      //   thisBooking.selectTable(tableId);
      // }
    });


  }
  setSelectedTables(event){
    const thisBooking = this;
    const table = event.target;
    const tableId = event.target.getAttribute(settings.booking.tableIdAttribute);
    const tableBooked = classNames.booking.tableBooked;
    
    if(table.classList.contains(tableBooked)){
      alert('stolik zajęty!');
    } else if (thisBooking.selectedTableId == tableId) {
      thisBooking.selectedTableId = -1;
    } else thisBooking.selectedTableId = tableId;

    console.log('event', event.target);
    console.log('selectedTableId', thisBooking.selectedTableId);
    console.log('tableBooked', tableBooked);
  }
  // selectTable(event){
  //   

  //   const table = event.target;
  //   if(table.classList.contains(classNames.booking.isTable)){
  //     if(table.classList.contains(classNames.booking.tableBooked)){
  //       alert('stolik zajęty');
  //     } else 
  //       thisBooking.selectedTableId = table.getAttribute(settings.booking.tableIdAttribute);
     
  //     if(!table.classList.contains(classNames.booking.selected) 
  //       && !table.classList.contains(classNames.booking.tableBooked)
  //       && thisBooking.selectedTableId == table.getAttribute(settings.booking.tableIdAttribute)){

  //       table.classList.add(classNames.booking.selected);
  //     } else 
  //       table.classList.remove(classNames.booking.selected);
  //   }
  // }
  // selectTable(tableIdToSelect){
  //   const thisBooking = this;
  //   this.selectedTableId = tableIdToSelect;
  //   console.log('selectTable', tableIdToSelect);

  //   for (let table of thisBooking.dom.tables) {
  //     let tableId = table.getAttribute(settings.booking.tableIdAttribute);
  //     if (!isNaN(tableId)) {                                               // po co walidacja?
  //       tableId = parseInt(tableId);
  //     }
      
  //     if(tableIdToSelect == tableId){
  //       table.classList.add(classNames.booking.selected);
  //     }else {
  //       table.classList.remove(classNames.booking.selected);
  //     } 
  //   }
  // }
}

export default Booking;