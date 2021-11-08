const urlCidades = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/{municipio}/municipios"
const selectEstado = document.getElementById("estado")
const selectCidade = document.getElementById("cidade")
const urlEstados = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
fetch(urlEstados).then(res => res.json())
    .then(listaDeEstados => populaSelectDeEstadosBrasileiros(listaDeEstados))
document.getElementById("botao-buscacep").addEventListener("click", () => buscaCEP())
const listadeEstadosIds = []
document.getElementById("estado").addEventListener("blur", () => buscaCicadeDoEstadoSelecionado())
function buscaCicadeDoEstadoSelecionado() {
    const estado = document.getElementById("estado").value
    const estadoSelecionado = listadeEstadosIds.find(e => e.sigla== estado)
    buscaCidadesDo(estadoSelecionado) 
}
function buscaCidadesDo(estadoSelecionado) {
    const url = urlCidades.replace("{municipio}",estadoSelecionado.id) 
    fetch(url).then(res => res.json())
    .then(listaDeCidades => populaSelectDeCidadesBrasileiras(listaDeCidades))
}
function populaSelectDeCidadesBrasileiras(listaDeCidades) {
    for (const cidade of listaDeCidades) {
        populaSelectComA(cidade) 
    }
    
}
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
    const estadoId= {id: estado.id,sigla:estado.sigla}
    listadeEstadosIds.push(estadoId)
   selectEstado.appendChild(option);
}


function populaSelectComA(cidade) {
    const option = document.createElement("option");
    option.value= cidade.nome;
    option.label= cidade.nome;
   selectCidade.appendChild(option);
}