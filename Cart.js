'use strict';

class Cart {
  constructor(source, container = '#cart') {
    this.source = source;
    this.container = container;
    this.countGoods = 0; // Общее кол-во товаров в корзине
    this.amount = 0; // Общая стоимость товаров в корзине
    this.cartItems = []; // Массив со всеми товарами
    this._init(this.source);
  }

  _render() {

    let $sectionsWrapper = $('<div class="cart-sectionsWrapper"></div>');
    let $cartOrderTotal = $('<div class="cart-orderTotal"></div>');
    let $totalName = $('<p>Total</p>');
    let $totalPrice = $(`<p class="cart-totalPrice">${(this.amount).toFixed(2)}</p>`);
    let $checkoutLink = $('<a href="checkout.html" class="cart-button">CHECKOUT</a>');
    let $shoppingCartLink = $('<a href="shopping-cart.html" class="cart-button">Go&nbsp;to&nbsp;cart</a>');


    $sectionsWrapper.appendTo($(this.container));
    $cartOrderTotal.appendTo($(this.container));
    $totalName.appendTo($cartOrderTotal);
    $totalPrice.appendTo($cartOrderTotal);
    $checkoutLink.appendTo($(this.container));
    $shoppingCartLink.appendTo($(this.container));

  }

  _init(source) {
    this._render();

    fetch(source)
      .then(result => result.json())
      .then(data => {
        for (let product of data.contents) {
          this.cartItems.push(product);
          this._renderItem(product)
        }
        this.amount = data.amount;
        this.countGoods = data.countGoods;
        this._renderSum();
      })
      .catch(error => {
        console.log(error);
        let $cartProductSection = $('<section class="cart-productSection">В корзине нет товаров</section>');
        $cartProductSection.appendTo($('.cart-sectionsWrapper'));
      })
  }

  _renderSum() {
    // $('.sum-amount').text(`Всего товаров в корзине: ${this.countGoods}`);
    // $('.cart-totalPrice').text(`$${Math.abs((this.amount).toFixed(2))}`);
    $('.cart-totalPrice').text(`$${(this.amount).toFixed(2)}`);
  }

  _renderItem(product) {
    let $section = $('<section/>', {
      class: 'cart-productSection',
      'data-product': product.id_product
    });

    let $productLink = $(`<a class="cart-productSection-link" href="${product.href}"></a>`);
    let $productImg = $(`<img src="${product.src}" alt="product${product.id_product}-image" class="cart-productSectionImg">`);
    let $textBox = $('<div class="cart-textBox"></div>');
    let $productName = $(`<h3 class="cart-productName">${product.product_name}</h3>`);
    let $stars = $(`<div class="cart-stars"></div>`);
    let $productQuantityAndPrice = $(
      `<p class="cart-ordered">
    <span class="cart-productQuantity">${product.quantity}</span> <span class="cart-ordered-x">x</span>
     $<span class="cart-productPrice">${(product.price).toFixed(2)}</span></p>`
    );
    let $sectionsWrapper = $('.cart-sectionsWrapper');
    let $delBtn = $(`<button class="cart-deleteButton"><i class="fas fa-times-circle"></i></button>`)

    $section.appendTo($sectionsWrapper);
    $section.append($productLink);
    $productLink.append($productImg);
    $productLink.append($textBox);
    $textBox.append($productName);
    $textBox.append($stars);
    $textBox.append($productQuantityAndPrice);
    $section.append($delBtn);

    $delBtn.click(() => {
      this._remove(product.id_product);
    });

    for (let i = 1; i <= product["full_star"]; i++) {
      let $fullStar = $('<i class="fas fa-star">');
      $fullStar.appendTo($stars);
    }

    if (product["half_star"]) {
      let $halfStar = $('<i class="fas fa-star-half-alt">');
      $halfStar.appendTo($stars);
    }

    // for (let i = 1; i <= product["empty_star"]; i++) {
    //   let $fullStar = $('<i class="far fa-star">');
    //   $fullStar.appendTo($stars);
    // }
    if (product["full_star"] < 5 && !product["half_star"]) {
      for (let i = 0; i < 5 - product["full_star"]; i++) {
        let $emptyStar = $('<i class="far fa-star">');
        $emptyStar.appendTo($stars);
      }
    }
  }


