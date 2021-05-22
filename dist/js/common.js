tippy('[data-tippy-content]', {
    allowHTML: true,
    animateFill: false,
    hideOnClick: 'toggle'
});

$('#course_program_modal').on('click', '.edit', function(){
    $(this).parents('.them_line').find('.text span').addClass('hide');
    $(this).parents('.them_line').find('.text input').removeClass('hide');

    $(this).parents('.them_line').find('.action_buttons .save').removeClass('hide');

    input = $(this).parents('.them_line').find('.text input[type=text]');
    input.focus();
    input.selectionStart = input.value.length;
});

$('#course_program_modal').on('click', '.save', function(){
    text = $(this).parents('.them_line').find('.text input').val();
    $(this).parents('.them_line').find('.text span').html(text);

    $(this).parents('.them_line').find('.text span').removeClass('hide');
    $(this).parents('.them_line').find('.text input').addClass('hide');

    $(this).addClass('hide');
});

$('#course_program_modal').on('click', '.del', function(){
    $(this).parents('.them_line').remove()
});

$("#edit_thems .create-them-name").click(function() {
    $(this).parents('.modal_div').find('.add_new_course').removeClass('hide').find('input[type=text]').focus();
})
$("#edit_thems .add_new_course").on('click', '.del', function(){
    $(this).parents('.add_new_course').addClass('hide');
    $(this).parents('.add_new_course').find('input[type=text]').val('');
})
$("#edit_thems .add_new_course").on('click', '.save', function(){
    $(this).parents('.add_new_course').addClass('hide');
    text = $(this).parents('.add_new_course').find('input[type=text]').val();
    if (text == "") {

    }else{
        $("#course_program_modal form").append("<div class='them_line'><div class='text'><span>" + text + "</span><input type='text' value='" + text + "' class='hide'></div><div class='action_buttons'><span class='save hide'><img src='../img/icons/a-check-white.svg'></span><span class='edit'><img src='../img/icons/a-edit.svg'></span><span class='del'><img src='../img/icons/a-delete.svg'></span></div></div>");
        $(this).parents('.add_new_course').find('input[type=text]').val("");
    }
})
// 

$('.add_comment input[type=text]').click(function() {
    $(this).parents('.add_comment').find('.btn_block').removeClass('hide');
});

$('.add_comment .hideButtons').click(function() {
    $(this).parents('.add_comment').find('.btn_block').addClass('hide');
    $(this).parents('.add_comment').addClass('hide');
});

$('.comment .answer span').click(function() {
    $(this).parents('.comment_content').next('.add_comment').removeClass('hide').find('.btn_block').removeClass('hide');
    $(this).parents('.comment_content').next('.subComments').find('.add_comment').first().removeClass('hide').find('.btn_block').removeClass('hide');

    $(this).parents('.comment_content').next('.add_comment').find('.input input').focus();
    $(this).parents('.comment_content').next('.subComments').find('.add_comment').first().find('.input input').focus();
});

$(document).mouseup(function (e){
    var div = $(".add_comment");
    if (!div.is(e.target) && div.has(e.target).length === 0) {
        div.addClass('hide');
        div.find('.btn_block').addClass('hide');
    }
});


$('#right_block .add_friend > *').click(function() {
    if ($(this).prop("disabled")) {
        $(this).prop( "disabled", false );
        $(this).html('Добавить в друзья');
        $('.delete-friend').addClass('hide');
    }else{
        $(this).prop( "disabled", true );
        $(this).html('Заявка в друзья отправлена');
        $('#right_block .delete-friend').removeClass('hide');
    }
});

$('#del_friend .red_btn').click(function() {
    $('#right_block .add_friend > *').prop( "disabled", false );
    $('#right_block .add_friend > *').html('Добавить в друзья');
    $('.delete-friend').addClass('hide');
});

$('.modal_div.del_friend .red_btn').click(function() {
    $('.friendsPage_list .friend[data-user-id='+ $(this).data('user-id') +']').remove();
});

$("#create_chat .user.add_new").click(function(e) {
    $(this).hide();
    $("#create_chat .search_users").toggleClass('show');
})

$('.search_users .input_find').on('keyup change', function() {
    if (this.value.length > 0) {
        $('.search_users .prev').hide();
        $('.search_users .search_users_result').show();
    } else {
        $('.search_users .prev').show();
        $('.search_users .search_users_result').hide();
    }
});    

