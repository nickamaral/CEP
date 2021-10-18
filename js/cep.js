document.getElementById("botao-buscacep").addEventListener("click", () => buscaCEP())
function buscaCEP() {
    const urlParaPesquisar = pegaUrlParaPesquisar()
    fetch(urlParaPesquisar).then(res => res.json())
        .then(objetoRUA => populaPagina(objetoRUA))
}

function populaPagina(listaDeResultados) {
    console.log(listaDeResultados[0])
    const primeiroResultado = listaDeResultados[0]
    document.getElementById("cep").value = primeiroResultado.cep
    document.getElementById("rua").value = primeiroResultado.logradouro
    document.getElementById("estado").value = primeiroResultado.uf
    document.getElementById("cidade").value = primeiroResultado.localidade
}

function pegaUrlParaPesquisar() {
    const rua = document.getElementById("rua").value
    const estado = document.getElementById("estado").value
    const cidade = document.getElementById("cidade").value

    return `https://viacep.com.br/ws/${estado}/${cidade}/${rua}/json/`
}

