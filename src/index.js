import './sass/main.scss';
import refs from './js/data/refs';
import fetchImages from './js/services/apiService';
import renderCards from './templates/card-img.hbs';
import alert from './js/vendors/alert';
import elemForScroll from './js/services/elem-for-scroll';

const BASE_URL = ' https://pixabay.com/api/';
let clickLoadMoreBtn = 1;
let valueInputForm = '';

const getUrlParams = () => {
  const urlParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    q: valueInputForm,
    page: clickLoadMoreBtn,
    per_page: 12,
    key: '26909021-bb302c7a297d7b4d207aa52f9',
  });
  return urlParams;
};

const onSubmit = e => {
  e.preventDefault();
  valueInputForm = e.currentTarget.query.value;
  clickLoadMoreBtn = 1;
  const urlParams = getUrlParams();
  if (!valueInputForm) {
    alert('Error', "The string isn't should be empty");
    return;
  }

  fetchImages(`${BASE_URL}?${urlParams}`)
    .then(data => {
      if (!data.total) {
        throw new Error('Not Found');
      }
      refs.list.innerHTML = renderCards(data);
      refs.loadMore.classList.remove('visually-hidden');
    })
    .catch(err => alert('Error', 'Not Found'));
};

const handleLoadMore = () => {
  clickLoadMoreBtn += 1;
  const urlParams = getUrlParams();
  refs.loadMore.setAttribute('disabled', '');

  fetchImages(`${BASE_URL}?${urlParams}`)
    .then(data => {
      const firstElem = data.hits[0].id;

      refs.list.insertAdjacentHTML('beforeend', renderCards(data));
      refs.loadMore.removeAttribute('disabled');

      elemForScroll(firstElem);
    })
    .catch(err => alert('Error', 'Not Found'));
};

refs.form.addEventListener('submit', onSubmit);
refs.loadMore.addEventListener('click', handleLoadMore);
