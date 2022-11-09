import * as Api from '../api.js';
import { getProductAddTemplate } from './productTemplate.js';

const landing = document.querySelector('.landing');
let imageUrl = '';

export async function getAddProduct() {
  const addHtml = getProductAddTemplate('도서추가');
  landing.innerHTML = addHtml;

  await getOptionsCategory();
  handleSubmit();
}

export async function getOptionsCategory() {
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

function handleSubmit() {
  const productInfo = document.querySelector('#product-info');
  const input = document.querySelector('#product-img');
  const categoryEl = document.querySelector('#category');
  const preview = document.querySelector('.preview');

  let categoryId = '';
  categoryEl.addEventListener('change', function () {
    categoryId = categoryEl.options[categoryEl.selectedIndex].value;
  });

  input.addEventListener('change', previewImage);

  productInfo.addEventListener('submit', async function (e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('productImages', input.files[0]);
    let res = await fetch('/api/products/upload', {
      method: 'POST',
      body: formData,
    });

    let result = await res.json();
    imageUrl = result.images;
    console.log('result', imageUrl);

    const product = {
      title: productInfo.title.value,
      author: productInfo.author.value,
      price: productInfo.price.value,
      publisher: productInfo.publisher.value,
      description: productInfo.description.value,
      images: imageUrl,
      categoryId: categoryId,
    };

    try {
      await Api.post('/api/products', product);
      alert('상품추가완료');
      //form reset
      preview.removeChild(preview.firstChild);
      productInfo.reset();
    } catch (err) {
      console.log(err);
    }
  });
}
//이미지 미리보기
export function previewImage() {
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
