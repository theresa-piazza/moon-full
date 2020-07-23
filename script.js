////// weather API //////////

let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?"

let weatherApiKey = "&appid=cfa9c72a50ad00413e0a4bc26cbfecaa"

let imperialUnits = "&units=imperial"


// display weather API results 
function displayWeatherResults (responseJson) {
console.log(responseJson)
$('#js-results-weather').empty();

  $('#js-results-weather').append(
    `<p>general weather: ${responseJson.weather[0].description}</p>
    <p>temperature: ${responseJson.main.temp}°</p>
    <p>but it feels like... ${responseJson.main.feels_like}°</p>
    <p>humidity: ${responseJson.main.humidity}%</p>`)

  $('#js-results-weather').removeClass('hidden');
};

// gets value of zip code 
function watchZip () {
 let zipCode = $('#zip').val();
 console.log(zipCode)
 return "zip=" + zipCode; 
};

// calls weather API
function getWeather () {
  let location = watchZip();
  console.log(weatherUrl + location + imperialUnits + weatherApiKey)

  fetch (weatherUrl + location + imperialUnits + weatherApiKey, {
    "method": "GET",
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error (response.statusText);
    })
    .then(responseJson => displayWeatherResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    })
};

// watches weather form for submit
function watchWeatherForm() {
  $('#findWeather').submit(event => {
    console.log("weather submit happened")
    event.preventDefault();
    getWeather();
    
  });
}


///////// moon phase API //////

// displays results of API call
function displayMoon(responseJson) {
  console.log(responseJson);
  $('#js-results-here').empty();

  $('#js-results-here').append(
    `<p>${responseJson.moon_phase.value}</p>`)

  $('#js-results-moon').removeClass('hidden');
};


// calls moon phase API
function getMoonPhase () {
let getUrl ="https://api.climacell.co/v3/weather/realtime?lat=40.7128&lon=74.006&location_id=NewYorkCity&unit_system=si&fields=moon_phase%2Cprecipitation%3Ain%2Fhr%2Cweather_code&apikey=kKYoyzY7NOkWaJinZ1XrieAKObnY8TWP"

  fetch(getUrl, {
	 "method": "GET",
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayMoon(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    })
};

// initializes when moon phase button is pressed
function watchMoonForm() {
  $('#moon').submit(event => {
    console.log("moon submit happened")
    event.preventDefault();

    getMoonPhase();
  });
}

//////////////// horoscope API /////////

const URL = 'https://aztro.sameerkumar.website/?sign='
let signSelected = "";


// displays JSON response in the DOM
function displayResults(responseJson) {
  console.log(responseJson);
  $('#js-results-list').empty();

  $('#js-results-list').append(
    `<li><p>${responseJson.description}</p></li>`)

  $('#js-results').removeClass('hidden');
};

// makes a call to the horoscope API
function getHoroscope () {
 console.log(signSelected); 
 let apiCall = URL + signSelected + "&day=today";
 console.log(apiCall);

  fetch(apiCall, {
    method: 'POST'
})
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
};

// triggers when form is submitted
function watchForm() {
  $('#js-choose-sign').submit(event => {
    console.log("horoscope submit happened")
    event.preventDefault();

    getHoroscope();
  });
}

// grabs the id info from the selected button
function watchSign(){
  $( '.sign' ).on( 'click', event => {
    signSelected = $( event.currentTarget ).attr( 'id' );
  });
}

// initializes when page is loaded 
$(watchSign);
$(watchForm);
$(watchMoonForm);
$(watchWeatherForm);
$(watchZip);


console.log('App loaded! Waiting for submit!');
