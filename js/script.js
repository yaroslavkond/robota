$(window).load(function() {
    setTimeout(function () {
        $(".wr1").addClass("animated");
    }, 2000);

    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
});


$(document).ready(function(){
    DebugHandler();

    //SpeedUpHandler();
    DialogHandler();
    FormsHandler();
    //Timer();
    Hacks();
    CustomHandler();
    AutoGenerate();
    //GMapHandler();
    Calculator();
});

// Примеры скриптов:
// https://gitlab.conversionart.ru/deadsandro/ca-starter-pack/snippets

///** lazy load для фонов и картинок ниже двух высот экрана ( threshold: 2 * $(window).height(), )
// * Подключение:
// * 1) в style.css раскомментировать базовый стиль для .lazy
// * 2) в plugins.js раскомментировать плагин lazy
// * 3) расскоментировать функцию ниже и ее вызов SpeedUpHandler(); выше
// * Поясниене исползования:
// * - если картинка фоном у дива, то добавляем классы lazy и loading, а в css убираем стиль фона для этого элемента
// * - если для картинки ( тег img ), то добавляем класс lazy и loading, а добавляем data-src="" и внутрь переностим путь к картинке, а src="" оставляем пустым
// * - Использование для картинок, шаблон:
// * - img.img.lazy.loading(data-src='img/__________.__g', alt='', width='___', height='___', src='')
// * - Важно проверять какое св-во display задается скриптом картинке, т.к. иногда скрипт выставляет display: inline картинке, которая должна быть display: block
// * - когда крипт выставляет display: inline нужно явно прописать display: block для картинки
// * - img.img.lazy.loading(data-src='img/__________.__g', alt='', width='___', height='___', src='', style='display: block;')
// * - Использование для фоновых изображений, шаблон:
// * - .wr.wr1.lazy.loading(data-src='img/__________.__g')
// * */
//var SpeedUpHandler = function() {
//    $(".lazy").addClass('loading').lazy({
//        combined: true,
//        delay: 12500,
//        scrollDirection: 'vertical',
//        visibleOnly: false,
//        threshold: 2 * $(window).height(),
//        defaultImage : "",
//        afterLoad: function(element) {
//            element.removeClass("loading").addClass("loaded");
//        },
//        effect: "fadeIn",
//        effectTime: 300
//    });
//};

var $modal = $('.modal');
var $modalCallback = $('#modal-callback');
var $modalWomans = $('#modal-womans');
var $modalBusiness = $('#modal-business');
var $modalQuestion = $('#modal-question');
var $modalComments = $('#modal-comments');
var $modalCommunication = $('#modal-communication');
var $modalProgram = $('#modal-program');
var $modalPrice = $('#modal-price');
var $modalLesson = $('#modal-lesson');
var $modalLogo = $('#modal-logo');
var $modalPrivacy = $('#modal-privacy');
var $html = $('html');
var $body = $('body');

/**
 * DEBUG_MODE. битовая маска
 * 1 - отключает отправку полей
 * 2 - отображает алертом все отправляемые поля
 * 4 - отключает проверку обязательности полей
 */
window.DEBUG_MODE = 0;

