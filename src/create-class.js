import refs from './js/data/refs';
import fetchImages from './js/services/apiService';
import renderCards from './templates/card-img.hbs';
import alert from './js/vendors/alert';
import elemForScroll from './js/services/elem-for-scroll';
import openLargeImg from './js/services/open-large-img';

class imageFind {
  #KEY = '26909021-bb302c7a297d7b4d207aa52f9';
  BASE_URL = ' https://pixabay.com/api/';

  constructor({ per_page }) {
    this.clickLoadMoreBtn = 1;
    this.per_page = per_page;
    this.valueInputForm = '';
  }

  getUrlParams() {
    const urlParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      q: this.valueInputForm,
      page: this.clickLoadMoreBtn,
      per_page: this.per_page,
      key: this.#KEY,
    });
    return urlParams;
  }

  makeVisibleLoadMore() {
    refs.loadMore.classList.add('visually-hidden');
  }

  removeDisabledLoadMore() {
    refs.loadMore.removeAttribute('disabled');
  }

  resetPage() {
    this.clickLoadMoreBtn = 1;
  }

  incrementPage() {
    this.clickLoadMoreBtn += 1;
  }

  onSubmit(e) {
    e.preventDefault();
    if (!e.currentTarget.query.value) {
      alert('Error', "The string isn't should be empty");
      return;
    }
    refs.list.innerHTML = '';
    this.makeVisibleLoadMore();
    refs.form.classList.add('transparent');
    this.removeDisabledLoadMore();
    this.resetPage();
    this.valueInputForm = e.currentTarget.query.value;
    const urlParams = this.getUrlParams();

    fetchImages(`${this.BASE_URL}?${urlParams}`)
      .then(data => {
        if (!data.total) {
          throw new Error('Not Found');
        }
        refs.list.innerHTML = renderCards(data);
        refs.loadMore.classList.remove('visually-hidden');
      })
      .catch(err => {
        alert('Error', 'Not Found');
        refs.list.innerHTML = '';
        this.makeVisibleLoadMore();
      });
    e.currentTarget.reset();
  }

  handleLoadMore() {
    if (!this.valueInputForm) {
      alert('Error', "The string isn't should be empty");
      return;
    }
    this.incrementPage();
    const urlParams = this.getUrlParams();
    refs.loadMore.setAttribute('disabled', '');

    fetchImages(`${this.BASE_URL}?${urlParams}`)
      .then(data => {
        const firstElem = data.hits[0].id;

        refs.list.insertAdjacentHTML('beforeend', renderCards(data));
        this.removeDisabledLoadMore();

        elemForScroll(firstElem);
      })
      .catch(err => alert('Finish', 'Not Found'));
  }

  onImage(e) {
    if (e.target.nodeName !== 'IMG') {
      return;
    }

    const idElem = e.target.parentNode.parentNode.getAttribute('id');
    const urlParams = new URLSearchParams({
      key: this.#KEY,
      id: idElem,
    });

    fetchImages(`${this.BASE_URL}?${urlParams}`)
      .then(data => {
        const largeURL = data.hits[0].largeImageURL;
        openLargeImg(largeURL);
      })
      .catch(console.log);
  }
}

const img = new imageFind({
  per_page: 12,
});

refs.form.addEventListener('submit', img.onSubmit.bind(img));
refs.loadMore.addEventListener('click', img.handleLoadMore.bind(img));
refs.list.addEventListener('click', img.onImage.bind(img));
