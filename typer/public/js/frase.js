$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria(){
    $("#spinner").toggle();
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(() => {
            $("#erro").toggle();
            
        }, 1500);
    }).
    always(()=>{
        $("#spinner").toggle();
    })
}



function trocaFraseAleatoria (data){
    var frase = $(".frase");
    var numeroAleatorio= Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizaTempoInicial(data[numeroAleatorio].tempo);
    atualizaTamanhoFrase();
}

function buscaFrase(){
    $("#spinner").toggle();
    var fraseId= $("#frase-id").val();
    var dados= { id:fraseId}
    
    $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(() => {
           $("#erro").toggle(); 
        }, 1500);
    }).
    always(()=>{
        $("#spinner").toggle();
    })
}

function trocaFrase(data){
    $(".frase").text(data.texto);
    atualizaTempoInicial(data.tempo);
    atualizaTamanhoFrase();
}

