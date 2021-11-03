const selectEstado = document.getElementById("estado")
const urlEstados = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
fetch(urlEstados).then(res => res.json())
    .then(listaDeEstados => populaSelectDeEstadosBrasileiros(listaDeEstados))
document.getElementById("botao-buscacep").addEventListener("click", () => buscaCEP())
function buscaCEP() {
    const urlParaPesquisar = pegaUrlParaPesquisar()
    fetch(urlParaPesquisar).then(res => res.json())
        .then(listaDeResultados => populaCepComA(listaDeResultados))
}

function populaCepComA(listaDeResultados) {
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

function populaSelectDeEstadosBrasileiros(listaDeEstados) {
    for (const estado of listaDeEstados) {
        populaSelectComO(estado) 
    }
}

function populaSelectComO(estado) {
    const option = document.createElement("option");
   option.value= estado.sigla;
   option.label= estado.nome;
   // then append it to the select element
   selectEstado.appendChild(option);
}