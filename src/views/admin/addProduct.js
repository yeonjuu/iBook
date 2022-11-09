import * as Api from '../api.js';
import { getProductAddTemplate } from './productTemplate.js';

const add = document.querySelector('.add');
const landing = document.querySelector('.landing');
let imageUrl = '';
add.addEventListener('click', getAddProduct);

function getAddProduct() {
  const addHtml = getProductAddTemplate('도서추가');
  landing.innerHTML = addHtml;

  window.onload = getOptionsCategory();
  window.onload = handleImage();
  window.onload = handleInfoSubmit();
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

function handleImage() {
  const input = document.querySelector('#product-img');
  //스타일만들때 쓰기
  //input.style.opacity = 0;

  input.addEventListener('change', previewImage);
  //사진업로드 제출하고 응답 값 받기 , 응답 값 형태 : { images : [url, ,,,]}
}

function handleInfoSubmit() {
  const productInfo = document.querySelector('#product-info');
  const submitBtn = document.querySelector('#submit-info');
  const categoryEl = document.querySelector('#category');
  const imageInfo = document.querySelector('#image-info');
  const preview = document.querySelector('.preview');

  let categoryId = '';
  categoryEl.addEventListener('change', function () {
    categoryId = categoryEl.options[categoryEl.selectedIndex].value;
    console.log(categoryId);
  });

  submitBtn.addEventListener('click', async function (e) {
    e.preventDefault();
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

    const product = {
      title: productInfo.title.value,
      author: productInfo.author.value,
      price: productInfo.price.value,
      publisher: productInfo.publisher.value,
      description: productInfo.description.value,
      images: imageUrl,
      categoryId: categoryId,
    };
    console.log('productInfo', JSON.stringify(productInfo));
    try {
      await Api.post('/api/products', product);
      alert('상품추가완료');
      //form reset
      imageInfo.reset();
      preview.removeChild(preview.firstChild);
      productInfo.reset();
    } catch (err) {
      console.log(err);
    }
  });
}

//이미지 미리보기
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
