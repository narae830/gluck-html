function modalShow(target) {
    $('body').css('overflow', 'hidden');
    $('#modal-wrapper').append('<div class="dimmed"></div>');
    $.get(target,function(data) {
        var posts = $(data).filter('.modal-layer');
        $('#modal-wrapper').append(posts);
        modalClose();
        modalResize();
    });
}
function modalClose() {
    $('.modal-layer').each(function(){
        var $this = $(this);
        $this.find('.lay-close').on('click',function(){
            var $this = $(this);
            $this.closest('.modal-layer').remove();
            
            if ($('.modal-layer').length == 0) {
                $('#modal-wrapper').find('.dimmed').remove();
                $('body').css('overflow', '');
            }
        })
    });
}
function modalResize() {
    $('.modal-layer').each(function(){
        var $this = $(this);
        var layerBox = $('.layer-box');
        if(layerBox.outerHeight() > $this.height()){
            $this.css({'justify-content':'flex-start'});
        }else{
            $this.css({'justify-content':''});
        }
    });
}

(function($,window){
    function tabToggle() {
        $('.tab-toggle').each(function(){
            var $this = $(this);
            var con = $this.nextAll('.tab-cont');
            $this.on('click','li>a',function(e){
                e.preventDefault();
                var $this = $(this);
                var li = $this.closest('li')
                li.addClass('on').siblings('li').removeClass('on');
                con.eq(li.index()).addClass('tab-on').siblings('.tab-cont').removeClass('tab-on');
            });
        })
    }
    function setTabScroll() {
        $('.tab-type1').each(function(){
            var $this = $(this);
            var tabList = $this.children('.tab-list');
            var moveScroll = tabList.children('li.on').position().left - tabList.css('padding-left').replace(/[^-\d\.]/g, '');
            tabList.scrollLeft(moveScroll)
        })
    }
    function accToggle() {
        $('.faq-list').each(function(){
            var $this = $(this);
            var wrap = $this.find('.acc-head');
            wrap.on('click',function(e){
                e.preventDefault();
                var $this = $(this);
                var val = $this.hasClass('active');
                var con = $this.next('.acc-cont');
                if(!val){
                    $this.addClass('active');
                    con.hide();
                    con.stop().slideDown();
                }else{
                    con.stop().slideUp(function(){
                        $this.removeClass('active');
                    });
                }
            });
        });
    }
    function gnbMenu() {
        $('.gnb').css({left: '-100%'});
        $('.header-area .pbtn-menu').click(function(){
            $('body').css('overflow', 'hidden');
            $('.gnb').show().animate({left:'0'}, 250);
        });
        $('.gnb .pbtn-close').click(function(){
            $('body').css('overflow', '');
            $('.gnb').animate({left:'-100%'}, 250, function(){
                $('.gnb').hide();
            });
        });
    }

    $(window).on({
        "load":function(){
            modalResize();
            setTabScroll();
            tabToggle();
            accToggle()
            gnbMenu();
        },
        "resize":function(){
            modalResize();
        },
        "scroll":function(){
        }
    });
})(jQuery,window);