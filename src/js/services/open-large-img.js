import * as basicLightbox from 'basiclightbox';

export default url => {
  const instance = basicLightbox.create(`
   <img src=${url}>
`);
  instance.show();
};