if($("div").is("#competences_donut")){
    //размер круга
    size = "180px";
    //делим строку, полученную из data-segments в массив (получаем кол-во элементов в круге)
    segments = $("#competences_donut").data("segments").split(';');
    //Общее кол-то поинтов
    points = 0;

    //разбиваем массив segments в двумерный массив, чтобы получить кол-во поинтов, цвет, и напрвавление в каждом сегменте
    for (i = 0; i < segments.length; i++) {
        segments[i] = segments[i].split(',');
        //считаем общее количество поинтов
        points += Number(segments[i][0]);
    }

    //получаем скольки % равен 1 поинт
    point_percent = 100 / points;
    //отступ от предыдущего сегмента
    segment_offset = 100;
    //html кругов
    segments_html = '';

    for (i = 0; i < segments.length; i++) {
        //размер сегмента
        segment_percent = Number(point_percent) * Number(segments[i][0]);
        //% не заполненной части сегмента (не трогать)
        segment_offset_percent = 100 - segment_percent;
        //Собираем все сегменту в 1 html
        segments_html += '<circle data-points="' + segments[i][0] + '" class="donut-segment" cx="21" cy="21" r="40%" fill="transparent" stroke="'+ segments[i][1] +'" stroke-width="8px" stroke-dasharray="'+ segment_percent +' '+ segment_offset_percent +'" stroke-dashoffset="'+ segment_offset +'"></circle>';
        //отступ для следующего сегмента
        segment_offset -= segment_percent;
    }

    //Сборка всего графика в html
    competences_donut_html = '<figure id="donut_basic_compet"><div class="figure-content"><svg width="'+ size +'" height="'+ size +'" viewBox="0 0 42 42" class="donut" aria-labelledby="beers-title beers-desc" role="img"><circle class="donut-ring" cx="21" cy="21" r="40%" fill="transparent" stroke="#d2d3d4" stroke-width="8px" role="presentation"></circle>';
    competences_donut_html += segments_html;
    competences_donut_html += '<g class="chart-text"><text x="50%" y="50%" class="chart-number">'+ points +'</text></g></svg></div></figure>';
    //Вывод графика
    $("#competences_donut").html(competences_donut_html);
    $("#competences_donut").attr("data-segments" , '');
}

$("#donut_basic_compet svg circle").click(function(e) {
    if ($(this).hasClass('active')){
        stroke = $(this).attr("stroke");
        console.log(stroke.substring(0,7));
        $(this).attr("stroke", stroke.substring(0,7));
    }else{
        $('#donut_basic_compet circle').each(function(i,elem) {
            $(this).removeClass('active');
            stroke = $(this).attr("stroke");
            console.log(stroke.substring(0,7));
            $(this).attr("stroke", stroke.substring(0,7));
        });

        $(this).addClass('active');

        stroke = $(this).attr("stroke");

        $(this).attr("stroke", stroke + "80");

        select_trek = $(this).data("points");
        $(".chart-text .chart-number").text(select_trek);
    }
});


$(".open_list_btn").click(function(e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
        $(".open_list_btn").removeClass('active');
        $(".popup_cloud").removeClass('active');
    }else{
        $(".open_list_btn").removeClass('active');
        $(".popup_cloud").removeClass('active');

        $(this).addClass('active');
        
        className = '.'+$(this).attr('class').split(' ').join('.');
        className = className.replace('.open_list_btn','');
        className = className.replace('.active','');

        $(className + "_popup").addClass('active');
    }
})

$(".like").click(function(e) {
    $(this).toggleClass('active');
})

$(".hobbies_modal_all_list .hobby").click(function(e) {
    parent = $(this).parent();

    console.log(parent.attr("for"));

    $(".hobbies_modal_all_list label[for=\"" + parent.attr("for") + "\"]").toggleClass('selected');
    $("#" + parent.attr("for") + " + .hobby").toggleClass('active');

    check_cb('.hobbies_modal_all_list');
})

$(".interests_modal_all_list .interest").click(function(e) {
    // $(this).toggleClass('active');

    parent = $(this).parent();
    $("#" + parent.attr("for") + " + .interest").toggleClass('active');

    check_cb('.interests_modal_all_list');
})

$(".title_menu").click(function(e) {
    $(this).toggleClass('open');

    parent = $(this).parent();
    parent.find('.title_menu_content').toggleClass('active');
})




$(".table .del").click(function(e) {
    //выбираем строку, в которой кликнули "удалить"
    parent = $(this).parents(".table-row");

    //плавно скрываем строку
    parent.animate({height: 'hide'}, 300);

    //удаляем строку из html страницы после проигрывания анимации удаления
    setTimeout(function(){
        parent.remove()
    }, 300);
})

$(".lang .delete").click(function(e) {
    //выбираем строку, в которой кликнули "удалить"
    parent = $(this).parents(".lang");

    //плавно скрываем строку
    parent.animate({height: 'hide'}, 300);

    //удаляем строку из html страницы после проигрывания анимации удаления
    setTimeout(function(){
        parent.remove()
    }, 300);
})

$(".trek").click(function(e) {
    if ($(this).hasClass('active')){

    }else{
        $(".trek").removeClass('active');
        $(".trek_content .trek").removeClass('active');
        $(this).addClass('active');

        select_trek = $(this).data("trak-name");
        $(".trek_content .trek.trek-" + select_trek).addClass('active');
    }
})

