document
  .getElementById("authorization")
  .addEventListener("click", async (event) => {
    event.preventDefault();

    const form = document.querySelector('.reg');
    const formData = new FormData(form);

    var user = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    try {
      const response = await fetch("http://localhost:4444/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('fullName', data.fullName);
        sessionStorage.setItem('role', data.role);
         window.location.href = "../pages/main.html";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.");
    }
  });