async function getTask() {
    let Id_User = localStorage.getItem('id');
    console.log('ID do colaborador:', Id_User);

    const response = await fetch(`http://localhost:3005/api/get/task/${Id_User}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    console.log('Response status:', response.status);
    console.log('Response:', response);

    if (!response.ok) {
        console.error(`Erro na requisição: ${response.statusText}`);
        return;
    }

    const results = await response.json();
    console.log('Resultados obtidos:', results);

    const div = document.querySelector('.doações');
    if (!div) {
        console.error('Elemento div .doações não encontrado!');
        return;
    }

    if (results.success) {
        results.data.forEach(agendamento => {
            console.log('Processando agendamento:', agendamento);

            let doacao = document.createElement('div');
            doacao.classList.add('doação');

            let cabecalho = document.createElement('div');
            cabecalho.classList.add('cabecalho');

            let img = document.createElement('img');
            img.src = '/front/img/perfil_insti.svg';
            img.classList.add('img');
            cabecalho.appendChild(img);

            async function getInstiName() { 
                console.log('Buscando nome da instituição para o ID:', agendamento.id_insti);

                const response = await fetch(`http://localhost:3005/api/get/InstiName/${agendamento.id_insti}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                console.log('Response status (nome da instituição):', response.status);
                console.log('Response (nome da instituição):', response);

                const nome = await response.json();
                console.log('Nome da instituição:', nome);

                if (nome.success) {
                    nome.data.forEach(nomeItem => {
                        console.log('Nome encontrado:', nomeItem);

                        let h4 = document.createElement('h4');
                        h4.textContent = nomeItem.nome; // Nome da instituição
                        cabecalho.appendChild(h4);
                    });

                    doacao.appendChild(cabecalho);

                    let doacao_dois = document.createElement('div');
                    doacao_dois.classList.add('doacao-dois');

                    // Formatar a data
                    let data = new Date(agendamento.data_entrega).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    });

                    let dataElement = document.createElement('p');
                    dataElement.classList.add('data');
                    dataElement.textContent = data;
                    doacao_dois.appendChild(dataElement);

                    let status = document.createElement('div');
                    status.classList.add('status');

                    let status_desc = document.createElement('p');
                    status_desc.classList.add('status_desc');
                    status_desc.textContent = 'Status';
                    status.appendChild(status_desc);

                    let status_status = document.createElement('p');
                    status_status.id = 'status_status';
                    status_status.textContent = agendamento._status;

                    // Aplicando a classe correta ao status_status
                    if (agendamento._status.trim().toLowerCase() === "agendada") {
                        status_status.classList.add('agendada');
                    } else if (agendamento._status.trim().toLowerCase() === "realizada") {
                        status_status.classList.add('realizada');
                    }

                    status.appendChild(status_status);

                    doacao_dois.appendChild(status);
                    doacao.appendChild(doacao_dois);

                    let button = document.createElement('button');
                    button.classList.add('ver-mais');
                    button.textContent = 'Ver mais';
                    button.setAttribute('data-item', agendamento.item); // Adiciona o item como data-atributo
                    button.setAttribute('data-quantidade', agendamento.qnt); // Adiciona a quantidade como data-atributo

                    doacao.appendChild(button);

                    div.appendChild(doacao);
                } else {
                    console.log('Nenhum item encontrado para esta instituição');
                }
            }

            // Chamar a função para buscar o nome da instituição
            getInstiName().catch(err => console.error('Erro ao buscar o nome da instituição:', err));
        });
    } else {
        console.error('Nenhum agendamento encontrado para este colaborador:', results.message);
    }
}

// Chama a função getTask
getTask().catch(err => console.error('Erro ao buscar as tarefas:', err));

// Adicione o evento ao botão "Ver mais"
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('ver-mais')) {
        const item = event.target.getAttribute('data-item'); // Pegue o item do atributo data-item
        const quantidade = event.target.getAttribute('data-quantidade'); // Pegue a quantidade do atributo data-quantidade

        document.getElementById('popup-item').textContent = `Item: ${item}`;
        document.getElementById('popup-quantidade').textContent = `Quantidade: ${quantidade}`;

        document.getElementById('popup').style.display = 'block';
    }
});

// Fechar o pop-up quando o botão "x" for clicado
document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});

// Fechar o pop-up quando clicar fora do conteúdo do pop-up
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('popup')) {
        document.getElementById('popup').style.display = 'none';
    }
});
