document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.getElementById("registration-form");

  registrationForm.addEventListener("submit", (event) => {
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
      url: "/api/user",
      data: data,
    })
      .then((res) => {
        if (res.status === 201) {
          alert("You have registered successfully!");
          registrationForm.reset();

          // redirect to the login page
          window.location.href = "/auth/login";
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  });
});
