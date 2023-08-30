export const fetchApi = async () => {
  const url = `https://randomuser.me/api?results=110`;
  const data = await fetch(url);
  const { results } = await data.json();
  return results;
};
