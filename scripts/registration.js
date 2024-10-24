document
  .getElementById("registration")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    const fullName = sessionStorage.getItem('fullName');
    var newrole;
    if(fullName){
      newrole = 'admin';
    }
    else{
      newrole = 'user';
    }

    const form = document.querySelector('.reg');
    const formData = new FormData(form);

    var user = {
        fullName: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        role: newrole,
    }

    try {
      const response = await fetch("http://localhost:4444/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok && !fullName) {
        sessionStorage.setItem('fullName', data.fullName);
        sessionStorage.setItem('role', data.role);
        window.location.href = "../pages/main.html";
      } else if(fullName){
        window.location.href = "../pages/main.html";
      }else{
        alert(data.message);
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.");
    }
  });