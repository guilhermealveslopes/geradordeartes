/////////////////////// ESCOPO GLOBAL

var node = document.getElementById('newProject');
var share = document.getElementById('share');
var btnContinue = document.getElementById('btnContinue');
var btnDownload = document.getElementById('btnDownload');
var editedObj;

function goEditable(){
    $('.modelo *').attr('contenteditable', true);
}

btnContinue.onclick = function() {

    html2canvas(node, {
       scale:1.7
      }).then(function(canvas) {
        share.append(canvas);
        $("label[for='Three']").click();
        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/png");
        a.id = 'shareImg';
        a.download = 'myfile.png';
        share.append(a);
      });
}

btnDownload.onclick = function() {
    var download = document.getElementById('shareImg');
    download.click();
}

$('.models .item').on('click', function(){
    var model = $(this).html().slugify();
    $('#newProject .modelo').html($('.model-'+model).html());
    $('#newProject').css('background-image', 'url(assets/imgs/default.png)');
    $('#newProject .modelo').attr('id', model);
    $("label[for='Two']").click();

    goEditable();
    console.log('Escolhido o modelo ' + model);
})

$('#postType').change(function() {
    if($(this).is(":checked")) {
        $('#newProject').removeClass('feed');
        $('#newProject').addClass('story');
    }else{
        $('#newProject').addClass('feed');
        $('#newProject').removeClass('story');
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

/////////////////// FUNÇÔES DE USABILIDADE

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
        // Se o elemento em foco já existe, remove a propriedade de mover.
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
//////////////////// FUNÇÔES DE CRUD

// Define o tipo de objeto que não recebe as propriedades de edição
function notIn(obj) {
    parent = false;
    // Se o objeto tem um pai
    if($(obj).parent()){
        parentObj = $(obj).parent();
        // E o pai não for a área de novo projeto
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

// Deleta o elemento em foco
$('#delete').on('click',function(){
    editedObj.remove();
})
// Ativa opção de mover o elemento em foco
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

        reader.onload = function (e) {
            document.getElementById('newProject').style.backgroundImage = "url('"+e.target.result+"')";
           
        };

        reader.readAsDataURL(input.files[0]);
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
    '<div class="col">'+
    '<img src="assets/icon/single-background.png" alt="">'+
    '</div>'+
    '<div class="col">'+
    '<img src="assets/icon/single-background.png" alt="">'+
    '</div>');
})


// Slugify

if (!String.prototype.slugify) {
	String.prototype.slugify = function () {

	return  this.toString().toLowerCase()
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
    
	};
}