$(".trek_card").click(function(e) {
    if ($(this).hasClass('active')){
        $(".trek_card").removeClass('active');
        $(".more_info").removeClass('active');
    }else{
        $(".trek_card").removeClass('active');
        $(".more_info").removeClass('active');
        $(this).addClass('active');
        $(this).next(".more_info").addClass('active');
    }
})

$('.type_line').each(function(i,elem) {
    type_points = $(this).data("type");

    blue_line = $(this).find('.blue_line');

    if (type_points < 0) {
        type_points = 50 - (type_points * -1) / 2;
        blue_line.css({'left' : type_points + '%'});
    }else{
        type_points = type_points / 2;
        blue_line.css({'right' : type_points + '%'});
    }
});

$(function(){
    $('.mertors_slider').slick({    
        autoplay: false,
        fade: true,
        cssEase: 'linear'   
    });

    $(".mertors_slider").on('afterChange', function(event, slick, currentSlide){
        $("#mertors_slider_counter").text(currentSlide + 1);
    });

    $('.friends_slider').slick({    
        autoplay: false,
        fade: true,
        cssEase: 'linear'   
    });

    $(".friends_slider").on('afterChange', function(event, slick, currentSlide){
        $("#friends_slider_counter").text(currentSlide + 1);
    });

    $('.recomm_card_slider').slick({    
        autoplay: false,
        fade: true,
        cssEase: 'linear'   
    });

    $(".recomm_card_slider").on('afterChange', function(event, slick, currentSlide){
        $("#recomm_card_slider_counter").text(currentSlide + 1);
    });

    $('.header_photo_gallery').slick({    
        autoplay: false,
        fade: true,
        cssEase: 'linear',
        asNavFor: '.slider-nav'
    });

    $('.slider-nav').slick({
        cssEase: 'linear',
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.header_photo_gallery',
        focusOnSelect: true,
        centerMode: false,
        arrows: false,
        dots: false
    });

    $('.party_slider').slick({    
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 9,
        slidesToScroll: 9
    });

    $('.party_slider2').slick({    
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 9,
        slidesToScroll: 9
    });

    $('.awards_slider').slick({    
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 9,
        slidesToScroll: 9,
        prevArrow: $('.awards_slider_prev'),
        nextArrow: $('.awards_slider_next')
    });

    $('.line-slider').slick({    
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: $('.line-slider_prev'),
        nextArrow: $('.line-slider_next')
    });

    $('.mertors_slider_line').slick({    
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 4,
        slidesToScroll: 4
    });

    $('.line-slider2').slick({    
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 3
    });

    $('.slider240').slick({
        arrows: true,
        dots: true,    
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false
    });
});

function FileName(input){
    $(input).on('change', function(){
        if (this.files.length > 0) {
            $(this).parents('.file').find('label').text($(this)[0].files[0].name);
        }else{
            $(this).parents('.file').find('label').text('Прикрепить обложку');
        }
    });
}

FileName('.form.add_news input[type="file"]');
FileName('.modal_div input[type="file"]');

if($("div").is("#speedometer")){
    //Полная загрузка
    hourly_load = $(".speedometr").data("hourly-load").split(':');

    hour = Number(hourly_load[0]);
    minute = Number(hourly_load[1]);

    rotation_deg = (hour + (minute/60))*(180/24);

    $("#speedometer .line").css({
        transform: 'rotate(' + rotation_deg + 'deg)'
    });

    $("#speedometer .diogram .hourly_load").html("<span>" + hour + "</span>");
}

jQuery(function($){
    $(document).mouseup(function (e){ // событие клика по веб-документу
        var div = $(".modal_div > div"); // тут указываем ID элемента
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            $('body').css('overflow','auto');
            $('.modal_div').css('display', 'none');
            $('#overlay').fadeOut(200);
        }
    });
});

$(document).ready(function() {
    var body = $('body');
    var overlay = $('#overlay');
    var open_modal = $('.open_modal');
    var close = $('.modal_close, #overlay, .modal_div .red_btn, .modal_div .close-button');
    var modal = $('.modal_div');

    open_modal.click( function(event){
        body.css('overflow','hidden');
        event.preventDefault();
        var div = $(this).attr('href');
        overlay.fadeIn(200,
            function(){
            $(div).css('display', 'block').animate({opacity: 1, top: '50%'}, 200);
        });
    });

    close.click( function(){ // лoвим клик пo крестику или oверлэю
        body.css('overflow','auto');
        modal.animate({opacity: 0, top: '45%'}, 200,
            function(){ // пoсле этoгo
                $(this).css('display', 'none');
                overlay.fadeOut(200); // прячем пoдлoжку
            }
        );
    });
});

