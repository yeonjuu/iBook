import * as Api from '/api.js';
import * as useful from '/useful-functions.js';

function orderListTemplate(id, bookList, totalPrice, orderStatus) {
  if (orderStatus == '주문취소') {
    return `<li class="orderInfo" data-id=${id}>
    <div class="orderNumber">
      <div class="orderNum">주문번호</div>
      <div>${id}</div>
    </div>
    <div class="orderDetail">
      <div>주문내역</div>
      <div>${bookList}</div>
    </div>
    <div class="totalPrice">
      <div>총 결제금액</div>
      <div>${useful.addCommas(totalPrice)} 원</div>
    </div>
    <div class="orderStatus">
      <span class="tag is-danger is-light is-medium">${orderStatus}</span>
    </div>
    <div class="editOrder">
    <span class="editOrderBtn tag is-link is-medium">상세정보</span>
    </div>
  </li>`;
  } else
    return `<li class="orderInfo" data-id=${id}>
    <div class="orderNumber">
      <div class="orderNum">주문번호</div>
      <div>${id}</div>
    </div>
    <div class="orderDetail">
      <div>주문내역</div>
      <div>${bookList}</div>
    </div>
    <div class="totalPrice">
      <div>총 결제금액</div>
      <div>${useful.addCommas(totalPrice)} 원</div>
    </div>
    <div class="orderStatus">
      <span class="tag is-link is-light is-medium">${orderStatus}</span>
    </div>
    <div class="editOrder">
    <span class="editOrderBtn tag is-link is-medium">상세정보</span>
    </div>
  </li>`;
}

function orderInfoTemplate(id, img, title, count, price) {
  return `<li class="product" data-id=${id}>
    <div class="bookImageBox">
      <img src=${img} class="bookImage"/>
    </div>
    <div class="productInfo">
      <div>${title}</div>
      <div>${count}</div>
    </div>
    <div class="productTotalPrice">
      <p>${useful.addCommas(price * count)} 원</p>
    </div>
  </li>`;
}

function createDeatailOrderInfo(targetId) {
  ischeck = false;
  const orders = ordersMap.get(targetId);
  const orderProducts = ordersMap.get(targetId).products;
  const modalEl = `<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-content">
    <div class="productInfoBox">
      <div class="delBtnBox"><button class="delete" aria-label="close"></button></div>
      <div class="productLi">
        상세정보
      </div>
      <div>
        <div class="ordererInfoBox">
          <div>주문자</div>
          <div class="orderer"> ${orders.name}</div>  
        </div>
      </div>
      <div>
        <div class="addressLocation">
          <div>배달장소</div>
          <div class="address">${orders.address}</div>  
        </div>
      </div>
      <div class="orderInfoBox">
        <div class="productList">제품목록</div>
        <ul class="orderInfoList"></ul>
      </div>
      <div class="orderBtnBox">
        <button class="cancelOrderBtn tag is-danger is-medium">주문취소</button>
        <button class="reviseOrderBtn tag is-link is-medium">주문수정</button>
      </div>
    </div>
  </div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', modalEl);
  const orderInfoList = document.querySelector('.orderInfoList');
  orderInfoList.insertAdjacentHTML(
    'beforeend',
    orderProducts
      .map((product) => {
        return orderInfoTemplate(
          product.productId._id,
          product.productId.images[0],
          product.productId.title,
          product.qty,
          product.productId.price
        );
      })
      .join('')
  );
  document.querySelector('.reviseOrderBtn').addEventListener('click', () => {
    if (orders.status === '주문취소') {
      orders.status === '주문취소';
      alert('이미 취소된 상품입니다');
    } else if (orders.status !== '주문완료') {
      alert('상품이 이미 배송중입니다');
    } else {
      localStorage.setItem('orderId', orders._id);
      location.replace('/order');
    }
  });
  document.querySelector('.cancelOrderBtn').addEventListener('click', () => {
    if (orders.status === '주문취소') {
      alert('이미 취소된 주문입니다');
    } else if (orders.status !== '주문완료') {
      alert('상품이 이미 배송중입니다');
    } else {
      if (confirm('취소 하시겠습니까?')) {
        orders.status = '주문취소';

        Api.put(`/api/orders/`, orders._id, orders);
        alert('취소 완료 됐습니다');
        location.reload();
      }
    }
  });

  document.querySelector('.modal-background').addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.classList.remove('is-active');
    document.querySelector('body').removeChild(modal);
    ischeck = true;
  });
  document.querySelector('.delete').addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.classList.remove('is-active');
    document.querySelector('body').removeChild(modal);
    ischeck = true;
  });
}

async function loadUserData(token) {
  let user = await Api.get(`/api/users/${token}`);
  return user._id;
}

async function loadOrderData(userId) {
  return await Api.get(`/api/orders`, `?userId=${userId}`);
}

function renderOrderList() {
  orderList.insertAdjacentHTML(
    'beforeend',
    orders
      .map((order) => {
        let totalPrice = order.products.reduce((acc, cur) => {
          return acc + cur.qty * cur.productId.price;
        }, 0);
        bookDatas = order.products;

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

  // orders.forEach((order) => {
  //   bookDatas = order.products;
  //   orderList.insertAdjacentHTML(
  //     'beforeend',
  //     orderListTemplate(
  //       order._id,
  //       `${bookDatas[0].productId.title} 외 ${
  //         bookDatas.length - 1
  //       }개의 다른 상품`,
  //       10000,
  //       order.status
  //     )
  //   );
  // });
}
function changeMap(orders) {
  let result = new Map([]);
  orders.forEach((order) => {
    result.set(order._id, order);
  });
  return result;
}
const userId = await loadUserData(sessionStorage.getItem('token'));
console.log(userId);
const orders = await loadOrderData(userId);
console.log(orders);
let ischeck = true;
let bookDatas;
const orderList = document.querySelector('.orderList');
orderList.onclick = (event) => {
  if (ischeck && event.target.classList.contains('editOrderBtn')) {
    const targetId = event.target.closest('.orderInfo').dataset.id;
    createDeatailOrderInfo(targetId);
  }
};

renderOrderList();
const ordersMap = changeMap(orders);

//로그인 여부에 따라 상단 메뉴 노출 유무 설정
const login = document.querySelector('#login');
const logout = document.querySelector('#logout');
const adminPage = document.querySelector('#adminPage');
const edit = document.querySelector('#edit');
const editAtag = document.querySelector('#edit a');
const seeOrder = document.querySelector('#seeOrder');
const register = document.querySelector('#register');

const userToken = sessionStorage.token;
const isLogin = Boolean(userToken);

//로그인 유저 확인
if (isLogin) {
  checkLogin();
}

async function checkLogin() {
  const loginUser = await Api.get('/api/users', userToken);
  const isUser = loginUser.role === 'user';
  const isAdmin = loginUser.role === 'admin';

  if (sessionStorage && isUser) {
    login.classList.add('hidden');
    register.classList.add('hidden');
    logout.classList.remove('hidden');
    edit.classList.remove('hidden');
    seeOrder.classList.remove('hidden');

    editAtag.innerText = `${loginUser.fullName}님의 프로필`;
    // alert(`${loginUser.fullName}님 안녕하세요!`);
  }

  //관리자 계정일 때
  if (sessionStorage && isAdmin) {
    login.classList.add('hidden');
    register.classList.add('hidden');
    adminPage.classList.remove('hidden');
    logout.classList.remove('hidden');
  }
}
//로그아웃 버튼 클릭시 토큰 삭제

function logoutHandler() {
  sessionStorage.removeItem('token');
}

logout.addEventListener('click', logoutHandler);
