let products = [];
let id = 0;



document.addEventListener("DOMContentLoaded", () => {
	const productsInput = document.getElementById("Product_input");
	const priceInput = document.getElementById("Price_input");
	const imgInput = document.getElementById("Image_input");
	const createBtn = document.getElementById("Pbutton");
	const pContainer = document.getElementById("Pcontainer");




createBtn.addEventListener("click", (event) =>{
    event.preventDefault()
    const pInput = productsInput.value
    const price = priceInput.value
    const img = imgInput.value
    if (!isImgUrl(img)) {
		alert("ใส่ได้แค่ jpg,png,gif จ้าาไปหามาใหม่");
		return;
	}
    if (pInput && price && img) {
        const product = {
            id: ++id,
            product: pInput,
            price: price,
            image: img,
            check: false
        };
        products.push(product);
        renderProducts(product)
        productsInput.value = "";
        priceInput.value = "";
        imgInput.value = "";
    }
    
})
function renderProducts(product) {
    const div = document.createElement("div")
    div.className = "card w-96 glass"
    div.innerHTML = `<figure>
          <img
            src="${product.image}"
            alt="${product.product}"
            class="w-full object-cover h-48 w-96"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title text-2xl font-bold">${product.product}</h2>
          <p class="text-xl font-semibold">${product.price}$</p>
          <div class="card-actions justify-end">
          <input type="checkbox" class="w-8 h-8 text-2xl accent-rose-600" data-id="${product.id}" onchange="toggleProductSelection(event)">
          </div>  
          </div>
        </div>`;
    pContainer.appendChild(div)
}

});

function toggleProductSelection(event) {
    const checkbox = event.target;
    const checkboxId = parseInt(checkbox.getAttribute("data-id"));
    const product = products.find((product) => product.id === checkboxId);
    if (checkbox.checked) {
        product.checked = true;
    } else {
        product.checked = false;
    }
}

document.getElementById("Addbtn").addEventListener("click", () => {
    cart = products.filter((product) => product.checked);
    renderCart(cart);
});

function renderCart(cart) {
    const cContainer = document.getElementById("Ccontainer");
    cContainer.innerHTML = ""; 

    cart.forEach((product) => {
        const div = document.createElement("div");
        div.className = "card w-96 glass";
        div.innerHTML = `<figure>
            <img src="${product.image}" alt="${product.product}" class="w-full object-cover h-48 w-96" />
            </figure>
            <div class="card-body">
                <h2 class="card-title text-2xl font-bold">${product.product}</h2>
                <p class="text-xl font-semibold">${product.price}$</p>
                <div class="card-actions justify-end">
                    <input type="checkbox" class="sr-only w-8 h-8 text-2xl accent-rose-600" data-id="${product.id}" checked onchange="calculatePriceSelection(event)">
                    <button class="px-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-solid border-4 border-indigo-600 text-xl ml-4 rounded-btn" id="${product.id}" onclick="removeBtn(${product.id})">Remove</button>
                </div>  
            </div>
        </div>`;
        cContainer.appendChild(div);
        const btnDiv = document.getElementById("calbtnSummoner");
        btnDiv.innerHTML = `<button class="px-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-solid border-4 border-indigo-600 text-xl ml-4 rounded-btn" id="calPrice" onclick="calculateBtn()">Calculate Total price</button>`
        
    });
}

function calculatePriceSelection(event) {
    const checkbox = event.target;
    const checkboxId = parseInt(checkbox.getAttribute("data-id"));
    const product = products.find((product) => product.id === checkboxId);

    if (checkbox.checked) {
        product.checked = true;
    } else {
        product.checked = false;
    }
}

function calculateBtn() {
    
    calculateFinal(cart);
}


function calculateFinal(cart) {
    
    let sum = 0;
    cart.forEach((product) => {
        sum += parseFloat(product.price)
        
    });
    // display total price
    const totalprice = document.getElementById("totalP")
    totalprice.textContent = `Total price: $${sum.toFixed(2)}`
}

function isImgUrl(img) {
	const input = new URL(img);
	return /\.(jpg|png|gif)$/.test(input.pathname);
}

function removeBtn(Rproduct) {
    cart = cart.filter((product) => product.id !== Rproduct );
    renderCart(cart)
}