import './sass/main.scss';
import refs from './js/data/refs';
import fetchImages from './js/services/apiService';

import renderCards from './templates/card-img.hbs';

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

  fetchImages(`${BASE_URL}?${urlParams}`)
    .then(data => {
      refs.list.innerHTML = renderCards(data);
    })
    .catch(console.log);
};

const handleLoadMore = () => {
  clickLoadMoreBtn += 1;
  const urlParams = getUrlParams();

  fetchImages(`${BASE_URL}?${urlParams}`)
    .then(data => {
      refs.list.insertAdjacentHTML('beforeend', renderCards(data));
    })
    .catch(console.log);
};

refs.form.addEventListener('submit', onSubmit);
refs.loadMore.addEventListener('click', handleLoadMore);
