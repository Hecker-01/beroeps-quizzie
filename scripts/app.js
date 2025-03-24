const usernameSpan = document.getElementById("username");
const storedUser = localStorage.getItem("userName");
if (storedUser) {
  usernameSpan.textContent = storedUser;
} else {
  usernameSpan.textContent = "Guest";
}
