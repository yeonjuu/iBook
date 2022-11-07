import * as Api from '/api.js';
function orderListTemplate(id, bookList, totalPrice, orderStatus) {
  return `<li class="orderInfo" id=${id}>
    <div class="orderNumber">
      <div>주문번호</div>
      <div>${id}</div>
    </div>
    <div class="orderDetail">
      <div>주문내역</div>
      <div>${bookList}</div>
    </div>
    <div class="totalPrice">
      <div>총 결제금액</div>
      <div>${totalPrice}</div>
    </div>
    <div class="orderStatus">
      <div>주문상태</div>
      <div>${orderStatus}</div>
    </div>
  </li>`;
}

function orderInfoTemplate() {
  `<li class="product" id=${id}>
    <div>
      <img src=${img} />
    </div>
    <div id="productInfo">
      <div>${title}</div>
      <div>${count}</div>
    </div>
    <div>
      <p>${price * count}</p>
      <p>원</p>
    </div>
  </li>`;
}

function createDeatailOrderInfo(targetId) {
  const modalEl = `<div class="productInfoBox">
  <div class="productLi">
    <p><strong>제품목록</strong></p>
  </div>
  <div>
    <ul class="orderInfoList"></ul>
  </div>
  </div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', modalEl);
  const orderInfoList = document.querySelector('.orderInfoList');
  const order = orders.get(targetId);
  console.log(order);
}

async function loadUserData(token) {
  let user = await Api.get(`/api/users/${token}`);
  return user._id;
}

async function loadOrderData(userId) {
  return await Api.get(`/api/orders/${userId}`);
}

function renderOrderList() {
  orders.forEach((order) => {
    bookDatas = order.products;
    orderList.insertAdjacentHTML(
      'beforeend',
      orderListTemplate(
        order._id,
        `${bookDatas[0].productId.title} 외 ${
          bookDatas.length - 1
        }개의 다른 상품`,
        10000,
        order.status
      )
    );
  });
}
function changeMap(orders) {
  let result = new Map([]);
  orders.forEach((order) => {
    result.set(order._id, order);
  });
  return result;
}
const userId = await loadUserData(sessionStorage.getItem('token'));
const orders = await loadOrderData(userId);
let bookDatas;
const orderList = document.querySelector('.orderList');
orderList.onclick = (event) => {
  const targetId = event.target.closest('.orderInfo').id;
  console.log(targetId);
  createDeatailOrderInfo(targetId);
};

renderOrderList();
const odersMap = changeMap(orders);