var DialogHandler = function() {
    $('.open-callback').click(function(e) {
        e.preventDefault();
        $modalCallback.modal('show');
    });

    $('.open-logo').click(function(e) {
        e.preventDefault();
        if ($(window).width() >= 768) {
            $modalLogo.modal('show');
        }
    });

    $(window).on('resize', function () {
        if ($(window).width() <= 767) {
            $modalLogo.modal('hide');
        }
    });

    $modalLogo.find(".btn-custom").click(function (e) {
        e.preventDefault();

        $modalLogo.modal('hide');
    });

    $('.open-womans').click(function(e) {
        e.preventDefault();

        var $thisClass = $(this).data("class");
        var $thisImg = $(this).data("img");
        var $thisPoster = $(this).data("poster");
        var $thisTitle = $(this).data("title");
        var $thisMessage = $(this).data("message");
        var $thisText = $(this).data("text");
        var $thisVideo = $(this).data("video");

        if ($thisClass == "padding") {
            $modalWomans.find(".modal-message").removeClass("no-padding");
            $modalWomans.find(".modal-message").addClass("padding");
        }
        else {
            $modalWomans.find(".modal-message").removeClass("padding");
            $modalWomans.find(".modal-message").addClass("no-padding");
        }

        $modalWomans.find(".img").attr("src", $thisImg);
        $modalWomans.find(".video").children("img").attr("src", $thisPoster);
        $modalWomans.find(".video").attr("href", $thisVideo);
        $modalWomans.find(".modal-title").html($thisTitle);
        $modalWomans.find(".modal-message").html($thisMessage);
        $modalWomans.find(".modal-subtitle").html($thisText);

        $modalWomans.modal('show');
    });

    $modalWomans.find(".video").click(function (e) {
        e.preventDefault();

        if ($(this).hasClass("close"))
            return false;

        var $thisVideo = $(this).attr("href");

        $modalWomans.find(".video").addClass("close");

        setTimeout(function () {
            $modalWomans.find(".iframe").html('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+$thisVideo+'?autoplay=1&amp;autohide=1&amp;showinfo=0&amp;rel=0" frameborder="0" allowfullscreen="" allow="autoplay"></iframe>')
        }, 600);

        $modalWomans.on("hidden.bs.modal", function() {
            $modalWomans.find(".video").removeClass("close");

            setTimeout(function () {
                $modalWomans.find(".iframe").html("");
            }, 600);
        });
    });

    $modalWomans.find(".btn-default").click(function (e) {
        e.preventDefault();

        $modalWomans.modal('hide');
    });

    $('.open-business').click(function(e) {
        e.preventDefault();
        $modalBusiness.modal('show');
    });

    $modalBusiness.find(".btn-default").click(function (e) {
        e.preventDefault();

        $modalBusiness.modal('hide');
    });

    $('.open-question').click(function(e) {
        e.preventDefault();
        $modalQuestion.modal('show');
    });

    $('.open-comments').click(function(e) {
        e.preventDefault();

        var $thisName = $(this).find(".name").text();
        var $thisText = $(this).find(".text").html();
        var $thisImg = $(this).find(".img").attr("src");
        var $thisVideo = $(this).data("video");
        var $thisLink = $(this).data("link");

        $modalComments.find(".modal-comments .modal-name").text($thisName);
        $modalComments.find(".modal-comments .modal-text").html($thisText);
        $modalComments.find(".modal-comments .video img").attr("src", $thisImg);
        $modalComments.find(".modal-comments .iframe").html('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+$thisVideo+'?autoplay=1&amp;autohide=1&amp;showinfo=0&amp;rel=0" frameborder="0" allowfullscreen="" allow="autoplay"></iframe>');
        $modalComments.find(".btn-custom").attr("href", $thisLink);

        $modalComments.modal('show');
    });

    $modalComments.on("hidden.bs.modal", function() {
        $modalComments.find(".iframe").html("");
    });

    $modalComments.find(".btn-custom").click(function (e) {
        e.preventDefault();

        $.scrollTo($(this).attr("href"), 1500, {
            interrupt: false
        });

        $modalComments.modal("hide");
    });

    $('.open-communication').click(function(e) {
        e.preventDefault();

        $modalCommunication.modal('show');
    });

    $modalCommunication.on('shown.bs.modal', function () {
        var $modalCommunication_slider = $modalCommunication.find(".items");
        var $modalCommunication_arrow_left = $modalCommunication.find(".arrows").children(".left");
        var $modalCommunication_arrow_right = $modalCommunication.find(".arrows").children(".right");
        var $modalCommunication_slider_settings = {
            variableWidth: true,
            centerMode: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: $modalCommunication_arrow_left,
            nextArrow: $modalCommunication_arrow_right,
            dots: false
        };
        $modalCommunication_slider.slick($modalCommunication_slider_settings);
    });

    $modalCommunication.find(".btn-custom").click(function (e) {
        e.preventDefault();

        $modalCommunication.modal('hide');
    });

    $('.open-program').click(function(e) {
        e.preventDefault();

        var $dataTitle = $(this).data("title");
        var $dataSubtitle = $(this).data("subtitle");
        var $dataText = $(this).data("text");
        var $dataBg = $(this).data("bg");
        var $dataGoal = $(this).data("goal");
        var $dataAdditional = $(this).data("additional");

        $modalProgram.find(".modal-title").html($dataTitle);
        $modalProgram.find(".modal-subtitle").html($dataSubtitle);
        $modalProgram.find(".modal-text").html($dataText);
        $modalProgram.find(".bg").attr("src", $dataBg);
        $modalProgram.find(".modal-info").css('background-image', 'url('+$dataBg+')');
        $modalProgram.find("input[name='goal']").val($dataGoal);
        $modalProgram.find("input[name='additional']").val($dataAdditional);

        $modalProgram.modal('show');
    });

    $('.open-price').click(function(e) {
        e.preventDefault();

        var $thisGoal = $(this).data("goal");

        $modalPrice.find('input[name="goal"]').val($thisGoal);

        $modalPrice.find('input[name="additional"]').val("Узнайте стоимость программы "+$thisGoal+" и забронируйте за собой скидку 15%");

        $modalPrice.modal('show');
    });

    $('.open-lesson').click(function(e) {
        e.preventDefault();
        $modalLesson.modal('show');
    });

    $modalLesson.on('shown.bs.modal', function () {
        var $modalLesson_slider = $modalLesson.find(".items");
        var $modalLesson_arrow_left = $modalLesson.find(".arrows").children(".left");
        var $modalLesson_arrow_right = $modalLesson.find(".arrows").children(".right");
        var $modalLesson_slider_settings = {
            variableWidth: true,
            centerMode: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: $modalLesson_arrow_left,
            nextArrow: $modalLesson_arrow_right,
            dots: false
        };
        $modalLesson_slider.slick($modalLesson_slider_settings);
    });

    $modalLesson.find(".btn-default").click(function (e) {
        e.preventDefault();

        $modalLesson.modal('hide');
    });

    $('.open-privacy').click(function(e) {
        e.preventDefault();
        $modalPrivacy.modal('show');
    });

    $('.open-privacy-modal').click(function(e) {
        e.preventDefault();
        $modal.modal('hide');
        setTimeout(function () {
            $modalPrivacy.modal('show');
        }, 600);
    });

    $modalCallback.find(".link").click(function (e) {
        e.preventDefault();

        $modalCallback.find(".link").removeClass("active");
        $(this).addClass("active");

        var $thisData = $(this).data("time");
        var $thisInput = $modalCallback.find(".input-time");
        var $whencall = $modalCallback.find("input[name='whencall']");

        $whencall.attr("value", $thisData);

        if ($thisData == "сейчас") {
            $thisInput.removeClass("active");

            setTimeout(function () {
                $thisInput.slideUp("300");
            }, 300);
        }
        else if ($thisData == "по времени") {
            $thisInput.slideDown("300");

            setTimeout(function () {
                $thisInput.addClass("active");
            }, 300);
        }
    });

    $('label[for]').on('click', function (e) {
        var target = window[this.htmlFor];
        target.checked = !target.checked;
        e.preventDefault();
    });
};

var afterSendExecuted;
var FormsHandler = function() {

    $('.btn-group input').bind('click keyup',function(){
        $(this).removeClass('error').parent().removeClass('error');
    });

    $('.order-form').ajaxForm({
        url:           '/template/order.php',
        beforeSubmit:  before_send,
        success:       after_send
    });

    $('input[type=text]').placeholder();
    $('input[name="phone"]').mask("+7 (999) 999-99-99");

    function before_send(formData, jqForm, options) {
        $('.btn-group .error').removeClass('error').parent().removeClass('error');

        var is_error = false;
        $.each(formData, function(idx, el){
            if (window.DEBUG_MODE & 4)
                return true;

            var $elem = jqForm.find( 'input[name=' + el.name + '], textarea[name=' + el.name + ']' );

            if ( $elem && $elem.length && el.type != 'hidden' && !el.value && !$elem.attr('readonly') && !$elem.hasClass('not-validate') ||
                (el.value && el.name=='email' && !$elem.attr('readonly') && !Util.validateEmail(el.value)) )
            {
                if ( $elem.hasClass('placeholder')) // ie
                {
                    $elem.addClass('error').parent().addClass('error');
                }
                else
                {
                    $elem.addClass('error').parent().addClass('error');
                    $elem.focus();
                }

                is_error = true;
                return false;
            }
        });

        if (is_error)
            return false;

        formData.push({name: 'version', value: window.VERSION ? window.VERSION : '' });

        try {
            formData.push({name: 'utm_type', value: sbjs.get.current.typ });

            formData.push({name: 'utm_source', value: sbjs.get.current.src });
            formData.push({name: 'utm_medium', value: sbjs.get.current.mdm });
            formData.push({name: 'utm_campaign', value: sbjs.get.current.cmp });

            formData.push({name: 'utm_term', value: sbjs.get.current.trm });
            formData.push({name: 'utm_content', value: sbjs.get.current.cnt });
        } catch (e) {}


        var result_text = jqForm.data('result');
        var default_result_text = 'В течение 5 минут с вами <br>свяжется наш менеджер';
        result_text = result_text ? result_text : default_result_text;
        $('#modal-result-text').html(result_text);

        if (window.DEBUG_MODE & 2) {
            var alert_result_text = "Result Text: " + result_text;
            var alert_text = "\n\nОсновная информация: \n";
            var alert_text_additional = "\nСлужебная информация: \n";
            var alert_text_utm = "\nUTM метки: \n";
            $.each(formData, function(idx, data){
                var text = data.name + ": " + data.value + "\n";

                var additional_fields = {
                    goal: 1, additional: 1,additional2: 1, version: 1
                };
                if (additional_fields[data.name]) {
                    alert_text_additional += text;
                } else if (data.name.substr(0,4) == 'utm_') {
                    alert_text_utm += text;
                } else {
                    alert_text += text;
                }
            });
            alert(alert_result_text + alert_text + alert_text_additional + alert_text_utm);
        }

        if (window.DEBUG_MODE & 1) {
            return false;
        }

        var goal = jqForm.find('[name=goal]').val();
        if (goal) {
            try {
                yaCounter53824495.reachGoal( goal );
                ga('send', 'event', 'lead', goal);
            }
            catch (e){ }
        }


        $('[type=submit]').attr('disabled','disabled');

        afterSendExecuted = false;
        setTimeout(function(){ after_send(null,null,null,jqForm); }, 700);

        return true;
    }

    function after_send(responseText, statusText, xhr, $form)  {
        if (afterSendExecuted)
            return;

        afterSendExecuted = true;

        var orderName = $form.find("input[name='name']").val();
        var orderWhenCall = $form.find("input[name='whencall']").val();
        var orderGoal = $form.find("input[name='goal']").val();

        Cookies.set('name', orderName);
        Cookies.set('whencall', orderWhenCall);
        Cookies.set('goal', orderGoal);

        window.location.href = "thanks.html";
    }
};

/*
var Timer = function() {
    function CountdownTimer(elm_id,tl,mes){
        this.initialize.apply(this,arguments);
    }
    function getRandomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    CountdownTimer.prototype={
        initialize:function(elm_id,tl,mes) {
            this.elem = document.getElementById(elm_id);
            this.elem_days = $('.js-timer-days');
            this.elem_hours = $('.js-timer-hours');
            this.elem_minutes = $('.js-timer-minutes');
            this.elem_seconds = $('.js-timer-seconds');

            this.elem_label_days = $('.js-label-days');
            this.elem_label_hours = $('.js-label-hours');
            this.elem_label_minutes = $('.js-label-minutes');
            this.elem_label_seconds = $('.js-label-seconds');

            this.tl = tl;
            this.mes = mes;

            this.countDown();
        },countDown:function(){
            var today=new Date();
            var day=Math.floor((this.tl-today)/(24*60*60*1000));
            var hour=Math.floor(((this.tl-today)%(24*60*60*1000))/(60*60*1000));
            var min=Math.floor(((this.tl-today)%(24*60*60*1000))/(60*1000))%60;
            var sec=Math.floor(((this.tl-today)%(24*60*60*1000))/1000)%60%60;
            var me=this;

            if( ( this.tl - today ) > 0 ){
                this.elem_days.text( this.addZero(day) );
                this.elem_hours.text( this.addZero(hour) );
                this.elem_minutes.text( this.addZero(min) );
                this.elem_seconds.text( this.addZero(sec) );

                this.elem_label_days.text( this.plural_str(day,'день','дня','дней') );
                this.elem_label_hours.text( this.plural_str(hour,'час','часа','часов') );
                this.elem_label_minutes.text( this.plural_str(min,'минута','минуты','минут') );
                this.elem_label_seconds.text( this.plural_str(sec,'секунда','секунды','секунд') );

                tid = setTimeout( function(){me.countDown();},500 );
            }
            else
            {
                return;
            }
        },addZero:function(num){ return ('0'+num).slice(-2); },
        plural:function (a){
            if ( a % 10 == 1 && a % 100 != 11 ) return 0
            else if ( a % 10 >= 2 && a % 10 <= 4 && ( a % 100 < 10 || a % 100 >= 20)) return 1
            else return 2;
        },
        plural_str:function (i, str1, str2, str3){
            switch (this.plural(i)) {
                case 0: return str1;
                case 1: return str2;
                default: return str3;
            }
        }
    };

    function CDT(){
        if (timer_type == 1) {
            var dateDown = $.cookie('cdt');
            var now = new Date();

            if (!dateDown || dateDown < now.getTime() && timer_days)
            {
                timer_days = parseInt(timer_days);
                dateDown = now.getTime() + timer_days*24*60*60*1000 + getRandomInt(1,4)*60*60*1000 - getRandomInt(1,4)*60*60*1000 - getRandomInt(1,26)*60*1000 + getRandomInt(1,26)*1000;
                $.cookie('cdt',dateDown, { expires: timer_days , path: '/' });
            }
            dateDown = new Date( parseInt(dateDown) );
        }
        else if (timer_type == 2) {
            dateDown = new Date( timer_date*1000  );
        }

        var tl = new Date(dateDown);
        var timer = new CountdownTimer('timer',tl,'');;
    }

    CDT();
};*/

window.isMobile = window.isMobile || false;
var Hacks = function() {
    if( isMobile.apple.device ) {
        $html.addClass( 'iOS' );

        var iOS_version = parseFloat(
                ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1])
                    .replace('undefined', '3_2').replace('_', '.').replace('_', '')
            ) || false;

        var int_iOS_version = parseInt(iOS_version);
        if (int_iOS_version)
            $html.addClass( 'iOS' + int_iOS_version );
    }
};

