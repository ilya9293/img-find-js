export default async url => {
  //   return  fetch(url).then(response => response.json());
  const response = await fetch(url);
  return await response.json();
};