$(".sort_date").click(function(e) {
    if ($(this).hasClass('active')){

    }else{
        $(function(){
            var $fields, $container, sorted, index;
          
            $container = $('.news_list_switcher');
            $fields = $("div[data-date]", $container);
            sorted = [];
            $fields.detach().each(function() {
                sorted[parseInt(this.getAttribute("data-date"), 10)] = this;
            });
            sorted.forEach(function(element) {
                $container.append(element);
            });
        });

        $(".sort_views").removeClass('active');
        $(".sort_rate").removeClass('active');
        $(this).addClass('active');
    }
})

$(".sort_rate").click(function(e) {

    if ($(this).hasClass('active')){

    }else{
        $(function(){
            var $fields, $container, sorted, index;
          
            $container = $('.news_list_switcher');
            $fields = $("div[data-rate]", $container);
            sorted = [];
            $fields.detach().each(function() {
                sorted[parseInt(this.getAttribute("data-rate"), 10)] = this;
            });
            sorted.forEach(function(element) {
                $container.append(element);
            });
        });

        $(".sort_date").removeClass('active');
        $(this).addClass('active');
    }
})

$(".toggle_show span").click(function(e) {
    $(".toggle_show").addClass('d-none');
    $(".hide").toggleClass('show');
})

$(".sort_views").click(function(e) {
    if ($(this).hasClass('active')){

    }else{
        $(function(){
            var $fields, $container, sorted, index;
          
            $container = $('.news_list_switcher');
            $fields = $("div[data-views]", $container);
            sorted = [];
            $fields.detach().each(function() {
                sorted[parseInt(this.getAttribute("data-views"), 10)] = this;
            });
            sorted.forEach(function(element) {
                $container.append(element);
            });
        });

        $(".sort_date").removeClass('active');
        $(this).addClass('active');
    }
})

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $("select").selectBoxIt();
})

$(".switch > *").click(function(e) {
    $(this).parent().find('.active').removeClass('active');

    id = $(".switch  > *").index($(this));
    $(this).addClass('active');

    switch_name = $(this).parent().data('switch');

    $('.switch_content[data-switch="' + switch_name + '"] > div').removeClass('active');
    $('.switch_content[data-switch="' + switch_name + '"] > div:eq('+ id +')').addClass('active');
})

function resize() {
    if ($(window).width() <= 1650) {
        $('#left_menu').addClass('expand');
        $('#right_block').addClass('expand roll_up');
        $('.page').addClass('expand_right');
        $('#top_menu').addClass('expand');
    }
    else {
        $('#left_menu').removeClass('expand');
        $('#right_block').removeClass('expand roll_up');
        $('.page').removeClass('expand_right');
        $('#top_menu').removeClass('expand');

        i = 0;
        do {
            setTimeout(function(){
                $('.mertors_slider').slick('refresh');
            }, 10);
            i++;
        } while (i < 15);
    }

    if ($(window).width() < 1160) {
        $('body').addClass('small_screen');
    }
    else {
        $('body').removeClass('small_screen');
    }
}

$(window).resize(resize);
resize();

//сворачиваем правую карточку
$(".roll_up_btn").click(function(e) {
    $('.page').removeClass('open_rb');
    $('#right_block').removeClass('show');
    setTimeout(function(){
        $('.friends_slider').slick('refresh');
    }, 1000);
})
// $(".roll_up_btn").click(function(e) {
//     $('.page').addClass('expand_right');
//     $('#right_block').addClass('expand roll_up');
// })

//разворачиваем правую карточку
$(".expand_block").click(function(e) {
    $('.page').removeClass('expand_right');
    $('.page').addClass('open_rb');
    $('#right_block').removeClass('expand');
    $('#right_block').addClass('show');

    setTimeout(function(){
        $('.mertors_slider').slick('refresh');
    }, 150);
})

function check_cb(container) {

    checked = false;

    if ($(container + ' .active').length > 0){
        checked = true;
    }else{
        checked = false;
    }

    if (checked == true) {
        $(container + ' .checked_cb_container').show();
    }else{
        $(container + ' .checked_cb_container').hide();
    }
}

check_cb('.hobbies_modal_all_list');
check_cb('.interests_modal_all_list');

$(".add_challenge_images label").click(function(e) {
    modal_id = $(this).attr('href');

    $('#overlay').fadeIn(200,
        function(){
        $(modal_id).css('display', 'block').animate({opacity: 1, top: '50%'}, 200);
    });

    $(".add_challenge_images input").removeAttr("selected");
    $(this).parent().find("input").attr("selected");
})

$(".add_competence").click(function(e) {
    treks = $(this).data('treks');
    treks = treks.split(";");
    options = "";

    for(var i=0; i<treks.length; i++){
        treks[i] = treks[i].split(",");
        options += "<option value='" + treks[i][0] + "'>" + treks[i][1] + "</option>";
    }
    $(".competencies_list .list").append("<div class=\"competence_item\"><div class=\"del\" onclick=\"del_competence_item($(this))\"></div><div class=\"input\"><select name=\"treks[]\" onchange=\"selection_competences($(this));\"><option selected disabled>Трек</option>" + options + "</select></div></div>");
    //<span>Выбрано 2 компетенции</span>

    $("select").selectBoxIt();
})