  _renderSpecialItem(product) {
    let $section = $('<section/>', {
      class: 'cart-productSection',
      'data-product': product.id_product
    });

    let $productLink = $(`<a class="cart-productSection-link" href="${product.href}"></a>`);
    let $productImg = $(`<img src="${product.special_src}" alt="product${product.id_product}-image" class="cart-productSectionImg ${product.special_class_for_cart}">`);
    // let $productImg = $(`<div class="cart-productSectionImg ${product.special_class}"></div>`);
    let $textBox = $('<div class="cart-textBox"></div>');
    let $productName = $(`<h3 class="cart-productName">${product.product_name}</h3>`);
    let $stars = $(`<div class="cart-stars"></div>`);
    let $productQuantityAndPrice = $(
      `<p class="cart-ordered">
    <span class="cart-productQuantity">${product.quantity}</span> <span class="cart-ordered-x">x</span>
     $<span class="cart-productPrice">${product.price}</span></p>`
    );
    let $sectionsWrapper = $('.cart-sectionsWrapper');
    let $delBtn = $(`<button class="cart-deleteButton"><i class="fas fa-times-circle"></i></button>`)

    $section.appendTo($sectionsWrapper);
    $section.append($productLink);
    $productLink.append($productImg);
    $productLink.append($textBox);
    $textBox.append($productName);
    $textBox.append($stars);
    $textBox.append($productQuantityAndPrice);
    $section.append($delBtn);

    $delBtn.click(() => {
      this._remove(product.id_product);
    });

    for (let i = 1; i <= product["full_star"]; i++) {
      let $fullStar = $('<i class="fas fa-star">');
      $fullStar.appendTo($stars);
    }

    if (product["half_star"]) {
      let $halfStar = $('<i class="fas fa-star-half-alt">');
      $halfStar.appendTo($stars);
    }

    // for (let i = 1; i <= product["empty_star"]; i++) {
    //   let $fullStar = $('<i class="far fa-star">');
    //   $fullStar.appendTo($stars);
    // }
    if (product["full_star"] < 5 && !product["half_star"]) {
      for (let i = 0; i < 5 - product["full_star"]; i++) {
        let $emptyStar = $('<i class="far fa-star">');
        $emptyStar.appendTo($stars);
      }
    }
  }


  _updateCart(product) {
    let $container = $(`section[data-product="${product.id_product}"]`);
    $container.find('.cart-productQuantity').text(product.quantity);
    $container.find('.cart-productQuantityPrice').text(`${product.quantity * product.price} руб`);
  }


  addProduct(element) {
    let productId = +$(element).data('id');
    let find = this.cartItems.find(product => product.id_product === productId);
    if (find) {
      find.quantity++;
      this.countGoods++;
      this.amount += find.price;
      this._updateCart(find);
    } else {
      let product = {
        id_product: productId,
        price: +$(element).data('price'),
        product_name: $(element).data('name'),
        special_class: $(element).data('special_class'),
        special_src: $(element).data('special_src'),
        special_class_for_cart: $(element).data('special_class_for_cart'),
        href: $(element).data('href'),
        src: $(element).data('src'),
        full_star: $(element).data('full_star'),
        half_star: $(element).data('half_star'),
        quantity: 1
      };

      this.cartItems.push(product);
      this.countGoods++;
      this.amount += product.price;
      // this._renderSpecialItem(product);
      if (!(product.src === undefined)) {
        this._renderItem(product);
      } else {
        this._renderSpecialItem(product);
      }
    }
    this._renderSum();
  }

  _remove(idProduct) {
    let find = this.cartItems.find(product => product.id_product === idProduct);
    if (find.quantity > 1) {
      find.quantity--;
      this._updateCart(find)
    } else {
      this.cartItems.splice(this.cartItems.indexOf(find), 1);
      $(`section[data-product="${idProduct}"]`).remove();
    }
    this.countGoods--;
    this.amount -= find.price;
    this._renderSum();
  }

}