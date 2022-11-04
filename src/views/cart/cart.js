// 이 아래 3 변수는 임의로 데이터를 추가하기 위한 변수임
const submitBtn = document.querySelector('.submit');
const bookName = document.querySelector('.bookName');
const bookPrice = document.querySelector('.bookPrice');
const buyBtn = document.querySelector('.buy');

const li = document.querySelector('.list'); // 전체 장바구니 목록을 포함하는 ul
const selectDelBtn = document.querySelector('.selectDelBtn'); //선택 삭제 버튼
const totalPrice = document.querySelector('.totalPrice');
const selectAllBtn = document.querySelector('.selectAll');
let baskets = JSON.parse(localStorage.getItem('carts')) || [];
let checkList = [];
let totalPriceValue = 0;

function template(img, name, price, count, idx) {
  //상품 리스트 템플릿
  return `<li class="product">
    <div>
      <button id="select"></button>
    </div>
    <div class="imgBox">
      이미지
      <img src=${img} />
    </div>
    <div>
      <div class="info">
        <div class="bookName">${name}</div>
        <div class="price">${price}</div>
      </div>
    </div>
    <div class="countContainer">
      <span class="totalPrice">${price * count}</span>
      <span>원</span>
      <div class="countBtn">
        <button id="minusBtn">-</button>
        <input id="count"  maxlength="3" type="number" value="${count}"}/>
        <button id="plusBtn" >+</button>
      </div>
    </div>
    <div>
      <button id="deleteBtn">X</button>
    </div>
  </li>`;
}
addAllEvents();

function addAllEvents() {
  selectDelBtn.addEventListener('click', clickSelDelBtn);
  submitBtn.addEventListener('click', add);
  selectAllBtn.addEventListener('click', function () {
    allSelect(boxes);
  });
  document.addEventListener('mousedown', function () {
    inputPrice(input, eventBox);
  });
  buyBtn.addEventListener('click', function () {
    buyBtn.parentNode.href += `#id=${user}`;
  });
}

function setItem(name, type) {
  const index = baskets.findIndex((obj) => {
    return obj.title == name;
  });
  if (type == 'plus') {
    baskets[index].count += 1;
    localStorage.setItem('carts', JSON.stringify(baskets));
  } else if (type == 'minus') {
    baskets[index].count -= 1;
    localStorage.setItem('carts', JSON.stringify(baskets));
  } else {
    baskets[index].count = Number(type);

    localStorage.setItem('carts', JSON.stringify(baskets));
  }
}

function add(e) {
  e.preventDefault();
  const name = bookName.value;
  const price = bookPrice.value;
  let check = true;
  const basket = {
    title: name,
    price: price,
    count: baskets.count || 1,
    imgaes: 'url',
  };

  baskets.forEach((element, idx) => {
    if (element.title === basket.name) {
      baskets[idx].count += 1;
      localStorage.setItem('carts', JSON.stringify(baskets));
      return false;
    }
  });

  if (check === true) {
    baskets.push(basket);
    localStorage.setItem('carts', JSON.stringify(baskets));
  }
}

function minusCount(box) {
  const input = box.querySelector('#count');
  const inputVal = input.value;
  const name = box.querySelector('.bookName').innerHTML;
  const totalPrice1 = box.querySelector('.totalPrice');
  const price = box.querySelector('.price');

  if (inputVal <= 1) {
    return (totalPrice1.innerHTML = price.innerHTML);
  }
  input.value = Number(inputVal) - 1;
  totalPrice1.innerHTML = `${Number(price.innerHTML) * Number(input.value)}`;
  totalPriceValue = totalPriceValue - Number(price.innerHTML);
  totalPrice.innerHTML = totalPriceValue;
  setItem(name, 'minus');
}

function addCount(box) {
  const input = box.querySelector('#count');
  const inputVal = input.value;
  const name = box.querySelector('.bookName').innerHTML;
  const totalPrice1 = box.querySelector('.totalPrice');
  const price = box.querySelector('.price');

  if (inputVal >= 999) {
    input.value = 999;
  } else {
    input.value = Number(inputVal) + 1;
    totalPrice1.innerHTML = `${Number(price.innerHTML) * Number(input.value)}`;
    totalPriceValue = totalPriceValue + Number(price.innerHTML);
    totalPrice.innerHTML = totalPriceValue;
    setItem(name, 'plus');
  }
}