function del_competence_item(item){
    item.parent().detach();
}
function del_user_item(item){
    parent = item.parents(".user");
    parent.detach();

    list = $(".users-list").val();

    id = parent.data('user_id');
    list = list.replace(id + ", ", "");

    $(".users-list").val(list);

    $("#mentors_list_modal .user[data-user_id=" + id + "]").toggleClass("selected");
}

function select_competences_modal(modal_id){
    $('#overlay').fadeIn(200,
        function(){
        $(modal_id).css('display', 'block').animate({opacity: 1, top: '50%'}, 200);
    });
}

function selection_competences(id) {
    id.parents(".competence_item").find(".l1").detach();
    id.parents(".competence_item").find(".l2").detach();
    id.parents(".competence_item").append("<div class=\"l1\"><span>Профессиональные компетенции <span>(не обязательно)</span></span></div><div class=\"l2 competences_l2_" + id.val() + "\"><span class=\"border_btn\" onclick=\"select_competences_modal('#competences_list_modal_" + id.val() + "')\">Выбрать</span></div>");
}

$("#mentors_list_modal .user").click(function(e) {
    list = $(".users-list").val();
    $(this).toggleClass("selected");

    id = $(this).data('user_id') + ",";

    if ($(this).hasClass("selected")) {
        list += id;
    }else{
        list = list.replace(id, "")
    }

    $(".users-list").val(list);
})

$("#edit_competences .user").click(function(e) {
    $(this).toggleClass("selected");

    id = $(this).data('user_id') + ",";

    if ($(this).hasClass("user_unconfirmed")){
        list_unconfirmed = $(".unconfirmed-list").val();
        if ($(this).hasClass("selected")) {
            list_unconfirmed += id;
        }else{
            list_unconfirmed = list_unconfirmed.replace(id, "");
        }
        
        $(".unconfirmed-list").val(list_unconfirmed);
    }

    if($(this).hasClass("user_member")){
        list_member = $(".member-list").val();
        if ($(this).hasClass("selected")) {
            list_member += id;
        }else{
            list_member = list_member.replace(id, "");
        }
        
        $(".member-list").val(list_member);
    }

    if($(this).hasClass("user_nominated")){
        list_nominated = $(".nominated-list").val();
        if ($(this).hasClass("selected")) {
            list_nominated += id;
        }else{
            list_nominated = list_nominated.replace(id, "");
        }
        
        $(".nominated-list").val(list_nominated);
    }

    if($(this).hasClass("user_winner")){
        list_winner = $(".winner-list").val();
        if ($(this).hasClass("selected")) {
            list_winner += id;
        }else{
            list_winner = list_winner.replace(id, "");
        }
        
        $(".winner-list").val(list_winner);
    }

    if($(this).hasClass("user_ban")){
        list_ban = $(".ban-list").val();
        if ($(this).hasClass("selected")) {
            list_ban += id;
        }else{
            list_ban = list_ban.replace(id, "");
        }
        
        $(".ban-list").val(list_ban);
    }
})

$("#edit_competences .select_all").click(function(e){
    list = "";
    user = $(this).parents("form").find(".user");

    if ($(this).hasClass("unselec")){
        user.removeClass("selected");
        user.each(function(i,elem) {
            list = "";
            return true;
        });
    }else{
        user.addClass("selected");
        user.each(function(i,elem) {
            id = $(this).data('user_id') + ",";
            list += id;
        });
    }

    if (user.hasClass("selected")) {
        $(this).addClass('unselec');
        $(this).val("Отменить выделение");
    }else{
        $(this).removeClass('unselec');
        $(this).val("Выбрать всех");
    }
})

function modal_tabs_br() {
    $('.modal_tabs span').each(function(i,elem) {
        new_text = ""
        text = $(this).text();
        text = text.split(" ");
        l_text = text.length;

        text_center = Math.floor(l_text / 2);

        if (l_text > 1) {
            //процерка на четное количество слов в предложении
            if(l_text % 2 == 0){
                for (i = 0; i <= l_text - 1; i++) {
                    if (i == text_center-1) {
                        //в центре ставим перенос на новую строка
                        new_text += text[i] + "<br>";
                    }else if(i == l_text - 1){
                        //последнее слово без пробела в конце
                        new_text += text[i];
                    }else{
                        //слова через пробел
                        new_text += text[i] + " ";
                    }
                }
            }else{
                for (i = 0; i <= l_text - 1; i++) {
                    if (i == text_center) {
                        //в центре ставим перенос на новую строка
                        new_text += text[i] + "<br>";
                    }else if(i == l_text - 1){
                        //последнее слово без пробела в конце
                        new_text += text[i];
                    }else{
                        //слова через пробел
                        new_text += text[i] + " ";
                    }
                }
            }
        }else{
            new_text = text;
        }

        $(this).html(new_text);
    });
}

