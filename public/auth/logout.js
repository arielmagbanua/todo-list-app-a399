document.addEventListener("DOMContentLoaded", function () {
  // get the logout button
  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", function (event) {
    event.preventDefault();

    axios({
      method: "post",
      url: "/api/logout",
    })
      .then((res) => {
        // redirect to todos page
        window.location.href = "/auth/login";
      })
      .catch((error) => {
        if (error.response) {
          // handle unauthorized error
          alert(error.response.data.message);
          return;
        }

        console.log(error);
      });
  });
});
