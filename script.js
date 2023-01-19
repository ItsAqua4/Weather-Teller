//TODO LIST:
//1: MAKE A FORCAST CARD (FOR HOW MUCH DAYS I CHOOSE)

//VARIABLES
const apiKey = "4641c1f91e969c85d09295d07fa96d12"
const cityInputHTML = document.querySelector(".search-bar")
const cityHTML = document.querySelector(".city")
const dateHTML = document.querySelector(".date")
const tmepCHTML = document.querySelector(".c")
const tempFHTML = document.querySelector(".f")
const imgHTML = document.querySelector(".weather-icon")
const statusHTML = document.querySelector(".status")
const humiditHTML = document.querySelector(".humidity")
const minTempHTML = document.querySelector(".min-temp")
const maxTempHTML = document.querySelector(".max-temp")
const windSpeedHTML = document.querySelector(".wind-speed")

const modal = document.querySelector(".error-modal")
const modalText = document.querySelector(".error-text")

let data;
let weatherData = {
  city: "",
  CTemp: 0,
  FTemp: 0,
  mainStatus: "",
  status: "",
  weatherSRC: "",
  humidity: 0,
  minTemp: 0,
  maxTemp: 0,
  windSpeed: 0
}

//API GET REQUEST FUNCTION
const fecthWeather =  async function () {
  try {
    let response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + weatherData.city +"&appid=" + apiKey + "&units=metric")
    let dataNow = await response.json()
    if (!response.ok) {
      if(dataNow.cod && dataNow.cod !== 200){
        throw new Error(dataNow.message)
      }
    } else {
      return dataNow
    }
  } catch (error) {
    ModalPopUp(error)
  }
}

//PRESS ENTER KEY
cityInputHTML.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    CityVerefication()
  }
});

//CITY VEREFICATION
function CityVerefication() {
  ModalDis()

  weatherData.city = cityInputHTML.value

  if (weatherData.city.includes(" ")) {
    weatherData.city = weatherData.city.replace(" ", "-")
  }

  WriteData()
}

//ASSIGN DATA FROM FILE TO VARIABLES
function WriteData() {
  fecthWeather().then(res => {
    data = res;
    weatherData.CTemp = data.main.temp
    weatherData.FTemp = (data.main.temp * 9/5) + 32
    weatherData.mainStatus = data.weather[0].description
    weatherData.status = data.weather[0].main
    weatherData.weatherSRC = GetSRC()
    weatherData.humidity = data.main.humidity
    weatherData.minTemp = data.main.temp_min
    weatherData.maxTemp = data.main.temp_max
    weatherData.windSpeed = data.wind.speed

    SetData()
  })
}

//DECIDE WHICH IMAGE SHOULD BE SHOWN
function GetSRC() {
  switch (weatherData.status) {
    case "Thunderstorm":
      return "https://cdn-icons-png.flaticon.com/512/1163/1163659.png"
      break;
    case "Drizzle":
      return "https://cdn-icons-png.flaticon.com/512/1163/1163657.png"
      break;
    case "Rain":
      return "https://cdn-icons-png.flaticon.com/512/1163/1163657.png"
      break;
    case "Snow":
      return "https://cdn-icons-png.flaticon.com/512/1163/1163654.png"
      break;
    case "Clear":
      return "https://cdn-icons-png.flaticon.com/512/1163/1163662.png"
      break;
    case "Clouds":
      return "https://cdn-icons-png.flaticon.com/512/1163/1163634.png"
      break;
    default :
      return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"
      break;
  }
}

//WRITE DATA TO HTML
function SetData() {
  cityHTML.innerHTML = weatherData.city
  dateHTML.innerHTML = GetDate()
  tmepCHTML.innerHTML = Math.round(weatherData.CTemp) + "°C"
  tempFHTML.innerHTML = Math.round(weatherData.FTemp) + "°F"
  imgHTML.src = weatherData.weatherSRC
  statusHTML.innerHTML = weatherData.status
  humiditHTML.innerHTML = "Humidity: " + weatherData.humidity
  minTempHTML.innerHTML = "Min tempature: " + weatherData.minTemp
  maxTempHTML.innerHTML = "Max tempature: " + weatherData.maxTemp
  windSpeedHTML.innerHTML = "Wind speed: " + weatherData.windSpeed
}

//GET THE DATE
function GetDate() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return day + "/" + month + "/" + year
}

//POP UP MODAL FUNCTION
function ModalPopUp(error) {
  modalText.innerHTML = error
  modal.style.display = "block"
}

//MAKE MODAL DISAPEAR
function ModalDis() {
  modal.style.display = "none"
}

//DEFAULT DATA SHOWN
weatherData.city = "London"
WriteData()
