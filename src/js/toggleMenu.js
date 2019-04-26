

function toggleMenu() {
  let menuIcon = document.getElementById("navbar-active").classList;
  let menuSelects = document.getElementById("navbar-selects").classList;
  if (menuIcon.contains("is-active")) {
    menuIcon.remove("is-active");
    menuSelects.remove("is-active");
  } else {
    menuIcon.add("is-active");
    menuSelects.add("is-active");
  }
}
