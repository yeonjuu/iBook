const goHomeBtn = document.querySelector('.goHome');
const goOderInfoBtn = document.querySelector('.goOrderInfo');

function goHome() {
  location.replace('/');
}
function goOderInfo() {
  location.replace('/changeOrder');
}
localStorage.removeItem('carts');
localStorage.removeItem('cart');
goHomeBtn.addEventListener('click', goHome);
goOderInfoBtn.addEventListener('click', goOderInfo);
