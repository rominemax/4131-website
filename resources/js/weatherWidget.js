
// "borrowed" from MDN's geolocation API example
function geoFindMe() {
    console.log("calling geofindme");
    const status = document.querySelector('#weatherStatus');
    
    function success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        const latitude_input = document.querySelector("#latitude-input");
        const longitude_input = document.querySelector("#longitude-input");

        longitude_input.value = longitude;
        latitude_input.value = latitude;
        console.log(`${latitude}, ${longitude}`);
        status.textContent = "";
    }
  
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  
}

WEATHER_CODES = {
0:  'Clear sky',
1:  'Mainly clear',
2:  'Partly cloudy',
3:  'Overcast',
45: 'Fog',
48: 'Depositing Rime fog',
51: 'Light Drizzle',
53: 'Moderate Drizzle',
55: 'Dense Drizzle',
57: 'Light Freezing Drizzle',
57: 'Dense Freezing Drizzle',
61: 'Slight Rain',
63: 'Moderate Rain',
65: 'Heavy Rain',
66: 'Light Freezing Rain',
67: 'Heavy Freezing Rain',
71: 'Slight Snow fall',
73: 'Moderate Snow fall',
75: 'Heavy Snow fall',
77: 'Snow grains',
80: 'Slight Rain showers',
81: 'Moderate Rain showers',
82: 'Violent Rain showers',
85: 'Slight Snow showers slight and heavy',
86: 'Heavy Snow showers slight and heavy',
95: 'Thunderstorm',
96: 'Thunderstorm with slight hail',
99: 'Thunderstorm with heavy hail',
}

async function getWeather() {
    let latitude = document.getElementById("latitude-input").value;
    let longitude = document.getElementById("longitude-input").value;

    // Error checking before making any API calls as both APIs need lat/long data to function correctly
    if(latitude == "" || longitude == ""){
      let weatherStatus = document.getElementById("weatherStatus");
      weatherStatus.innerText = "Error. Please try clicking 'Auto-Find-me!' before making a request.";
      return;
    }

    // ----- Open-meteo API -----//
    // All retrieved data used in this section belongs to https://open-meteo.com/en
    // URL for requesting from open-meteo API
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=ms&timezone=America%2FChicago`;
    let res = await fetch(url, {method: "GET"});
    if(res.ok){
      let json = await res.json();
      // Grab the pertinent data out of the returned json
      const temperature = json.current_weather.temperature;
      const weatherCode = json.current_weather.weathercode;
      // Grab the elements of the html page and update them with the temperature and correct cloud cover info
      let tempDisplay = document.getElementById("temp-display");
      let cloudCoverDisplay = document.getElementById("cloud-cover-display");
      tempDisplay.innerText = temperature + " Degrees F";
      cloudCoverDisplay.innerText = WEATHER_CODES[weatherCode];
    }
    // Handle errors if the requested weather data cannot be retrieved
    else {
      let weatherStatus = document.getElementById("weatherStatus");
      weatherStatus.innerText = `Error retrieving weather data. Response status: ${res.status}. Try clicking 'Auto-Find me!' before making another request.`;
    }
    // ----- End of Open-meteo API -----//
    

    // ----- Sunset-sunrise API -----//
    // All retrieved data used in this section belongs to https://sunrise-sunset.org/api
    // ss prefixes below stand for sunset-sunrise
    // URL for requesting from sunset-sunrise API
    const ssurl =  `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0&date=today`;
    let ssres = await fetch(ssurl, {method: "GET"});
    if(ssres.ok){
      // Extract the json from the response
      let ssjson = await ssres.json();
      if(ssjson.status == "OK"){
        // Pull the sunrise and sunset times out of the json
        const sunrise = ssjson.results.sunrise;
        const sunset = ssjson.results.sunset;
        // Convert them to locale date objects so the times are formatted nicely
        let decodedSunrise = new Date(sunrise).toLocaleTimeString();
        let decodedSunset = new Date(sunset).toLocaleTimeString();
        // Assign them to html elements
        let sunriseDisplay = document.getElementById("sunrise-display");
        let sunsetDisplay = document.getElementById("sunset-display");
        sunriseDisplay.innerText = "Sunrise: " + decodedSunrise;
        sunsetDisplay.innerText = "Sunset: " + decodedSunset;
      }
      // Error handling according to the sunset-sunrise API documentation
      else {
        let weatherStatus = document.getElementById("weatherStatus");
        if(ssjson.status == "INVALID_REQUEST"){
          weatherStatus.innerText = `Error retrieving sunrise/sunset data. Try clicking 'Auto-Find me!' before making another request.`
        }
        else {
          weatherStatus.innerText = "Unknown error. Please try again.";
        }
      }
    }
    // Handle errors if the requested sunset/sunrise data cannot be retrieved
    else {
      let weatherStatus = document.getElementById("weatherStatus");
      weatherStatus.innerText = `Error retrieving sunrise/sunset data. Response status: ${res.status}. Try clicking 'Auto-Find me!' before making another request.`;
    }
    // ----- End of Sunset-sunrise API -----//
}

document.querySelector('#find-me').addEventListener('click', geoFindMe);
document.querySelector("#get-weather-btn").addEventListener('click', getWeather);
