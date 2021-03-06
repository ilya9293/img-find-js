import './sass/main.scss';
import './create-class';
// import refs from './js/data/refs';
// import fetchImages from './js/services/apiService';
// import renderCards from './templates/card-img.hbs';
// import alert from './js/vendors/alert';
// import elemForScroll from './js/services/elem-for-scroll';
// import openLargeImg from './js/services/open-large-img';

// const BASE_URL = ' https://pixabay.com/api/';
// let clickLoadMoreBtn = 1;
// let valueInputForm = '';

// const getUrlParams = () => {
//   const urlParams = new URLSearchParams({
//     image_type: 'photo',
//     orientation: 'horizontal',
//     q: valueInputForm,
//     page: clickLoadMoreBtn,
//     per_page: 12,
//     key: '26909021-bb302c7a297d7b4d207aa52f9',
//   });
//   return urlParams;
// };

// const onSubmit = e => {
//   e.preventDefault();
//   if (!e.currentTarget.query.value) {
//     alert('Error', "The string isn't should be empty");
//     return;
//   }
//   refs.list.innerHTML = '';
//   refs.loadMore.classList.add('visually-hidden');
//   refs.form.classList.add('transparent');
//   refs.loadMore.removeAttribute('disabled');
//   clickLoadMoreBtn = 1;
//   valueInputForm = e.currentTarget.query.value;
//   const urlParams = getUrlParams();

//   fetchImages(`${BASE_URL}?${urlParams}`)
//     .then(data => {
//       if (!data.total) {
//         throw new Error('Not Found');
//       }
//       refs.list.innerHTML = renderCards(data);
//       refs.loadMore.classList.remove('visually-hidden');

//       // const options = {
//       //   rootMargin: '100px',
//       //   threshold: 0.5,
//       // };

//       // const renderNextItems = ([entry], self) => {
//       //   if (entry.isIntersecting) {
//       //     clickLoadMoreBtn += 1;
//       //     const urlParams = getUrlParams();
//       //     fetchImages(`${BASE_URL}?${urlParams}`)
//       //       .then(data => {
//       //         refs.list.insertAdjacentHTML('beforeend', renderCards(data));
//       //       })
//       //       .catch(err => alert('Finish', 'Not Found'));
//       //   }
//       // };

//       // const observer = new IntersectionObserver(renderNextItems, options);
//       // observer.observe(refs.anchor);
//     })
//     .catch(err => {
//       alert('Error', 'Not Found');
//       refs.list.innerHTML = '';
//       refs.loadMore.classList.add('visually-hidden');
//     });
//   e.currentTarget.reset();
// };

// const handleLoadMore = () => {
//   if (!valueInputForm) {
//     alert('Error', "The string isn't should be empty");
//     return;
//   }
//   clickLoadMoreBtn += 1;
//   const urlParams = getUrlParams();
//   refs.loadMore.setAttribute('disabled', '');

//   fetchImages(`${BASE_URL}?${urlParams}`)
//     .then(data => {
//       const firstElem = data.hits[0].id;

//       refs.list.insertAdjacentHTML('beforeend', renderCards(data));
//       refs.loadMore.removeAttribute('disabled');

//       elemForScroll(firstElem);
//     })
//     .catch(err => alert('Finish', 'Not Found'));
// };

// const onImage = e => {
//   if (e.target.nodeName !== 'IMG') {
//     return;
//   }

//   const idElem = e.target.parentNode.parentNode.getAttribute('id');
//   const urlParams = new URLSearchParams({
//     key: '26909021-bb302c7a297d7b4d207aa52f9',
//     id: idElem,
//   });

//   fetchImages(`${BASE_URL}?${urlParams}`)
//     .then(data => {
//       const largeURL = data.hits[0].largeImageURL;
//       openLargeImg(largeURL);
//     })
//     .catch(console.log);
// };

// refs.form.addEventListener('submit', onSubmit);
// refs.loadMore.addEventListener('click', handleLoadMore);
// refs.list.addEventListener('click', onImage);
