const inputField = document.getElementById('weather-input');
const temp = document.querySelector('.weather-display .temp');
const weatherDisplay = document.querySelector('.weather-display');
const tempNum = document.getElementById('temp-num');
const city = document.querySelector('.city');
const weatherIcon = document.getElementById('weather-icon');
const weatherSetting = document.querySelector('.weather-settings');
const weatherClick = document.querySelector('.weather-click');
const metricCheck = document.querySelector('.metric-check input');
const zipChange = document.querySelector('.zip-change button');

const api = {
  key: 'b7870c0e00af39df8510f2c9512861cc',
  base: 'https://api.openweathermap.org/data/2.5/',
};

//TODO better error handeling
// makes the fetch request to the openweathermap api
async function getWeather(query) {
  let weatherData = {};
  await fetch(
    `${api.base}weather?zip=${query},us&units=imperial&APPID=${api.key}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      weatherData.temp = data.main.temp;
      weatherData.cityName = data.name;
      weatherData.iconId = data.weather[0].icon;
    })
    .catch((err) => {
      console.log(err);
      // handle error here better
      localStorage.removeItem('zip');
      inputField.classList.remove('hidden');
      weatherDisplay.classList.add('hidden');
      inputField.value = '';
      displayTempError();
    });
  return weatherData;
}

//TODO better checking of the zip codes.
function validZip(zip) {
  return zip.length === 5 && /^\d{5}(-\d{4})?$/.test(zip);
}

async function setZip() {
  let zipCode = localStorage.getItem('zip');
  weatherSetting.classList.add('hidden');
  if (zipCode === 'undefined' || zipCode === null) {
    console.log('zip code is NOT found');
  } else {
    inputField.classList.add('hidden');
    weatherDisplay.classList.remove('hidden');
    let weatherData = await getWeather(zipCode);
    tempNum.textContent = metricConvert(weatherData.temp);
    city.textContent = weatherData.cityName;
    weatherIcon.src = `./img/icons/${weatherData.iconId}.png`;
  }
}

function metricConvert(num) {
  let unit = document.querySelector('#farenheit');
  if (localStorage.getItem('metricCheck') === 'true') {
    unit.innerHTML = '&#8451;';
    metricCheck.checked = true;
    return Math.round(((num - 32) * 5) / 9);
  } else {
    unit.innerHTML = '&#8457;';
    return Math.round(num);
  }
}

zipChange.addEventListener('click', (e) => {
  localStorage.removeItem('zip');
  weatherSetting.classList.add('hidden');
  weatherDisplay.classList.add('hidden');
  inputField.classList.remove('hidden');
});

inputField.addEventListener('blur', (e) => {
  let val = inputField.value;
  if (validZip(val)) {
    localStorage.setItem('zip', val);
    setZip();
  }
  // style decision to not have an error show if invalid blur occurs
  // uncomment code if there is ever a reason to change back
  // } else {
  //   //not valid zip
  //   displayTempError();
  // }
});

inputField.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    let val = inputField.value;
    if (validZip(val)) {
      localStorage.setItem('zip', val);
      setZip();
      blur();
    } else {
      // not valid zip display
      displayTempError();
    }
  }
});

weatherDisplay.addEventListener('click', (e) => {
  if (weatherSetting.classList.contains('hidden')) {
    weatherSetting.classList.remove('hidden');
  } else {
    weatherSetting.classList.add('hidden');
  }
});

metricCheck.addEventListener('click', () => {
  if (localStorage.getItem('metricCheck') === null) {
    console.log('here');
    localStorage.setItem('metricCheck', 'true');
  }
  if (metricCheck.checked) {
    localStorage.setItem('metricCheck', 'true');
  } else {
    localStorage.setItem('metricCheck', 'false');
  }
  setZip();
});

// function displays an invalid zip error message for 3 seconds
function displayTempError() {
  const invalidZip = document.querySelector('.invalid-zip');
  // invalidZip.style.display = 'block';
  invalidZip.classList.remove('hidden');
  setTimeout(() => {
    invalidZip.classList.remove('visuallyhidden');
  }, 100);
  setTimeout(() => {
    invalidZip.classList.add('visuallyhidden');
    invalidZip.addEventListener(
      'transitioned',
      (e) => {
        invalidZip.classList.add('hidden');
      },
      {
        capture: false,
        once: true,
        passive: false,
      }
    );
    invalidZip.classList.add('hidden');
  }, 2100);
}
setZip();
setInterval(setZip, 600000);