var CustomHandler = function() {
    if(!isMobile.any ) {
        $('a[href*=tel]').removeAttr('href');
    }
    if(isMobile.any ) {
        $(".scrollme").removeClass('scrollme');
    }
    sbjs.init();
    $(".scrollTo").click(function(e) {
        e.preventDefault();
        $.scrollTo($(this).attr("href"), 1500, {
            interrupt: false
        });
    });




    //Форма
    $('input,textarea').not("input[name='phone']").focus(function () {
        $(this).data('placeholder', $(this).attr('placeholder'));
        $(this).attr('placeholder', '');
    });
    $('input,textarea').not("input[name='phone']").blur(function () {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });
    //Форма конец




    //Закрытие модалки по клавище ESC
    $(document).keydown(function(eventObject){
        if( eventObject.which == 27 ){
            if (!isMobile.any) {
                $modal.modal('hide');
            }
        }
    });
    //Закрытие модалки по клавище ESC конец




    //Лейблы на формах
    var $orderForm = $(".order-form");
    $orderForm.each(function () {
        var $this = $(this);
        $this.find(".type-label").find("label").click(function () {
            $this.find(".type-label").children("label").removeClass("active");
            $(this).addClass("active");
        })
    });
    //Лейблы на формах конец




    //обновление дня
    var $wr1 = $(".wr1");
    var date = new Date();
    date.setDate(date.getDate() + 1);
    var Msg;
    var _month = date.getMonth();

    _month = parseFloat(_month);

    if (_month == 0) {
        Msg = date.getDate();
        $wr1.find(".date").children("span").text(Msg+" января");
    }
    if (_month == 1) {
        Msg = date.getDate();
        if (Msg == 28) {
            $wr1.find(".date").children("span").text("1 марта");
        }
        else if (Msg >= 29) {
            $wr1.find(".date").children("span").text("1 марта");
        }
        else {
            $wr1.find(".date").children("span").text(Msg+" февраля");
        }
    }
    if (_month == 2) {
        Msg = date.getDate();
        $wr1.find(".date").children("span").text(Msg+" марта");
    }
    if (_month == 3) {
        Msg = date.getDate();
        if (Msg >= 30) {
            $wr1.find(".date").children("span").text("30 апреля");
        }
        else {
            $wr1.find(".date").children("span").text(Msg+" апреля");
        }
    }
    if (_month == 4) {
        Msg = date.getDate();
        $wr1.find(".date").children("span").text(Msg+" мая");
    }
    if (_month == 5) {
        Msg = date.getDate();
        if (Msg >= 30) {
            $wr1.find(".date").children("span").text("30 июня");
        }
        else {
            $wr1.find(".date").children("span").text(Msg+" июня");
        }
    }
    if (_month == 6) {
        Msg = date.getDate();
        $wr1.find(".date").children("span").text(Msg+" июля");
    }
    if (_month == 7) {
        Msg = date.getDate();
        $wr1.find(".date").children("span").text(Msg+" августа");
    }
    if (_month == 8) {
        Msg = date.getDate();
        if (Msg >= 30) {
            $wr1.find(".date").children("span").text("30 сентября");
        }
        else {
            $wr1.find(".date").children("span").text(Msg+" сентября");
        }
    }
    if (_month == 9) {
        Msg = date.getDate();
        $wr1.find(".date").children("span").text(Msg+" октября");
    }
    if (_month == 10) {
        Msg = date.getDate();
        if (Msg >= 30) {
            $wr1.find(".date").children("span").text("30 ноября");
        }
        else {
            $wr1.find(".date").children("span").text(Msg+" ноября");
        }
    }
    if (_month == 11) {
        Msg = date.getDate();
        $wr1.find(".date").children("span").text(Msg+" декабря");
    }
    //обновление дня конец



    //страница благодарности
    var $wrAll = $(".wr_all").attr("id");
    var $wrThanks = $(".wr-thanks");
    var $thanks = $wrThanks.find(".thanks");
    var $thanks_1 = $wrThanks.find(".thanks-1");
    var $thanks_2 = $wrThanks.find(".thanks-2");
    var $thanks_3 = $wrThanks.find(".thanks-3");
    var $thanks_4 = $wrThanks.find(".thanks-4");
    var $thanks_5 = $wrThanks.find(".thanks-5");
    if ($wrAll === "page-thanks") {
        $thanks.hide();

        var $thanksHash = window.location.hash;

        if ($thanksHash === "#sb4") {
            $thanks_4.show();
            $thanks_4.find(".title").text("Ваша оплата прошла успешно!");
        } else {
            if (Cookies.get('goal') === "callback") {
                var cockieText = Cookies.get('whencall');

                if (cockieText == "сейчас") {
                    $thanks_5.find(".text span").text("ближайшее рабочее время");
                }
                else if (cockieText == "по времени") {
                    $thanks_5.find(".text span").text("в указанное время");
                }

                $thanks_5.show();
            }

            if (
                Cookies.get('goal') === "calculator" ||
                Cookies.get('goal') === "promo-small" ||
                Cookies.get('goal') === "step-small" ||
                Cookies.get('goal') === "promo" ||
                Cookies.get('goal') === "program-1" ||
                Cookies.get('goal') === "program-2" ||
                Cookies.get('goal') === "program-3" ||
                Cookies.get('goal') === "program-4" ||
                Cookies.get('goal') === "program-5" ||
                Cookies.get('goal') === "program-6" ||
                Cookies.get('goal') === "program-7" ||
                Cookies.get('goal') === "program-8" ||
                Cookies.get('goal') === "program-9" ||
                Cookies.get('goal') === "program-10" ||
                Cookies.get('goal') === "Lite" ||
                Cookies.get('goal') === "Standart" ||
                Cookies.get('goal') === "Pro"
            ) {
                $thanks_1.show();

                //Таймер
                Cookies.remove('time');
                Cookies.remove('user');

                var remain_bv;
                var user = parseInt(Cookies.set("user") || 0) + 1;
                Cookies.set("user", user);
                if (user == 1) {
                    remain_bv = 3599;
                } else {
                    remain_bv = Cookies.get("time");
                }

                function parseTime_bv(timestamp) {
                    if (timestamp < 0) timestamp = 0;

                    var hour = Math.floor(timestamp / 60 / 60);
                    var mins = Math.floor((timestamp - hour * 60 * 60) / 60);
                    var secs = Math.floor(timestamp - hour * 60 * 60 - mins * 60);

                    Cookies.set("time", mins * 60 + secs);
                    Cookies.set("seconds", date.getSeconds());
                    Cookies.set("minutes", date.getMinutes());
                    Cookies.set("hours", date.getHours());

                    if (Cookies.set("hours") <= date.getHours()) {
                        if (Cookies.set("minutes") < date.getMinutes()) {
                            var $minutes = date.getMinutes() - Cookies.set("minutes");
                            if ($minutes >= 20) {
                                Cookies.set("time", 0);
                            }
                            else {
                                Cookies.set("time", $minutes * 60 + getSeconds());
                            }
                        }
                    }

                    if (String(mins).length > 1)
                        $('.js-timer-minutes').text(mins);
                    else
                        $('.js-timer-minutes').text("0" + mins);
                    if (String(secs).length > 1)
                        $('.js-timer-seconds').text(secs);
                    else
                        $('.js-timer-seconds').text("0" + secs);

                    if (Cookies.get("time") <= 0) {
                        $wrThanks.find(".timer").addClass("disabled");
                        $wrThanks.find(".information").addClass("disabled");
                        $wrThanks.find(".btn-custom").children(".flare").remove();
                    } //что произойдёт по окончании времени

                };
                setInterval(function () {
                    remain_bv = remain_bv - 1;
                    parseTime_bv(remain_bv);
                }, 1000);
                //Таймер конце
            }

            if (Cookies.get('goal') === "question") {
                $thanks_3.show();
                $thanks_3.find(".title").children("span").text(Cookies.get('name'));
            }
        }

    }




    //thanks-2 табы
    var $thanks_2_small_nav = $thanks_2.find(".navigation").children(".link");
    var $thanks_2_small_tab = $thanks_2.find(".tab");

    $thanks_2_small_nav.click(function (e) {
        e.preventDefault();

        if ($(this).hasClass("active"))
            return false;

        var activeTab = $(this).attr("href");

        $thanks_2_small_nav.removeClass("active");
        $thanks_2_small_tab.removeClass("active");
        $(this).addClass("active");

        setTimeout(function () {
            $thanks_2_small_tab.slideUp(300);
            $(activeTab).slideDown(300);
        }, 300);

        setTimeout(function () {
            $(activeTab).addClass("active");
        }, 650);
    });
    //thanks-2 табы конец




    //Попап видео
    $('.popup-youtube').each(function () {
        $(this).magnificPopup({
            type: 'iframe'
        });
    });
    //Попап видео конец




    var $menu_header = $(".wr-header").find(".lines");
    var $menu_mobile = $(".mobile-menu");

    $menu_header.click(function () {
        $menu_mobile.addClass("active");
    });

    $menu_mobile.find(".backdrop").click(function () {
        $menu_mobile.removeClass("active");
    });

    $menu_mobile.find(".open-callback-modal").click(function () {
        $menu_mobile.removeClass("active");

        setTimeout(function () {
            $modalCallback.modal('show');
        }, 600);
    });

    $menu_mobile.find(".link").click(function (e) {
        e.preventDefault();

        $menu_mobile.removeClass("active");
    });





    //Плавающая кнорка
    var $wrPhone = $(".wr-phone");
    var $wrFooter = $(".wr-footer");
    $(window).scroll(function () {
        if ($(this).scrollTop() + $(window).height() > $wrFooter.offset().top) {
            if($wrPhone.hasClass("closet"))
                return false;
            else {
                $wrPhone.addClass("close");
            }
        }
        else if ($(this).scrollTop() + $(window).height() < $wrFooter.offset().top) {
            if($wrPhone.hasClass("closet"))
                return false;
            else {
                $wrPhone.removeClass("close");
            }
        }
    });
    //Плавающая кнорка конец





    //wr1 слайдер
    var $wr1 = $(".wr1");
    var $wr1_slider = $wr1.find(".items");
    var $wr1_pagination = $wr1.find(".pagination");
    var $wr1_settings = {
        variableWidth: true,
        //slidesToShow: 1,
        infinite: true,
        arrows: false,
        dots: true,
        appendDots: $wr1_pagination,
        customPaging: function () {
            return "";
        }
    };
    if ($(window).width() <= 767) {
        $wr1_slider.slick($wr1_settings);
    }
    if ($(window).width() >= 768) {
        if ($wr1_slider.hasClass('slick-initialized')) {
            $wr1_slider.slick('unslick');

            $wr1_slider.find(".item").removeAttr("style");
        }
    }
    $(window).on('resize', function () {
        if ($(window).width() >= 768) {
            if ($wr1_slider.hasClass('slick-initialized')) {
                $wr1_slider.slick('unslick');
            }
            setTimeout(function () {
                $wr1_slider.find(".item").removeAttr("style");
            }, 300);
        }
        if ($(window).width() <= 767) {
            $wr1_slider.slick($wr1_settings);
        }
    });
    //wr1 слайдер конец




    //wr3 слайдер
    var $wr3 = $(".wr3");
    var $wr3_slider = $wr3.find(".items");
    var $wr3_arrow_left = $wr3.find(".arrows").children(".left");
    var $wr3_arrow_right = $wr3.find(".arrows").children(".right");
    var $wr3_slider_settings = {
        variableWidth: true,
        centerMode: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $wr3_arrow_left,
        nextArrow: $wr3_arrow_right,
        dots: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    variableWidth: false,
                    centerMode: false,
                    slidesToShow: 1
                }
            }
        ]
    };
    $wr3_slider.slick($wr3_slider_settings);
    //wr3 конец




    //wr5 слайдер
    var $wr5 = $(".wr5");
    var $wr5_slider = $wr5.find(".items");
    var $wr5_arrow_left = $wr5.find(".arrows").children(".left");
    var $wr5_arrow_right = $wr5.find(".arrows").children(".right");
    var $wr5_slider_settings = {
        variableWidth: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $wr5_arrow_left,
        nextArrow: $wr5_arrow_right,
        speed: 900,
        dots: false,
        touchThreshold: 100,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    variableWidth: false,
                    slidesToShow: 1
                }
            }
        ]
    };
    $wr5_slider.slick($wr5_slider_settings).on('afterChange', function(event, slick, currentSlide){
        var $this = $wr5_slider.find(".slick-current");
        var $thisPrevImg = $this.prev().find(".avatar").attr("src");
        var $thisNextImg = $this.next().find(".avatar").attr("src");
        $wr5_arrow_left.children("img").attr("src", $thisPrevImg);
        $wr5_arrow_right.children("img").attr("src", $thisNextImg);

        if ($(window).width() <= 767) {
            var _height = $wr5_slider.find(".img").height();
            $wr5.find(".arrows").children("a").css("height", _height);
        }
        if ($(window).width() >= 768) {
            $wr5.find(".arrows").children("a").css("height", 104);
        }
    });
    //wr5 конец

    //wr5 высота стрелок
    if ($(window).width() <= 767) {
        var _height = $wr5_slider.find(".img").height();
        $wr5.find(".arrows").children("a").css("height", _height);
    }
    if ($(window).width() >= 768) {
        $wr5.find(".arrows").children("a").css("height", 104);
    }
    $(window).on('resize', function () {
        if ($(window).width() <= 767) {
            var _height = $wr5_slider.find(".img").height();
            $wr5.find(".arrows").children("a").css("height", _height);
        }
        if ($(window).width() >= 768) {
            $wr5.find(".arrows").children("a").css("height", 104);
        }
    });
    //wr5 высота стрелок конец




    //wr6 спойлер
    var $wr6 = $(".wr6");
    var $wr6_more = $wr6.find(".more");
    var $wr6_text = $wr6.find(".text").children("p");

    $wr6_more.click(function (e) {
        e.preventDefault();

        $(this).fadeOut(300);
        $wr6_text.slideDown(300);

        setTimeout(function () {
            $wr6_text.addClass("active");
        }, 300);
    });
    //wr6 спойлер конец




    //wr7 слайдер
    var $wr7 = $(".wr7");
    var $wr7_slider = $wr7.find(".items");
    var $wr7_slider_video = $wr7.find(".information");
    var $wr7_arrow_up = $wr7.find(".arrows").find(".up");
    var $wr7_arrow_down = $wr7.find(".arrows").find(".down");
    var $wr7_arrow_left = $wr7.find(".arrows").find(".left");
    var $wr7_arrow_right = $wr7.find(".arrows").find(".right");
    var $wr7_num = $wr7.find(".arrows").find(".num");
    var $wr7_settings = {
        slidesToShow: 3,
        infinite: true,
        arrows: true,
        prevArrow: $wr7_arrow_up,
        nextArrow: $wr7_arrow_down,
        dots: false,
        vertical: true,
        verticalSwiping: true,
        focusOnSelect: true,
        asNavFor: $wr7_slider_video
    };
    var $wr7_settings_video = {
        slidesToShow: 1,
        infinite: true,
        fade: true,
        arrows: false,
        asNavFor: $wr7_slider,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    fade: false,
                    arrows: true,
                    prevArrow: $wr7_arrow_left,
                    nextArrow: $wr7_arrow_right
                }
            }
        ]
    };

    $wr7_slider.slick($wr7_settings).on("afterChange", function(event, slick, currentSlide, nextSlide){
        $wr7_num.text(currentSlide + 1+" из "+$wr7_count);
    });
    $wr7_slider_video.slick($wr7_settings_video).on("afterChange", function(event, slick, currentSlide, nextSlide){
        if ($(window).width() <= 767) {
            var _height = $wr7_slider_video.find("img").height();
            $wr7.find(".info-slider .arrows").children("a").css("height", _height);
        }
    });

    var $wr7_count = $wr7_slider.slick("getSlick").slideCount;
    $wr7_num.text("1 из "+$wr7_count);

    if ($(window).width() <= 767) {
        var _height = $wr7_slider_video.find("img").height();
        $wr7.find(".info-slider .arrows").children("a").css("height", _height);
    }
    $(window).on('resize', function () {
        if ($(window).width() <= 767) {
            var _height = $wr7_slider_video.find("img").height();
            $wr7.find(".info-slider .arrows").children("a").css("height", _height);
        }
    });
    //wr7 слайдер конец




    //wr9 табы мобильная
    /*
    var $wr9 = $(".wr9-small");
    var $wr9_item = $wr9.find(".item");
    var _wr9_swap;
    var _wr9_text;

    $wr9_item.click(function () {
        if ($(window).width() <= 767) {
            $wr9_item.not(this).removeClass("active");
            $(this).toggleClass("active");

            _wr9_swap = $(this).data("swap");
            _wr9_text = $(this).data("text");

            $wr9_item.data("text", "Подробнее");
            $wr9_item.data("swap", "Скрыть");
            $wr9_item.find(".link").children().text("Подробнее");

            $(this).data("text", _wr9_swap);
            $(this).data("swap", _wr9_text);

            $(this).find(".link").children().text(_wr9_swap);
        }
    });
    */
    //wr9 табы мобильная конец




    //wr10 табы
    var $wr10 = $(".wr10");
    var $wr_info = $(".wr-info");
    var $wr10_link = $wr10.find(".medium .navigation").children(".link");
    var $wr10_link_small = $wr10.find(".small .navigation").children(".link");
    var $wr10_bottom_link = $wr10.find(".bottom").children(".more");
    var $wr10_tab = $wr10.find(".medium .items");
    var $wr10_tab_small = $wr10.find(".small .items");

    $wr10_link_small.click(function (e) {
        e.preventDefault();

        var activeTab = $(this).attr("href");

        $wr10_link_small.not(this).removeClass("active");
        $(this).toggleClass("active");

        $wr10_tab_small.not(activeTab).removeClass("active");
        $(this).next().toggleClass("active");
    });

    $wr10_link.click(function (e) {
        e.preventDefault();

        if ($(this).hasClass("active"))
            return false;

        var activeTab = $(this).attr("href");

        $wr10_link.removeClass("active");
        $(this).addClass("active");

        $wr10_tab.removeClass("active");

        setTimeout(function () {
            $wr10_tab.slideUp(300);
            $wr10.find(".medium").find(activeTab).slideDown(300);
        }, 350);

        setTimeout(function () {
            $wr10.find(".medium").find(activeTab).addClass("active");
        }, 700);
    });

    $wr10_bottom_link.click(function (e) {
        e.preventDefault();

        $(this).toggleClass("active");

        if ($(this).hasClass("active")) {
            $wr_info.slideDown(300);

            setTimeout(function () {
                $wr_info.addClass("active");
            }, 350);
        } else {

            $wr_info.removeClass("active");

            setTimeout(function () {
                $wr_info.slideUp(300);
            }, 350);
        }
    });
    //wr10 табы конец




    //wr12 табы мобильная
    var $wr12 = $(".wr12");
    var $wr12_item = $wr12.find(".item");
    var _wr12_swap;
    var _wr12_text;

    $wr12_item.click(function () {
        if ($(window).width() <= 767) {
            $wr12_item.not(this).removeClass("active");
            $(this).toggleClass("active");

            _wr12_swap = $(this).data("swap");
            _wr12_text = $(this).data("text");

            $wr12_item.data("text", "Подробнее");
            $wr12_item.data("swap", "Скрыть");
            $wr12_item.find(".link").children().text("Подробнее");

            $(this).data("text", _wr12_swap);
            $(this).data("swap", _wr12_text);

            $(this).find(".link").children().text(_wr12_swap);
        }
    });
    //wr12 табы мобильная конец




    //wr14 табы мобильная
    var $wr14 = $(".wr14-small");
    var $wr14_item = $wr14.find(".item");
    var _wr14_swap;
    var _wr14_text;

    $wr14_item.click(function () {
        if ($(window).width() <= 767) {
            $wr14_item.not(this).removeClass("active");
            $(this).toggleClass("active");

            _wr14_swap = $(this).data("swap");
            _wr14_text = $(this).data("text");

            $wr14_item.data("text", "Подробнее");
            $wr14_item.data("swap", "Скрыть");
            $wr14_item.find(".link").children().text("Подробнее");

            $(this).data("text", _wr14_swap);
            $(this).data("swap", _wr14_text);

            $(this).find(".link").children().text(_wr14_swap);
        }
    });
    //wr14 табы мобильная конец




    //wr15 слайдер
    var $wr15 = $(".wr15");
    var $wr15_slider = $wr15.find(".items");
    var $wr15_pagination = $wr15.find(".pagination");
    var $wr15_settings = {
        variableWidth: true,
        slidesToShow: 1,
        centerMode: true,
        infinite: true,
        arrows: false,
        dots: true,
        appendDots: $wr15_pagination,
        customPaging: function () {
            return "";
        }
    };
    if ($(window).width() <= 767) {
        $wr15_slider.slick($wr15_settings).on("afterChange", function(event, slick, currentSlide, nextSlide){
            var $thisMessage = $wr15_slider.find(".slick-current").find(".message").html();
            var $thisName = $wr15_slider.find(".slick-current").find(".name").html();
            var $thisPost = $wr15_slider.find(".slick-current").find(".post").html();

            $wr15.find(".information").children(".message").html($thisMessage);
            $wr15.find(".information").children(".name").html($thisName);
            $wr15.find(".information").children(".post").html($thisPost);
        });
        $wr15_slider.slick('slickGoTo', 1);
    }
    if ($(window).width() >= 768) {
        if ($wr15_slider.hasClass('slick-initialized')) {
            $wr15_slider.slick('unslick');

            $wr15_slider.find(".item").removeAttr("style");
        }
    }
    $(window).on('resize', function () {
        if ($(window).width() >= 768) {
            if ($wr15_slider.hasClass('slick-initialized')) {
                $wr15_slider.slick('unslick');
            }
            setTimeout(function () {
                $wr15_slider.find(".item").removeAttr("style");
            }, 300);
        }
        if ($(window).width() <= 767) {
            $wr15_slider.slick($wr15_settings);
        }
    });

    $wr15.find(".link").hover(
        function(){
            $wr15.find(".item").css("z-index", "1");
            $wr15.find(".item-"+$(this).data("num")).css("z-index", "10");

            $wr15.find(".item").removeClass("active");
            $wr15.find(".item-"+$(this).data("num")).addClass("active");
        },function(){
            $wr15.find(".item").not(this).css("z-index", "1");
        }
    );
    //wr15 слайдер конец




    //wr17 слайдер
    var $wr17 = $(".wr17");
    var $wr17_slider = $wr17.find(".items");
    var $wr17_arrow_left = $wr17.find(".arrows").children(".left");
    var $wr17_arrow_right = $wr17.find(".arrows").children(".right");
    var $wr17_slider_settings = {
        variableWidth: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $wr17_arrow_left,
        nextArrow: $wr17_arrow_right,
        speed: 900,
        dots: false,
        touchThreshold: 100,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    variableWidth: false,
                    slidesToShow: 1
                }
            }
        ]
    };
    $wr17_slider.slick($wr17_slider_settings).on('afterChange', function(event, slick, currentSlide){
        var $this = $wr17_slider.find(".slick-current");
        var $thisPrevImg = $this.prev().find(".avatar").attr("src");
        var $thisNextImg = $this.next().find(".avatar").attr("src");
        $wr17_arrow_left.children("img").attr("src", $thisPrevImg);
        $wr17_arrow_right.children("img").attr("src", $thisNextImg);

        if ($(window).width() <= 767) {
            var _height = $wr17_slider.find(".img").height();
            $wr17.find(".arrows").children("a").css("height", _height);
        }
        if ($(window).width() >= 768) {
            $wr17.find(".arrows").children("a").css("height", 104);
        }
    });
    //wr17 конец


    //wr17 высота стрелок
    if ($(window).width() <= 767) {
        var _height = $wr17_slider.find(".img").height();
        $wr17.find(".arrows").children("a").css("height", _height);
    }
    if ($(window).width() >= 768) {
        $wr17.find(".arrows").children("a").css("height", 104);
    }
    $(window).on('resize', function () {
        if ($(window).width() <= 767) {
            var _height = $wr17_slider.find(".img").height();
            $wr17.find(".arrows").children("a").css("height", _height);
        }
        if ($(window).width() >= 768) {
            $wr17.find(".arrows").children("a").css("height", 104);
        }
    });
    //wr17 высота стрелок конец




    //wr9 спойлерыы
    var $wr19 = $(".wr19");
    var $wr19_spoiler = $wr19.find(".spoiler");

    $wr19_spoiler.click(function () {
        var $this = $(this);

        $wr19_spoiler.not($this).removeClass("active");
        $wr19_spoiler.not($this).children(".info").removeClass("active");

        setTimeout(function () {
            $wr19_spoiler.not($this).children(".info").slideUp(300);
        }, 300);

        if($this.hasClass("active")) {
            $this.children(".info").removeClass("active");
            setTimeout(function () {
                $this.removeClass("active");
                $this.children(".info").slideUp(300);
            }, 300);
        }
        else {
            $this.addClass("active");
            $this.children(".info").slideDown(300);

            setTimeout(function () {
                $this.children(".info").addClass("active");
            }, 300);
        }
    });
    //wr9 табы конец




    //wr21-small табы
    var $wr21_small = $(".wr21-small");
    var $wr21_small_navigation = $wr21_small.find(".navigation");
    var $wr21_small_slider = $wr21_small.find(".items");
    var $wr17_bottom = $(".wr17-small.bottom");
    var $wr21_small_slider_settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false
    };
    if ($(window).width() <= 767) {
        $wr21_small_slider.slick($wr21_small_slider_settings).on("afterChange", function(event, slick, currentSlide, nextSlide){
            var $thisGoal = $wr21_small_slider.find(".slick-current").data("goal");

            $wr21_small_navigation.children().removeClass("active");
            $wr21_small_navigation.children().eq(currentSlide).addClass("active");
            $wr17_bottom.find("input[name='goal']").val($thisGoal);
        });
        $wr21_small_slider.slick('slickGoTo', 1);
    }
    if ($(window).width() >= 768) {
        if ($wr21_small_slider.hasClass('slick-initialized')) {
            $wr21_small_slider.slick('unslick');

            $wr21_small_slider.find(".item").removeAttr("style");
        }
    }
    $(window).on('resize', function () {
        if ($(window).width() >= 768) {
            if ($wr21_small_slider.hasClass('slick-initialized')) {
                $wr21_small_slider.slick('unslick');
            }
            setTimeout(function () {
                $wr21_small_slider.find(".item").removeAttr("style");
            }, 300);
        }
        if ($(window).width() <= 767) {
            $wr21_small_slider.slick($wr21_small_slider_settings);
        }
    });

    $wr21_small_navigation.children().click(function (e) {
        e.preventDefault();

        $wr21_small_navigation.children().removeClass("active");
        $(this).addClass("active");

        $wr21_small_slider.slick('slickGoTo', $(this).attr("href"));
    })
    //wr21-small табы конец
};

