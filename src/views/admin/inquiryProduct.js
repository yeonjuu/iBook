import * as Api from '../api.js';

const products = document.querySelector('.products');

const landing = document.querySelector('.landing');

products.addEventListener('click', inquiryProduct);

async function inquiryProduct() {
  const inquiryHtml = serachTemplate('상품조회');
  landing.innerHTML = inquiryHtml;

  const searchInput = document.querySelector('.searchInput');
  const searchBtn = document.querySelector('.searchBtn');
  const searchAllBtn = document.querySelector('.searchAll');

  //미구현
  searchBtn.addEventListener('click', function () {
    const search = searchInput.value();
    console.log('search title ', search);
  });
  searchAllBtn.addEventListener('click', searchAll);
}

async function loadData() {
  console.log('data load..');
  return await Api.get('/api/products');
}

async function searchAll() {
  const products = await loadData();
  console.log('complete load!');
  console.log(products);
  const listEl = document.querySelector('.list');

  listEl.onclick = (event) => {
    let target = event.target;
    let products = target.closet('product');
    //product를 받아서, target -> update / delete 선택했는지 확인하기
    //target.contain('classname") 이런느낌으로 if(~~~) else if(~~~~)
  };

  products.forEach((product) => {
    console.log('product : ', product);
    const { _id } = product;
    const productEl = document.createElement('div');
    productEl.className = 'product';
    productEl.id = _id;
    productEl.innerHTML = productTemplate(product);
    listEl.appendChild(productEl);
  });
}

function update() {
  const udpateBtn = documet.querySelector('.update');
}

function del() {
  const deleteBtn = document.querySelector('.delete');
  deleteBtn.addEventListener('click');
}
