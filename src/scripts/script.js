(function() {
  $(function() {
    $("[href^=#none]").click(function(e) {
      return e.preventDefault();
    });
    $("a[data-toggle=popover]").popover().click(function(e) {
      return e.preventDefault();
    });
    $("a[data-toggle=tooltip]").tooltip();
    $(function() {});
    $(".carousel").carousel;
    ({
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
  });

}).call(this);