var Calculator = function () {
    var $calculator = $(".calculator");

    $calculator.each(function () {
        var $this_calculator = $(this);
        var $progress = $this_calculator.find(".bar");
        var $number = $this_calculator.find(".num").children("span");
        var $questions = $this_calculator.find(".questions");
        var $step = $this_calculator.find(".step");
        var $step3 = $this_calculator.find(".step-3");
        var $arrows = $this_calculator.find(".arrows");
        var $prev = $arrows.children(".back");
        var $next = $arrows.children(".next");
        var $next2 = $arrows.children(".next-step");
        var $form = $this_calculator.find(".form");
        var $orderBack = $form.find(".back");
        var $activeStep;
        var $nextStep;
        var $progressWidth;
        var $question;
        var $this;

        $step.not(".step-3").find(".answer").click(function () {
            $this = $(this);
            $activeStep = $(this).parents(".step");

            $activeStep.find(".answer").removeClass("active");
            $this.addClass("active");

            setTimeout(function () {
                $next.click();
            }, 300);
        });

        $step3.find(".answer").not(".last").click(function () {
            $(this).toggleClass("active");

            $step3.find(".answer.last").removeClass("active");
            $step3.find(".answer.last").find("input").removeAttr("checked");


            var num_active = $step3.find(".answer.active").length;
            if (num_active > 0) {
                $next.addClass("active");
                $next2.removeClass("disabled");
                $step3.addClass("add-buttons");
            }
            else {
                $next.removeClass("active");
                $next2.addClass("disabled");
                $step3.removeClass("add-buttons");
            }
        });

        $step3.find(".answer.last").click(function () {
            $(this).addClass("active");

            $step3.find(".answer").not($(this)).removeClass("active");
            $step3.find(".answer").not($(this)).find("input").removeAttr("checked");

            $next.removeClass("active");
            $next2.addClass("disabled");
            $step3.removeClass("add-buttons");

            setTimeout(function () {
                $next.click();
            }, 300);
        });

        $next2.click(function (e) {
            e.preventDefault();

            $next.click();
        });

        $next.click(function (e) {
            e.preventDefault();

            $activeStep = $this_calculator.find(".step.active");
            $nextStep = $this_calculator.find(".step.active").next();

            $prev.removeClass("disabled");

            if ($nextStep.hasClass("add-buttons")) {
                $next2.removeClass("disabled");
                $next.addClass("active");
            } else {
                $next2.addClass("disabled");
                $next.removeClass("active");
            }


            if ($activeStep.data("step") <= 3) {
                $activeStep.removeClass("active");
                $questions.children().removeClass("active");

                $number.text($nextStep.data("step"));

                $progressWidth = $progress.attr("style");
                $progressWidth = $progressWidth.replace(/[^0-9.]/g, '');
                $progressWidth = parseFloat($progressWidth);
                $progressWidth = $progressWidth + 12.5;
                $progress.css("width", $progressWidth + "%");

                $question = $questions.children(".question-" + $nextStep.data("step"));

                setTimeout(function () {
                    $questions.children().slideUp("300");
                    $question.slideDown("300");

                    $activeStep.slideUp(300);
                    $nextStep.slideDown(300);
                }, 300);

                setTimeout(function () {
                    $question.addClass("active");
                    $nextStep.addClass("active");
                }, 600);
            }

            if ($activeStep.data("step") >= 4) {
                $progressWidth = $progress.attr("style");
                $progressWidth = $progressWidth.replace(/[^0-9.]/g, '');
                $progressWidth = parseFloat($progressWidth);
                $progressWidth = $progressWidth + 12.5;
                $progress.css("width", $progressWidth + "%");

                setTimeout(function () {
                    $this_calculator.find(".function").removeClass("active");
                }, 300);
                setTimeout(function () {
                    $this_calculator.find(".function").slideUp(300);
                    $this_calculator.find(".form").slideDown(300);
                }, 600);
                setTimeout(function () {
                    $this_calculator.find(".form").addClass("active");
                }, 900);
            }
        });

        $prev.click(function (e) {
            e.preventDefault();

            $activeStep = $this_calculator.find(".step.active");
            $nextStep = $this_calculator.find(".step.active").prev();

            if ($nextStep.data("step") <= 1) {
                $prev.addClass("disabled");
            }

            if ($nextStep.hasClass("add-buttons")) {
                $next2.removeClass("disabled");
                $next.addClass("active");
            } else {
                $next2.addClass("disabled");
                $next.removeClass("active");
            }


            $number.text($nextStep.data("step"));

            $activeStep.removeClass("active");
            $questions.children().removeClass("active");

            $progressWidth = $progress.attr("style");
            $progressWidth = $progressWidth.replace(/[^0-9.]/g, '');
            $progressWidth = parseFloat($progressWidth);
            $progressWidth = $progressWidth - 12.5;
            $progress.css("width", $progressWidth + "%");

            $question = $questions.children(".question-" + $nextStep.data("step"));

            setTimeout(function () {
                $questions.children().slideUp("300");
                $question.slideDown("300");

                $activeStep.slideUp(300);
                $nextStep.slideDown(300);
            }, 300);

            setTimeout(function () {
                $question.addClass("active");
                $nextStep.addClass("active");
            }, 600);
        });

        $orderBack.click(function (e) {
            e.preventDefault();

            $this_calculator.find(".form").removeClass("active");

            $activeStep = $this_calculator.find(".step.active");

            setTimeout(function () {
                $this_calculator.find(".function").slideDown(300);
                $this_calculator.find(".form").slideUp(300);
            }, 300);
            setTimeout(function () {
                $this_calculator.find(".function").addClass("active");
            }, 600);
            setTimeout(function () {
                $progressWidth = $progress.attr("style");
                $progressWidth = $progressWidth.replace(/[^0-9.]/g, '');
                $progressWidth = parseFloat($progressWidth);
                $progressWidth = $progressWidth - 12.5;
                $progress.css("width", $progressWidth + "%");
            }, 900);
        });
    });
};



