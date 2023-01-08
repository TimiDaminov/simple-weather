import { API_KEY } from ".env";

export const getData = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  );
  const data = await response.json();
  return data;
};
