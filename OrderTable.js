class OrderTable {
  constructor(source, container = '#orderTable') {
    this.source = source;
    this.container = container;
    this.countGoods = 0; // Общее кол-во товаров в корзине
    this.amount = 0; // Общая стоимость товаров в корзине
    this.cartItems = []; // Массив со всеми товарами
    this._init(this.source);
  }

  _render() {
    let $tableWrapper = $('<div class="orderTable-container"></div>');
    let $tableHeader = $('<div class="orderTable-headerRow"></div>');
    let $tableHeaderColumnOne = $('<div class="orderTable-columnOne">Product Details</div>');
    let $tableHeaderColumnTwo = $('<div class="orderTable-headerColumn">Unite Price</div>');
    let $tableHeaderColumnThree = $('<div class="orderTable-headerColumn">Quantity</div>');
    let $tableHeaderColumnFour = $('<div class="orderTable-headerColumn">Shipping</div>');
    let $tableHeaderColumnFive = $('<div class="orderTable-headerColumn">Subtotal</div>');
    let $tableHeaderColumnSix = $('<div class="orderTable-headerLastColumn">Action</div>');

    let $tableItemsWrapper = $('<div class="orderTable-itemsWrapper"></div>');

    let $tableButtons = $('<div class="orderTable-buttonsBlock"></div>');
    let $clearBtn = $('<a href="#" class="orderTable-standAloneButton">CLEAR SHOPPING CART</a>');
    let $continueBtn = $('<a href="#" class="orderTable-standAloneButton">CONTINUE SHOPPING</a>');


    $tableWrapper.appendTo($(this.container));
    $tableHeader.appendTo($tableWrapper);
    $tableHeaderColumnOne.appendTo($tableHeader);
    $tableHeaderColumnTwo.appendTo($tableHeader);
    $tableHeaderColumnThree.appendTo($tableHeader);
    $tableHeaderColumnFour.appendTo($tableHeader);
    $tableHeaderColumnFive.appendTo($tableHeader);
    $tableHeaderColumnSix.appendTo($tableHeader);
    $tableItemsWrapper.appendTo($tableWrapper);
    $tableButtons.appendTo($tableWrapper);
    $clearBtn.appendTo($tableButtons);
    $continueBtn.appendTo($tableButtons);
  }

  _init(source) {
    this._render();

    // fetch(source)
    //   .then(result => result.json())
    //   .then(data => {
    //     for (let product of data.contents) {
    //       this.cartItems.push(product);
    //       this._renderItem(product)
    //     }
    //     this.amount = data.amount;
    //     this.countGoods = data.countGoods;
    //     this._renderSum();
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     let $cartProductSection = $('<section class="cart-productSection">В корзине нет товаров</section>');
    //     $cartProductSection.appendTo($('.cart-sectionsWrapper'));
    //   })
  }

}