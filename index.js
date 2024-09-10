const apiUrl = 'https://api.coinlore.net/api/tickers/';
let cryptoData = [];
let currentIndex = 0;

// Função para buscar dados da API
async function fetchCryptoData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();
        cryptoData = data.data.slice(0, 10); // Pega os primeiros 10 itens
        displayCryptoData(currentIndex); // Exibe o primeiro item
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

// Função para exibir um único item de criptomoeda
function displayCryptoData(index) {
    const cryptoDisplay = document.getElementById('crypto-display');
    const crypto = cryptoData[index];

    if (crypto) {
        cryptoDisplay.innerHTML = `
            <h3>${crypto.name} (${crypto.symbol})</h3>
            <p>Preço: $${crypto.price_usd}</p>
            <p>Capitalização de mercado: $${crypto.market_cap_usd.toLocaleString()}</p>
            <p>Volume nas últimas 24h: $${crypto.volume24.toLocaleString()}</p>
        `;

        // Adiciona animação dependendo da direção da navegação
        cryptoDisplay.classList.remove('slide-in-left', 'slide-in-right');
        setTimeout(() => {
            if (index > currentIndex) {
                cryptoDisplay.classList.add('slide-in-left');
            } else {
                cryptoDisplay.classList.add('slide-in-right');
            }
        }, 10);
    }
}

// Função para mudar para o próximo item
function nextCrypto() {
    currentIndex = (currentIndex + 1) % cryptoData.length; // Vai para o próximo ou volta ao início
    displayCryptoData(currentIndex);
}

// Função para voltar ao item anterior
function prevCrypto() {
    currentIndex = (currentIndex - 1 + cryptoData.length) % cryptoData.length; // Vai para o anterior ou para o último
    displayCryptoData(currentIndex);
}

// Event listeners para as setas
document.getElementById('next-crypto').addEventListener('click', nextCrypto);
document.getElementById('prev-crypto').addEventListener('click', prevCrypto);

// Carrega os dados quando a página é carregada
document.addEventListener('DOMContentLoaded', fetchCryptoData);

