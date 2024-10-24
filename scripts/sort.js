function sortCars() {
    var sortBy = document.getElementById('choice').value; 

    fetch(`http://localhost:4444/cars/sort/${sortBy}`)

        .then(response => response.json())
        .then(function(data) {
            var cars = document.getElementById('cars');
        cars.innerHTML = ''; 

        data.forEach(car => {
            var div = document.createElement('div');
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
        })
        .catch(err => console.error('Ошибка получения данных'));
}

const but = document.getElementById('sort');

but.addEventListener('click', function(event){
    event.preventDefault();
    sortCars();
});