function validarFormulario(event) {
    
    event.preventDefault();

    
    const home = document.getElementById("nome");
    const erroHome = document.getElementById("erro-nome");

    if (home.value.length < 3 || home.value.length > 120 || !/^[A-Za-zÀ-ÿ\s]+$/.test(home.value)) {
        home.setCustomValidity("O campo 'Home' deve conter apenas letras e ter entre 3 e 120 caracteres.");
        erroHome.textContent = home.validationMessage;
    } else {
        home.setCustomValidity(""); 
        erroHome.textContent = "";
    }

    
    const dataNascimento = document.getElementById("dataNascimento");
    const erroDataNascimento = document.getElementById("erro-dataNascimento");

    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regexData.test(dataNascimento.value)) {
        dataNascimento.setCustomValidity("A data de nascimento deve estar no formato DD/MM/AAAA.");
        erroDataNascimento.textContent = dataNascimento.validationMessage;
    } else {
        dataNascimento.setCustomValidity(""); 
        erroDataNascimento.textContent = "";
    }

    
    const mes = document.getElementById("mes");
    const erroMes = document.getElementById("erro-mes");

    if (mes.value < 1 || mes.value > 12) {
        mes.setCustomValidity("O valor de 'Mês' deve estar entre 1 e 12.");
        erroMes.textContent = mes.validationMessage;
    } else {
        mes.setCustomValidity(""); 
        erroMes.textContent = "";
    }

    
    if (home.checkValidity() && dataNascimento.checkValidity() && mes.checkValidity()) {
        alert("Formulário enviado com sucesso!");
        return true; 
    }

    return false; 
}
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const mes = document.getElementById('mes').value;

  
    const dados = { nome, dataNascimento, mes };

    
    const dadosSalvos = JSON.parse(localStorage.getItem('dadosFormulario')) || [];


    dadosSalvos.push(dados);

    
    localStorage.setItem('dadosFormulario', JSON.stringify(dadosSalvos));

   
    atualizarTabela();

  
    document.getElementById('formulario').reset();
});

function atualizarTabela() {
    const tbody = document.querySelector('#tabela-dados tbody');
    tbody.innerHTML = '';

    const dadosSalvos = JSON.parse(localStorage.getItem('dadosFormulario')) || [];

  
    dadosSalvos.forEach(dado => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${dado.nome}</td>
            <td>${dado.dataNascimento}</td>
            <td>${dado.mes}</td>
        `;
        tbody.appendChild(tr);
    });
}

window.onload = atualizarTabela;
