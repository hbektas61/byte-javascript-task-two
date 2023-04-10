document.addEventListener("DOMContentLoaded", () => {
    const productData = [{
        "product_name": "Desteksiz Sütyen Takımı",
        "product_id": "12345689",
        "price": 12.34,
        "variants": [{
            "variant_name": "36-75B",
            "variant_id": "12646574",
            "stock": 12
        }, {
            "variant_name": "38-80B",
            "variant_id": "12646574",
            "stock": 12
        }, {
            "variant_name": "40-85B",
            "variant_id": "12646574",
            "stock": 12
        }, {
            "variant_name": "42-90B",
            "variant_id": "12646574",
            "stock": 12
        }]
    }];
    
    const productVariants = document.getElementById("product-variants");
    const totalPriceElement = document.getElementById("total-price");
    const addToCartButton = document.getElementById("add-to-cart");
    const $totalNumberWrapper = document.createElement("tr");
    const $totalNumberTextWrapper = document.createElement("td");
    const $totalStockNumber = document.createElement("td");
    const $orderNumber = document.createElement("td");

    productData[0].variants.forEach(variant => {
        const $tr = document.createElement("tr");
        const $tdSize = document.createElement("td");
        const $tdStock = document.createElement("td");

        $tdSize.textContent = variant.variant_name;
        
        $tdStock.classList.add('stock');

        $tdStock.textContent = variant.stock;

        $tr.appendChild($tdSize);
        $tr.appendChild($tdStock);

        const $tdQuantity = document.createElement("td");
        const $inputContainer = document.createElement("div");
        const $inputWrapper = document.createElement("div");
        const $decreaseİnputValueWrapper = document.createElement("div");
        const $increaseİnputValueWrapper = document.createElement("div");
        const $inputValue = document.createElement("input");

        $inputContainer.classList.add("container");
        $inputWrapper.classList.add("input-wrapper");
        $decreaseİnputValueWrapper.classList.add("button");
        $increaseİnputValueWrapper.classList.add("button");
    
        $decreaseİnputValueWrapper.setAttribute('id','decrease');
        $increaseİnputValueWrapper.setAttribute('id','increase');

        $decreaseİnputValueWrapper.textContent = '-';
        $increaseİnputValueWrapper.textContent = '+';
        
        $inputValue.type = "text";
        $inputValue.min = 0;
        $inputValue.value = 0;
        $inputValue.id = "input";
        $inputValue.dataset.price = productData[0].price;

        $inputWrapper.appendChild($decreaseİnputValueWrapper);
        $inputWrapper.appendChild($inputValue);
        $inputWrapper.appendChild($increaseİnputValueWrapper);
        $inputContainer.appendChild($inputWrapper);
        $tdQuantity.appendChild($inputContainer);
        $tr.appendChild($tdQuantity);
        productVariants.appendChild($tr);
    });

    updateStockValues();
    addTotalNumber();
    updateStockNumber();

    function updateStockValues () {
        const prevButtons = document.querySelectorAll('.button');
            prevButtons.forEach((element) => {
                element.addEventListener('click', (event) => {
                    const stockNumber = event.target.parentElement.parentElement.parentElement.previousSibling.textContent;
                    if (event.target.id === 'increase') {
                        if (Number(stockNumber) > Number(event.target.previousSibling.value)) {
                            event.target.previousSibling.value = parseInt(event.target.previousSibling.value) + 1;
                            updateTotalPrice();
                        }
                    } else if (event.target.id === 'decrease') {
                        if (parseInt(event.target.nextSibling.value) > 0) {
                            event.target.nextSibling.value = parseInt(event.target.nextSibling.value) - 1;
                            updateTotalPrice();
                        }
                    }
                });
            });
        }

    function addTotalNumber () {
        $orderNumber.classList.add('order-number');
        $totalStockNumber.classList.add('stock-number');
        $totalNumberTextWrapper.classList.add('total-number-text');
        
        $totalNumberTextWrapper.textContent = "Toplam";
        $totalStockNumber.textContent = "0";
        $orderNumber.textContent = "0";

        $totalNumberWrapper.appendChild($totalNumberTextWrapper);
        $totalNumberWrapper.appendChild($totalStockNumber);
        $totalNumberWrapper.appendChild($orderNumber);
        productVariants.appendChild($totalNumberWrapper);
    };

    function updateStockNumber () {
        let stockNumber = 0;

        document.querySelectorAll('.stock').forEach((element) => {
            stockNumber += parseFloat(element.textContent);
        });

        document.querySelector('.stock-number').textContent = stockNumber;
    }
    
    function updateTotalPrice () {
        let totalPrice = 0;
        let totalOrderNumber = 0;

        const inputsValues = productVariants.querySelectorAll("input");

        inputsValues.forEach(input => {
            totalPrice += parseFloat(input.value) * parseFloat(input.dataset.price);
            totalOrderNumber += parseFloat(input.value)
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
        
        document.querySelector('.order-number').textContent = totalOrderNumber;        
    };

    addToCartButton.addEventListener("click", () => {
        const payload = [];
        const productVariantsValues = productVariants.querySelectorAll("input");

        productVariantsValues.forEach((productValue, index) => {
            if (parseInt(productValue.value) > 0) {
                payload.push({
                    "id": productData[0].variants[index].variant_id,
                    "quantity": parseInt(productValue.value)
                });
            }
        });

        if (parseInt(document.getElementById('total-price').textContent)) {
            const xhr = new XMLHttpRequest();

            xhr.open("POST", "https://x.com/app.js", true);
    
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log(`İstek başarıyla gönderildi: ${xhr.responseText}`);
                }
            };
    
            xhr.send(JSON.stringify(payload));
        }
    });
});