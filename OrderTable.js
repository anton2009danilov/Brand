class OrderTable {
  constructor(source, tableContainer = '#orderTable', formsContainer ='#orderForms') {
    this.source = source;
    this.tableContainer = tableContainer;
    this.formsContainer = formsContainer;
    this.countGoods = 0; // Общее кол-во товаров в корзине
    this.subtotalSum = 0;
    this.amount = 0; // Общая стоимость товаров в корзине
    this.shipping = 0;
    this.cartItems = []; // Массив со всеми товарами
    this._init(this.source);
  }

  _renderTable() {
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
    let $continueBtn = $('<a href="product.html" class="orderTable-standAloneButton">CONTINUE SHOPPING</a>');


    $tableWrapper.appendTo($(this.tableContainer));
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

    $clearBtn.click(() => {
      this._clear();
    });
  }

  _renderForm() {
    let $formsWrapper = $('<div class="orderForms-container"></div>');

    let $sectionOne = $('<section class="orderForms-section"></section>');
    let $sectionOne_header = $('<header class="orderForms-sectionHeader">SHIPPING ADDRESS</header>');
    let $sectionOne_form = $('<form action="#" class="orderForms-addressForm"></form>');
    let $sectionOne_select =$('<select class="orderForms-addressFormSelect" name="country" id="countryName"></select>');
    let $sectionOne_selectOption1 = $('<option value="Bangladesh">Bangladesh</option>');
    let $sectionOne_selectOption2 = $('<option value="USA">USA</option>');
    let $sectionOne_selectOption3 = $('<option value="France">France</option>');
    let $sectionOne_input1 = $(`<input class="orderForms-addressFormInput" id="state" list="dl_states" 
        placeholder="State">`);
    let $sectionOne_datalist1 = $('<datalist id="dl_states"></datalist>');
    let $sectionOne_datalist1Option1 = $('<option label="Paris" value="Paris"></option>');
    let $sectionOne_datalist1Option2 = $('<option label="Pekin" value="Pekin"></option>');
    let $sectionOne_datalist1Option3 = $('<option label="Moscow" value="Moscow"></option>');
    let $sectionOne_datalist1Option4 = $('<option label="Tokio" value="Tokio"></option>');
    let $sectionOne_datalist1Option5 = $('<option label="New-york" value="New-york"></option>');
    let $sectionOne_input2 = $(`<input class="orderForms-addressFormInput" id="state" list="dl_postcodes" 
        placeholder="State">`);
    let $sectionOne_datalist2 = $('<datalist id="dl_postcodes"></datalist>');
    let $sectionOne_datalist2Option1 = $('<option label="197124" value="197124"></option>');
    let $sectionOne_datalist2Option2 = $('<option label="165727" value="165727"></option>');
    let $sectionOne_datalist2Option3 = $('<option label="348796" value="348796"></option>');
    let $sectionOne_datalist2Option4 = $('<option label="722157" value="722157"></option>');
    let $sectionOne_btn = $('<a href="#" class="orderForms-formButton">get a quote</a>');

    $formsWrapper.appendTo($(this.formsContainer));
    $sectionOne.appendTo($formsWrapper);
    $sectionOne_header.appendTo($sectionOne);
    $sectionOne_form.appendTo($sectionOne);
    $sectionOne_select.appendTo($sectionOne_form);
    $sectionOne_selectOption1.appendTo($sectionOne_select);
    $sectionOne_selectOption2.appendTo($sectionOne_select);
    $sectionOne_selectOption3.appendTo($sectionOne_select);
    $sectionOne_input1.appendTo($sectionOne_form);
    $sectionOne_datalist1.appendTo($sectionOne_form);
    $sectionOne_datalist1Option1.appendTo($sectionOne_datalist1);
    $sectionOne_datalist1Option2.appendTo($sectionOne_datalist1);
    $sectionOne_datalist1Option3.appendTo($sectionOne_datalist1);
    $sectionOne_datalist1Option4.appendTo($sectionOne_datalist1);
    $sectionOne_datalist1Option5.appendTo($sectionOne_datalist1);
    $sectionOne_input2.appendTo($sectionOne_form);
    $sectionOne_datalist2.appendTo($sectionOne_form);
    $sectionOne_datalist2Option1.appendTo($sectionOne_datalist2);
    $sectionOne_datalist2Option2.appendTo($sectionOne_datalist2);
    $sectionOne_datalist2Option3.appendTo($sectionOne_datalist2);
    $sectionOne_datalist2Option4.appendTo($sectionOne_datalist2);
    $sectionOne_btn.appendTo($sectionOne_form);

    let $sectionTwo = $('<section class="orderForms-section"></section>');
    let $sectionTwo_header = $('<header class="orderForms-sectionHeader">Coupon Discount</header>');
    let $sectionTwo_paragraph = $('<p class="orderForms-text">Enter your coupon code if you have one</p>');
    let $sectionTwo_form = $('<form action="#" class="orderForms-discountForm"></form>');
    let $sectionTwo_input = $(`<input class="orderForms-discountFormInput" type="text" placeholder="Coupon Code">`);
    let $sectionTwo_btn = $('<a href="#" class="orderForms-formButton">Apply coupon</a>');

    $sectionTwo.appendTo($formsWrapper);
    $sectionTwo_header.appendTo($sectionTwo);
    $sectionTwo_paragraph.appendTo($sectionTwo);
    $sectionTwo_form.appendTo($sectionTwo);
    $sectionTwo_input.appendTo($sectionTwo_form);
    $sectionTwo_btn.appendTo($sectionTwo_form);


    let $sectionThree = $('<section class="orderForms-section orderForms-proceedToCheck"></section>');
    let $sectionThree_paragraph = $(`<p class="orderForms-proceedToCheck-text">
            Sub total
            <span class="orderForms-proceedToCheck-markedText" id="subtotalSum">$${this.subtotalSum}</span> 
        </p>`);
    // let $subtotalSum = (`$<span class="orderForms-markedText" id="totalSum">$${this.subtotalSum}</span>`);
    let $sectionThree_header = $(`<header class="orderForms-sectionHeader orderForms-CheckOutHeader">
            Grand Total
            <span class="orderForms-markedText" id="totalSum">$${this.amount}</span>
        </header>`);
    // let $totalSum = (`$<span class="orderForms-markedText" id="totalSum">$${this.amount}</span>`);
    let $sectionThree_btn = $('<a href="checkout.html" class="orderForms-checkOutButton">Proceed to Checkout</a>');

    $sectionThree.appendTo($formsWrapper);
    $sectionThree_paragraph.appendTo($sectionThree);
    // $subtotalSum.appendTo($sectionThree_paragraph);
    $sectionThree_header.appendTo($sectionThree);
    // $totalSum.appendTo($sectionThree_header);
    $sectionThree_btn.appendTo($sectionThree);

  }

  _renderSum() {
    $('#subtotalSum').text(`$${(this.subtotalSum).toFixed(2)}`);
    $('#totalSum').text(`$${(this.amount).toFixed(2)}`);
  }

  _renderItem(product) {
    // let $container = $('.orderTable-container');
    let $container = $('.orderTable-itemsWrapper');

    let $tableRow = $(`<div class="orderTable-row" data-product="${product.id_product}"></div>`);
    let $column1 = $('<div class="orderTable-columnOne"></div>');
    let $productLink = $(`<a class="orderTable-itemCard" href="${product.href}"></a>`);
    let $productImg = $(`<img src="${product.src}" alt="itemCard-photo${product.id_product}" class="itemCard-img">`);
    let $textBox = $('<div class="itemCard-textBlock"></div>');
    let $productName = $(`<header class="itemCard-header">${product.product_name}</header>`);
    let $stars = $(`<div class="itemCard-stars"></div>`);
    for (let i = 1; i <= product["full_star"]; i++) {
      let $fullStar = $('<i class="fas fa-star">');
      $fullStar.appendTo($stars);
    }

    if (product["half_star"]) {
      let $halfStar = $('<i class="fas fa-star-half-alt">');
      $halfStar.appendTo($stars);
    }

    if (product["full_star"] < 5 && !product["half_star"]) {
      for (let i = 0; i < 5 - product["full_star"]; i++) {
        let $emptyStar = $('<i class="far fa-star">');
        $emptyStar.appendTo($stars);
      }
    }

    let $color = $(`<p class="itemCard-text">Color: ${product.color}</p>`);
    let $size = $(`<p class="itemCard-text">Size: ${product.size}</p>`);


    let $column2 = $(`<div class="orderTable-column">$${product.price.toFixed(2)}</div>`);
    let $column3 = $('<div class="orderTable-column"></div>');
    let $itemQuantityForm = $(`<form action="#" class="orderTable-form"></form>`);
    let $itemQuantityInput = $(`<input class="orderTable-quantity" type="number" name="orderCount"
    value="${product.quantity}" min="1" max="100" step="1">`);

    let shippingCost;

    if (product.shipping === 0) {
      shippingCost = 'FREE';
    } else {
      shippingCost = `$${(product.shipping).toFixed(2)}`;
    }

    let $column4 = $(`<div class="orderTable-column">${shippingCost}</div>`);
    let $column5 = $(`<div class="orderTable-column">$${(product.quantity * product.price + product.shipping).toFixed(2)}</div>`);
    let $column6 = $('<div class="orderTable-lastColumn"></div>');
    let $delBtn = $('<button class="orderTable-deleteButton"><i class="fas fa-times-circle"></i></button>');

    $tableRow.appendTo($container);
    $tableRow.append($column1);
    $column1.append($productLink);
    $productLink.append($productImg);
    $productLink.append($textBox);
    $textBox.append($productName);
    $textBox.append($stars);
    $textBox.append($color);
    $textBox.append($size);
    $tableRow.append($column2);
    $tableRow.append($column3);
    $column3.append($itemQuantityForm);
    $itemQuantityForm.append($itemQuantityInput);
    $tableRow.append($column4);
    $tableRow.append($column5);
    $tableRow.append($column6);
    $column6.append($delBtn);


    $itemQuantityInput.change(() => {
      console.log(product.quantity = $itemQuantityInput[0].value);
      product.quantity = $itemQuantityInput[0].value;
      $(`div[data-product="${product.id_product}"]`)[0].childNodes[4].innerText =
        `$${(product.quantity * product.price + product.shipping).toFixed(2)}`;

      let amount = 0;
      for (let product of this.cartItems) {
        amount += product.quantity * product.price + product.shipping;
      }
      console.log(amount);
      this.subtotalSum = amount;
      this.amount = amount;
      this._renderSum();
      // this._updateCart(product);

    });

    $delBtn.click(() => {
      this._remove(product.id_product);
    });

  }

  _init(source) {
    this._renderTable();
    this._renderForm();

    fetch(source)
      .then(result => result.json())
      .then(data => {
        for (let product of data.contents) {
          this.cartItems.push(product);
          this._renderItem(product)
        }
        this.amount = data.amount;
        this.subtotalSum = data.amount;
        this.shipping = data.shipping;
        this.countGoods = data.countGoods;
        this._renderSum();
      })
      .catch(error => {
        console.log(error);
        let $cartProductSection = $('<section class="cart-productSection">В корзине нет товаров</section>');
        $cartProductSection.appendTo($('.orderTable-itemsWrapper'));
      })
  }

  // _updateCart(product) {
    // let $tableContainer = $(`div[data-product="${product.id_product}"]`);
    // console.log($tableContainer.find('.orderTable-quantity').text(product.quantity));
    // $tableContainer.find('.orderTable-quantity').val(product.quantity);

    // $container.find('.cart-productQuantityPrice').text(`${product.quantity * product.price} руб`);
  // }


  _remove(idProduct) {
    let find = this.cartItems.find(product => product.id_product === idProduct);
    if (find.quantity > 1) {
      find.quantity--;

      $(`div[data-product="${idProduct}"]`)[0].childNodes[4].innerText =
        `$${(find.quantity * find.price + find.shipping).toFixed(2)}`;

      ($(`div[data-product="${idProduct}"]`).find('.orderTable-quantity')[0].value) = find.quantity;

      // $(`div[data-product="${idProduct}"]`)[0].childNodes[4].innerText =
      //   `$${(find.quantity * find.price + find.shipping).toFixed(2)}`;
      // $(`div[data-product="${idProduct}"]`)[0].innerText = '';

      // this._updateCart(find)
    } else {
      this.cartItems.splice(this.cartItems.indexOf(find), 1);
      $(`div[data-product="${idProduct}"]`).remove();
    }
    this.countGoods--;
    this.amount -= find.price;
    this.subtotalSum -= find.price;

    // this.subtotalSum -= find.subtotal;
    this._renderSum();
  }

  _clear() {
    this.countGoods = 0; // Общее кол-во товаров в корзине
    this.subtotalSum = 0;
    this.amount = 0; // Общая стоимость товаров в корзине
    this.shipping = 0;
    this.cartItems = [];
    $('.orderTable-itemsWrapper')[0].innerText ='';
    this._renderSum();
  }

}