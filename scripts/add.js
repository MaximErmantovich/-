document.getElementById("add").addEventListener("click", async (event) => {
    event.preventDefault();

    const form = document.querySelector('.add');
    const formData = new FormData(form);
    var fileInput = document.getElementById('cover');

    var car = {
        coverUrl: fileInput.files.length > 0 ? fileInput.files[0].name : '', 
        name: formData.get('name'),
        model: formData.get('model'),
        year: formData.get('year'),
        volume: formData.get('volume'),
        cost: formData.get('cost'),
    };

    try {
        const response = await fetch("http://localhost:4444/cars", {
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

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const formDataFile = new FormData();
            formDataFile.append('image', file);

            const response1 = await fetch("http://localhost:4444/upload", {
                method: "POST",
                body: formDataFile,
            });

            const data1 = await response1.json();

            if (!response1.ok) {
                alert(data1.message);
            }
        }
        
        window.location.href = "../pages/main.html";

    } catch (error) {
        console.error(error);
        alert("Произошла ошибка");
    }
});
