import axios from "axios"



const convertFToC = (temp) => {
  return (temp - 32) * (5/9)
}

const getWeather = async (municipio) => {

  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: {q: municipio},
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_RapidAPIKey,
      'X-RapidAPI-Host': import.meta.env.VITE_RapidAPIHost
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response)
    // return Math.ceil(convertFToC(response.data.current_observation.condition.temperature));
    return Math.ceil(response.data.current.temp_c)
  } catch (error) {
    return false;
  }

}

export const getWeatherRiohacha = () => getWeather("riohacha");
export const getWeatherFonseca = () => getWeather("fonseca");
export const getWeatherMaicao = () => getWeather("maicao");


export default getWeather;