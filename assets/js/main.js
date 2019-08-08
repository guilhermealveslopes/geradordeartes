/////////////////////// ESCOPO GLOBALQueimador Infravermelho a Gás 

var node = document.getElementById('newProject');
var share = document.getElementById('share');
var btnContinue = document.getElementById('btnContinue');
var btnDownload = document.getElementById('btnDownload');
var editedObj;
var adressNumber;
var backgroundCount = 0;



function goEditable(){
    $('p').attr('contenteditable', true);
}

function exportCanvasAsPNG(id, fileName) {

    var canvasElement = document.getElementById(id);

    var MIME_TYPE = "image/jpeg";

    var imgURL = canvasElement.toDataURL(MIME_TYPE);

    var dlLink = document.createElement('a');
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}

var char = 5;
var prevCharacterCount = 0;

$(document).on('keypress', 'p', function(e){
    var maxChar = Number($(this).attr('max-char'));

    if(char >= maxChar){
        e.preventDefault();
    }

})

$(document).on('keyup', 'p', function(e){
    char = $(this).html().length;
    var maxChar = Number($(this).attr('max-char'));
    var defaultSize = Number($(this).attr('font-size'));
    var defaultLength = Number($(this).attr('default-length'));
    var startOn = 14;
    var minFontSize = 16;

    if($(this).attr('minFontSize')){
        var minFontSize = $(this).attr('minFontSize');
    }
   
    if($(this).attr('startOn')){
        var startOn = $(this).attr('startOn');
    }

    var maxChar = Number($(this).attr('max-char'));
    var fontSize = Number($(this).css('font-size').replace('px',''));

    console.log('Prev:' + prevCharacterCount);
    console.log('char:' + char);
     if(char > prevCharacterCount){
        console.log('maior');
        if(char <= maxChar && char >= startOn && fontSize >= minFontSize){
            $(this).css('font-size', fontSize - 1.4 );
        }
    }
    else if(char <= prevCharacterCount && char < maxChar){
        if(fontSize <= defaultSize){
            $(this).css('font-size', fontSize + 1.4 );
        }
    }
    
    else if(char === 1){
        $(this).css('font-size', defaultSize );
    }
    else if(char >= maxChar){
        e.preventDefault();
    }

    console.log('CHAR:' + char);
    console.log('SIZE:' + fontSize);

    prevCharacterCount = char;


})



$(document).on('keydown', 'p', function(e){
    
    if(char == 0){
        $(this).addClass('ghost');
    }
    else{
        $(this).removeClass('ghost');
    }
    
})

btnContinue.onclick = function() {
    $('#share').html('');
    html2canvas(node, {
       scale:1.7
      }).then(function(canvas) {
        canvas.id = 'canvas';
        share.append(canvas);
        $("label[for='Three']").click();
        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/jpeg");
        a.id = 'shareImg';
        a.download = 'myfile.png';
        share.append(a);
      });
}

btnDownload.onclick = function() {
    var download = document.getElementById('shareImg');

    exportCanvasAsPNG('canvas', 'arte');
    window.location.href = window.location.href
}



$('.models .item').on('click', function(){
    var model = slugify($(this).html());
    $('.toolbar ul li').attr('class', '');
    $('#newProject .modelo').html($('.model-'+model).html());
    $('#newProject').css('background-image', 'url(assets/imgs/default.png)');
    $('#newProject .modelo').attr('id', model);

    $("label[for='Two']").click();

    $('#newProject p').each(function(){
        var countingCharacters = $(this).html().length;
        var defaultFontSize = $(this).css('font-size').replace('px' , '');
        $(this).attr('default-length', countingCharacters);
        $(this).attr('font-size', defaultFontSize);
    })

    if(model == 'vitoria'){
        $('.toolbar ul li').addClass(model);
    }
    
    console.log('Escolhido o modelo ' + model);
})

$('#postType').change(function() {
    if($(this).is(":checked")) {
        $('#newProject, input[type="range"]').removeClass('feed');
        $('#newProject, input[type="range"]').addClass('story');

        actualModel = $('#newProject')["0"].childNodes[1].id;
        adressNumber = $('#'+actualModel+ ' .numero').html().replace(', ', ''); 
        $('#'+actualModel+ ' .numero').remove();
        $('#'+actualModel+ ' .cidade').prepend(adressNumber+ ' ');

    }else{
        $('#newProject, input[type="range"]').addClass('feed');
        $('#newProject, input[type="range"]').removeClass('story');
        
    }
      
});

$('#backgroundRangeX').on('change',function(){
    console.log($(this));
    console.log($(this).val());
    $('#newProject').css('background-position-x', '-'+$(this).val()+'px');
})
$('#backgroundRangeY').on('change',function(){
    console.log($(this));
    console.log($(this).val());
    $('#newProject').css('background-position-y', '-'+$(this).val()+'px');
})

/////////////////// FUNÃ‡Ã”ES DE USABILIDADE

// Ativa o movimento do elemento por classe
// function makeMeDraggable(obj) {
//     console.log($(editedObj).attr('id'));
//     if(notIn(obj)){}
//     else{
//         editedObj.draggable();
//         editedObj.draggable({ scroll: false });
//     }
// }

