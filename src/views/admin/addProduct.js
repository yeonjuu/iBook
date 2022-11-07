import * as Api from '../api.js';
import { getProductAddTemplate } from './productTemplate.js';

const add = document.querySelector('.add');
const landing = document.querySelector('.landing');

add.addEventListener('click', getAddProduct);

function getAddProduct() {
  const addHtml = getProductAddTemplate('상품추가');
  landing.innerHTML = addHtml;

  window.onload = getOptionsCategory();
  window.onload = loadImage();
  window.onload = handleSubmit();
}

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

async function handleSubmit() {
  const productInfo = document.querySelector('#product-info');
  const submitBtn = document.getElementById('submit-info');
  const msg = document.querySelector('.msg');
  const categoryEl = document.querySelector('#category');
  let categoryId = '';
  categoryEl.addEventListener('change', function () {
    categoryId = categoryEl.options[categoryEl.selectedIndex].value;
  });

  submitBtn.addEventListener('click', async function () {
    const product = {
      title: productInfo['title'].value,
      author: productInfo['author'].value,
      publisher: productInfo['publisher'].value,
      price: productInfo['price'].value,
      description: productInfo['description'].value,
      images: ['uploads/smp1.jpg'],
      categoryId: categoryId,
    };
    await Api.post('/api/products', product);
    alert('상품 추가 완료');
    msg.innerText = JSON.stringify(product);
  });
}

//이미지 처리하기
function loadImage() {
  const input = document.querySelector('#product-img');
  const submitBtn = document.getElementById('upload');
  //스타일만들때 쓰기
  // input.style.opacity = 0;

  input.addEventListener('change', previewImage);
  //submit 버튼 누르면 자동으로 경로를설정해줌(action)을 막고? response값을 받아온다? Fetch로?
  //submit 클릭 시 경로이동은 iframe으로 이동 막는 방법,,,
  //method = post 후 값(response)을 어떻게 받아오는지 -> formData method post ,
  submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('complete upload.');
  });
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
