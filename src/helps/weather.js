import axios from "axios"

const headerKey =  import.meta.env.VITE_RapidAPIKey
const headerHost = import.meta.env.VITE_RapidAPIHost


const municipios = {
  riohacha: "riohacha",
  fonseca: "fonseca",
  maicao: "maicao"
}


const convertFToC = (temp) => {
  return (temp - 32) * (5/9)
}

const getWeather = async (municipio) => {

  const currentMunicipio = municipios[municipio]

  const options = {
    method: 'GET',
    url: 'https://yahoo-weather5.p.rapidapi.com/weather',
    params: {
      location: currentMunicipio,
      format: 'json',
      u: 'f'
    },
    headers: {
      'X-RapidAPI-Key': headerKey,
      'X-RapidAPI-Host': headerHost
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response)
    return Math.ceil(convertFToC(response.data.current_observation.condition.temperature));
  } catch (error) {
    return false;
  }

}

export const getWeatherRiohacha = () => getWeather("riohacha");
export const getWeatherFonseca = () => getWeather("fonseca");
export const getWeatherMaicao = () => getWeather("maicao");


export default getWeather;