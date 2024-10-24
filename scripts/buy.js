document.addEventListener('DOMContentLoaded', function() {
    const formContainer = document.querySelector('.form');
    const pickupRadio = document.getElementById('pickup');
    const courierRadio = document.getElementById('courier');

    pickupRadio.addEventListener('change', function() {
        if (this.checked) {
            formContainer.innerHTML = '';
            formContainer.innerHTML = `
            <form class="purchase">
            <select>
                <option value="pickup1">Стоянка 1</option>
                <option value="pickup2">Стоянка 2</option>
                <option value="pickup3">Стоянка 3</option>
                <option value="pickup4">Стоянка 4</option>
                <option value="pickup5">Стоянка 5</option>
                </select>
                </form>
                <button id="end">Арендовать</button>
            `;
            addButtonListener()
        }
    });

    courierRadio.addEventListener('change', function() {
        if (this.checked) {
            formContainer.innerHTML = '';
            formContainer.innerHTML = `
            <form class="purchase">
                <input type="text" name="city" placeholder="Введите город:" required>
                <input type="text" name="street" placeholder="Введите улицу:" required>
                <input type="number" name="house" placeholder="Введите номер дома:" min='1' max='400' required>
                </form>
                <button type="submit" id="end">Арендовать</button>
            `;
            addButtonListener()
        }
    });

    function addButtonListener() {
        const endButton = document.getElementById('end');
        endButton.addEventListener('click', function(event) {
            const form = formContainer.querySelector('form');
            if (form.checkValidity()) {
                alert("Спасибо за аренду автомобиля");
                window.location.href = "../pages/main.html";
            } else {
                event.preventDefault();
                alert("Пожалуйста, заполните все поля правильно.");
            }
        });
    }
});