modal_tabs_br();
    

$(".competences_list_modal .competences_list .competence_points_card").click(function(e) {
    list = $(".competencies-list").val();
    $(this).toggleClass("not_active");
    $(this).toggleClass("selection");

    id = $(this).data('competences_id');

    if ($(this).hasClass("not_active")) {
        list = list.replace(id + ", ", "")
    }else{
        list += id + ", ";
    }

    $(".competencies-list").val(list);
    count = $('.competence_points_card.selection').length;

    id_trek = $(this).parents(".competences_list_modal").attr('id').replace("competences_list_modal_", "");

    $(".competences_l2_" + id_trek + " .conter").detach();
    if (count > 0) {
        $(".competences_l2_" + id_trek).prepend("<span class=\"conter\">Выбрано элементов компетенции: "+ count +"</span>");
        $(".competences_l2_" + id_trek + " .border_btn").text("Изменить");
    }else{
        $(".competences_l2_" + id_trek + " .border_btn").text("Выбрать");
    }
})

$(".allert").click(function(e) {
    //плавно скрываем строку
    $(this).animate({height: 'hide'}, 300);

    //удаляем строку из html страницы после проигрывания анимации удаления
    setTimeout(function(){
        $(this).detach();
    }, 300);
})

$(".cookie span").click(function(e) {
    //плавно скрываем строку
    $(this).parent().animate({height: 'hide'}, 300);

    //удаляем строку из html страницы после проигрывания анимации удаления
    setTimeout(function(){
        $(this).parent().detach();
    }, 300);
})

file_gallery_clone = $('.file_gallery').clone();

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function OnChange_file_gallery(file_gallery_clone){
    id = randomInteger(1, 1000);
    $("#add_gallery_modal .files_uploader").append("<div class=\"file_gallery\"><div class=\"del\" onclick=\"del_competence_item($(this))\"></div><div class=\"input file\"><label class=\"\" for=\"add_gallery_upload_"+ id +"\">Добавить изображение</label><input type=\"file\" id=\"add_gallery_upload_"+ id +"\" name=\"add_gallery_upload[]\" onchange=\"OnChange_FileName(this);\"/></div><div class=\"input\"><textarea name=\"photo_descr[]\" placeholder=\"Описание\"></textarea></div></div>");
}

function OnChange_FileName(this_is){
    if (this_is.files.length > 0) {
        id = $(this_is).attr("id");
        if(this_is.files.length == 1){
            $('label[for = '+ id +']').text($(this_is)[0].files[0].name);
        }else{
            $('label[for = '+ id +']').text("Выбрано фалов: " + this_is.files.length);
        }
    }else{
        $(this_is).parent().find('label').text('Прикрепить файл');
    }
}

$("#top_menu .user").click(function(e) {
    $(this).toggleClass('active');
})


$(".labels_penta div").click(function(e) {
    $(".labels_penta div").removeClass("active");
    $(".treks_popup").addClass("active");
    $(this).addClass("active");
})

var currentElement = $(".roads_list .list .pin.active");
// function currentElement_card(currentElement) {
//     $(".roads_in_sphere .sphere").eq($(currentElement).index()).addClass("active");
// }

$(".selection_list .track span").click(function(e){
    $(".selection_list .track").removeClass("active");
    $(this).parent().addClass("active");
})

$(".selection_list .track .close").click(function(e){
    if ($(".selection_list .track.show").length > 1){

        $(this).parent().removeClass("show");

        if ($(this).parent().hasClass("active")){
            $(".selection_list .track").removeClass("active");
            $(".selection_list .track.show").eq(0).addClass("active");
        }

        $(".tracks_list .tracks .track").eq($(this).parent().index()).removeClass("active");

    }else{
        alert("Должен быть выбран минимум 1 трэк!");
    }
})

$(".tracks_list .tracks .track").click(function(e){
    if ($(this).hasClass("active")){

        if ($(".selection_list .track.show").length > 1){
            $(this).removeClass("active");
            $(".selection_list .track").eq($(this).index()).removeClass("show");

            if ($(".selection_list .track").eq($(this).index()).hasClass("active")){
                $(".selection_list .track").removeClass("active");
                $(".selection_list .track.show").eq(0).addClass("active");
            }
        }else{
            alert("Должен быть выбран минимум 1 трэк!");
        }
    }else{
        $(this).addClass("active");
        $(".selection_list .track").eq($(this).index()).addClass("show");
    }
})

$(".tracks_list .hide").click(function(e){
    $(".tracks_list").slideUp();
})

$(".selection_list .add_element").click(function(e){
    $(".tracks_list").slideDown();
})




