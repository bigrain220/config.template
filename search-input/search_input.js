 // 相关搜索

  $(".search-inp input").focus(function () {
    judgeInput();
  });
 
  var $searchInp = document.querySelector('.search-inp input');
  var $searchList = document.querySelector('.search .search-list');
  $searchInp.oninput = function () {
    getList($('.search-inp input').val());
    judgeInput();
  };

  $searchList.onclick = function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.nodeName === 'LI') {
      $searchInp.value = target.innerHTML;
      window.location.href='/search?word='+$searchInp.value
    }
  };

  document.onclick = function (e) {
    if (e.target !== $searchInp) {
      $('.search .search-list').css('display', 'none');
    }
  };

  function judgeInput() {
    if ($('.search-inp input').val() === '') {
      $('.search .search-list').css('display', 'none');
    } else {
      $('.search .search-list').css('display', 'block');
    }
  };

   // 鼠标移入移出事件
   $(".search .search-list").on("mouseover", "li", function () {
     $(".search .search-list li").removeClass("ct");
     $(this).addClass("ct");
   });
   $(".search .search-list").on("mouseout", "li", function () {
     $(".search .search-list li").removeClass("ct");
   });
  //  按键事件
   $(window).keydown(function(event){
    switch(event.keyCode) {
      case 40://向下键					
              if($(".search .search-list").css("display") == "none")return;
              var $nextSiblingLi = $(".search .search-list").find(".ct");
              if($nextSiblingLi.length <= 0){//没有选中行时，选中第一行
                $nextSiblingLi = $(".search .search-list").find("li:first");
              }else{
                $nextSiblingLi = $nextSiblingLi.next();
              }
              $(".search .search-list").find("li").removeClass("ct"); 
              if($nextSiblingLi.length > 0){//有下一行时（不是最后一行）
                $nextSiblingLi.addClass("ct");//选中的行加背景
              }
              $searchInp.value = $nextSiblingLi.text();
              break;
      case 38://向上键
              if($(".search .search-list").css("display") == "none")return;
              var $previousSiblingLi = $(".search .search-list").find(".ct");
              if($previousSiblingLi.length <= 0){//没有选中行时，选中最后一行行
                $previousSiblingLi = $(".search .search-list").find("li:last");
              }else{
                $previousSiblingLi = $previousSiblingLi.prev();
              }
              $(".search .search-list").find("li").removeClass("ct");
              if($previousSiblingLi.length > 0){//有上一行时（不是第一行）
                $previousSiblingLi.addClass("ct");//选中的行加背景
              }	
              $searchInp.value = $previousSiblingLi.text();			
              break;
      case 27://ESC键隐藏下拉框					
              searchListHide();
              break;
    }
  });
  function searchListHide(){
    var $list = $(".search .search-list");
    if($list.css("display") != "none"){
      $list.find("li").removeClass("ct");
      $list.css('display','none');
    }		
  }
  function getList(words) {
    var domUl = '';
    $.ajax({
      url: 'http://web.sou456.com/suggest?word=' + words,
      success: function (data) {
        // console.log(data)
        if (data.length > 0 && data instanceof Array) {
          for (var i = 0; i < data.length; i++) {
            domUl += '<li>' + data[i].word + '</li>'
          }
          $('.search .search-list').html($.trim(domUl))
        } else {
          $('.search .search-list').html('')
        }
      }
    })
  }
 
 
 