function inputPrice(target, box) {
  const totalPrice1 = box.querySelector('.totalPrice');
  const price = box.querySelector('.price');
  const name = box.querySelector('.bookName').innerHTML;
  target.value = Number(target.value);
  if (target.value.length > 3) {
    target.value = 999;
  } else if (target.value <= 0) {
    target.value = 1;
  }
  const a =
    Number(price.innerHTML) * Number(target.value) -
    Number(totalPrice1.innerHTML);
  if (a != 0) {
    totalPriceValue += a;
    totalPrice.innerHTML = totalPriceValue;
  }
  totalPrice1.innerHTML = `${Number(price.innerHTML) * Number(target.value)}`;
  setItem(name, target.value);
}

function clickDelBtn(box) {
  const name = box.querySelector('.bookName').innerHTML;
  const totalPrice1 = box.querySelector('.totalPrice');
  box.style.display = 'none';
  const index = baskets.findIndex((obj) => {
    return obj.title == name;
  });

  baskets.splice(index, 1);

  localStorage.setItem('carts', JSON.stringify(baskets));
  totalPriceValue -= Number(totalPrice1.innerHTML);
  totalPrice.innerHTML = totalPriceValue;
}

function clickSelBtn(box) {
  const selectBtn = box.querySelector('#select');
  const name = box.querySelector('.bookName').innerHTML;
  if (selectBtn.style.backgroundColor == 'blue') {
    selectBtn.style.backgroundColor = 'white';
    selectBtn.style.opacity = 0.4;

    checkList = checkList.filter((val) => {
      return val != name;
    });
  } else {
    selectBtn.style.backgroundColor = 'blue';
    selectBtn.style.opacity = 1;
    checkList.push(name);
  }
}

function clickSelDelBtn() {
  checkList.forEach((val) => {
    const index = baskets.findIndex((obj) => {
      return obj.title == val;
    });
    baskets.splice(index, 1);

    localStorage.setItem('carts', JSON.stringify(baskets));
  });
}

function allSelect(boxes) {
  if (selectAllBtn.style.backgroundColor == 'blue') {
    selectAllBtn.style.backgroundColor = 'white';
    selectAllBtn.style.opacity = 0.4;
    checkList = [];
    boxes.forEach((box) => {
      const selectBtn = box.querySelector('#select');
      selectBtn.style.backgroundColor = 'white';
      selectBtn.style.opacity = 0.4;
    });
  } else {
    selectAllBtn.style.backgroundColor = 'blue';
    selectAllBtn.style.opacity = 1;
    checkList = [];
    boxes.forEach((box) => {
      const selectBtn = box.querySelector('#select');
      const name = box.querySelector('.bookName').innerHTML;
      selectBtn.style.backgroundColor = 'blue';
      selectBtn.style.opacity = 1;
      checkList.push(name);
    });
  }
}

if (baskets.length > 0) {
  baskets.forEach((basket, idx) => {
    li.insertAdjacentHTML(
      'beforeend',
      template(basket.imgaes, basket.title, basket.price, basket.count, idx)
    );
    totalPriceValue += basket.price * basket.count;
  });
}
totalPrice.innerHTML = totalPriceValue;
const boxes = document.querySelectorAll('.product');
let input;
let eventBox;
li.onclick = (event) => {
  const box = event.target.parentNode.parentNode.parentNode;
  const box2 = event.target.parentNode.parentNode;
  if (event.target.id == 'plusBtn') {
    addCount(box);
  } else if (event.target.id == 'minusBtn') {
    minusCount(box);
  } else if (event.target.id == 'count') {
    input = event.target;
    eventBox = box;
  } else if (event.target.id == 'deleteBtn') {
    clickDelBtn(box2);
  } else if (event.target.id == 'select') {
    clickSelBtn(box2);
  }
};
