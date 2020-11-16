$(document).ready(function(){

  //공지사항 슬라이드
  $('.notice_slide').slick({
    vertical:true,
    arrows:false,
    autoplay:true,
  });
  // 메뉴 슬라이드
  $('.new-menu-slide').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    arrows:false,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          autoplay: true,
          autoplaySpeed: 2000

        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
  // 필름 슬라이드
  $('.film-slide-wrap').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1.5,
        }
      },
    ]  
  });

  // 필름 영상 바꾸기
  let thumbImg = $('.film-slide-wrap li a');
  let targetFrame = $('.big-film-box iframe');
  thumbImg.click(function(){
    let thumbImgSrc = $(this).data('vid');
    targetFrame.attr('src','https://www.youtube.com/embed/'+ thumbImgSrc);
    $('.film-slide-wrap li span').removeClass('active');
    $(this).siblings('span').addClass('active');
  })

  // 추천메뉴 슬라이드
  $('.recomend-slide').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:4000,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          arrows:false,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          arrows:false,
        }
      },
    ]
  });

  // 메뉴호버 
    $('.menu-content li .menu-img-box').click(function(){
      $(this).children('.menu-hover').toggleClass('active');
    });
    
  //메뉴 필터링
    const menuBtn = $('.menu-categorise-wrap label')
    menuBtn.click(function(){
      menuBtn.removeClass('active');
      $(this).addClass('active');
      const menuValue = $(this).attr("data-filter");
      if( menuValue == "all" ){
        $('.product-box').css('display','block');
      } else {
        $('.product-box').not("." + menuValue).css('display','none');
        $('.product-box').filter("." + menuValue).css('display','block');
      }
    });
  
  //스토어 페이지네이션
  let rowPerPage = 10,
      rows = $('.store-list tbody .tr-list'),
      rowsCount = rows.length,
      pageCount = Math.ceil(rowsCount/rowPerPage),
      numbers = $('.numbers');

      for( let i = 1; i <= pageCount; i++ ){
        numbers.append('<li><a href="">' + i + '</a></li>')
      }

      numbers.find('li:first-child a').addClass('active');
      
      function displayRows(idx){
        let start = (idx - 1) * rowPerPage,
            end = start + rowPerPage;
            rows.hide();
            rows.slice(start, end).show();
      }
      displayRows(1);

      numbers.find('li a').click(function(e){
        e.preventDefault();
        numbers.find('li a').removeClass('active');
        $(this).addClass('active');

        let index = $(this).text();

        displayRows(index);
      })
      
      // 스토어 개수
      let soterCount = $('.total-store');
      soterCount.find('span').append(rowsCount);

      // sub-table slideToggle
      rows.click(function(){
        let subDisplay = $(this).next('tr').children(".sub-table").css('display');
            $(this).siblings().removeClass('active');
            $('.sub-table').stop().slideUp();
            $(this).next('tr').children('.sub-table').stop().slideToggle();
            
        if( subDisplay == 'table-cell' ) {
          $(this).removeClass('active');
        } else {
          $(this).addClass('active');
        }
        
      });

  // 서브 배경 
  $('.nav-bottom > li').mouseenter(function(){
    $('.sub-bg').stop().slideDown(150);
  });
  $('.nav-bottom > li').mouseleave(function(){
    $('.sub-bg').stop().slideUp(150);
  });
  // 
  $('.nav-bottom > li').mouseenter(function(){
    $(this).children('.sub-menu').css('display','block');
  });
  $('.nav-bottom > li').mouseleave(function(){
    $(this).children('.sub-menu').css('display','none');
  });

  // nav-icon toggle
  $('.nav-icon').click(function(){
    $(this).toggleClass('on');

    if($(this).hasClass('on')) {
      $('.mob-gnb').css('left','calc(100% - 70%)');
    } else {
      $('.mob-gnb').css('left','100%');
      $('.mob-gnb > li').children('.mob-sub-menu').stop().slideUp();
    }
  });
          
  $('.mob-gnb > li').click(function(){
    $(this).children('.mob-sub-menu').stop().slideToggle();
    $(this).siblings().children('.mob-sub-menu').stop().slideUp();
  });
          
  // back to top 스크롤
  let btt = document.getElementById('back-to-top');
  let docElem = document.documentElement;

  docHeight = Math.max(docElem.offsetHeight,docElem.scrollHeight);
    
    if(docHeight != 0){
        offSet = docHeight / 8;
       };

  window.addEventListener('scroll', function(){
    let scrollPos = docElem.scrollTop;

    if( scrollPos > offSet ) {
      btt.className = 'visible';
    } else {
      btt.className = '';
    }
  });

  btt.addEventListener('click', function(ev){
    ev.preventDefault();
    scrollToTop();
  });

  function scrollToTop(){
    let scrollInterval = setInterval(function(){
      if( docElem.scrollTop != 0){
        window.scrollBy(0,-55);
      } else {
        clearInterval(scrollInterval);
      }
    }, 10);
  }
});