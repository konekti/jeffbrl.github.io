(function(){"use strict";$(window).load(function(){$("#loader").fadeOut();$("#mask").delay(1000).fadeOut("slow");var tab_content=$('.tab-content');var tab_heading=$(".tab-heading")
tab_content.hide();$(".tab-content:first").show();$(".tab-menu li").on('click',function(){tab_content.hide();var activeTab=$(this).attr("rel");$("#"+activeTab).fadeIn();$(".tab-menu li").removeClass("active");$(this).addClass("active");tab_heading.removeClass("current-item");$(".tab-heading[rel^='"+activeTab+"']").addClass("current-item");});tab_heading.on('click',function(){tab_content.hide();var d_activeTab=$(this).attr("rel");$("#"+d_activeTab).fadeIn();tab_heading.removeClass("current-item");$(this).addClass("current-item");$(".tab-menu li").removeClass("active");$(".tab-menu li[rel^='"+d_activeTab+"']").addClass("active");});var tab_vertical_content=$(".tab-vertical-content");tab_vertical_content.hide();$(".tab-vertical-content:first").show();$(".tabs-vertical li").on('click',function(){tab_vertical_content.hide();var activeTab=$(this).attr("rel");$("#"+activeTab).fadeIn();$(".tabs-vertical li").removeClass("active");$(this).addClass("active");$(".tab-drawer-heading").removeClass("active-item");$(".tab-drawer-heading[rel^='"+activeTab+"']").addClass("active-item");});$(".tab-drawer-heading").on('click',function(){tab_vertical_content.hide();var d_activeTab=$(this).attr("rel");$("#"+d_activeTab).fadeIn();$(".tab-drawer-heading").removeClass("active-item");$(this).addClass("active-item");$(".tabs-vertical li").removeClass("active");$(".tabs-vertical li[rel^='"+d_activeTab+"']").addClass("active");});});$(function(){$('a[href*=#]:not([href=#])').on('click',function(e){$('.menu li').removeClass('active');$(this).parent().addClass('active');if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//,'')||location.hostname==this.hostname){var target=$(this.hash);target=target.length?target:$('[name='+this.hash.slice(1)+']');if(target.length){$('html,body').animate({scrollTop:target.offset().top},1000);return false;}}});});$(document).on('scroll',function(){var header_area=$('.header-area');if($(document).scrollTop()>=1){header_area.addClass('navbar-fixed-top');}else{header_area.removeClass('navbar-fixed-top');}});$('.mob-icon').on('click',function(){$('.menu').slideToggle("slow");});$(".simplefilter li").on('click',function(){if(!$(this).hasClass("active")){$(".simplefilter li.active").removeClass("active");$(this).addClass("active");}});$('.flexslider').flexslider({animation:"fade",autoplay:"true"});(function(){function grid(){minigrid({container:'.mini-grid-area ',item:'.mini-grid-area > div ',gutter:3});}window.addEventListener('resize',function(){grid();});grid();})();$(".accordion-simple div").show();setTimeout("$('.accordion-simple .panel').slideToggle('slow');",1000);$(".accordion-simple .tab").on('click',function(){$(this).next(".panel").slideToggle("slow").siblings(".panel:visible").slideUp("slow");$(this).toggleClass("current");$(this).siblings(".tab").removeClass("current");});$("#accordion-auto div").first().css('display','block');var link=$("#accordion-auto a");link.on('click',function(e){e.preventDefault();var a=$(this).attr("href");$(a).slideDown('slow');$("#accordion-auto div").not(a).slideUp('slow');});setTimeout(function(){$('.progress .bar').each(function(){var me=$(this);var perc=me.attr("data-percentage");var current_perc=0;var progress=setInterval(function(){if(current_perc>=perc){clearInterval(progress);}else{current_perc+=1;me.css('width',(current_perc)+'%');}me.text((current_perc)+'%');},50);});},300);})(jQuery);