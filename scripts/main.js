function showCars() {
  fetch("http://localhost:4444/cars")
    .then((response) => response.json())
    .then(function (data) {
      var cars = document.getElementById("cars");
      cars.innerHTML = "";

      data.forEach((car) => {
        var div = document.createElement("div");
        div.setAttribute("class", "car");
        div.innerHTML = `
                    <img src="../uploads/${car.coverUrl}" alt="Фото автомобиля" width="160px height="120px">
                    <p><strong>${car.name}</strong></p>
                    <p>${car.model}</p>
                    <p>${car.year}</p>
                    <p>${car.volume} литра</p>
                    <button class="buy">${car.cost} USD</button>
                `;
        cars.appendChild(div);
      });

      const fullName = sessionStorage.getItem("fullName");

      const buttons = document.querySelectorAll(".car button.buy");
      if (!fullName) {
        buttons.forEach((button) => {
          button.dataset.originalText = button.textContent;
          button.addEventListener("mouseenter", () => {
            button.textContent = "Необходимо войти";
          });

          button.addEventListener("mouseleave", () => {
            button.textContent = button.dataset.originalText;
          });
        });
      } else {
        buttons.forEach((button) => {
          button.addEventListener("click", () => {
            window.location.href = "../pages/buy.html";
          });
        });
      }
    })
    .catch((err) => console.error("Ошибка получения данных"));
}

document.getElementById("authorisation").addEventListener("click", function () {
  window.location.href = "../pages/authorization.html";
});

showCars();
