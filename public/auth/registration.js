document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registration-form");

  registrationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(registrationForm);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirm_password) {
      alert("Passwords do not match.");
      return;
    }

    // execute the POST request to create a new user
    axios({
      method: "post",
      url: "/api/user/create",
      data: data,
    })
      .then((res) => {
        if (res.status === 201) {
          alert("You have registered successfully!");
          // redirect to the login page
          window.location.href = "/auth/login";
          formData.clear();
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  });
});
