
let button = document.getElementById("handleSubmit");

localStorage.clear();

button.onclick = async function(e) {
    e.preventDefault(); 

    let nome = document.querySelector('.registro .nome').value;
    let email = document.querySelector('.registro .email').value; 
    let senha = document.querySelector('.registro .senha').value; 
    let tipo_usuario = document.querySelector('.registro .tipo_usuario').value; 
    let endereco = document.querySelector('.registro .endereco').value; 

    let data = { nome, email, senha, tipo_usuario, endereco }; 

    console.log("Dados que serão enviados:", data); 

    try {
        const response = await fetch('http://localhost:3001/api/store/user', {
            method: "POST", 
            headers: { "Content-Type": "application/json;charset=UTF-8" }, 
            body: JSON.stringify(data) 
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`); 
        }

        let content = await response.json(); 

        if (content.success) {
            console.log("Bem vindo(a)! Você foi cadastrado(a)."); 
            
            localStorage.setItem('id', content.data.insertId);
            console.log(`ID do usuário armazenado: ${content.data.insertId}`);
            console.log(`Tipo do usuário armazenado: ${content.data.tipo_usuario}`);

            window.location.href = "/front/html/login.html";

        } else {
            console.log("Erro ao cadastrar. Vefique os dados inseridos ou se você já possui uma conta."); 
        }

    } catch (error) {
        console.error("Erro ao enviar a requisição:", error); 
    }
};
