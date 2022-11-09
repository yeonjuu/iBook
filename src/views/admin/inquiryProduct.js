import * as Api from '../api.js';
import {
  serachTemplate,
  productTemplate,
  getProductAddTemplate,
} from './productTemplate.js';
// import { getOptionsCategory } from './addProduct.js';

const products = document.querySelector('.products');
const landing = document.querySelector('.landing');
let imageUrl = '';

products.addEventListener('click', inquiryProduct);

async function inquiryProduct() {
  const inquiryHtml = serachTemplate('도서조회');
  landing.innerHTML = inquiryHtml;

  const products = await loadData();

  const searchInput = document.querySelector('.searchInput');
  const searchBtn = document.querySelector('.searchBtn');
  const searchAllBtn = document.querySelector('.searchAll');

  searchBtn.addEventListener('click', function () {
    const search = searchInput.value;
    const filterProduct = products.filter((product) =>
      product.title.includes(search)
    );
    if (filterProduct.length == 0) {
      alert('검색 결과가 없습니다.');
    } else {
      loadProdcutList(filterProduct);
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
    loadProdcutList(products);
  }
}

async function loadProdcutList(products) {
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
  console.log(product);
  //카테고리 로드
  await getOptionsCategory();

  const productInfo = document.querySelector('#product-info');
  const curTitle = document.querySelector('.title');
  const curAuthor = document.querySelector('.author');
  const curPublisher = document.querySelector('.publisher');
  const curPrice = document.querySelector('.price');
  const curPdescription = document.querySelector('.description');
  const curCategory = document.querySelector('#category');
  const preview = document.querySelector('.preview');
  const submitBtn = document.querySelector('#submit-info');

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

  //정보수정 후,
  //이미지 저장
  handleImage();
  //정보저장
  submitBtn.addEventListener('click', async function (e) {
    e.preventDefault();
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
//3개 함수 addProduct 에서 가져옴 , addProduct refactory 필요...
async function getOptionsCategory() {
  const categories = await Api.get('/api/categories');
  const categoryEl = document.querySelector('#category');
  const category_template = (c) =>
    `<option value="${c._id}">${c.name}</option> `;
  categoryEl.insertAdjacentHTML(
    'beforeend',
    categories
      .map((c) => {
        return category_template(c);
      })
      .join('')
  );
}

function handleImage() {
  const imageInfo = document.querySelector('#image-info');
  const input = document.querySelector('#product-img');
  //스타일만들때 쓰기
  // input.style.opacity = 0;

  input.addEventListener('change', previewImage);
  //사진업로드 제출하고 응답 값 받기 , 응답 값 형태 : { images : [url, ,,,]}
  imageInfo.onsubmit = async (e) => {
    e.preventDefault();
    let res = await fetch('/api/products/upload', {
      method: 'POST',
      body: new FormData(imageInfo),
    });
    let result = await res.json();
    imageUrl = result.images;
    console.log('result', imageUrl);
    console.log('complete upload');
  };
}

function previewImage() {
  const input = document.querySelector('#product-img');
  const preview = document.querySelector('.preview');
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  const curtFile = input.files;
  console.log(curtFile);
  if (curtFile.length === 0) {
    const para = document.createElement('p');
    para.textContent = 'No files currently selected for upload';
    preview.appendChild(para);
  } else {
    const div = document.createElement('div');
    preview.appendChild(div);

    for (const file of curtFile) {
      console.log('file', file);
      const para = document.createElement('p');
      para.textContent = `File name : ${file.name}`;
      const image = document.createElement('img');
      image.src = URL.createObjectURL(file);

      div.appendChild(image);
      div.appendChild(para);
    }
  }
}
function curtImage(src, title) {
  return `
  <div>
  <img src = "${src}" alt = "${title} 대표이미지" />
  </div>
  `;
}
