import * as Api from '../api.js';
import { serachTemplate, productTemplate } from './productTemplate.js';

const products = document.querySelector('.products');

const landing = document.querySelector('.landing');

products.addEventListener('click', inquiryProduct);

async function inquiryProduct() {
  const inquiryHtml = serachTemplate('도서조회');
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
  if (products.length == 0) {
    alert('상품이 없습니다');
  } else {
    console.log('complete load!');

    const listEl = document.querySelector('.list');

    listEl.insertAdjacentHTML(
      'beforeend',
      products.map((p) => productTemplate(p)).join('')
    );

    listEl.onclick = async (event) => {
      let target = event.target;
      let targetProduct = target.closet('product');
      if (target.contain('update')) {
        //update
      } else if (target.contain('delete')) {
        //delete
        console.log('target', targetProduct.id);
        let isDel = confirm('도서를 삭제하시겠습니까?');
        if (isDel) {
          await Api.delete('/api/products', targetProduct.id);
          targetProduct.style.display = 'none';
          alert('상품삭제완료');
        } else {
          alert('상품삭제취소');
        }
      }
    };
  }
}

async function update(id) {
  await Api.update('/api/products', id, changeData);
}
