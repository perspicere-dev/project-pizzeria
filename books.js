class BooksList {
  constructor(){
    this.favoriteBooks =[];
    this.filters = [];
      
    this.initData(); 
    this.getElements();
    this.renderBooks(this.books);
    this.initActions();
  }
  
  initData() {
    this.books = dataSource.books;
  }
  
  getElements(){
    this.booksList = document.querySelector('.books-list');
    this.filtersSelector = document.querySelector('.filters');
  }
  
  renderBooks(books){
    const tplBookSource = document.querySelector('#template-book').innerHTML;
    const tplBookFunc = Handlebars.compile(tplBookSource);
        
    for(let bookData of books){
      bookData['ratingBgc'] = this.determineRatingBgc(bookData.rating);
      bookData['ratingWidth'] = bookData.rating * 10;
      const generatedHTML = tplBookFunc(bookData);
      const elementDom = utils.createDOMFromHTML(generatedHTML);
      console.log('bookData', bookData);
      console.log('elementDom', elementDom);  
      this.booksList.appendChild(elementDom);   
    }     
  }
  
  determineRatingBgc(rating){
    console.log('determineRatingBgc');
    if (rating < 6) {
      return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  }
  
  initActions(){
  
    const thisBooklist = this;
  
    this.booksList.addEventListener('click', function(event){
      event.preventDefault();
    });
  
    this.booksList.addEventListener('dblclick', function(event){
      if(event.target.offsetParent.classList.contains('book__image')){
        const image = event.target.offsetParent;
        if(!image.classList.contains('favorite')){   //jak sprawdzić czy data-id jest w favoriteBooks[]?
          image.classList.add('favorite');
          thisBooklist.favoriteBooks.push(image.getAttribute('data-id'));
        }else{
          image.classList.remove('favorite');
          let imageId = image.getAttribute('data-id');
          let indexOfImageId = thisBooklist.favoriteBooks.indexOf(imageId);
          thisBooklist.favoriteBooks.splice(indexOfImageId, 1); 
        }
      }
    });
    
    this.filtersSelector.addEventListener('click', function(event){
    
      if(event.target.tagName == 'INPUT' 
        && event.target.type == 'checkbox' 
        && event.target.name == 'filter'){
        const input = event.target;
        const inputValue = input.getAttribute('value');
        console.log('inputValue', inputValue);
        if (input.checked) {
          thisBooklist.filters.push(inputValue);
        } else {
          const indexOfInput = thisBooklist.filters.indexOf(inputValue);
          thisBooklist.filters.splice(indexOfInput, 1);
        }
    
        thisBooklist.filterBooks();
      }
      // console.log('filters', filters);
    });
  }
  
  filterBooks(){
    
    for(let bookData of app.books){
      const bookHTML = this.booksList.querySelector(`.book__image[data-id="${bookData.id}"]`);
      let shouldBeHidden = false;
    
      for(const filter of this.filters){
        if(!bookData.details[filter] == true){
          shouldBeHidden = true;
          console.log('filter', filter);
          break;
        }
      }
    
      if(shouldBeHidden == true){
        if(!bookHTML.classList.contains('hidden')){
          bookHTML.classList.add('hidden');
        }
      }else if(bookHTML.classList.contains('hidden')){
        bookHTML.classList.remove('hidden');
      }
    }
  }
  
}
  
const app = new BooksList();