let name = document.querySelector('.name'),
  time = document.querySelector('.time'),
  focusEntry = document.querySelector('.focus-entry'),
  greeting = document.querySelector('.greeting'),
  splash = document.querySelector('.splash'),
  nameScreen = document.querySelector('.ask-name'),
  nameInput = document.querySelector('.ask-name-input');

let currTime = new Date();

function initialUserScreen() {
  if (localStorage.getItem('name-screen') === null) {
    nameScreen.style.display = 'inline';
    // localStorage.setItem('name-screen', true);
  }
  if (localStorage.getItem('zip-screen') === null) {
    console.log('show zip screen');
  } else {
    console.log('dont show screen');
  }
}

nameInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    console.log(nameInput.value);
    localStorage.setItem('name', nameInput.value);
    setName();
    localStorage.setItem('name-screen', 'true');
    nameScreen.style.display = 'none';
  }
});

initialUserScreen();

// sets the blur in effect when opening the screen
document.addEventListener('DOMContentLoaded', async (e) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      splash.classList.add('hide');
      resolve();
    }, 100);
  });
  setTimeout(() => {
    splash.classList.add('hidden');
  }, 750);
});

setInitTime();

function setInitTime() {
  let dateStr = `${currTime.getHours() % 12 || 12}:${addZero(
    currTime.getMinutes()
  )} ${amPm(currTime.getHours())}`;
  time.textContent = dateStr;
}
function setBg() {
  let currDay = currTime.getDay();
  currDay = (currDay % 22) + 1;
  document.body.style.backgroundImage = `url('../img/UT_Background/UT_Branded_9.jpg')`;
  document.querySelector(
    '.ask-name'
  ).style.backgroundImage = `url('../img/UT_Background/UT_Branded_${currDay}.jpg')`;
}

function setBackground() {
  let currhour = currTime.getHours();
  if (currhour < 12) {
    // document.body.style.backgroundImage = "url('../img/morning.jpg')";
    greeting.textContent = 'Good Morning,';
  } else if (currhour < 18) {
    // document.body.style.backgroundImage = "url('../img/afternoon.jpg')";
    greeting.textContent = 'Good Afternoon,';
  } else {
    // document.body.style.backgroundImage = "url('../img/night.jpg')";
    greeting.textContent = 'Good Night,';
  }
}
setBackground();
setBg();

//updates the time every second
setInterval(() => {
  let dateStr = `${currTime.getHours() % 12 || 12}:${addZero(
    currTime.getMinutes()
  )} ${amPm(currTime.getHours())}`;
  time.textContent = dateStr;
  currTime = new Date();
}, 1000);

//decides if it is the am or pm
function amPm(hour) {
  if (hour >= 12) {
    return 'PM';
  }
  return 'AM';
}

//adds a zero to the second and minutes if there is only a single digit
//so instead of displaying 12:1:1, 12:01:01 is displayed
function addZero(num) {
  if (num / 10 < 1) {
    return `0${num}`;
  }
  return num;
}

// allows for the checking of if a name is already stored
// if not it updates the local storage and updates the name on
// html page accordingly
function setName() {
  if (
    localStorage.getItem('name') === 'undefined' ||
    localStorage.getItem('name') === null
  ) {
    name.textContent = '[enter name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
  name.blur();
}

function setFocus() {
  if (
    localStorage.getItem('focus') === 'undefinded' ||
    localStorage.getItem('focus') === null
  ) {
    focusEntry.textContent = 'Enter Focus';
  } else {
    focusEntry.textContent = localStorage.getItem('focus');
  }
  focusEntry.blur();
}

setName();
setFocus();

//Event listeners for both entries
name.addEventListener('blur', (e) => {
  localStorage.setItem('name', e.target.innerText);
  setName();
});
name.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    localStorage.setItem('name', e.target.innerText);
    setName();
  }
});
focusEntry.addEventListener('blur', (e) => {
  localStorage.setItem('focus', e.target.innerText);
  setFocus();
});
focusEntry.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    localStorage.setItem('focus', e.target.innerText);
    setFocus();
  }
});
