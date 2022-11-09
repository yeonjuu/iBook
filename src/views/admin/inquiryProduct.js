import * as Api from '../api.js';
import {
  serachTemplate,
  productTemplate,
  getProductAddTemplate,
  curtImage,
} from './productTemplate.js';
import { getOptionsCategory, previewImage } from './addProduct.js';

let imageUrl = '';

const landing = document.querySelector('.landing');

export async function inquiryProduct() {
  const inquiryHtml = serachTemplate('도서조회');
  landing.innerHTML = inquiryHtml;

  const products = await loadData();

  const searchInput = document.querySelector('.searchInput');
  const searchBtn = document.querySelector('.searchBtn');
  const searchAllBtn = document.querySelector('.searchAll');

  searchAll();

  searchBtn.addEventListener('click', function () {
    const search = searchInput.value;
    const filterProduct = products.filter((product) =>
      product.title.includes(search)
    );
    if (filterProduct.length == 0) {
      alert('검색 결과가 없습니다.');
    } else {
      renderProdcutList(filterProduct);
    }
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
    //이미 로드 했으면 밑에 child 전체 삭제하고 다시 로드하기
    console.log('complete load!');
    renderProdcutList(products);
  }
}

async function renderProdcutList(products) {
  const listEl = document.querySelector('.list');
  while (listEl.firstChild) {
    listEl.removeChild(listEl.firstChild);
  }

  listEl.insertAdjacentHTML(
    'beforeend',
    products.map((p) => productTemplate(p)).join('')
  );

  listEl.onclick = async (event) => {
    let target = event.target;
    console.log(target);
    let targetProduct = target.closest('.product');
    if (target.classList.contains('update')) {
      //update
      //product 정보가져오기
      let isUpdate = confirm('도서를 수정하시겠습니까?');
      if (isUpdate) {
        const curProduct = await Api.get(
          '/api/products',
          targetProduct.dataset.id
        );
        await update(curProduct);
      } else {
        alert('도서수정취소');
      }
    } else if (target.classList.contains('delete')) {
      //delete
      await del(targetProduct.dataset.id);
      targetProduct.style.display = 'none';
    }
  };
}

async function update(product) {
  const updateHtml = getProductAddTemplate('도서수정');
  landing.innerHTML = updateHtml;

  const {
    title,
    author,
    price,
    images,
    publisher,
    description,
    _id,
    category,
  } = product;
  //카테고리 로드
  await getOptionsCategory();

  const productInfo = document.querySelector('#product-info');
  const input = document.querySelector('#product-img');
  const curTitle = document.querySelector('.title');
  const curAuthor = document.querySelector('.author');
  const curPublisher = document.querySelector('.publisher');
  const curPrice = document.querySelector('.price');
  const curPdescription = document.querySelector('.description');
  const curCategory = document.querySelector('#category');
  const preview = document.querySelector('.preview');

  imageUrl = images[0];
  //기존 도서의 정보 로드
  curTitle.value = title;
  curAuthor.value = author;
  curPublisher.value = publisher;
  curPdescription.value = description;
  curPrice.value = price;

  //이미지 띄우기
  preview.insertAdjacentHTML('beforeend', curtImage(images[0], curTitle));

  for (let i = 0; i < curCategory.options.length; i++) {
    if (curCategory.options[i].value == category) {
      curCategory.options[i].selected = true;
    }
  }
  input.addEventListener('change', previewImage);
  //정보수정 후,
  //정보저장
  productInfo.addEventListener('submit', async function (e) {
    e.preventDefault();
    //이미지가 변경되지 않ㅇ을 경우
    if (input.files[0] !== undefined) {
      let formData = new FormData();
      formData.append('productImages', input.files[0]);
      let res = await fetch('/api/products/upload', {
        method: 'POST',
        body: formData,
      });

      let result = await res.json();
      imageUrl = result.images;
      console.log('result', imageUrl);
    }

    const changeInfo = {
      title: productInfo.title.value,
      author: productInfo.author.value,
      price: productInfo.price.value,
      publisher: productInfo.publisher.value,
      description: productInfo.description.value,
      images: imageUrl,
      categoryId: category,
    };

    await Api.put('/api/products', _id, changeInfo);

    alert('도서수정완료');
    //조회 페이지로
    window.location.href = '/admin';
  });
}

async function del(id) {
  let isDel = confirm('도서를 삭제하시겠습니까?');
  if (isDel) {
    await Api.delete('/api/products', id);
    alert('도서삭제완료');
  } else {
    alert('도서삭제취소');
  }
}
