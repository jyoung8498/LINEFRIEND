;(function($,document,window,undefined){

 var lineFrends = {  
    init:    function(){
        var that = this;

        that.headerFn();
        that.section1Fn();
        that.section2Fn();
        that.section3Fn();
        that.section4Fn();
        that.section5Fn();
        that.section6Fn();
        that.section7Fn();
        that.fontsFn();

    },

    headerFn:function(){

        var winW = $(window).width();
        var url = null;

        $(window).scroll(function(){
            if( $(window).scrollTop() >= 30 ){
                $('#header').addClass('addHeader');
                $('.goTop').addClass('addGotop');
                $('.quick-menu').addClass('addQuick');
            } else {
                $('#header').removeClass('addHeader');
                $('.goTop').removeClass('addGotop');
                $('.quick-menu').removeClass('addQuick');
            }
        });

        $(window).resize(function(){
            winW = $(window).width();                    
            if( winW > 990 ){
                $('#header').removeClass('addMoblie');
                $('.moblie').removeClass('addMoblie');
                $('.moblie-menu').hide();
            }
            
        });
        
        $('.moblie').on({
            click:function(event){
                event.preventDefault();
                $('.moblie').toggleClass('addMoblie');
                $('.moblie-menu').stop().slideToggle(300);
            }
        });

        $('.smooth-btn').on({
            click:function(event){
                event.preventDefault();
                url = $(this).attr('href');
                $('html,body').stop().animate({scrollTop: $ (url).offset().top }, 600);
                $('.moblie-menu').hide();
                $('.moblie').removeClass('addMoblie');
            }
        });
        /* 모달 업 */
        $('.modal-up-btn').on({
            click:function(){
                $('.modal').stop().fadeIn(300);
                $('html').addClass('addModal');
            }
        });
        $('.close').on({
            click:function(){
                $('.modal').stop().fadeOut(300);
                $('html').removeClass('addModal');
            }
        });
    },

    section1Fn:function(){
         // 슬라이드
        var cnt = 0;

        var n = $('.slide').lenght-1; //3=4-1       
        var winH = 882;  //윈도우 높이
        var winW = 1636; //윈도우 넓이
        var imgH = $('.slide-text').height();  //슬라이드텍스트 넓이
        var imgT = (winH-imgH) / 2;         //슬라이드텍스트 마진(높이)
        var setId = 0;      // 타이머
        var setId2 = 0;  //클릭후 10초
        


        // 슬라이드 이미지, 문구 높이
        setTimeout(resizeFn ,100 );

        setTimeout(pageBtnFn(cnt) ,100 );

        function resizeFn(){
            winH = $(window).height();
            winW = $(window).width();
            imgH = $('.slide-text').height();
            imgT = (winH-imgH) / 2;
            
            $('#section1').css({height:winH});
            $('.slide-text').stop().animate({top:imgT}, 300);
        };
        $(window).resize(function(){
            resizeFn();
        });
       
        // 슬라이드
        
        function nextSlideFn(){
            cnt++;
            if(cnt>7){cnt=0;}
            mainNextSlideCntFn();
        }
        function prevSlideFn(){
            cnt--;
            if(cnt<0){cnt=7;}
            mainPrevSlideCntFn();
        } 

        function mainNextSlideCntFn(){
            pageBtnFn(cnt);
            $('.slide').css({zIndex:6});
            $('.slide').eq(cnt== 0 ? n : cnt-1).css({zIndex:7});
            $('.slide').eq(cnt).css({zIndex:8}).stop().animate({opacity:0}, 0).animate({opacity:1}, 1300);
        };
        function mainPrevSlideCntFn(){
            pageBtnFn(cnt);
            $('.slide').css({zIndex:6});
            $('.slide').eq(cnt).css({zIndex:7});
            $('.slide').eq(cnt == n ? 0 : cnt+1 ).css({zIndex:8}).stop().animate({opacity:0}, 0).animate({opacity:1}, 1300);
        }

        $('.next-btn').on({
            click:function(){
                if(!$('.slide').is(':animated')){
                    nextSlideFn();
                }
                timerControlFn();
            }
        });
        $('.prev-btn').on({
            click:function(){
                if(!$('.slide').is(':animated')){
                    prevSlideFn();
                }
                timerControlFn(); 
            }
        });

        // 터치 스와이프
        $('.slide').swipe({
            swipeLeft:function(){
                if(!$('.slide').is(':animated')){
                    nextSlideFn();
                }
                timerControlFn();
            },
            swipeRight:function(){
                if(!$('.slide').is(':animated')){
                    prevSlideFn();
                }
                timerControlFn();
            }
        });

        // 타이머
        function timmerFn(){
           setId = setInterval(nextSlideFn, 3000);
        }
        setTimeout( timmerFn ,100);
        
        function timerControlFn(){
            clearInterval(setId);
            clearInterval(setId2);
            t=1; // 중지

            var cnt2 = 0;
            setId2 = setInterval(function(){
                cnt2++;
                if(cnt2>10){
                    nextSlideFn();
                    timmerFn();
                    clearInterval(setId2);
                    t=0;
                }
            }, 1000);
        }
        
        //인디게이터
        $('.page-Btn').each(function(index){
            $(this).on({
                click:function(){
                    cnt = index ;
                    mainNextSlideCntFn();
                    clearInterval(setId);

                    timerControlFn();
                }
            });
                   
        });
        
        function pageBtnFn(z){
            z > 7 ? z=0 : z;
            $('.page-Btn').removeClass('addBtn');
            $('.page-Btn').eq(z).addClass('addBtn');
        }
    },
    section2Fn:function(){
        var t=0;

        setTimeout(s2NonAnimate, 100);

        $(window).scroll(function(){
           if( $(this).scrollTop() >= $('#section1').offset().top + 500 ){
                if(t==0){
                    t=1;
                    s2Animate();
                }
            }
            if( $(this).scrollTop() < $('#section1').offset().top + 500 ){
                if(t==1){
                    t=0;
                    s2NonAnimate();
                   }
                }
        });

        function s2Animate(){
            $('.s2-wrap h2').stop().animate({opacity:1}, 1500);
            $('.s2-text1').stop().animate({left:0,opacity:1}, 2000);
            $('.s2-text2').stop().animate({left:0,opacity:1}, 3500);
        }
        function s2NonAnimate(){
            $('.s2-text1').stop().animate({left:-1000,opacity:0}, 2000);
            $('.s2-text2').stop().animate({left:-1000,opacity:0}, 2500);
            $('.s2-wrap h2').stop().animate({opacity:0}, 3000);
        }


    },
    section3Fn:function(){
        var t=0;
        // 스크롤 이벤트
        setTimeout(s3NonAnimate, 100);

        $(window).scroll(function(){
            if( $(this).scrollTop() >= $('#section3').offset().top -700 ){
                if(t==0){
                    t=1;
                    s3Animate();
                }
            }
            if( $(this).scrollTop() < $('#section3').offset().top -700 ){
                if(t==1){
                    t=0;
                    s3NonAnimate();
                }
            }
        });


        function s3Animate(){
            $('.s3-wrap > h2').stop().animate({opacity:1}, 1500);
            $('.icon1').stop().animate({opacity:1,marginTop:0+100}, 1000);
            $('.icon2').stop().animate({opacity:1,marginTop:0+100}, 1500);
            $('.icon3').stop().animate({opacity:1,marginTop:0+100}, 2000);
        }
        function s3NonAnimate(){
            $('.icon1').stop().animate({opacity:0,marginTop:-100+100}, 1000);
            $('.icon2').stop().animate({opacity:0,marginTop:-100+100}, 1500);
            $('.icon3').stop().animate({opacity:0,marginTop:-100+100}, 2000);
            $('.s3-wrap > h2').stop().animate({opacity:0}, 3000);
        }




    },
   
    section4Fn:function(){
        var winH = 882;
        var cnt = 0;
       
        var setId = 0;
        var setId2 = 0;

        //반응형

        setTimeout(resizeFn ,100 );
        setTimeout(subSlideBtnFn(cnt) ,100 );
        
        function resizeFn(){
            winH = $(window).height();
            $('#section4').css({height:winH});
        }

        $(window).resize(function(){
            resizeFn();
        });
        

        //서브 슬라이드
        function subNextFn(){
            cnt++;
            if(cnt>4){cnt=0}
            subNextSlideFn();
        }
        function subPrevFn(){
            cnt--;
            if(cnt<0){cnt=4}
            subPrevSlideFn();
        }
        function subNextSlideFn(){
            subSlideBtnFn(cnt);
            $('.sub-slide').css({zIndex:3});
            $('.sub-slide').eq(cnt==5 ? 0 : cnt-1).css({zIndex:4});
            $('.sub-slide').eq(cnt).css({zIndex:5}).stop().animate({opacity:0}, 0).animate({opacity:1}, 1000);
        }
        function subPrevSlideFn(){
            subSlideBtnFn(cnt);
            $('.sub-slide').css({zIndex:3});
            $('.sub-slide').eq(cnt+1 == 5 ? 4 : cnt+1).stop().css({zIndex:5}).animate({opacity:0}, 1000);
            $('.sub-slide').eq(cnt==0 ? 4 : cnt ).stop().css({zIndex:4}).animate({opacity:1}, 0);

        }
        $('.next-sub-btn').on({
            click:function(){
                if( !$('.sub-slide').is(':animated') ){
                    subNextFn();
                }
                subInTimmerFn()
            }
            
        });
        $('.prev-sub-btn').on({
            click:function(){
                if( !$('.sub-slide').is(':animated') ){
                    subPrevFn();
                }
                subInTimmerFn();
            }
        });
        //터치스와이프
        $('.sub-slide').swipe({
            swipeLeft:function(){
                if(!$('.sub-slide').is(':animated')){
                    subNextFn();
                }
                timerControlFn();
            },
            swipeRight:function(){
                if(!$('.sub-slide').is(':animated')){
                    subPrevFn();
                }
                subInTimmerFn();
            }
        });

        //타이머
        function subTimmer(){
           setId = setInterval(subNextFn, 3000);
        }
        subTimmer();


      
        function subInTimmerFn(){
            clearInterval(setId);
            clearInterval(setId2);
            t=1;
            var cnt2 = 0;

            setId2 = setInterval(function(){
                cnt2++;
                if(cnt2 > 10){
                    subNextFn();
                    subTimmer();
                    clearInterval(setId2);
                    t=0;
                }
            }, 1000);
           
        }

        //인디게이터
        $('.page-slidebtn').each(function(index){
            $(this).on({
                click:function(){
                    cnt = index ;
                    subNextSlideFn();
                    clearInterval(setId);
                    subInTimmerFn();
                }
            }); 
        });

        function subSlideBtnFn(z){
            cnt = z;
            z > 4 ? z = 0 : z;
            $('.page-slidebtn').removeClass('addSubPage');
            $('.page-slidebtn').eq(z).addClass('addSubPage');
           
        }


    },
    section5Fn:function (){
        var winW = $(window).width();
        var t = 0;
        // 스크롤 이벤트
        setTimeout(s5NonAnimationFn, 100);

        // 사이즈 변경시 슬라이드 다운
        $(window).resize(function(){
            winW = $(window).width();                    
            if( winW > 1080 ){
                $('#section5').removeClass('addSize');
                $('.s5-content').removeClass('content-roll');
            } else {
                $('#section5').addClass('addSize');
                $('.s5-content').addClass('content-roll');
            }
        });
        // HasClass가 있을때만
        $('.img-text-roll').on({
                mouseover:function(){
                if( $('.s5-content').hasClass('content-roll') ){
                    $(this).children('.content-roll').stop().slideDown(400);
                }
            },
            mouseleave:function(){
                if( $('.s5-content').hasClass('content-roll') ){
                    $(this).children('.content-roll').stop().slideUp(400);
               }
            }
        });
        
        $(window).scroll(function(){
            if( $(this).scrollTop() >= $('#section5').offset().top -600 ){
                if(t==0){
                    t=1;
                    s5AnimationFn();
                }
            }
            if( $(this).scrollTop() < $('#section5').offset().top -600 ){
                if(t==1){
                    t=0;
                    s5NonAnimationFn();
                }
            }
        });

        function s5AnimationFn (){
            $('.s5-wrap h2 ').stop().animate({opacity:1}, 1500);
        }
        function s5NonAnimationFn (){
            $('.s5-wrap h2 ').stop().animate({opacity:0}, 3000);
        }
        
    },
    section6Fn:function (){
        var t = 0;
        // 스크롤 이벤트
        setTimeout(s6NonAnimationFn, 100);

        $(window).scroll(function(){
            if( $(this).scrollTop() >= $('#section6').offset().top -600 ){
                if(t==0){
                    t=1;
                    s6AnimationFn();
                }
            }
            if( $(this).scrollTop() < $('#section6').offset().top -600 ){
                if(t==1){
                    t=0;
                    s6NonAnimationFn();
                }
            }
        });

        function s6AnimationFn (){
            $('.s6-wrap h2 ').stop().animate({opacity:1}, 1500);
        }
        function s6NonAnimationFn (){
            $('.s6-wrap h2 ').stop().animate({opacity:0}, 3000);
        }
    },
    section7Fn:function (){
        var t = 0;
        // 스크롤 이벤트
        setTimeout(s7NonAnimateFn, 100);

        $(window).scroll(function(){
            if( $(this).scrollTop() >= $('#section6').offset().top + 100 ){
                if(t==0){
                    t=1;
                    s7AnimateFn();
                }
            }
            if( $(this).scrollTop() < $('#section6').offset().top + 100 ){
                if(t==1){
                    t=0;
                    s7NonAnimateFn();
                }
            }
        });

        function s7AnimateFn(){
            $('.s7-content1').stop().animate({opacity:1, marginLeft:15}, 2500);
            $('.s7-content2').stop().animate({opacity:1, marginLeft:15}, 2000);
            $('.s7-content3').stop().animate({opacity:1, marginLeft:15}, 2500);
            $('.s7-content4').stop().animate({opacity:1, marginLeft:15}, 2000);
        }
        function s7NonAnimateFn(){
            $('.s7-content1').stop().animate({opacity:0, marginLeft:-100}, 2500);
            $('.s7-content2').stop().animate({opacity:0, marginLeft:-100}, 2000);
            $('.s7-content3').stop().animate({opacity:0, marginLeft:-100}, 2500);
            $('.s7-content4').stop().animate({opacity:0, marginLeft:-100}, 2000);
        }

    },
    fontsFn:function(){
        // 폰트 반응형
        var rateH2=0.048134777;
        var rateS5H3=0.046666667;
        var rateS7H3=0.04;
        var footerP=0.020689655;
        var winW = $(window).width();
        var s5W = $('.s5-content').width();
        var s7W = $('.s7-content').width();
        var footerW = $('.footer-center').width();

        setTimeout(fontResize, 100);
        
        function fontResize(){
            rateH2=0.074074074;
            rateS5H3=0.046666667;
            rateS7H3=0.04;
            rateS7P=0.024;
            footerP=0.020689655;
            
            secW = $('.s2-wrap').width();
            s5W = $('.s5-content').width();
            s7W = $('.s7-content').width();
            footerW = $('.footer-center').width();

            fontSizeH2 = rateH2 * secW;
            fontSizeS5H3 = rateS5H3 * s5W;
            fontSizeS7H3 = rateS7H3 * s7W;
            fontSizeS7P = rateS7P * s7W;
            fontSizeFooter = footerP * footerW;
            
            
            $('.s2-wrap h2, .s3-wrap h2, .s5-wrap h2, .s6-wrap h2').css({fontSize:fontSizeH2});
            $('.s5-content h3, .s5-content p, .s5-content s5-date').css({fontSize:fontSizeS5H3});
            $('.s7-content h3').css({fontSize:fontSizeS7H3});
            $('.s7-content p').css({fontSize:fontSizeS7P});
            $('.company li').css({fontSize:fontSizeFooter});
        }
        $(window).resize(function(){
            fontResize();
        });
    }

}
    lineFrends.init(); 
})(jQuery,document,window);