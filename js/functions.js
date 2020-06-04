$(function() {

    /**** Funções para a barra de filtragem de preços ****/
    //Variaveis globais
    var curValue = 0;
    var isDrag = false;
    var maxPrice = 70000;
    var curPrice = 0;

    //Evento dispara quando o mouse é pressionado
    $('.pointer-barra').mousedown(function() {
        isDrag = true;

    })

    //Evento dispara quando o mouse é solto
    $(document).mouseup(function() {
        isDrag = false;
        enableTextSelection();
    })

    //Mudando a propriedade WIDTH da barra e LEFT do pointer conforme a posição do mouse
    $('.barra-preco').mousemove(function(e) {
        disableTextSelection();
        if (isDrag == true) {
            var elBase = $(this)
            var mouseX = e.pageX - elBase.offset().left

            if (mouseX < 0) {
                mouseX = 0;
            }
            if (mouseX > elBase.width()) {
                mouseX = elBase.width();
            }

            var curValue = (mouseX / elBase.width()) * 100
            $('.barra-preco-fill').css('width', curValue + ('%'))
            $('.pointer-barra').css('left', (mouseX - 7) + ('px'))

            curPrice = (curValue / 100) * maxPrice
            curPrice = priceFormat(curPrice);
            $('.search-price').html('R$' + curPrice)
        }
    })

    //Formatando o preço
    function priceFormat(curPrice) {
        curPrice = curPrice.toFixed(2);
        priceArr = curPrice.split('.');

        var newPrice = totalFormat(priceArr);

        return newPrice;
    }

    //Formatando o preço de verdade agora
    function totalFormat(priceArr) {
        if (priceArr[0] < 1000) {
            return priceArr[0] + ',' + priceArr[1]
        } else if (priceArr[0] < 10000) {
            return priceArr[0][0] + '.' + priceArr[0].substr(1, priceArr[0].length) + ',' + priceArr[1];
        } else {
            return priceArr[0][0] + priceArr[0][1] +
                '.' + priceArr[0].substr(2, priceArr[0].length) + ',' + priceArr[1];
        }
    }

    //Desativar a seleção de texto
    function disableTextSelection() {
        $('body').css('-webkit-user-select', 'none');
        $('body').css('-moz-user-select', 'none');
        $('body').css('-ms-user-select', 'none');
        $('body').css('-o-user-select', 'none');
        $('body').css('user-select', 'none');
    }

    //Ativar a seleção de texto
    function enableTextSelection() {
        $('body').css('-webkit-user-select', 'auto');
        $('body').css('-moz-user-select', 'auto');
        $('body').css('-ms-user-select', 'auto');
        $('body').css('-o-user-select', 'auto');
        $('body').css('user-select', 'auto');
    }

    /********/

    /**** Funções para o Slider da página de venda individual ****/

    var imgShow = 3;
    var maxIndex = Math.ceil($('.mini-img-wrapper').length / 3) - 1;
    var curIndex = 0;

    initSlider();
    navigateSlider();
    clickSlider();

    function initSlider() {
        var amt = $('.mini-img-wrapper').length * 33.3;
        var elScroll = $('.nav-galeria-wrapper');
        var elSingle = $('.mini-img-wrapper');

        elScroll.css('width', amt + ('%'));
        elSingle.css('width', 33.3 * (100 / amt) + '%');
    }

    function navigateSlider() {
        $('.arrow-right-img').click(function() {
            if (curIndex < maxIndex) {
                curIndex++;
                var eloff = $('.mini-img-wrapper').eq(curIndex * 3).offset().left - $('.nav-galeria-wrapper').offset().left
                $('.nav-galeria').animate({
                    'scrollLeft': eloff
                })
            }
        });

        $('.arrow-left-img').click(function() {
            if (curIndex > 0) {
                curIndex--;
                var eloff = $('.mini-img-wrapper').eq(curIndex * 3).offset().left - $('.nav-galeria-wrapper').offset().left
                $('.nav-galeria').animate({
                    'scrollLeft': eloff
                })
            }
        });
    }

    function clickSlider() {
        $('.mini-img-wrapper').click(function() {
            $('.mini-img-wrapper').css('background-color', 'transparent');
            $(this).css('background-color', '#ccc');

            var img = $(this).children().css('background-image');
            $('.foto-veiculo').css('background-image', img);
        })

        $('.mini-img-wrapper').eq(0).click();
    }

    /********/

    $('nav a').click(function() {
        $('nav a').css('color', 'black')
        $(this).css('color', 'red')

        var href = $(this).attr('href');
        var offSetTop = $(href).offset().top

        $('html, body').animate({
            'scrollTop': offSetTop
        })
        return false;

    })

    /* MENU MOBILE */

    $('.menu-mobile').click(function() {
        $('.menu-mobile ul').slideToggle();
    })

    $('.menu-mobile ul').click(function(e) {
        e.stopPropagation();
    })

    /* DEPOIMENTOS */

    var amountDepoimentos = $('.depoimentos-single > p').length;
    var curIndexDep = 0;

    navegarDepoimentos();
    iniciarDepoimentos();

    function iniciarDepoimentos() {
        $('.depoimentos-single > p').hide();
        $('.depoimentos-single > p').eq(0).show();
    }

    function navegarDepoimentos() {
        $('[prev]').click(function() {
            curIndexDep--;
            if (curIndexDep < 0)
                curIndexDep = amountDepoimentos - 1;
            $('.depoimentos-single > p').hide();
            $('.depoimentos-single > p').eq(curIndexDep).show();
        })
        $('[next]').click(function() {
            curIndexDep++;
            if (curIndexDep >= amountDepoimentos)
                curIndexDep = 0;
            $('.depoimentos-single > p').hide();
            $('.depoimentos-single > p').eq(curIndexDep).show();
        })
    }


    // $('[goto=contato]').click(function() {
    //     $('nav a').css('color', 'black');
    //     $(this).css('color', 'red');
    //     $('html,body').animate({
    //         'scrollTop': $('#contato').offset().top
    //     })
    //     return false;
    // })

})