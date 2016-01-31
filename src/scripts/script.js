(function() {
    $(function() {
        $("[href^=#none]").click(function(e) {
            return e.preventDefault();
        });

        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                return $(".scrollup").fadeIn('slow');
            } else {
                return $(".scrollup").fadeOut();
            }
        });

        $(".scrollup").click(function() {
            return $("html, body").animate({
                scrollTop: 0
            }, 600, false);
        });

        // Set month CSS class name on articles
        $('time.icon-noticon').each(function() {
            var time = $(this);
            var datetime = time.attr('datetime');
            var year = datetime.substring(0, 4);
            var month = datetime.substring(5, 7);

            time.html(year + '<br>' + month + '월');
            time.parents('article').addClass('month-' + month);
            time.show();
        });
    });
}).call(this);
