import axios from "axios"

const options = {
  method: 'GET',
  url: 'https://weatherapi-com.p.rapidapi.com/current.json',
  params: {q: 'Maicao'},
  headers: {
    'X-RapidAPI-Key': '853e9628bcmsh0e1a060d869d672p1d8ff0jsne78730df0064',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}