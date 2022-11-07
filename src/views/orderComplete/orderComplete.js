const goHomeBtn = document.querySelector('.goHome');
const goOderInfoBtn = document.querySelector('.goOrderInfo');

function goHome() {
  location.replace('/');
}

goHomeBtn.addEventListener('click', goHome);