window.Gmap = null;
var GMapHandler = function() {
    var $map_wrapper = $('.wr17');                                      // map container
    var map_center_coords = "51.500390, 45.966099";      // center coordinates
    var map_marker_coords = "51.499929, 45.967740";     // marker coordinates
    var map_marker_icon = "img/marker.png";                  // icon marker url
    var map_zoom = 17;                                                       // map zoom

    if (!$map_wrapper.length)
    {
        console.log('[Gmap] Элемента не существует');
        return;
    }

    if (!window.map_coords)
    {
        console.log('[Gmap] Не заданы координаты в параметре map_coord. Используем стандартное значение');
        window.map_coords = "55.69777704873052,37.77824859751695;55.7535378290641,37.624929644118836;10";
    }
    var coords = window.map_coords.split(';');
    if (coords[0])
        map_center_coords = coords[0];
    if (coords[1])
        map_marker_coords = coords[1];
    if (coords[2])
        map_zoom = coords[2];

    map_center_coords = map_center_coords.split(",");
    map_marker_coords = map_marker_coords.split(",");
    map_zoom = parseInt(map_zoom);

    var window_height = $(window).height();
    var map_loaded = false;

    var map_offset_top = $map_wrapper.offset().top;

    setInterval(function(){
        if (!map_loaded)
            map_offset_top = $map_wrapper.offset().top;
    }, 2000);

    setInterval(function(){
        var scroll_top = $(document).scrollTop();

        if (!map_loaded && scroll_top > map_offset_top - window_height * 3) {
            $.getScript('http://maps.googleapis.com/maps/api/js?v=3.9&sensor=false&callback=gMapInitialize');
            map_loaded = true;
        }
    }, 20);

    window.gMapInitialize = function() {
        window.Gmap = new google.maps.Map(document.getElementById("gmap"), {
            zoom: map_zoom,
            center: new google.maps.LatLng(parseFloat(map_center_coords[0]), parseFloat(map_center_coords[1])),
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'tehgrayz']
            },
            scrollwheel: false
        });

        var mapType = new google.maps.StyledMapType([
            {
                featureType: "all",
                stylers: [
                    { hue: "#0000ff" },
                    { saturation: -95 }
                ]
            },
            {
                featureType: "poi",
                elementType: "label",
                stylers: [
                    { visibility: "off" }
                ]
            }
        ], { name:"Grayscale" });

        window.Gmap.mapTypes.set('tehgrayz', mapType);
        window.Gmap.setMapTypeId('tehgrayz');

        new google.maps.Marker({
            position: new google.maps.LatLng(parseFloat(map_marker_coords[0]), parseFloat(map_marker_coords[1])),
            map: window.Gmap,
            icon: {
                url: map_marker_icon,
                origin: new google.maps.Point(0, 0)
                //anchor: new google.maps.Point(40, 51),
                //scaledSize: new google.maps.Size(40, 51)
            }
        });

    }
};


