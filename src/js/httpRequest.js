function httpRequest(url, data) {
  return fetch(url, data)
    .then(response => response.json())
    .catch(err => {
      console.log("Error: " + err);
    });
}