// Destaca o elemento do hover
node.addEventListener('mouseover', function(e){
    if(notIn(e.target)){}
    else{
        $(e.target).addClass('hovered');
        var DOMobj = e.target.getBoundingClientRect();
        EixoX = DOMobj['x'];
        EixoY = DOMobj['y'];
    }
})
// Ativa o elemento em foco
$(document).delegate('*', 'click', function(event) {

    obj = $(event.target);

    if(obj[0].id == 'newProject'){
        console.log(obj[0].id);
    }
    

    if(obj['0']['tagName'] == 'HTML'){
        $('*').removeClass('editedObj');
        return false;
    }

    if(notIn(obj)){}
    else{
        // $('#builderz').addClass('flex');
        // Se o elemento em foco jÃ¡ existe, remove a propriedade de mover.
        // if($(editedObj).hasClass('ui-draggable ')){
        //     editedObj.draggable('disable');
        // }
        editedObj = $(event.target);

        $('#template *').removeClass('editedObj');
        editedObj.addClass('editedObj');
        // makeMeDraggable(editedObj);

        // $('#builderz').css('left', '60px');
        // $('#builderz').css('top', 0);
    }


})


document.addEventListener('mouseout', function(e){
    $(e.target).removeClass('hovered');
})


$('.labels label').on('click', function(){
    $('.step').hide();
    $('.step').removeClass('active');
    $('#step'+$(this).attr('for')).fadeIn();
    $('#step'+$(this).attr('for')).addClass('active');

    goEditable()
})
//////////////////// FUNÃ‡Ã”ES DE CRUD

// Define o tipo de objeto que nÃ£o recebe as propriedades de ediÃ§Ã£o
function notIn(obj) {
    parent = false;
    // Se o objeto tem um pai
    if($(obj).parent()){
        parentObj = $(obj).parent();
        // E o pai nÃ£o for a Ã¡rea de novo projeto
        if($(parentObj).attr('id') != 'newProject'){
            parent = true;
        }
    }
    if($(obj).hasClass('editDisabled') || parent && $(parentObj).hasClass('editDisabled'))
    { return true; }
    else {
        return false;
    }
}

$('#file-input').on('change',function(){
    $('.loading-photo').addClass('onLoad');
})

// Deleta o elemento em foco
$('#delete').on('click',function(){
    editedObj.remove();
})
// Ativa opÃ§Ã£o de mover o elemento em foco
$('#download').on('click',function(){
    var canvas = document.getElementById('newProject'); 
    var ctx = $('#newProject')[0].getContext('2d');
    canvas.append(ctx);
})

// $('#unmove').on('click',function(){
//     editedObj.draggable('disable');
//  })

function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();
        var backgroundTarget = document.getElementById('newProject');
        var bgType = $('#file-input').attr('bgType');
        var multipleBg = false;
        
        if(bgType == 'multiBgOne' || bgType == 'multiBgTwo' ){
            var backgroundTarget = document.getElementById(bgType);
            backgroundCount++;
            multipleBg = true;
        }
 
        reader.onload = function (e) {
            $('#uploadedImg').attr('src', e.target.result);
            if(multipleBg){
                backgroundTarget.innerHTML = '';
                backgroundTarget.style.background = '';
            }
            backgroundTarget.style.backgroundImage = "url('"+e.target.result+"')";
        };

        reader.readAsDataURL(input.files[0]);
        // setTimeout(() => {
            
        //     console.log('[####] comprimindo imagem...');
        //     source_img = document.getElementById('uploadedImg');
        //     target_img = document.getElementById('shareImg');
        
        //     var quality =  60;
        //     output_format = 'jpg';
        //     // target_img.src = jic.compress(source_img,quality,output_format).src;  
        //     $(target_img).addClass('compreesed');
        //     console.log('[####] imagem comprimida com sucesso!');
        //     $('.loading-photo h2').html('Comprimindo imagem');
        // }, 500);
        setTimeout(() => {
            $('.loading-photo').removeClass('onLoad');
        }, 500);

        if(backgroundCount >= 2){
            $('.background-input').css('z-index', 0);
            $('.background-input').css('background', '');
        }
    }
}

// TOOLBAR


$('.background-images').on('click',function(){
    $('.background-input').remove();
})
$('#single-background').on('click',function(){
    $('.background-input').remove();
    $('#newProject').prepend('<div class="bg1 background-input"><img src="assets/icon/single-background.png" alt=""></div>');
})
$('#dual-background').on('click',function(){
    $('.background-input').remove();
    $('#newProject').prepend('<div class="bg2 background-input">' +
    '<div class="col" id="multiBgOne">'+
    '<img class="input" bgType="multiBgOne" src="assets/icon/single-background.png" alt="">'+
    '</div>'+
    '<div class="col" id="multiBgTwo">'+
    '<img class="input" bgType="multiBgTwo" src="assets/icon/single-background.png" alt="">'+
    '</div>');
});

$('.sub-menu img').on('click', function(e){
    backgroundCount = 0;
    e.preventDefault();
})

$('#template').delegate('.input', 'click', function(e){
    console.log('click');
    var bgID = $(this).attr('bgType');
    $('#file-input').attr('bgType', bgID).click();
})

function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') 
    .replace(/[àÀáÁâÂãäÄÅåª]+/g, 'a')       
    .replace(/[èÈéÉêÊëË]+/g, 'e')       	
    .replace(/[ìÌíÍîÎïÏ]+/g, 'i')       	
    .replace(/[òÒóÓôÔõÕöÖº]+/g, 'o')       	
    .replace(/[ùÙúÚûÛüÜ]+/g, 'u')       	
    .replace(/[ýÝÿŸ]+/g, 'y')       		
    .replace(/[ñÑ]+/g, 'n')       			
    .replace(/[çÇ]+/g, 'c')       			
    .replace(/[ß]+/g, 'ss')       			
    .replace(/[Ææ]+/g, 'ae')       			
    .replace(/[Øøœ]+/g, 'oe')       		
    .replace(/[%]+/g, 'pct')       			
    .replace(/\s+/g, '-')           		
    .replace(/[^\w\-]+/g, '')       		
    .replace(/\-\-+/g, '-')         		
    .replace(/^-+/, '')             		
    .replace(/-+$/, '');         
}

