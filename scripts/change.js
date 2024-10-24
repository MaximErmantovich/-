var carData = JSON.parse(sessionStorage.getItem('itemToChange'));

document.querySelector('input[name="name"]').value = carData.name;
document.querySelector('input[name="model"]').value = carData.model;
document.querySelector('input[name="year"]').value = carData.year;
document.querySelector('input[name="volume"]').value = carData.volume;
document.querySelector('input[name="cost"]').value = carData.cost;

document.getElementById('change').addEventListener('click', async function(event){
    event.preventDefault();

    const form = document.querySelector('.change');
    const formData = new FormData(form);
    var fileInput = document.getElementById('cover');

    var car = {
        coverUrl: carData.coverUrl, 
        name: formData.get('name'),
        model: formData.get('model'),
        year: formData.get('year'),
        volume: formData.get('volume'),
        cost: formData.get('cost'),
    };

    try {
        const response = await fetch(`http://localhost:4444/cars/change/${carData.name}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(car),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
        }
        else{
            window.location.href = '../pages/main.html';
        }
       } catch (error) {
        console.error(error);
        alert("Произошла ошибка.");
    }
})
