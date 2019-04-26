function getHoliday() {
  let data = {
    method: "GET",
  };
  const url = "https://cors.io/?http://114.42.217.41:8080/blog/post/holiday_post/";

  httpRequest(url, data).then(jsonData => {
    console.log(jsonData);
    buildHolidayUI(jsonData);
  }).catch(err => { });
}

function buildHolidayUI(jsonData) {
  let container = document.getElementById("holiday-lists");
  container.innerHTML = "";
  jsonData.forEach(times => {
    let holidaybox = document.createElement("li");

    let country = document.createElement("span");
    country.innerText = times["country"].toString();
    country.className = specialLocalTime.indexOf(times["country"]) > -1 ? "special" : "";
    holidaybox.appendChild(country);

    let vacation = document.createElement("span");
    vacation.innerText = times["vacation"].toString();
    holidaybox.appendChild(vacation);

    let date = document.createElement("span");
    date.innerText = times["vacation_date"].toString();
    holidaybox.appendChild(date);

    let comment = document.createElement("span");
    comment.innerText = times["vacation_comment"].toString();
    holidaybox.appendChild(comment);

    container.appendChild(holidaybox);
  })
}
