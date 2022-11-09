import * as Api from '../api.js';

const landing = document.querySelector('.landing');
const orders = document.querySelector('.orders');
let ordersInfo;
let mapOrdersInfo;
const serachTemplate = function (h2) {
  return `
            <h2>${h2}</h2>
            <div class="search-wrap">
              <input class="searchInput" placeholder="제품명 입력.." />
              <input type="button" value="검색" class="searchBtn" />
              <input type="button" value="전체조회" class="searchAll" />
            </div>
            <ul class="list"></ul>
            <button class="revise">수정</button>`;
};

function orderListTemplate(id, bookList, totalPrice, orderStatus) {
  return `<li class="orderInfo" data-id=${id}>
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
          <select name="status" class="status">
            <option value="상태선택">상태선택</option>
            <option value="주문취소">주문취소</option>
            <option value="주문완료">주문완료</option>
            <option value="배송시작">배송시작</option>
            <option value="배송완료">배송완료</option>
          </select>
        </div>
        <button class="orderDel">삭제</button>
      </li>`;
}

async function renderOrderInfo() {
  const inquiryHtml = serachTemplate('주문조회');
  landing.innerHTML = inquiryHtml;
}

function changeMap(orders) {
  let result = new Map([]);
  orders.forEach((order) => {
    result.set(order._id, order);
  });
  return result;
}

async function allOrderListRender() {
  ordersInfo = await Api.get('/api/orders');
  mapOrdersInfo = changeMap(ordersInfo);
  render(ordersInfo);
}

function render(ordersInfo) {
  let orderList = document.querySelector('.list');
  while (orderList.hasChildNodes()) {
    orderList.removeChild(orderList.firstChild);
  }
  orderList.insertAdjacentHTML(
    'beforeend',
    ordersInfo
      .map((order) => {
        let totalPrice = order.products.reduce((acc, cur) => {
          return acc + cur.qty * cur.productId.price;
        }, 0);
        let bookDatas = order.products;
        return orderListTemplate(
          order._id,
          `${bookDatas[0].productId.title} 외 ${
            bookDatas.length - 1
          }개의 다른 상품`,
          totalPrice,
          order.status
        );
      })
      .join('')
  );
}

function delOrder(target) {
  const targetId = target.dataset.id;
  target.style.display = 'none';
  Api.delete('/api/orders/', targetId);
  alert('삭제완료');
}

function reviseOrder(allOrder) {
  const checkList = [];
  allOrder.forEach((order) => {
    const status = order.querySelector('.status');
    if (status.value !== '상태선택') {
      checkList.push([order, status.value]);
    }
  });
  checkList.forEach((order) => {
    const id = order[0].dataset.id;
    const data = mapOrdersInfo.get(id);
    data.status = order[1];
    Api.put(`/api/orders/`, id, data);
  });
}

async function search() {
  const inputValue = document.querySelector('.searchInput').value;
  ordersInfo = [await Api.get(`/api/orders/`, inputValue)];

  mapOrdersInfo = changeMap(ordersInfo);

  render(ordersInfo);
}

landing.onclick = (event) => {
  if (event.target.classList.contains('orderDel')) {
    const target = event.target.closest('.orderInfo');
    if (mapOrdersInfo.get(target.dataset.id).status === '주문취소') {
      delOrder(target);
    } else {
      alert('주문 취소된 건만 삭제 가능합니다');
    }
  } else if (event.target.classList.contains('revise')) {
    const allOrder = document.querySelectorAll('.orderInfo');
    reviseOrder(allOrder);
  } else if (event.target.classList.contains('searchAll')) {
    allOrderListRender();
  } else if (event.target.classList.contains('searchBtn')) {
    search();
  }
};
orders.addEventListener('click', renderOrderInfo);
