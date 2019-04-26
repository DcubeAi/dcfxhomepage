const forexs = [
  "AUDUSD",
  "EURUSD",
  "GBPUSD",
  "NZDUSD",
  "USDCAD",
  "USDCHF",
  "USDJPY",
  "USDSEK",
];
let currentPrice = new Object();
let index = 0;

function getPrice(count) {
  let data = {
    method: "GET",
  };
  const url = "https://cors.io/?https://pacific-savannah-30447.herokuapp.com/get_price";

  httpRequest(url, data).then(jsonData => {
    console.log(jsonData);
    if (currentPrice.length <= 0) {
      currentPrice = jsonData;
    }
    buildForexUI(jsonData, count);
    currentPrice = jsonData;
  }).catch(err => { });
}

function getItemCount() {
  const itemWidth = Math.round(document.body.clientWidth * 0.9 * 0.4 / 70);
  return itemWidth > 8 ? 8 : itemWidth;
}

function buildForexUI(jsonData, count) {
  let container = document.getElementById("forex-price");
  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    let forex = forexs[index];
    let forexPrice = jsonData[forex];

    let prices = document.createElement("div");
    prices.className =
      +forexPrice > +currentPrice[forex]
        ? "forex-item up"
        : +forexPrice === +currentPrice[forex]
          ? "forex-item"
          : "forex-item down";

    let title = document.createElement("p");
    title.innerText = forex.toString();
    title.className = "title";

    let content = document.createElement("p");
    content.innerText = forexPrice.toString();
    content.className = "content";

    prices.appendChild(title);
    prices.appendChild(content);
    container.appendChild(prices);

    if (index === forexs.length - 1) {
      index = 0;
    } else {
      index++;
    }
  }
}
