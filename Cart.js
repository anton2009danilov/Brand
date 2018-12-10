class Cart {
  constructor(source, container = '#cart') {
    this.source = source;
    this.container = container;
    this.countGoods = 0; // Общее кол-во товаров в корзине
    this.amount = 0; // Общее стоимость товаров в корзине
    this.cartItems = []; // Массив со всеми товарами
    // this._init(this.source);
    this._render();
  }

  _render() {
    // let $cartItemsDiv = $('<div/>', {
    //   class: 'cart-items-wrap'
    // });

    let $cartProductSection = $('<section class="cart-productSection"></section>');

    // let $totalProducts = $('<div/>', {
    //   class: 'cart-summary sum-amount'
    // });

    let $cartOrderTotal = $('<div class="cart-orderTotal"></div>');

    // let $totalPrice = $('<div/>', {
    //   class: 'cart-orderTotal'
    // });

    let $totalName = $('<p>Total</p>');
    let $totalPrice = $('<p>&#36;0.00</p>')
    let $checkoutLink = $('<a href="checkout.html" class="cart-button">CHECKOUT</a>');
    let $shoppingCartLink = $('<a href="shopping-cart.html" class="cart-button">Go&nbsp;to&nbsp;cart</a>');

    $cartProductSection.appendTo($(this.container));
    $cartOrderTotal.appendTo($(this.container));
    $totalName.appendTo($cartOrderTotal);
    $totalPrice.appendTo($cartOrderTotal);
    $checkoutLink.appendTo($(this.container));
    $shoppingCartLink.appendTo($(this.container));

    // $(this.container).text('Корзина');

    // $cartItemsDiv.appendTo($(this.container));
    // $totalProducts.appendTo($(this.container));
    // $totalPrice.appendTo($(this.container));
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
        this.countGoods = data.countGoods;
        this.amount = data.amount;
        this._renderSum();
      })
  }

  _renderSum() {
    $('.sum-amount').text(`Всего товаров в корзине: ${this.countGoods}`);
    $('.sum-price').text(`Общая сумма: ${this.amount} руб`);
  }

  _renderItem(product) {
    let $container = $('<div/>', {
      class: 'cart-item',
      'data-product': product.id_product
    });
    $container.append($(`<p class="product-name">${product.product_name}</p>`));
    $container.append($(`<p class="product-quantity">${product.quantity}</p>`));
    $container.append($(`<p class="product-price">${product.price} руб.</p>`));
    let $delBtn = $('<button class="delBtn">&times;</button>');
    $container.append($delBtn);
    $delBtn.click(() => {
      this._remove(product.id_product);
    });
    $container.appendTo($('.cart-items-wrap'));
  }

  _updateCart(product) {
    let $container = $(`div[data-product="${product.id_product}"]`);
    $container.find('.product-quantity').text(product.quantity);
    $container.find('.product-price').text(`${product.quantity * product.price} руб`);
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
        product_name: $(element).data('title'),
        quantity: 1
      };
      this.cartItems.push(product);
      this.countGoods++;
      this.amount += product.price;
      this._renderItem(product);
    }
    this._renderSum();
  }

  _remove(idProduct) {
    // TODO: удаление товара из корзины
    let find = this.cartItems.find(product => product.id_product === idProduct);
    if (find.quantity > 1) {
      find.quantity--;
      this._updateCart(find)
    } else {
      this.cartItems.splice(this.cartItems.indexOf(find), 1);
      $(`div[data-product="${idProduct}"]`).remove();
    }
    this.countGoods--;
    this.amount -= find.price;
    this._renderSum();
  }
}