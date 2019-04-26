function toggleRegister() {
  let body = document.body.classList;
  if (body.contains("registerMode")) {
    body.remove("registerMode");
  } else {
    body.add("registerMode");
  }
}