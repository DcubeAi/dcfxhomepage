let specialLocalTime = ["澳洲", "加拿大", "法國", "德國", "紐西蘭", "英國", "美國"]
function getStockMarketTime() {
  let data = {
    method: "GET",
  };
  const url = "https://cors.io/?https://pacific-savannah-30447.herokuapp.com/get_trading_hours?lang=zh-tw";

  httpRequest(url, data).then(jsonData => {
    console.log(jsonData);
    buildStockMarketTimeUI(jsonData);
  }).catch(err => { });
}

function buildStockMarketTimeUI(jsonData) {
  let container = document.getElementById("stock-lists");
  container.innerHTML = "";

  jsonData.forEach(times => {
    let timebox = document.createElement("li");

    let country = document.createElement("span");
    country.innerText = times["country"].toString();
    country.className = specialLocalTime.indexOf(times["country"]) > -1 ? "special" : "";
    timebox.appendChild(country);

    let stock = document.createElement("span");
    stock.innerText = times["name"].toString();
    timebox.appendChild(stock);

    let current_time = document.createElement("span");
    current_time.innerText = times["country_time"].toString().replace(/,/g, "");
    timebox.appendChild(current_time);

    let local_time = document.createElement("span");
    local_time.innerText = times["local_time"].toString().replace(/,/g, "");
    timebox.appendChild(local_time);

    container.appendChild(timebox);
  })
}
