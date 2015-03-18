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

        // Load article image preview, this require Facebook plugin to be active in Tistory plugins settings
        $('[data-img-src]').each(function() {
            var img = $(this);
            var url = img.attr('data-img-src');

            $.get(encodeURI(url), function(data) {
                var matches = data.match(/property="og:image" content="([^"]*)"/);
                if (matches) {
                    var thumbUrl = matches[1].replace(/image|original/gi, 'R320x0');
                    img.html($('<img class="img-responsive">').attr('src', thumbUrl));
                }
            });
        });
    });
}).call(this);
