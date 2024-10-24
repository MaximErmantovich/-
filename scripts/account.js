document.addEventListener("DOMContentLoaded", function() {
    const fullName = sessionStorage.getItem('fullName');
    if (fullName) {
        const headerRight = document.getElementById("footer__list list");
        headerRight.innerHTML = `<p>${fullName},<br>Добро пожаловать!</p>`;

        const exitButton = document.createElement('button');
        exitButton.id = 'exit';
        exitButton.className = 'but';
        exitButton.textContent = 'ВЫЙТИ';
        headerRight.appendChild(exitButton);

        document.getElementById('exit').addEventListener('click', function() {
            window.location.href = "../pages/main.html";
            sessionStorage.clear();
        });

        const role = sessionStorage.getItem('role');
        if (role === 'admin') {
            const menu = document.getElementById("menu");

            const addButton = document.createElement('button');
            addButton.id = 'add';
            addButton.className = 'but';
            addButton.textContent = 'Добавить';
            menu.appendChild(addButton);

            addButton.addEventListener('click', function(event) {
                event.preventDefault();
                window.location.href = "../pages/add.html";
            });

            const deleteButton = document.createElement('button');
            deleteButton.id = 'delete';
            deleteButton.className = 'but';
            deleteButton.textContent = 'Удалить';
            menu.appendChild(deleteButton);

            deleteButton.addEventListener('click', function(event) {
                deleteButton.disabled = true;
                event.preventDefault();
                var form = document.getElementById('menu');
                var input = document.createElement('input');
                input.type = 'text';
                input.id = 'for_delete';
                input.placeholder = 'Введите марку авто:';
                input.style.marginTop = '5px';
                form.parentNode.insertBefore(input, form.nextSibling);

                document.getElementById('for_delete').addEventListener('keypress', function(event) {
                    if (event.key === 'Enter') {
                        deleteButton.disabled = false;
                        var carName = document.getElementById("for_delete").value;

                        fetch(`http://localhost:4444/cars/${carName}`, {
                                method: 'POST'
                            })
                            .then(response => response.json())
                            .then(function(data) {
                                if (data.message) {
                                    alert(data.message);
                                } else {
                                    window.location.href = "../pages/main.html";
                                }
                            })
                            .catch(err => console.error('Ошибка при удалении авто:', err));
                    }
                });
            });

            const changeButton = document.createElement('button');
            changeButton.id = 'change';
            changeButton.className = 'but';
            changeButton.textContent = 'Изменить';
            menu.appendChild(changeButton);

            changeButton.addEventListener('click', function(event) {
              changeButton.disabled = true;
                event.preventDefault();
                var form = document.getElementById('menu');
                var input = document.createElement('input');
                input.type = 'text';
                input.id = 'for_change';
                input.placeholder = 'Изменить автомобиль:';
                input.style.marginTop = '5px';
                form.parentNode.insertBefore(input, form.nextSibling);

                document.getElementById('for_change').addEventListener('keypress', function(event) {
                    if (event.key === 'Enter') {
                      changeButton.disabled = false;
                        var carName = document.getElementById("for_change").value;

                        fetch(`http://localhost:4444/cars/${carName}`)
                            .then(response => response.json())
                            .then(function(data) {
                                if (data.message) {
                                    alert(data.message);
                                } else {
                                    sessionStorage.setItem('itemToChange', JSON.stringify(data));
                                    window.location.href = "../pages/change.html";
                                }
                            })
                            .catch(err => console.error('Ошибка при изменении авто:', err));
                    }
                });
            });

            const adminButton = document.createElement('button');
            adminButton.id = 'admin';
            adminButton.className = 'but';
            adminButton.textContent = 'Добавить админа';
            menu.appendChild(adminButton);

            adminButton.addEventListener('click', (event) => {
                event.preventDefault();
                window.location.href = "../pages/registration.html";
            })
        }
    }
});
