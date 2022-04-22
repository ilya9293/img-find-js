import './sass/main.scss';
import refs from './js/data/refs';
import fetchImages from './js/services/apiService';
import renderCards from './templates/card-img.hbs';

const onSubmit = e => {
  e.preventDefault();

  const BASE_URL = ' https://pixabay.com/api/';
  const urlParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    q: e.currentTarget.query.value,
    page: 1,
    per_page: 12,
    key: '26909021-bb302c7a297d7b4d207aa52f9',
  });

  fetchImages(`${BASE_URL}?${urlParams}`)
    .then(data => {
      refs.list.innerHTML = renderCards(data);
    })
    .catch(console.log);
};

refs.form.addEventListener('submit', onSubmit);
