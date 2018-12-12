class Product {
  constructor(id, title, price, img = 'https://placehold.it/261x280', container = '#products'){
    this.id = id;
    this.title = title;
    this.price = price;
    this.img = img;
    this.container = container;
    this._render();
    // this._init();
  }

  _render(){
    let $wrapper = $('<li/>', {
      class: 'product-list_item',
      id: `product${this.id}`
    });

    let $productFigure = $('<figure class="product-figure"></figure>');
    let $productCard = $('<a href="single-page.html" class="product-card"></a>');
    let $productImg = $(`<img src="${this.img}" alt="card${this.id}-img" class="product-img">`);
    let $productTextBox = $('<div class="product-text-box">');
    let $productName = $(`<h3 class="product-name">${this.title}</h3>`);
    let $productPrice = $(`<h3 class="product-price design-color">$${(this.price).toFixed(2)}</h3>`);
    let $stars = $('<div class="product-stars"></div>');

    for (let i = 1; i <= product["full_star"]; i++) {
      let $fullStar = $('<i class="fas fa-star">');
      $fullStar.appendTo($stars);
    }

    if (product["half_star"]) {
      let $halfStar = $('<i class="fas fa-star-half-alt">');
      $halfStar.appendTo($stars);
    }

    let $btnBox = $('<div class="addToCart-btn-box"></div>');
    let $buyBtn = $('<a/>', {
      class: 'addToCart-button',
      text: 'Add to Cart',
      href: '#',
      'data-id': this.id,
      'data-price': this.price,
      'data-title': this.title
    });

    // $buyBtn.click()


    // Создаем структуру товара (верстку)
    $productFigure.appendTo($wrapper);
    $productCard.appendTo($productFigure);
    $productImg.appendTo($productCard);
    $productTextBox.appendTo($productCard);
    $productName.appendTo($productTextBox);
    $productPrice.appendTo($productTextBox);
    $stars.appendTo($productTextBox);
    $btnBox.appendTo($wrapper);
    $buyBtn.appendTo($btnBox);
    $(this.container).append($wrapper);
  }

  _init(source){
    this._render();
    fetch(source)
      .then(result => result.json())
      .then(data => {
        for (let product of data.contents){
          this.cartItems.push(product);
          this._renderItem(product)
        }
        this.countGoods = data.countGoods;
        this.amount = data.amount;
        this._renderSum();
      })
  }
}