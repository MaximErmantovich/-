function searchCars() {
  var query = document.getElementById("search").value;
  fetch(`http://localhost:4444/cars/${query}`)
    .then((response) => response.json())
    .then(function (car) {
      var cars = document.getElementById("cars");
      cars.innerHTML = "";

      if (car.name !== undefined) {
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
      } else {
        cars.innerHTML = "<h3>Автомобили не найдены</h3>";
      }
    })
    .catch((err) => console.error("Ошибка получения данных"));
}

document
  .getElementById("search")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchCars();
    }
  });
