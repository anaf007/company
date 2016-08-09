//选项卡
$(function () {
    //通过遍历给菜单项加上data-index属性
    $(".J_menuItem").each(function (index) {
        $(this).attr('target','iframe0');
    });

    function showpage(page){
        var loading = layer.load();
        $(".J_iframe").attr('src',page);
        $('.J_iframe').load(function () {
            //iframe加载完成后隐藏loading提示
            layer.close(loading);
        });
    }

    openPage = function(){
        var dataUrl = $(this).attr('href'), menuName = $.trim($(this).text());
        if(!dataUrl){
            dataUrl = $(this).data('id');
        }

        _has = false;
        $('.J_menuTab').each(function () {
            if ($(this).attr('href') == dataUrl) {
                _has = true;
                tabobj = $(this);
                return false;
            }
        })

        if (_has) {
            tabobj.addClass('active').siblings('.J_menuTab').removeClass('active');
            showpage(dataUrl);
        }else{
            $('.J_menuTab').removeClass('active');
            var str = '<a href="'+dataUrl+'" target="iframe0" class="active J_menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
            $('.J_menuTabs .page-tabs-content').append(str);
            showpage(dataUrl);
            // 总宽度
            var countWidth = $(".content-tabs").width() - 80;

            // 可视区域宽度
            var visibleWidth = $('.page-tabs-content').width();

            // 可视区域的宽度大于总宽度
            if (visibleWidth > countWidth) {

                // 移动元素的marginLeft值
                var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));
                var areaWidth = visibleWidth - countWidth
                $('.page-tabs-content').animate({
                    marginLeft: '-' + areaWidth + 'px'
                }, "fast");
            }
        }
    }

    $(".J_menuItem,.J_menuTab").click(openPage);
    
    // $('.J_menuTab').unbind('click');
    $('.J_menuTabs').on('click', '.J_menuTab', openPage);


    // 关闭选项卡菜单
    function closeTab() {

        var closeTabId = $(this).parents('.J_menuTab').data('id');
        var currentWidth = $(this).parents('.J_menuTab').width();

        // 当前元素处于活动状态
        if ($(this).parents('.J_menuTab').hasClass('active')) {
            
                _p_obj = $(this).parents('.J_menuTab').prev('.J_menuTab:last');
                _p_obj.addClass('active').siblings('.J_menuTab').removeClass('active');
                showpage(_p_obj.data('id'));
                
                //  移除当前选项卡
                $(this).parents('.J_menuTab').remove();
            
        }else {// 当前元素不处于活动状态
            //  移除当前选项卡
            $(this).parents('.J_menuTab').remove();
        }

        // 总宽度
        var countWidth = $(".content-tabs").width() - 80;
        
        // 可视区域宽度
        var visibleWidth = $('.page-tabs-content').width();
        // alert(1);
        // 移动元素的marginLeft值
        var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));

        // 可视区域的宽度大于总宽度
        if (visibleWidth > countWidth) {

            // 已到左边
            if (marginLeftVal == 0) {
                if (visibleWidth + marginLeftVal > countWidth) {
                    $('.page-tabs-content').animate({
                        marginLeft: marginLeftVal + (-100) + 'px'
                    }, "fast");
                    // console.log(1);
                }
                // return
            }

            if (marginLeftVal + 100 > 0) {
                $('.page-tabs-content').animate({
                    marginLeft: marginLeftVal - marginLeftVal + 'px'
                }, "fast");
                // console.log(2);
                // return;
            }

            // 超过左边
            if (marginLeftVal < 0) {
                console.log("3");
                if (visibleWidth > countWidth) {
                    console.log("33")
                    $('.page-tabs-content').animate({
                        marginLeft: marginLeftVal + (100) + 'px'
                    }, "fast");
                    // return
                }

            }

        } else if (visibleWidth < countWidth) {
            console.log("else 1");
            if (marginLeftVal + 100 > 0) {
                $('.page-tabs-content').animate({
                    marginLeft: marginLeftVal - marginLeftVal + 'px'
                }, "fast");
                // console.log('else' + 2);
            } else {
                $('.page-tabs-content').animate({
                    marginLeft: marginLeftVal + (100) + 'px'
                }, "fast");
            }
        }
        // alert('run end');
        return false;
    }

    $('.J_menuTabs').on('click', '.J_menuTab i', closeTab);


    // 右移按扭
    $('.J_tabRight').on('click', function () {

        // 移动元素的marginLeft值
        var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));

        if (marginLeftVal + 100 >= 0) {
            $('.page-tabs-content').animate({
                marginLeft: marginLeftVal - marginLeftVal + 'px'
            }, "fast");
            return;

        }
        if ((marginLeftVal + 100) < 0) {
            $('.page-tabs-content').animate({
                marginLeft: marginLeftVal + 100 + 'px'
            }, "fast");

        }

    });

    // 左移按扭
    $('.J_tabLeft').on('click', function () {

        // 总宽度
        var countWidth = $(".content-tabs").width() - 80;

        // 可视区域宽度
        var visibleWidth = $('.page-tabs-content').width();

        // 移动元素的marginLeft值
        var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));

        // 可视区域的宽度大于总宽度
        if (visibleWidth > countWidth) {

            // 已到左边
            if (marginLeftVal == 0) {
                $('.page-tabs-content').animate({
                    marginLeft: marginLeftVal + (-100) + 'px'
                }, "fast");
            }

            // 超过左边
            if (marginLeftVal <= 0) {
                if (visibleWidth + marginLeftVal > countWidth)
                    $('.page-tabs-content').animate({
                        marginLeft: marginLeftVal + (-100) + 'px'
                    }, "fast");
            }

        }
    });
});