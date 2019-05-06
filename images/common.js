$(function() {
    
    display_control();
    slider_control();

    $('body').bind('click', function (e) {
        var $target = $(e.target);
        if ($target.closest('.btn_menu').length > 0) {
            $('.area_sidebar').show();
            $('.area_popup').hide();
            $('body').css('overflow', 'hidden');
        } else if ($target.closest('.btn_search').length > 0) {
            $('.area_sidebar').hide();
            $('.area_popup').show();
            $('body').css('overflow', 'hidden');
        } else if ($target.closest('.inner_sidebar').length == 0 && $target.closest('.area_popup').length == 0) {
            $('.area_sidebar').hide();
            $('.area_popup').hide();
            $('body').css('overflow', '');
        }
    });

    $('.btn_close').on('click', function () {
        $('.area_sidebar').hide();
        $('.area_popup').hide();
        $('body').css('overflow', '');
    });
});

function slider_control() {
    $('#main .type_featured .slide_zone').each(function(i) {
      var id = 'featured_slide' + i;
      $(this).closest('.type_featured').attr('id', id);

      $(this).slick({
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        appendArrows: $('#' + id + ' .box_arrow'),
        appendDots: $('#' + id + ' .inner_main_slide'),
        prevArrow: $('#' + id + ' .box_arrow .btn_prev'),
        nextArrow: $('#' + id + ' .box_arrow .btn_next'),
        dotsClass: 'slide_page slick-dots thema_apply',
        customPaging: function(slider, i) {
          return $('<button type="button" class="ico_circle"/>').text(i + 1);
        },
        cssEase: 'linear',
        responsive: [{
          breakpoint: 1439,
          settings: {
            fade: false
          }
        }]
      });
    });
  }

  function display_control() {
    var $location = $(location),
        pathname = $location.attr('pathname'),
        href = $location.attr('href'),
        parts = pathname.split('/');

    // 검색어 삭제
    $('.btn_search_del').click(function() {
      $('.inp_search').val('');
    });

    // 박스 헤더
    if ($('#main .area_cover').children(':first-child').hasClass('type_featured')) {
      $('#wrap').addClass('white');
    } else if ($('#main .area_cover').length > 0) {
      $('#main .area_cover').addClass('cover_margin');
    }

    /* 검색 리스크가 있을 경우 처리 */
    if ($('.category_search_list').length != false) {
      /* 컨텐츠 출력 영역 숨김 - 목록 표현을 검색 리스트로 대체 */
      $('.category_index_list').hide();


      /* 검색 리스트 처리 - 글 목록에서 썸네일, 카테고리 정보 참조 */
      $('.category_search_list .item_category').each(function(i) {
        var href = $(this).find('.link_category').attr('href'),
            $category_index_item = $('.category_index_list').find('[href="' + href + '"]'),
            thumbnail_full_path = $category_index_item.find('.item-thumbnail').css('background-image'),
            thumbnail_path = window.TistoryBlog.url + pathname;
          if (thumbnail_full_path != undefined) {
                thumbnail_path = thumbnail_full_path.replace(/^url\(['"](.+)['"]\)/, '$1');
          }
        if (thumbnail_path) {
          $(this).find('.link_category').data('thumbnail', thumbnail_path).css({
            "background-image": "url(" + thumbnail_path + ")"
          });
          $(this).find('.item-thumbnail').data('thumbnail', thumbnail_path).css({
            "background-image": "url(" + thumbnail_path + ")"
          });
        } else {
          $(this).find('.item-thumbnail').addClass('no_img');
        }

        $(this).find('.summary').text($category_index_item.find('.summary').text());
      });
    }

    // 리스트 관련해서 섬네일 없는 경우 no-img class 추가
    $('.item-thumbnail').each(function(i) {
      var $o = $(this),
        thumbnail_path = $o.css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1'),
        base_path = window.TistoryBlog.url + pathname;
        
      if (thumbnail_path == base_path || thumbnail_path == href) {
        $o.addClass('no-img');
      }
    });
    $('.category_search_list .item_category').each(function(i) {
      var $o = $(this),
        thumbnail_path = $o.css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1'),
        base_path = window.TistoryBlog.url + pathname;
      if (thumbnail_path == base_path) {
        $o.addClass('no-img');
      }
    });
    $('.category_search_list .link_category').each(function(i) {
      var $o = $(this),
        thumbnail_path = $o.css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1'),
        base_path = window.TistoryBlog.url + pathname;
      if (thumbnail_path == base_path) {
        $o.addClass('no-img');
      }
    });

    // 글 출력이 있는 경우
    if ($('.area_view').length != false) {
      var seoImage = $('meta[property="og:image"]').attr('content');
      if (seoImage != undefined && seoImage != false) {
        $('.area_view .article_header .inner_header').css({
          "background-image": "url(" + seoImage + ")"
        });
        $('.area_view .article_header').addClass('type_article_header_cover');

      } else {
        $('.area_view .article_header').addClass('type_article_header_common');
      }
      if($('#main > .area_cover:first-child > .type_featured:first-child, .type_article_header_cover').length) { $('#wrap').addClass('white');}
    }

    // 로그인, 로그아웃 버튼 처리
    if (window.T.config.USER.name) {
      $('.btn-for-user').show();
    } else {
      $('.btn-for-guest').show();
    }

    $('.btn-for-guest [data-action="login"]').click(function() {
      document.location.href = 'https://www.tistory.com/auth/login?redirectUrl=' + encodeURIComponent(window.TistoryBlog.url);
    });
    $('.btn-for-user [data-action="logout"]').click(function() {
      document.location.href = 'https://www.tistory.com/auth/logout?redirectUrl=' + encodeURIComponent(window.TistoryBlog.url);
    });
  }