$(".roads_list .prev").click(function(e) {
    if (currentElement.prev().length){
        $(".roads_list .list .pin").removeClass('active');
        $(".roads_in_sphere .sphere").removeClass('active');

        currentElement = currentElement.prev();

        currentElement.addClass('active');

        $(".roads_in_sphere .sphere").eq($(currentElement).index()).addClass("active");

        $(".roads_list .next").removeClass('not-active');
        // if (currentElement.prev().length){
        //     $(".roads_list .prev").removeClass('not-active');
        // }else{
        //     $(".roads_list .prev").addClass('not-active');
        // }
    }else{
        $(".roads_list .list .pin").removeClass('active');
        $(".roads_in_sphere .sphere").removeClass('active');

        currentElement = $(".roads_list .list .pin").last();

        currentElement.addClass('active');
        $(".roads_in_sphere .sphere").eq($(currentElement).index()).addClass("active");
    }

})

$(".roads_list .next").click(function(e) {
    if (currentElement.next().length){
        $(".roads_list .list .pin").removeClass('active');
        $(".roads_in_sphere .sphere").removeClass('active');

        currentElement = currentElement.next();

        currentElement.addClass('active');

        $(".roads_in_sphere .sphere").eq($(currentElement).index()).addClass("active");

        $(".roads_list .prev").removeClass('not-active');
        // if (currentElement.next().length){
        //     $(".roads_list .next").removeClass('not-active');
        // }else{
        //     $(".roads_list .next").addClass('not-active');
        // }
    }else{
        $(".roads_list .list .pin").removeClass('active');
        $(".roads_in_sphere .sphere").removeClass('active');

        currentElement = $(".roads_list .list .pin").first();

        currentElement.addClass('active');
        $(".roads_in_sphere .sphere").eq($(currentElement).index()).addClass("active");
    }
})

// $(".roads_list .pin").click(function(e) {
//     $(".roads_list div").removeClass("active");
//     $(".roads_in_sphere .sphere").removeClass("active");
//     $(".treks_popup").addClass("active");
//     $(".roads_in_sphere").addClass("active");
//     $(this).addClass("active");

//     $(".roads_in_sphere .sphere").eq($(this).index()).addClass("active");
// })

$(".treks_name_list span").click(function(e) {
    $(".treks_popup .treks_name_list span").removeClass("active");
    $(this).addClass("active");
    $(".treks_popup").addClass("active");

    $(".roads_in_sphere .sphere > div").removeClass("active");
    $(".roads_in_sphere .sphere > div").eq($(this).index()).addClass("active");

    $(".donut-segment").removeClass("active");
    $(".donut-segment").eq($(this).index()).addClass("active");
})

$(".roads_in_sphere .sphere > div").click(function(e) {
    $(".roads_in_sphere .sphere > div").removeClass("active");
    $(this).addClass("active");
    $(".treks_popup").addClass("active");

    $(".treks_popup .treks_name_list span").removeClass("active");
    $(".treks_popup .treks_name_list span").eq($(this).index()).addClass("active");

    $(".donut-segment").removeClass("active");
    $(".donut-segment").eq($(this).index()).addClass("active");
})

// $(".roads_in_sphere .close").click(function(e) {
//     $(".roads_in_sphere").removeClass("active");
// })

$(".treks_popup .treks_name_list span").click(function(e) {
    $(".treks_popup .treks_name_list span").removeClass("active");
    $(this).addClass("active");

    // $(".roads_in_sphere .sphere > div").removeClass("active");

    // $(".roads_in_sphere .sphere > div").eq(1).addClass("active");
})

$(".treks_popup .close").click(function(e) {
    $(".treks_popup").removeClass("active");
    $(".labels_penta div").removeClass("active");
})

$(".notifications_page .notification").click(function(e) {
    $(this).toggleClass('selected');
})

// $(document).mouseup(function (e){ // событие клика по веб-документу
//     var div = $(".treks_popup"); // тут указываем ID элемента
//     if (!div.is(e.target) && div.has(e.target).length === 0) {
//         if ($(".treks_popup").hasClass("active")) {
//             $(".treks_popup").removeClass("active");
//             $(".labels_penta div").removeClass("active");
//         }
//     }
// });

jQuery('img.svg').each(function() {
  var $img = jQuery(this);
  var imgID = $img.attr('id');
  var imgClass = $img.attr('class');
  var imgURL = $img.attr('src');

  jQuery.get(imgURL, function(data) {
    // Get the SVG tag, ignore the rest
    var $svg = jQuery(data).find('svg');

    // Add replaced image's ID to the new SVG
    if (typeof imgID !== 'undefined') {
      $svg = $svg.attr('id', imgID);
    }
    // Add replaced image's classes to the new SVG
    if (typeof imgClass !== 'undefined') {
      $svg = $svg.attr('class', imgClass + ' replaced-svg');
    }

    // Remove any invalid XML tags as per http://validator.w3.org
    $svg = $svg.removeAttr('xmlns:a');

    // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
    if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
      $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
    }

    // Replace image with new SVG
    $img.replaceWith($svg);

  }, 'xml');

});