var AutoGenerate = function() {
    
};

var DebugHandler = function() {
    try {
        if (window.location.search) {
            var params = {};
            $.each(window.location.search.substr(1).split('&'), function(idx, param){
                var param_arr = param.split('=');
                params[param_arr[0]] = parseInt(param_arr[1]);
            });
            if (params && params.debug) {
                var alert_text = "Включен DEBUG режим: \n";
                if (params.show_lines || params.show_block) {
                    $html.addClass('debug');
                    if (params.show_lines) {
                        $html.addClass('debug1');
                        alert_text += "[CSS] Отображается сетка \n";
                    }
                    if (params.show_block) {
                        $html.addClass('debug2');
                        alert_text += "[CSS] Отображается блок 980px \n";
                    }
                }
                if (params.disable_lazy) {
                    $('.lazy').removeClass('lazy');
                }
                if (params.disable_forms) {
                    window.DEBUG_MODE |= 1;
                    alert_text += "[JS] Отправка форм выключена \n";
                }
                if (params.alert_forms) {
                    window.DEBUG_MODE |= 2;
                    alert_text += "[JS] Вывод отправляемых полей \n";
                }
                if (params.disable_validation) {
                    window.DEBUG_MODE |= 4;
                    alert_text += "[JS] Выключена валидация полей \n";
                }

                alert_text += "Возможные опции: \n";
                alert_text += "show_lines \n";
                alert_text += "show_block \n";
                alert_text += "disable_lazy \n";
                alert_text += "disable_forms \n";
                alert_text += "alert_forms \n";
                alert_text += "disable_validation \n";
                alert_text += "disable_alert \n";

                if (params.disable_alert !== 1)
                    alert(alert_text);
            }
        }
    } catch(e){
        console.log(e);
    }
};


window.Util = {
    number_format : function(number, decimals, dec_point, thousands_sep) {
        number = (number + '')
            .replace(/[^0-9+\-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function(n, prec) {
                var k = Math.pow(10, prec);
                return '' + (Math.round(n * k) / k)
                        .toFixed(prec);
            };
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
            .split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '')
                .length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1)
                .join('0');
        }
        return s.join(dec);
    },

    validateEmail : function(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    },

    plural : function(n, forms) {
        return forms[n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2];
    }
};