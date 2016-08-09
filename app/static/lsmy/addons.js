$(function(){

	
	/*触屏*/
		$(".inner").bind("swipeleft",function(){
 			
		});
		
		$(".inner").bind("swiperight",function(){
 			
		});
		
		/*家装-做客*/
		$('.talent_wrap .prev').click(function(){
			
			curr = $('.talent_wrap .nav li.selected');
			if(curr.prev().size()>0){
				prev = curr.prev();	
			}
			else{
				prev = 	$('.talent_wrap .nav li:last');
			}
			curr.removeClass('selected');
			prev.addClass('selected');
			$('.talent_wrap .view').hide().eq(prev.index()).show();
			
			return false;
		});
		
		$('.talent_wrap .next').click(function(){
			curr = $('.talent_wrap .nav li.selected');
			if(curr.next().size()>0){
				next = curr.next();	
			}
			else{
				next = 	$('.talent_wrap .nav li:first');
			}
			curr.removeClass('selected');
			next.addClass('selected');
			$('.talent_wrap .view').hide().eq(next.index()).show();
			
			return false;
			
		})
		
		$('.talent_wrap .nav li').click(function(){
			$('.talent_wrap .nav li').removeClass('selected');
			$(this).addClass('selected');
			
			$('.talent_wrap .view').hide().eq($(this).index()).show();
			return false;
		})
		
	
	$('.subnav li,.subnavs li, .tabs li').not('.selected').hover(function(){
		$(this).addClass('selected');							   
	},
	function(){
		$(this).removeClass('selected');	
	})
	
	
	$('.talent_reg .list li').not('.selected').hover(function(){
		$(this).addClass('selected');							   
	},
	function(){
		$(this).removeClass('selected');	
	})
	
	
	$('.ser_concept li').not('.selected').hover(function(){
		$(this).addClass('selected');							   
	},
	function(){
		$(this).removeClass('selected');	
	})
	
	/*旗下品牌*/
	$('.brand-detail .list li').not('.selected').hover(function(){
		$(this).addClass('selected');							   
	},
	function(){
		$(this).removeClass('selected');	
	})
	$('.pro_concept li').not('.selected').hover(function(){
		$(this).find('.mask').fadeIn(500);
		$(this).find('.tip').css({'bottom':-106,'display':'block'}).stop().animate({'bottom':0},800);
		$(this).find('em').stop().animate({'top':60},1000,function(){
			$(this).addClass('selected');												
		});
									   
	},
	function(){
		$(this).find('.mask').fadeOut(500);
		$(this).find('.tip').stop().animate({'bottom':0},800).css({'display':'none'});
		$(this).find('em').stop().animate({'top':130},1000,function(){
			$(this).removeClass('selected');												
		});	
	})
	
	$('.honor_list li').not('.selected').hover(function(){
		$(this).find('.mask').fadeIn(500);
		$(this).find('.tip').css({'bottom':-106,'display':'block'}).stop().animate({'bottom':0},800);									   
	},
	function(){
		$(this).find('.mask').fadeOut(500);
		$(this).find('.tip').stop().animate({'bottom':0},800).css({'display':'none'});		
	})
		
		/*企业实力*/
		/*$('.gysl_nav li').not('.selected').hover(function(){
			$(this).addClass('selected');							   
		},
		function(){
			$(this).removeClass('selected');	
		})	*/	
		
		
		/*企业实力*/
		$('.gysl_nav li').hover(function(){
			$('.gysl_nav li').removeClass('selected');
			$(this).addClass('selected');
			
			$('.qysl_view').hide().eq($(this).index()).show();
			return false;
		})
		/*$('.gysl_nav li').click(function(){
			$('.gysl_nav li').removeClass('selected');
			$(this).addClass('selected');
			
			$('.qysl_view').slideUp().eq($(this).index()).slideDown();
			return false;
		})*/
		/*企业实力*/
		/*$('.gysl_nav li').not('.selected').hover(function(){
			$(this).addClass('selected');							   
		},
		function(){
			$(this).removeClass('selected');	
		})	*/	
		
				
		/*品牌荣誉
		$('.side .prev').click(function(){
			
			$('.honor_list .list ul').animate({'marginTop':-60},function(){
				$(this).css('marginTop',0).find('li:first').appendTo($(this));
			
			});
		});
		
		$('.honor_list .side .next').click(function(){
		
			$('.honor_list .list ul').css('marginTop',-60).find('li:last').prependTo($('.honor_list .list ul'));
			$('.honor_list .list ul').animate({'marginTop':0});
			
		})
		
			
		
		/*品牌荣誉*/

		$('.honor_list .side .list ul').hover(function(){
			$('.honor_list .side .list ul').removeClass('selected');
			$(this).addClass('selected');
			
			$('.honor_list .img_list').hide().eq($(this).index()).show();
			return false;
		})	


		
		$('.honor_list .side .prev').click(function(){
					$('.honor_list .list ul').css('marginTop',-60).find('li:last').prependTo($('.honor_list .list ul'));
				$('.honor_list .list ul').animate({'marginTop':0});
			
				
			});
			
			$('.honor_list .side .next').click(function(){
				$('.honor_list .list ul').animate({'marginTop':-60},function(){
					$(this).css('marginTop',0).find('li:first').appendTo($(this));
				
				});
				
			})
	
		
		/*心路历程*/
		$('.menta_tabs .prev').click(function(){
			
			$('.menta_tabs .list ul').animate({'marginLeft':-82},function(){
				$(this).css('marginLeft',0).find('li:first').appendTo($(this));
			
			});
			return false;
		});
		
		$('.menta_tabs .next').click(function(){
		
			$('.menta_tabs .list ul').css('marginLeft',-82).find('li:last').prependTo($('.menta_tabs .list ul'));
			$('.menta_tabs .list ul').animate({'marginLeft':0});
			return false;
			
		})
		
		$('.menta_tabs .list li').each(function(){
			$(this).attr('data-index',$(this).index());
			
		})
		$('.menta_tabs .list li').click(function(){
			$('.menta_tabs .list li').removeClass('selected');
			$(this).addClass('selected');
			
			$('.menta_video').slideUp().eq($(this).data('index')).slideDown();
			return false;
		})
		
		/*2*/
		
		$('.menta_tabs1 .prev').click(function(){
			
			$('.menta_tabs1 .list ul').animate({'marginLeft':-82},function(){
				$(this).css('marginLeft',0).find('li:first').appendTo($(this));
			
			});
			return false;
		});
		
		$('.menta_tabs1 .next').click(function(){
		
			$('.menta_tabs1 .list ul').css('marginLeft',-82).find('li:last').prependTo($('.menta_tabs1 .list ul'));
			$('.menta_tabs1 .list ul').animate({'marginLeft':0});
			return false;
			
		})
		
		$('.menta_tabs1 .list li').each(function(){
			$(this).attr('data-index',$(this).index());
			
		})
		$('.menta_tabs1 .list li').click(function(){
			$('.menta_tabs1 .list li').removeClass('selected');
			$(this).addClass('selected');
			
			$('.menta_img').slideUp().eq($(this).data('index')).slideDown();
			return false;
		})
		
		/*新闻资讯*/
		$('.news_year .prev').click(function(){
			
			$('.news_year .list ul').animate({'marginLeft':-82},function(){
				$(this).css('marginLeft',0).find('li:first').appendTo($(this));
			
			});
			return false;
		});
		
		$('.news_year .next').click(function(){
		
			$('.news_year .list ul').css('marginLeft',-82).find('li:last').prependTo($('.news_year .list ul'));
			$('.news_year .list ul').animate({'marginLeft':0});
			return false;
			
		})
		
		/*产品中心详情*/
		$('.pro_detail .list li').hover(function(){
			$('.pro_detail .view ul').stop().animate({'margin-left': -$(this).index()*610});						 
		})
		
		/*产品中心详情-推荐*/
		$('.pro_tj .head span').click(function(){
			$('.pro_tj span').removeClass('selected');
			$(this).addClass('selected');
			
			$('.pro_tj .body').slideUp().eq($(this).index()).slideDown();
			return false;
		})
		
		/*历史回顾*/
		$('.his_review .prev').click(function(){
			
			curr = $('.his_review .timeline li.selected');
			if(curr.prev().size()>0){
				prev = curr.prev();	
			}
			else{
				prev = $('.his_review .timeline li:last');	
			}
			
			$('.his_review .list ul').stop().animate({'margin-left': -prev.index()*1280});
			
			curr.removeClass('selected');
			prev.addClass('selected');
			
			
			return false;
		});
		
		$('.his_review .next').click(function(){
		
			curr = $('.his_review .timeline li.selected');
			if(curr.next().size()>0){
				next = curr.next();	
			}
			else{
				next = $('.his_review .timeline li:first');	
			}
			
			$('.his_review .list ul').stop().animate({'margin-left': -next.index()*1280});
			
			curr.removeClass('selected');
			next.addClass('selected');
			
			return false;
			
		})
		
		/*首页*/
		$('.jcate .cate li').hover(function(){
			$('.jcate .cate li').removeClass('selected');
			$(this).addClass('selected');
			
			$('.jcate .view').hide().eq($(this).index()).show();
			return false;
		})
		
		$('.header .nav li').hover(function(){
			$('.header .nav li').removeClass('selected');
			$(this).addClass('selected');
			
			if(!$('.nav_sub dl').is(':animated')){
				$('.nav_sub dl').stop().slideUp('fast');
				$('.nav_sub').find($(this).find('a').data('id')).stop().slideDown('fast');
			}
			return false;
		})
		
		/*右侧栏*/
		$('.sidebar dd').hover(function(){
			$(this).addClass('selected');								
		},
		function(){
			$(this).removeClass('selected');	
		})
		
		/*3d*/
		$('.aside-3d li').hover(function(){
			$(this).find('.sub').stop().slideDown();								
		},
		function(){
			$(this).find('.sub').stop().slideUp();
		})
		
		/*工作机会*/
		$('.gzjh2 .category dd').hover(function(){
			$('.gzjh2 .category dd').removeClass('selected');
			$(this).addClass('selected');
			
			$('.gzjh2 .table').hide().eq($(this).index()-1).show();
		})
		
		$('.rcll li').not('.selected').hover(function(){
			$(this).find('.mask').fadeIn(500);
			$(this).find('.tip').css({'bottom':-106,'display':'block'}).stop().animate({'bottom':0},800);
			$(this).find('em').stop().animate({'top':60},1000,function(){
				$(this).addClass('selected');												
			});
										   
		},
		function(){
			$(this).find('.mask').fadeOut(500);
			$(this).find('.tip').stop().animate({'bottom':0},800).css({'display':'none'});
			$(this).find('em').stop().animate({'top':130},1000,function(){
				$(this).removeClass('selected');												
			});	
		})
		
		$('.ser_next li').hover(function(){
			$('.ser_next li').stop().animate({'width':198});
			$(this).stop().animate({'width':861});								
		})
		
		/*3d-产品*/
		$('.pro-3d .next').click(function(){
			if($('.pro-3d li.selected').next().size()>0){
				$('.pro-3d .slide').hide();							  	
				$('.pro-3d li.selected').removeClass('selected').next().addClass('selected').fadeIn(1500);	
			}
			else{
				$('.pro-3d .slide').hide();							  	
				$('.pro-3d li.selected').removeClass('selected');
				$('.pro-3d .slide:first').addClass('selected').fadeIn(1500);	
			}
				
			
			return false;
		})
		
		$('.pro-3d .prev').click(function(){
			if($('.pro-3d li.selected').prev().size()>0){
				$('.pro-3d .slide').hide();							  	
				$('.pro-3d li.selected').removeClass('selected').prev().addClass('selected').fadeIn(1500);	
			}
			else{
				$('.pro-3d .slide').hide();							  	
				$('.pro-3d li.selected').removeClass('selected');
				$('.pro-3d .slide:last').addClass('selected').fadeIn(1500);		
			}
			
			return false;
		})
		
		/*导航bug*/
		/*setInterval(function(){
			$('.nav_sub dl').slideUp();			 
		},3000);*/
		/*$('.header .nav, .nav_sub').hover(function(){
													
		},
		function(){
			$('.nav_sub dl').slideUp();		
		})*/
		$('.nav_wrap').hover(function(){
									  
		},
		function(){
			console.log(1);
			$('.nav_sub dl').slideUp();		
		})
		
		
		
})


		

/*window.onblur = function(){
			console.log(2);	
		}*/