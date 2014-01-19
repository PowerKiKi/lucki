(function() {
    $(function() {
        $("[href^=#none]").click(function(e) {
            return e.preventDefault();
        });

        $("a[data-toggle=popover]").popover().click(function(e) {
            return e.preventDefault();
        });

        $("a[data-toggle=tooltip]").tooltip();
        $(".carousel").carousel({
            interval: 5000,
            pause: "hover"
        });

        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                return $(".scrollup").fadeIn();
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
            time.parents('article').addClass('month-' + month);
            time.html(year + '<br>' + month + '월');
        });
    });

}).call(this);
