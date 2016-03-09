
var yesImg = $("<img />");

$(function () {
    //console.log($('.topBar li a').height());

    $(".pagesContianer").show();

    $('.pagesContianer').fullpage();
    // $.fn.fullpage.reBuild();
    //$(".fp-section").css({ //修正兼容性
    //    height: window.document.body.clientHeight + "px"
    //});

    yesImg.attr("src", "images/pages/index/2/yes.png");
    yesImg.css("position", "absolute");

    $('#page2 img').click(function () {
        $('#page2 img').removeClass("imgopacity");//将所有图片回复正常
        $(this).addClass("imgopacity");//将选中的图片变灰
        //console.log($(this).parent());
        //console.log($(this).offset());

        //将对号图片显示在选中的图片之上
        var selLeft = $(this).offset().left;
        var selTop = $(this).offset().top;
        yesImg.appendTo($(this).parent());
        yesImg.offset({ top: selTop + $(this).height() / 2, left: selLeft + $(this).width() / 2 });
    });

    console.log("ready");
});