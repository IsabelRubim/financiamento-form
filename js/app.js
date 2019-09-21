const form = document.querySelector('.add');
const container = document.querySelector('.container');
const detail = document.querySelector('.detail');
const inputs = document.querySelectorAll('.add__value');
const btn = document.querySelector('.btn-form');

// Realiza a simulação
btn.addEventListener('click', event => {
    event.preventDefault();

    const valorFinanciamento = form.valorFinanciamento.value.trim();
    const valorImovel = form.valorImovel.value.trim();
    const valorPrazo = form.valorPrazo.value.trim();

    inputs.forEach(input => {
        if (input.value === '') 
            container.classList.add('add__value--validate-error');
    });

    const formError = document.querySelector('.add__value--validate-error');

    // Se o usuário não preencher nenhum campo, irá ocorrer animação de "não" em todo container
    if (formError) {
        formError.addEventListener('animationend', e => {
            if (e.animationName === 'nono') {
                container.classList.remove('add__value--validate-error'); 
            } 
        });       
    } else if (!isNaN(valorPrazo)) {
        clearDetail();
        generateTable(valorFinanciamento, valorImovel, valorPrazo);
        form.reset();
    } 
});

// Formata valores ao digitar no form
form.valorFinanciamento.addEventListener('keyup', function() {
    const regExp = parseInt(this.value.replace(/\D/g,''), 10);
    form.valorFinanciamento.value = ' R$ ' + regExp.toLocaleString();
}, false);

form.valorImovel.addEventListener('keyup', function() {
    const regExp = parseInt(this.value.replace(/\D/g,''), 10);
    form.valorImovel.value = ' R$ ' + regExp.toLocaleString();
}, false);


// Gera a tabela
function generateTable(financiamento, imovel, prazo, taxa = 0.85) {
  
    const html = `
    <div class="review">
        <div class="review-table">
            <div class="review-table__rating">
                <h1 class="review-table__title">Valor da primeira parcela:</h1>
                <p class="review-table__amount">R$ ${((parseFloat((financiamento.replace('R$', '')) || 0)) / (prazo)).toLocaleString('pt-BR')}</p>
            </div>
            <fieldset class="review-table__rating">
                <legend class="review-table__title">Taxa de juros</legend>
                <p class="review-table__amount">R$ ${(parseFloat((imovel.replace('R$', '')) || 0) * (taxa)).toLocaleString('pt-BR')}</p>
            </fieldset>
            <fieldset class="review-table__rating">
                <legend class="review-table__title">Meses</legend>
                <p class="review-table__amount">${prazo} meses</p>
            </fieldset>
        </div>
    </div>
    <img src="img/illustration-main.svg" alt="Illustration 1" class="illustration">
    `;
  
    detail.insertAdjacentHTML('afterbegin', html);
}

// Limpa a interface
function clearDetail() {
    detail.innerHTML = '';
}