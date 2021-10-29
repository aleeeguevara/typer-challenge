var tempoInicial= $("#tempo-digitacao").text();    
var campo= $(".campo-digitacao");

$(function(){  // mesma coisa => (document).ready
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    $("#botao-reiniciar").click(reiniciaJogo);
    inicializaMarcadores();
    atualizaPlacar();

    $("#usuarios").selectize({
        create:true,
        sortField: "text",
    })

    $(".tooltip").tooltipster({
        trigger: "custom"
    });
})

function atualizaTempoInicial(tempo){
    tempoInicial= tempo;
    $("#tempo-digitacao").text(tempo);
}

function atualizaTamanhoFrase(){

    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase= $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}
 

function inicializaContadores(){
    campo.on("input", function(){
        var conteudo= campo.val();
        var qtdPalavras= conteudo.split(/\S+/).length -1;
        $("#contador-palavras").text(qtdPalavras);
    
        var qtdCaracteres= conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres)
    })
}

function inicializaCronometro (){
    campo.one("focus", function(){
        var tempoRestante= $("#tempo-digitacao").text()
        $("#botao-reiniciar").attr("disabled",true);
       var cronometroID= setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
    
            if(tempoRestante < 1){
                clearInterval(cronometroID);
                finalizaJogo();
            }
            
        },1000);
    });
}
function finalizaJogo(){
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    $("#botao-reiniciar").attr("disabled", false);   
    inserePlacar(); 
}

function inicializaMarcadores () { 

    campo.on("input", function (){
        var frase= $(".frase").text()
        var digitado = campo.val();
        var comparavel= frase.substr(0, digitado.length);
        
        if(digitado == comparavel){
            campo.addClass("campo-correto");
            campo.removeClass("campo-errado");
        }else{
            campo.addClass("campo-errado");
            campo.removeClass("campo-correto");
        }
    })
}



function reiniciaJogo(){
        campo.attr("disabled",false);
        campo.val(" ");
        $("#contador-palavras").text(0);
        $("#contador-caracteres").text(0);
        $("#tempo-digitacao").text(tempoInicial);   
        inicializaCronometro();
        campo.toggleClass("campo-desativado");
        campo.removeClass("campo-correto");
        campo.removeClass("campo-errado");
}

