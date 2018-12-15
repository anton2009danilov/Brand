class OrderTable {
  constructor(source, tableContainer = '#orderTable', formsContainer ='#orderForms') {
    this.source = source;
    this.tableContainer = tableContainer;
    this.formsContainer = formsContainer;
    this.countGoods = 0; // Общее кол-во товаров в корзине
    this.subtotalSum = 0;
    this.amount = 0; // Общая стоимость товаров в корзине
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
            <span class="orderForms-proceedToCheck-markedText" id="totalSum">$${this.subtotalSum}</span> 
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

  _init(source) {
    this._renderTable();
    this._renderForm();

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