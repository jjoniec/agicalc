var ANIMATION_END = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

$(function() {
    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        dialogClass: "no-close",
        buttons: [
            {
                text: "Ok",
                icons: {
                    primary: "ui-icon-heart"
                },
                click: function() {
                    $( this ).dialog( "close" );}
            }
        ]
    });

    $( "#policz_button" ).button({
        icons: {
            primary: "ui-icon-calculator"
        },
        text: false
    });

    $( "#reset_button" ).button({
        icons: {
            primary: "ui-icon-trash"
        },
        text: false
    });

    $( "#config_button" ).button({
        icons: {
            primary: "ui-icon-gear"
        },
        text: false
    });

    $("#form_result").on("dblclick", function(){
        formFadeOut(this);
    });

    $("#config_button" ).on("click", function(){
        formFadeIn("#form_config");
    });

    $("#form_config").on("dblclick", function(){
        formFadeOut(this);
    });

});

function formFadeOut(form) {
    var animationName = 'animated fadeOutLeft';
    $(form).addClass(animationName).one(ANIMATION_END, function(){
        $(this).removeClass(animationName);
        $(this).css('visibility', 'hidden');
    });
}

function formFadeIn(form) {
    var animationName = 'animated fadeInLeft';
    $(form).css('visibility', 'visible');
    $(form).addClass(animationName).one(ANIMATION_END, function () {
        $(this).removeClass(animationName);
    });
}

