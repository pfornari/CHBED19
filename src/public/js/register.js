const form = document.getElementById("registerForm")


form.addEventListener("submit", e => {
    e.preventDefault();

    const data = new FormData(form)
    const obj = {}

    data.forEach((value, key) => (obj[key] = value));

    fetch("/api/jwt/register", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((result) => {
      if (result.status === 201) {
        alert("Usuario registrado correctamente")
        return window.location.replace("/");
      }
      alert("El usuario ya existe")
    }).catch((error) => {
      alert("El usuario ya existe")
        console.log(error)
    })
})