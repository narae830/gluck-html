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
        var moveScroll = tabList.children('li').position().left - tabList.css('padding-left').replace(/[^-\d\.]/g, '');
        tabList.scrollLeft(moveScroll)
    })
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
function modalShow(target) {
    $('body').css('overflow', 'hidden');
    $('#modal-wrapper').append('<div class="dimmed"></div>');
    $.get(target,function(data) {
        var posts = $(data).filter('.modal-layer');
        $('#modal-wrapper').append(posts);
        modalResize();
        modalClose();
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

$(window).on({
    "load":function(){
        modalResize();
        setTabScroll();
        tabToggle();
    },
    "resize":function(){
        modalResize();
        setTabScroll();
    },
    "scroll":function(){
    }
});