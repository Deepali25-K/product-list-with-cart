// accessing DOM elements
const addToCartButtons = document.querySelectorAll(".cart-button");
const itemImages = document.querySelectorAll(".item-img");
const itemQuantityBtns = document.querySelectorAll(".item-quantity");
const decrementBtns = document.querySelectorAll(".decr-btn");
const incrementBtns = document.querySelectorAll(".incr-btn");
const qtyTxts = document.querySelectorAll(".qty");
const cartQty = document.querySelector(".cartQty");
const emptyCartTxt = document.querySelector(".empty-cart-txt");
const emptyCartImg = document.querySelector(".empty-cart-img");
const items = document.querySelectorAll(".item-name");
const itemPrices = document.querySelectorAll(".item-price");
const itemsContainer = document.querySelector(".itemsContainer");
const orderBtn = document.querySelector(".order-btn");
const cartTxt = document.querySelector(".carbon-neutral-txt");
const orderTotal = document.querySelector(".order-total");
const totalAmount = document.querySelector(".total-amount");

// adding event listener to add to cart buttons
addToCartButtons.forEach((button, index) => {
	button.addEventListener("click", () => {
		itemImages[index].classList.add("red-border");
		addToCartButtons[index].classList.add("hidden");
		itemQuantityBtns[index].classList.remove("hidden");
		let currentCartQty = parseInt(cartQty.textContent);
		let currItemQty = parseInt(qtyTxts[index].textContent);
		cartQty.textContent = currentCartQty + currItemQty;

		let itemName = items[index].textContent;
		let itemPrice = parseFloat(itemPrices[index].textContent.replace(/\$/, ""));
		addItemToCart(itemName, itemPrice, currItemQty);

		updateCart();
	});
});

// adding event listeners to decrement and increment buttons
decrementBtns.forEach((button, index) => {
	button.addEventListener("click", () => {
		let currentQty = parseInt(qtyTxts[index].textContent);
		let currCartQty = parseInt(cartQty.textContent);
		if (currentQty > 1) {
			qtyTxts[index].textContent = currentQty - 1;
			cartQty.textContent = currCartQty - 1;
		}

		if (currentQty === 1) {
			addToCartButtons[index].classList.remove("hidden");
			itemQuantityBtns[index].classList.add("hidden");
			itemImages[index].classList.remove("red-border");
			cartQty.textContent = currCartQty - 1;
		}
		updateCart();
	});
});

incrementBtns.forEach((button, index) => {
	button.addEventListener("click", () => {
		let currentQty = parseInt(qtyTxts[index].textContent);
		qtyTxts[index].textContent = currentQty + 1;
		let currCartQty = parseInt(cartQty.textContent);
		cartQty.textContent = currCartQty + 1;
		updateCart();
	});
});

const updateCart = () => {
	let currCartQty = parseInt(cartQty.textContent);
	if (currCartQty > 0) {
		emptyCartTxt.classList.add("hidden");
		emptyCartImg.classList.add("hidden");
		orderBtn.classList.remove("hidden");
		orderTotal.classList.remove("hidden");
		cartTxt.classList.remove("hidden");
	} else {
		emptyCartTxt.classList.remove("hidden");
		emptyCartImg.classList.remove("hidden");
		orderBtn.classList.add("hidden");
		orderTotal.classList.add("hidden");
		cartTxt.classList.add("hidden");
	}
};

updateCart();

const addItemToCart = (itemName, itemPrice, currItemQty) => {
	const item = `
	 <div class="flex items-center justify-between border-b border-[#f4edeb] py-[1rem] rounded">
				<div class="flex flex-col">
					<p class="text-[#260f08] font-semibold mb-[0.2rem]">${itemName}</p>
					<div class="flex gap-[0.6rem]">
						<p class="text-[#c73a0f] font-semibold mr-[0.5rem]">${currItemQty}x</p>
						<p class="text-[#c9aea6]">&#64;$${itemPrice}</p>
						<p class="text-[#c9aea6] font-semibold">$${itemPrice * currItemQty}</p>
					</div>
				</div>
				<img src="https://raw.githubusercontent.com/Deepali25-K/product-list-with-cart/refs/heads/main/assets/images/icon-remove-item.svg" class="border-[#c9aea6] border-[0.11rem] rounded-full py-[0.2rem] px-[0.15rem]" alt="remove-icon">
			</div>
	`;

	itemsContainer.innerHTML += item;
};
