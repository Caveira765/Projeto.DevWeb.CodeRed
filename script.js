
document.addEventListener('DOMContentLoaded', function() {

    if (document.getElementById('banner-carrossel')) {
        iniciarCarrossel();
    }

    if (document.getElementById('faq-accordion')) {
        iniciarAccordion();
    }

    if (document.getElementById('pedido-form')) {
        iniciarValidacaoForm();
    }

});


function iniciarCarrossel() {

    let slideAtual = 0;
    const slides = document.querySelectorAll('.carrossel-slide');
    const totalSlides = slides.length;
    

    if (totalSlides === 0) return;


    slides[slideAtual].classList.add('visivel');


    const container = document.querySelector('.carrossel-container');
    const botoesDiv = document.createElement('div');
    botoesDiv.className = 'carrossel-botoes';
    botoesDiv.innerHTML = `
        <button id="carrossel-prev" aria-label="Slide anterior">&lt;</button>
        <button id="carrossel-next" aria-label="Próximo slide">&gt;</button>
        `;
    container.appendChild(botoesDiv);


    function mostrarSlide(indice) {
        slides[slideAtual].classList.remove('visivel');
        slideAtual = (indice + totalSlides) % totalSlides; 
        slides[slideAtual].classList.add('visivel');
    }

    document.getElementById('carrossel-next').addEventListener('click', function() {
        mostrarSlide(slideAtual + 1);
    });
    document.getElementById('carrossel-prev').addEventListener('click', function() {
        mostrarSlide(slideAtual - 1);
    });
}



function iniciarAccordion() {

    const perguntas = document.querySelectorAll('.faq-pergunta');

    perguntas.forEach(function(pergunta) {
        pergunta.addEventListener('click', function() {
            

            const resposta = this.nextElementSibling;
            const estaVisivel = resposta.classList.contains('visivel');

            if (estaVisivel) {
                resposta.classList.remove('visivel');
                this.setAttribute('aria-label', this.getAttribute('aria-label').replace('Fechar', 'Abrir'));
            } else {
                resposta.classList.add('visivel');
                this.setAttribute('aria-label', this.getAttribute('aria-label').replace('Abrir', 'Fechar'));
            }
        });
    });
}


function iniciarValidacaoForm() {

    const form = document.getElementById('pedido-form');
    const divMensagens = document.getElementById('form-mensagens');


    form.addEventListener('submit', function(evento) {
        evento.preventDefault();
        
        divMensagens.innerHTML = '';
        let erros = []; 

        const nome = document.getElementById('nome').value;
        if (nome.length < 3) {
            erros.push('O Nome deve ter pelo menos 3 caracteres.');
        }

        const email = document.getElementById('email').value;
        if (!email.includes('@') || !email.includes('.')) {
            erros.push('O E-mail parece ser inválido.');
        }

        const tel = document.getElementById('telefone').value;
        if (tel.length < 10) {
            erros.push('O Telefone deve incluir o DDD.');
        }

        const produto = document.getElementById('produto').value;
        if (produto === '') {
            erros.push('Você deve selecionar um produto.');
        }
        
        const termos = document.getElementById('termos').checked;
        if (!termos) {
            erros.push('Você deve aceitar os termos de serviço.');
        }

        if (erros.length > 0) {
            const ul = document.createElement('ul');
            erros.forEach(function(erro) {
                const li = document.createElement('li');
                li.textContent = erro;
                ul.appendChild(li);
            });
            divMensagens.appendChild(ul);
            divMensagens.className = 'erro'; 
        } else {
            divMensagens.textContent = 'Pedido enviado com sucesso! Entraremos em contato.';
            divMensagens.className = 'sucesso'; 
            form.reset(); 
        }
    });
}