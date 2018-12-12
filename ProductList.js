class ProductList {
  constructor(source, container = '#products'){
    this.container = container;
    this.productListItems = [];
    // this.source = source;
    // this._render();
    this._init(source);
  }

  _renderItem(product){
    let $wrapper = $('<li/>', {
      class: 'product-list_item',
      id: `product${this.id}`
    });

    let $productFigure = $('<figure class="product-figure"></figure>');
    let $productCard = $('<a href="single-page.html" class="product-card"></a>');
    let $productImg = $(`<img src="${product.src}" alt="card${product.id_product}-img" class="product-img">`);
    let $productTextBox = $('<div class="product-text-box">');
    let $productName = $(`<h3 class="product-name">${product.title}</h3>`);
    let $productPrice = $(`<h3 class="product-price design-color">$${(product.price).toFixed(2)}</h3>`);
    let $stars = $('<div class="product-stars"></div>');

    for (let i = 1; i <= product["full_star"]; i++) {
      let $fullStar = $('<i class="fas fa-star">');
      $fullStar.appendTo($stars);
    }

    if (product["half_star"]) {
      let $halfStar = $('<i class="fas fa-star-half-alt">');
      $halfStar.appendTo($stars);
    }

    // if (product["full_star"] < 3 && product["half_star"]) {
    //   for (let i = 1; i < 3 - product["full_star"]; i++ ) {
    //     let $emptyStar = $('<i class="far fa-star"></i>');
    //     $emptyStar.appendTo($stars);
    //   }
    // }

    if (product["full_star"] < 5 && !product["half_star"]) {
      for (let i = 0; i < 5 - product["full_star"]; i++) {
        let $emptyStar = $('<i class="far fa-star">');
        $emptyStar.appendTo($stars);
      }
    }

    let $btnBox = $('<div class="addToCart-btn-box"></div>');
    let $buyBtn = $('<a/>', {
      class: 'addToCart-button',
      text: 'Add to Cart',
      href: '#',
      'data-id': product.id,
      'data-price': product.price,
      'data-title': product.title
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
    // this._render();
    fetch(source)
      .then(result => result.json())
      .then(data => {
        for (let product of data.contents){
          this.productListItems.push(product);
          this._renderItem(product)
        }
      })
  }
}