(function() {
  $(function() {
    var $window;

    $("[href^=#none]").click(function(e) {
      return e.preventDefault();
    });
    $(function() {});
    $window = $(window);
    window.prettyPrint && prettyPrint();
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
    $("a[data-toggle=popover]").popover().click(function(e) {
      return e.preventDefault();
    });
    $("a[data-toggle=tooltip]").tooltip();
    $(".font-resize").jfontsize({
      btnMinusClasseId: "#jfontsize-m",
      btnDefaultClasseId: "#jfontsize-d",
      btnPlusClasseId: "#jfontsize-p"
    });

});

}).call(this);
