let new_index = 1;
let newData = [];
function getFinanceNews() {
  let data = {
    method: "GET",
  };
  const url = "https://cors.io/?https://pacific-savannah-30447.herokuapp.com/get_news?p=50";

  httpRequest(url, data).then(jsonData => {
    newData = jsonData;
    initialPageView();
    buildFinanceNewsUI();
  }).catch(err => { });
}

function togglePrevPage() {
  if (new_index > 1 && newData.length > 0) {
    new_index--;
    initialPageView();
    buildFinanceNewsUI();
  }
}

function toggleNextPage() {
  if (new_index < 5 && newData.length > 0) {
    new_index++;
    initialPageView();
    buildFinanceNewsUI();
  }
}

function toggleChangePage(pagetime) {
  if (newData.length > 0) {
    new_index = +pagetime;
    initialPageView();
    buildFinanceNewsUI();
  }
}

function initialPageView() {
  let container = document.getElementById("pageview");
  container.innerHTML = "";
  let prevControl = document.createElement("div");
  prevControl.className = new_index === 1 ? "pageview-control hidden" : "pageview-control";
  new_index !== 1 ? prevControl.setAttribute("onclick", "togglePrevPage()") : null;
  prevControl.innerHTML = `<i class="icon-chevron-left"></i>`;
  container.appendChild(prevControl);

  for (let i = 1; i < 6; i++) {
    let page = document.createElement("span");
    i !== new_index ? page.setAttribute("onclick", "toggleChangePage(" + i + ")") : null;
    page.className = i === new_index ? "hidden" : "";
    page.innerText = i;
    container.appendChild(page);
  }

  let NextControl = document.createElement("div");
  NextControl.className = new_index === 5 ? "pageview-control hidden" : "pageview-control";
  new_index !== 5 ? NextControl.setAttribute("onclick", "toggleNextPage()") : null;
  NextControl.innerHTML = `<i class="icon-chevron-right"></i>`;
  container.appendChild(NextControl);
}

function buildFinanceNewsUI() {
  let container = document.getElementById("new-lists");
  container.innerHTML = "";
  for (let i = (new_index * 10 - 10); i < new_index * 10; i++) {
    let news = newData[i];
    let newbox = document.createElement("li");

    let new_title = document.createElement("p");
    new_title.className = "title";
    new_title.innerText = news["news_content"].toString();
    newbox.appendChild(new_title);

    let new_time = document.createElement("p");
    new_time.className = "date";
    new_time.innerText = news["news_time"].toString();
    if (news.hasOwnProperty("URL")) {
      let new_more = document.createElement("a");
      new_more.innerText = "了解更多";
      new_more.href = news["URL"];
      new_more.target = "_blank";
      new_time.innerText = `${new_time.innerText} | `;
      new_time.appendChild(new_more);
    }
    newbox.appendChild(new_time);

    container.appendChild(newbox);
  }
}
