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
    this.dom.peopleAmount = this.dom.wrapper.querySelector(select.booking.peopleAmount);
    this.dom.hoursAmount = this.dom.wrapper.querySelector(select.booking.hoursAmount);
    this.dom.DatePicker = this.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);
    this.dom.HourPicker = this.dom.wrapper.querySelector(select.widgets.hourPicker.wrapper);
    this.dom.tables = this.dom.wrapper.querySelectorAll(select.booking.tables);
    this.dom.tablesDiv = this.dom.wrapper.querySelector(select.booking.tablesDiv);
    this.dom.bookTable = this.dom.wrapper.querySelector(select.booking.form);
    this.dom.phone = this.dom.wrapper.querySelector(select.booking.phone); // czy to ok,e w cart i booking zbiera te samne dane?
    this.dom.address = this.dom.wrapper.querySelector(select.booking.address);
    this.dom.starters = this.dom.wrapper.querySelectorAll(select.booking.starters);

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
      thisBooking.selectedTableId = -1;
      thisBooking.refreshTablesView();
      console.log('selectedTableId', thisBooking.selectedTableId);
    });  

    thisBooking.dom.tablesDiv.addEventListener('click', function(event){
      
      thisBooking.setSelectedTables(event);
    });

    thisBooking.dom.bookTable.addEventListener('submit', function (event) {
      event.preventDefault();
      thisBooking.sendBooking();
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
    } else {
      thisBooking.selectedTableId = tableId;
    }
    thisBooking.refreshTablesView();
    // console.log('event', event.target);
    // console.log('selectedTableId', thisBooking.selectedTableId);
    // console.log('tableBooked', tableBooked);
  }

  refreshTablesView(){
    const thisBooking = this;
    
    for (let table of thisBooking.dom.tables) {
      const tableId = table.getAttribute(settings.booking.tableIdAttribute);
      
      if(thisBooking.selectedTableId == tableId){
        table.classList.add(classNames.booking.selected);
      } else {
        table.classList.remove(classNames.booking.selected);
      }
    }
  }

  sendBooking(){ 
    const thisBooking = this;
    const url = settings.db.url + '/' + settings.db.bookings;      

    const payload = {
      date: thisBooking.datePickerWidget.value,
      hour: thisBooking.hourPicker.value,
      table: thisBooking.selectedTableId,
      duration: thisBooking.hoursAmountAmountWidget.value,
      ppl: thisBooking.peopleAmountAmountWidget.value,
      starters: [],
      phone: thisBooking.dom.phone.value,
      address: thisBooking.dom.address.value,
    };
    // console.log('payload', payload);
      
    for(let starter of thisBooking.dom.starters) {

      if(starter.checked == true) {
        payload.starters.push(starter.value);
      }
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
        thisBooking.booked = parsedResponse;
        thisBooking.makebooked(payload.date, payload.hour, payload.table, payload.duration);
        // console.log('parsedResponse', parsedResponse);
        console.log('this.booked', thisBooking.booked);
      });    
    
  }
}

export default Booking;