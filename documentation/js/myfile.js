const password = document.getElementById("pwd");
const toggle = document.getElementById("toggle");
function showHide() {
  if (password.type === "password") {
    password.setAttribute("type", "text");
    toggle.classList.add("hide");
  } else {
    password.setAttribute("type", "password");
    toggle.classList.remove("hide");
  }
}