//RADAR
function render_radar(points){

    var marksCanvas = document.getElementById("myChart");

    var marksData = {
      labels: ["", "", "", "", ""],
      datasets: [{
        backgroundColor: "rgba(23, 135, 238, 0.75)",
        pointBackgroundColor: "#ffc500",
        pointRadius: 6,
        pointHoverRadius: 6,
        borderDashOffset: 10,
        borderWidth: "5px",
        data: points,
      }]
    };

    var radarChart = new Chart(marksCanvas, {
      type: 'radar',
      data: marksData,
      options: {
        pointLabel: {
            fontSize: 0
        },
        title : {
            display: false      
        },
        legend : {
            display: false      
        },
        tooltips : {
            enabled: false      
        },
        scale: {
            ticks: {
                maxTicksLimit: 1,
                display: false
            }
        }
      }
    });
}

$(".alert_modal .border_btn").click(function(e) {
    $('body').css('overflow','auto');
    $('.modal_div').css('display', 'none');
    $('#overlay').fadeOut(200);
});






traectories_width = $(".traectories").innerWidth();
traectoria_line_width = $(".traectories_scroll_line").innerWidth();

traectoria_offset = traectoria_line_width - traectories_width;

margin_left = 0;

$(window).on('resize', function(){
    traectories_width = $(".traectories").innerWidth();
    traectoria_line_width = $(".traectories_scroll_line").innerWidth();

    traectoria_offset = traectoria_line_width - traectories_width;

    $(".traectories_scroll_line").css('margin-right', '0px');

    $(".traectoria_scroll > .left").removeClass('not-active');
    $(".traectoria_scroll > .right").addClass('not-active');
});

$(".traectoria_scroll > .left").click(function(e) {
    traectoria_section_width = $(".traectories_scroll_line .traectoria_section").innerWidth();
    // traectoria_section_width = 280;
    margin_left = margin_left - traectoria_section_width;
    $(".traectories_scroll_line").css({'margin-right':margin_left +'px'});

    traectoria_offset -= traectoria_section_width;

    if (traectoria_offset <= 0) {
        $(".traectoria_scroll > .left").addClass('not-active');
    }else{
        $(".traectoria_scroll > .left").removeClass('not-active');
    }

    $(".traectoria_scroll > .right").removeClass('not-active');
});

$(".traectoria_scroll > .right").click(function(e) {
    traectoria_section_width = $(".traectories_scroll_line .traectoria_section").innerWidth();
    // traectoria_section_width = 280;
    margin_left = margin_left + traectoria_section_width;
    $(".traectories_scroll_line").css({'margin-right':margin_left +'px'});

    traectoria_offset += traectoria_section_width;

    if (traectoria_offset == traectoria_line_width - traectories_width) {
        $(".traectoria_scroll > .right").addClass('not-active');
    }else{
        $(".traectoria_scroll > .right").removeClass('not-active');
    }

    $(".traectoria_scroll > .left").removeClass('not-active');
});

$(".traectoria_line-today").click(function(e) {
    e.preventDefault();
    $(".traectories_scroll_line").css('margin-right', '0px');

    $(".traectoria_scroll > .left").removeClass('not-active');
    $(".traectoria_scroll > .right").addClass('not-active');

    traectoria_offset = traectoria_line_width - traectories_width;
    margin_left = 0;
});

$(".competencies_btn").click(function(e) {
    e.preventDefault();

    $(this).toggleClass('show');

    $(this).parent().parent().toggleClass('open');

    $(this).parent().parent().find('.full_info').slideToggle();

    if ($(this).hasClass('show')){
        $('.table_row.open .full_info .progress div').each(function(i,elem) {
            let timeout = i * 100;

            let progress = $(this).data("progress");

            setTimeout(() => {
                $(this).width(progress + "%");
            }, timeout);
        });
    } else {
        $('.table_row:not(.open) .full_info .progress div').each(function(i,elem) {
            $(this).width("0");
        });
    }

});

$(".table_row > div .del").click(function(e) {
    e.preventDefault();
    $(this).parent().parent().slideToggle();

    setTimeout(() => {
        $(this).parent().parent().remove();
    }, 1000);
});

$('.speedometers .speedometer .arrow > div').each(function(i,elem) {
    let timeout = i * 100;

    let speedometer = $(this).data("speedometer");

    setTimeout(() => {
        $(this).css('transform', 'rotate(' + speedometer + 'deg)');
    }, timeout);
});


$('.rating-content .progress div').each(function(i,elem) {
    let timeout = i * 100;

    let progress = $(this).data("progress");

    setTimeout(() => {
        $(this).width(progress + "%");
    }, timeout);
});



render_radar([200, 320, 210, 330, 540]);















































