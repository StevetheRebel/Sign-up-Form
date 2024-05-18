document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const submitBtn = document.getElementById("submit-btn");
  const confirmCtn = document.querySelector(".confirm-ctn");
  const errorCtn = document.querySelector(".error-ctn");
  const errorPlace = document.querySelector(".error-place");

  const passwordConditions = {
    char: document.querySelector("#char i"),
    cap: document.querySelector("#cap i"),
    num: document.querySelector("#num i"),
    specChar: document.querySelector("#spec-char i"),
  };

  function validatePassword(password) {
    const charCondition = password.length >= 8;
    const capCondition = /[A-Z]/.test(password);
    const numCondition = /\d/.test(password);
    const specCharCondition = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    passwordConditions.char.style.color = charCondition ? "green" : "orangered";
    passwordConditions.cap.style.color = capCondition ? "green" : "orangered";
    passwordConditions.num.style.color = numCondition ? "green" : "orangered";
    passwordConditions.specChar.style.color = specCharCondition
      ? "green"
      : "orangered";

    return charCondition && capCondition && numCondition && specCharCondition;
  }

  function validateForm() {
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phoneNo = document.getElementById("phone-no").value.trim();
    const pass1 = document.getElementById("pass1").value.trim();
    const pass2 = document.getElementById("pass2").value.trim();

    if (!firstName || !lastName || !email || !phoneNo || !pass1 || !pass2) {
      errorPlace.textContent = "All fields are required.";
      return false;
    }

    if (!validatePassword(pass1)) {
      errorPlace.textContent = "Password does not meet requirements.";
      return false;
    }

    if (pass1 !== pass2) {
      errorPlace.textContent = "Passwords do not match.";
      return false;
    }

    return true;
  }

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (validateForm()) {
      errorCtn.style.top = "-200px";
      confirmCtn.style.top = "50%";
      confirmCtn.classList.add("verified");
    } else {
      confirmCtn.style.top = "-200px";
      errorCtn.style.top = "50%";
      errorCtn.classList.add("error-msg");
    }

    // Remove animation classes after animation ends
    setTimeout(() => {
      confirmCtn.classList.remove("verified");
      errorCtn.classList.remove("error-msg");
      confirmCtn.style.top = "-200px";
      errorCtn.style.top = "-200px";
    }, 8000);
  });

  const pass1Input = document.getElementById("pass1");
  pass1Input.addEventListener("input", function () {
    validatePassword(pass1Input.value);
  });
});
