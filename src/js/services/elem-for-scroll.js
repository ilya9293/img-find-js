export default firstElem => {
  const elemForScrol = document.getElementById(firstElem);
  elemForScrol.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};
