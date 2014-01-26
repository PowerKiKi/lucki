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

        // Create rows with X items per row
        $('[data-make-rows]').each(function() {
            var div = $(this);
            var itemsPerRow = div.attr('data-make-rows');
            var children = div.children();
            var a;
            var i = 0;
            while ((a = children.slice(i, i += itemsPerRow)).length) {
                var row = $('<div class="row">');
                row.append(a);
                div.append(row);
            }
        });

        // Load article image preview, this require Facebook plugin to be active in Tistory plugins settings
        $('[data-img-src]').each(function() {
            var img = $(this);
            var url = $(this).attr('data-img-src');

            $.get(url, function(data) {
                var imgUrl = $(data).filter('meta[property="og:image"]').attr('content');
                if (imgUrl) {
                    img.replaceWith($('<img class="img-responsive">').attr('src', imgUrl));
                }
            });
        });
    });
}).call(this);
