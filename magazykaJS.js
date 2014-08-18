var magazyka = {

    ListOfItems: [ ],

    goods: [
        {
            name: 'Iphone',
            price: 9000,
            number: 1
        },
        {
            name: 'Чехол',
            price: 900,
            number: 37
        },
        {
            name: 'Пленка',
            price: 300,
            number: 37
        }
    ],

    addLocalStorage: function (param) {
        var self = this;
        if (param == "add") {
            localStorage.ListItems = JSON.stringify(self.ListOfItems);
        }
        if (param == "get") {
            self.ListOfItems = localStorage.ListItems ? JSON.parse(localStorage.ListItems) : [];
        }
        if (param == "del") {
            localStorage.clear();
        }
    },

    addGoods: function (param) {
        var found = false,
            self = this;

        for (var i = 0; i < self.goods.length; i++) {
            if (param == i && self.goods[i].number > 0) {
                for (var f = 0; f < self.ListOfItems.length; f++) {
                    if (self.ListOfItems[f].name == self.goods[i].name) {
                        found = true;
                        self.ListOfItems[f].count++;
                        self.goods[i].number--;
                    }
                }
                if (!found) {
                    self.ListOfItems.push(self.goods[i]);
                    self.ListOfItems[self.ListOfItems.length - 1].count = 1;
                    found = true;
                    self.goods[i].number--;
                }
                self.addLocalStorage("add");
                break;
            }
            if (param == i && self.goods[i].number <= 0) {
                alert('Товара нет на складе');
            }
        }
    },

    inBasket: function () {
        var self = this;
        var table,
            caption,
            trOne,
            tdOne,
            trTwo,
            tdTwo;
        if (document.getElementById("fff")) {
            document.getElementById("inBasketTT").removeChild(document.getElementById("fff"));
            document.getElementById("inBasketTT").style.display = 'none'
        }
        table = document.createElement('table');
        table.className = "q2";
        table.id = "fff";

        caption = document.createElement('caption');
        var aa = document.createElement('a');
        aa.setAttribute("href", "http://localhost:3000/cart");
        aa.innerHTML = "Корзина";
        caption.appendChild(aa);

        trOne = document.createElement('tr');
        tdOne = document.createElement('td');
        trOne.className = "w4";

        tdOne.setAttribute("colspan", "2");
        tdOne.innerHTML = "Товаров в корзине:";
        tdOne.className = "text-align";

        trTwo = document.createElement('tr');
        trTwo.className = "w5";

        tdTwo = document.createElement('td');
        var td = document.createElement('td');
        var sum = 0;
        for (var f = 0; f < this.ListOfItems.length; f++) {

            sum += this.ListOfItems[f].count;
            console.log(sum);
        }
        if (sum % 100 >= 11 && sum % 100 <= 14) {
            sum += " товаров";
        } else {
            switch (sum % 10) {
                case 1:
                {
                    sum += " товар";
                    break;
                }
                case 2:
                case 3:
                case 4:
                {
                    sum += " товара";
                    break;
                }
                default :
                {
                    sum += " товаров";
                }
            }
        }
        td.innerHTML = "  Очистить корзину";
        td.id = "clear";

        tdTwo.innerHTML = sum;

        trOne.appendChild(tdOne);

        trTwo.appendChild(tdTwo);
        trTwo.appendChild(td);

        table.appendChild(caption);
        table.appendChild(trOne);
        table.appendChild(trTwo);

        document.getElementById("inBasketTT").appendChild(table);
        document.getElementById("inBasketTT").style.display = 'block'
        var $clear = $('#clear');
        $($clear).on('click', function () {
            self.addLocalStorage("del");
            self.addLocalStorage("get");
            self.inBasket();
        });
    },

    countPrice: function () {
        var self = this;
        self.addLocalStorage("get");
        var sum = 0;
        for (var i = 0; i < this.ListOfItems.length; i++) {
            sum += this.ListOfItems[i].count * this.ListOfItems[i].price;
        }
        return sum;
    },

    DelBasket: function (param) {
        for (var i = 0; i < this.goods.length; i++) {
            for (var f = 0; f < this.ListOfItems.length; f++) {
                if (this.goods[i].name == param && this.ListOfItems[f].name == param) {
                    this.goods[i].number += this.ListOfItems[f].count;
                    this.ListOfItems.splice(f, 1);
                    this.addLocalStorage("del");
                    this.addLocalStorage("add");
                    this.createBasket();
                }
            }
        }
    },


    ChangeBasket: function (param, name) {
        var self = this;
        console.log(name);
        var countTd = document.getElementById("index_" + param);
        var newTd = $('<td id="index_' + param + '" class="td" ><input  type="number" id=number' + param + '> <input type=button value=Подтвердить class="newCount"></td>');
        $(countTd).replaceWith(newTd);
        var newCount = $(".newCount");
        $(newCount).click(function (event) {
            var idNumber = document.getElementById('number' + param).value;
            idNumber = parseInt(idNumber, 10);
            if (typeof idNumber == "number" && idNumber > 0) {
                for (var i = 0; i < self.goods.length; i++) {
                    if (self.goods[i].number < idNumber && self.goods[i].name == name) {
                        alert("Товаров на складе : " + self.goods[i].number);
                        return false;
                    }
                }
                for (var f = 0; f < self.ListOfItems.length; f++) {
                    if (self.ListOfItems[f].name == name) {
                        self.ListOfItems[f].count = idNumber;
                        self.addLocalStorage("del");
                        self.addLocalStorage("add");
                        self.createBasket();
                    }
                }
            }
            console.log(typeof idNumber);
            return false;
        });
    },

    createBasket: function () {
        var self = this;
        self.addLocalStorage("get");
        if (self.ListOfItems.length == 0) {
            document.location.href = "http://localhost:3000/";
        }
        if (document.getElementById("basket")) {
            document.getElementById("basketTT").removeChild(document.getElementById("basket"));
            document.getElementById("basketTT").removeChild(document.getElementById("tableTotal"));
            document.getElementById("basketTT").style.display = 'none';
        }
        var table = document.createElement('table');
        table.className = "q3";
        table.id = "basket";

        var trFirst = document.createElement('tr');
        trFirst.className = "w3";

        var thName = document.createElement('th');
        thName.className = "td";
        thName.innerHTML = "Название товара";

        var thPrice = document.createElement('th');
        thPrice.className = "td";
        thPrice.innerHTML = "Цена";

        var thSum = document.createElement('th');
        thSum.className = "td";
        thSum.innerHTML = "Колличество";

        var thDoing = document.createElement('th');
        thDoing.className = "td";
        thDoing.innerHTML = "Действия";

        var tbody = document.createElement('tbody');

        trFirst.appendChild(thName);
        trFirst.appendChild(thPrice);
        trFirst.appendChild(thSum);
        trFirst.appendChild(thDoing);

        var caption = document.createElement('caption');
        caption.innerHTML = "Корзина";

        var $tr,
            $documentFragment = document.createDocumentFragment(),
            $tdName,
            $tdPrice,
            $tdButton,
            $tdcount,
            $buttonDel,
            $button;

        var tableTotal = document.createElement('table');
        tableTotal.className = "without-border";
        tableTotal.id = "tableTotal";

        var trTotal = document.createElement('tr');

        var tdTotal = document.createElement('td');
        tdTotal.innerHTML = "Вего: " + self.countPrice() + " грн";

        var $buttonReg = document.createElement('input');
        $buttonReg.type = 'button';
        $buttonReg.value = 'Перейти к оформлению';

        $buttonReg.addEventListener('click', function () {
            document.location.href = "http://localhost:3000/order";
        }, false);

        var trReg = document.createElement('td');
        trReg.appendChild($buttonReg);

        trTotal.appendChild(tdTotal);
        trTotal.appendChild(trReg);
        tableTotal.appendChild(trTotal);
        for (var i = 0; i < this.ListOfItems.length; i++) {
            $tr = document.createElement('tr');
            $tdName = document.createElement('td');
            $tdPrice = document.createElement('td');
            $tdcount = document.createElement('td');
            $tdcount.id = "index_" + i;
            $tdButton = document.createElement('td');

            $tdName.className = "td";
            $tdPrice.className = "td";
            $tdcount.className = "td";
            $tdButton.className = "centre";

            $tdName.innerHTML = this.ListOfItems[i].name;
            $tdPrice.innerHTML = this.ListOfItems[i].price;
            $tdcount.innerHTML = this.ListOfItems[i].count;

            $buttonDel = document.createElement('input');
            $buttonDel.type = 'button';
            $buttonDel.value = 'Удалить';
            $buttonDel.id = 'del';

            $button = document.createElement('input');
            $button.type = 'button';
            $button.value = 'Изменить колличество';
            $button.id = 'change';

            var ourNewAttribute = document.createAttribute("list-index");
            var attribute = document.createAttribute("name");
            attribute.nodeValue = this.ListOfItems[i].name;
            ourNewAttribute.nodeValue = i;
            $button.attributes.setNamedItem(ourNewAttribute);
            $button.attributes.setNamedItem(attribute);

            var DELAttribute = document.createAttribute("list-index");
            DELAttribute.nodeValue = this.ListOfItems[i].name;
            $buttonDel.attributes.setNamedItem(DELAttribute);

            $button.addEventListener('click', function () {
                console.log('Нажали Изменить колличество под индексом', this.getAttribute('list-index'));
                self.ChangeBasket(this.getAttribute('list-index'), this.getAttribute('name'));
            }, false);

            $buttonDel.addEventListener('click', function () {
                console.log('Нажали Удалить под индексом', this.getAttribute('list-index'));
                self.DelBasket(this.getAttribute('list-index'));
            }, false);
            $tdButton.appendChild($buttonDel);
            $tdButton.appendChild($button);

            $tr.appendChild($tdName);
            $tr.appendChild($tdPrice);
            $tr.appendChild($tdcount);
            $tr.appendChild($tdButton);

            table.appendChild(caption);
            table.appendChild(caption);
            table.appendChild(trFirst);

            tbody.appendChild($tr);
            table.appendChild(tbody);

            $documentFragment.appendChild(table);
            $documentFragment.appendChild(tableTotal);

        }
        document.getElementById("basketTT").appendChild($documentFragment);
        ($('#basketTT').show(400));
    },

    createGoods: function () {
        var self = this;
        self.addLocalStorage("get");
        var $tr,
            $documentFragment = document.createDocumentFragment(),
            $tdName,
            $tdPrice,
            $tdButton;
        for (var i = 0; i < this.goods.length; i++) {
            $tr = document.createElement('tr');
            $tr.id = i;

            $tdName = document.createElement('td');
            $tdPrice = document.createElement('td');
            $tdButton = document.createElement('td');

            $tdName.className = "td";
            $tdPrice.className = "td";
            $tdButton.className = "centre";

            $tdName.innerHTML = this.goods[i].name;
            $tdPrice.innerHTML = this.goods[i].price;

            var $button = document.createElement('input');
            $button.type = 'button';
            $button.value = 'Купить';
            $button.id = 'buy';
            $button.className = 'buy-btn';

            var ourNewAttribute = document.createAttribute("goods-index");
            ourNewAttribute.nodeValue = i;
            $button.attributes.setNamedItem(ourNewAttribute);

            $button.addEventListener('click', function () {
                console.log('Нажали купить товар под индексов', this.getAttribute('goods-index'));
                self.addGoods(this.getAttribute('goods-index'));
                self.inBasket();
            }, false);
            $tdButton.appendChild($button);

            $tr.appendChild($tdName);
            $tr.appendChild($tdPrice);
            $tr.appendChild($tdButton);
            $documentFragment.appendChild($tr);
        }
        var table = document.getElementById("goods");
        table.appendChild($documentFragment);
        self.inBasket();
    },

    registration: function () {
        var self = this;
        var buttonEE = document.getElementById("reg-field");
        buttonEE.addEventListener('click', function () {
            var name = document.getElementById('name-field').value;
            var lastName = document.getElementById('lastName-field').value;
            var address = document.getElementById('address-field').value;
            if (name, lastName, address != "") {
                count(name, lastName, address);
                document.getElementById('forma').innerText = "Итого " + self.countPrice() + "грн";
                document.getElementById("order").style.display = 'none';
                document.getElementById("count").style.display = 'block';
            }
        }, false);
        function count(name, lastName, address) {
            if (document.getElementById("co")) {
                document.getElementById("count-field").removeChild(document.getElementById("co"));
            }
            document.getElementById('lastName').innerHTML = lastName;
            document.getElementById('name').innerHTML = name;
            document.getElementById('address').innerHTML = address;
            var documentFragment = document.createDocumentFragment();
            var tt = document.createElement('tbody');
            tt.id = "co";
            document.getElementById("count-field");
            self.addLocalStorage("get");
            for (var i = 0; i < self.ListOfItems.length; i++) {
                var tr = document.createElement('tr');
                var tdName = document.createElement('td');
                var tdPrice = document.createElement('td');
                var tdButton = document.createElement('td');
                tdName.innerHTML = self.ListOfItems[i].name;
                tdButton.innerHTML = "  количество - " + self.ListOfItems[i].count;
                tdPrice.innerHTML = "   цена - " + self.ListOfItems[i].price + "грн";
                tr.appendChild(tdName);
                tr.appendChild(tdButton);
                tr.appendChild(tdPrice);
                documentFragment.appendChild(tr);
                for (var f = 0; f < self.goods.length; f++) {
                    if (self.ListOfItems[i].name == self.goods[f].name) {
                        self.goods[f].number -= self.ListOfItems[i].count;
                    }
                }
            }
            var table = document.getElementById("count-field");
            tt.appendChild(documentFragment);
            table.appendChild(tt);
        }
    }

};

