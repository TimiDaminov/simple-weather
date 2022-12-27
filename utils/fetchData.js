export const getData = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=20a46584759838932df4a0bac62544c3`
  );
  const data = await response.json();
  return data;
};
