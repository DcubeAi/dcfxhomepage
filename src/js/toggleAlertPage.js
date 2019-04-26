function toggleAlertPage(obj) {
  let createModule = obj.classList;
  if (createModule.contains("alert_open")) {
    createModule.remove("alert_open");
  } else {
    createModule.add("alert_open");
  }
}