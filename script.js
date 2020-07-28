////// weather API //////////

let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?"

let weatherApiKey = "&appid=cfa9c72a50ad00413e0a4bc26cbfecaa"

let imperialUnits = "&units=imperial"


// display weather API results 
function displayWeatherResults (responseJson) {
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
 return "zip=" + zipCode; 
};

// calls weather API
function getWeather () {
 $('.js-weather-error').empty();
  let location = watchZip();


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
      $('.js-weather-error').text(`Something went wrong: ${err.message}`);
    })
};

// watches weather form for submit
function watchWeatherForm() {
  $('#findWeather').submit(event => {
 
    event.preventDefault();
    getWeather();
    
  });
}


///////// moon phase API //////

// corresponding moon phase image
function showMoonPhoto (responseJson) {
  if (responseJson.moon_phase.value === 'new') {
    $('#js-moon-image').append(`<img src="images/newMoon.png" alt="New moon image">`);

  } else if (responseJson.moon_phase.value === "waxing_crescent") {
    $('#js-moon-image').append(`<img src="images/waxingCrescent.png" alt="waxing crescent moon image">`);

  } else if (responseJson.moon_phase.value === "first_quarter") { 
    $('#js-moon-image').append(`<img src="images/firstQuarter.png" alt="first quarter moon image">`);

  } else if (responseJson.moon_phase.value === "waxing_gibbous") { 
    $('#js-moon-image').append(`<img src="images/waxingGibbous.png" alt="waxing gibbous moon image">`);

  } else if (responseJson.moon_phase.value === "full") { 
    $('#js-moon-image').append(`<img src="images/fullMoon.png" alt="full moon image">`);

  } else if (responseJson.moon_phase.value === "waning_gibbous") { 
    $('#js-moon-image').append(`<img src="images/waningGibbous.png" alt="waning gibbous moon image">`);

  } else if (responseJson.moon_phase.value === "last_quarter") { 
    $('#js-moon-image').append(`<img src="images/lastQuarter.png" alt="last quarter moon image">`);

  } else if (responseJson.moon_phase.value === "waning_crescent") { 
    $('#js-moon-image').append(`<img src="images/waningCrescent.png" alt="waning crescent moon image">`);
  }
}

// displays results of API call
function displayMoon(responseJson) {
  
  $('#js-results-here').empty();

  $('#js-results-here').append(
    `<p>${responseJson.moon_phase.value}</p>`)
  
  $('#js-results-moon').removeClass('hidden');
  showMoonPhoto(responseJson);
};


// calls moon phase API
function getMoonPhase () {
$('#js-moon-image').empty();
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
      $('#js-moon-error').text(`Something went wrong, please try again ${err.message}`);
    })
};

// initializes when moon phase button is pressed
function watchMoonForm() {
  $('#moon').submit(event => {
 
    event.preventDefault();

    getMoonPhase();
  });
}

//////////////// horoscope API ////////////

const URL = 'https://aztro.sameerkumar.website/?sign='
let signSelected = "";


// displays JSON response & corresponding image in the DOM
function displayResults(responseJson) {
 
  $('#js-horoscope-results').empty();

  if (responseJson.date_range === 'Mar 21 - Apr 20') {
    $('#js-horoscope-results').append(`<img src="starSigns/aries.png" alt="Aries symbol" class="starSign">`);

  } else if (responseJson.date_range === "Apr 21 - May 20") {
    $('#js-horoscope-results').append(`<img src="starSigns/taurus.png" alt="Taurus symbol" class="starSign">`);

  } else if (responseJson.date_range === "May 21 - Jun 21") { 
    $('#js-horoscope-results').append(`<img src="starSigns/gemini.png" alt="Gemini symbol" class="starSign">`);

  } else if (responseJson.date_range === "Jun 22 - Jul 22") { 
    $('#js-horoscope-results').append(`<img src="starSigns/cancer.png" alt="Cancer symbol" class="starSign">`);

  } else if (responseJson.date_range=== "Jul 23 - Aug 22") { 
    $('#js-horoscope-results').append(`<img src="starSigns/leo.png" alt="Leo symbol" class="starSign">`);

  } else if (responseJson.date_range === "Aug 23 - Sep 22") { 
    $('#js-horoscope-results').append(`<img src="starSigns/virgo.png" alt="Virgo symbol" class="starSign">`);

  } else if (responseJson.date_range === "Sep 23 - Oct 22") { 
    $('#js-horoscope-results').append(`<img src="starSigns/libra.png" alt="Libra symbol" class="starSign">`);

  } else if (responseJson.date_range === "Oct 23 - Nov 22") { 
    $('#js-horoscope-results').append(`<img src="starSigns/scorpio.png" alt="Scorpio symbol" class="starSign">`);

  } else if (responseJson.date_range === "Nov 23 - Dec 21") { 
    $('#js-horoscope-results').append(`<img src="starSigns/sagittarius.png" alt="Sagittarius symbol" class="starSign">`);

  } else if (responseJson.date_range === "Dec 22 - Jan 19") { 
    $('#js-horoscope-results').append(`<img src="starSigns/capricorn.png" alt="capricorn symbol" class="starSign">`);

  } else if (responseJson.date_range === "Jan 20 - Feb 18") { 
    $('#js-horoscope-results').append(`<img src="starSigns/aquarius.png" alt="Aquarius symbol" class="starSign">`);

  } else if (responseJson.date_range === "Feb 19 - Mar 20") { 
    $('#js-horoscope-results').append(`<img src="starSigns/pisces.png" alt="Pisces symbol" class="starSign">`); 
  }


  $('#js-horoscope-results').append(
    `<p>${responseJson.description}</p>`)
  
  $('#js-results').removeClass('hidden');
  
};

// makes a call to the horoscope API
function getHoroscope () {
 $('#js-horoscope-error').empty();

 let apiCall = URL + signSelected + "&day=today";


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
      $('#js-horoscope-error').text(`Something went wrong, please try  again ${err.message}`);
    });

};

// triggers when form is submitted
function watchForm() {
  $('#js-choose-sign').submit(event => {

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




