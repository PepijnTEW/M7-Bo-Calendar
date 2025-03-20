let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthHeader = document.getElementById("month");
const leftButton = document.getElementById("left_button");
const rightButton = document.getElementById("right_button");

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
console.log(getDaysInMonth(currentYear, currentMonth));
const headerShow = (header) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  } else if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  header.innerText = months[currentMonth] + " " + currentYear;
};

const showDays = (year, month) => {
  const daysContainer = document.getElementById("days");
  daysContainer.innerHTML = "";

  const daysInMonth = getDaysInMonth(year, month);
  let firstDay = new Date(year, month, 0).getDay();
  console.log(firstDay);

  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("empty-day");
    daysContainer.appendChild(emptyDiv);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day-cell");
    dayDiv.textContent = day;

    daysContainer.appendChild(dayDiv);
  }
};

const buttons = (direction) => {
  if (direction == "right") {
    currentMonth++;
  } else {
    currentMonth--;
    console.log("month went down");
  }
  headerShow(monthHeader);
  showDays(currentYear, currentMonth);
};

showDays(currentYear, currentMonth);
headerShow(monthHeader);
