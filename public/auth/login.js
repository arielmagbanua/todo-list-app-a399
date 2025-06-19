document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const loginButton = document.getElementById("login");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    // disable the login button
    loginButton.setAttribute("disabled", true);

    // execute the POST request to login the user
    axios({
      method: "post",
      url: "/api/login",
      data: data,
    })
      .then((res) => {
        // redirect to todos page
        window.location.href = "/todos";
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // handle unauthorized error
          alert(error.response.data.message);
          return;
        }

        loginButton.setAttribute("disabled", false);
        console.log(error);
      });
  });
});
