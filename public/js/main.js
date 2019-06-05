$(document).ready(function () {
	// Переключение языка
	$('.js-lang-item').click(function(){
		var curVal = $(this).parents('.js-lang-list').siblings('.js-lang-cur').text();
		var checkVal = $(this).text();
		$('.js-lang-cur').text(checkVal);
		$('.js-lang-item').text(curVal);
		$('.js-lang-item').data('lang',curVal);
	});

	// Фиксированное меню
	showHeaderScroll('position-fixedmenu','header');

	// 3D карусель
	if ($("#carousel").length) {
		var carousel = $("#carousel").waterwheelCarousel({
			flankingItems: 1,
			opacityMultiplier: 0.5,
			edgeFadeEnabled: true,
			forcedImageWidth: 375,
			forcedImageHeight: 500,
			keyboardNav: true,
			activeClassName: 'carousel-center',
			movingToCenter: function ($item) {
				$('#callback-output').prepend('movingToCenter: ' + $item.attr('id') + '<br/>');
			},
			movedToCenter: function ($item) {
				$('#callback-output').prepend('movedToCenter: ' + $item.attr('id') + '<br/>');
			},
			movingFromCenter: function ($item) {
				$('#callback-output').prepend('movingFromCenter: ' + $item.attr('id') + '<br/>');
			},
			movedFromCenter: function ($item) {
				$('#callback-output').prepend('movedFromCenter: ' + $item.attr('id') + '<br/>');
			},
			clickedCenter: function ($item) {
				$('#callback-output').prepend('clickedCenter: ' + $item.attr('id') + '<br/>');
			}
		});

		$('#prev').bind('click', function () {
			carousel.prev();
			return false
		});

		$('#next').bind('click', function () {
			carousel.next();
			return false;
		});

		$('#carousel').swipe({
			swipe : function(event, direction) {
				if (direction === 'left' || direction === 'up') {
					carousel.next();
					return false;
				} else {
					carousel.prev();
					return false;
				}
			}
		});

		$('#reload').bind('click', function () {
			newOptions = eval("(" + $('#newoptions').val() + ")");
			carousel.reload(newOptions);
			return false;
		});

		function resizeCarousel(){
			var widthWindow = $(window).width();

			function func() {
				var heightCenterImg = $(".carousel-center").css("height");
				$('#carousel').css("height", heightCenterImg);
			}
			setTimeout(func, 500);

			if ((widthWindow < 1199) && (widthWindow > 1024)) {
				carousel.reload({flankingItems: 2, opacityMultiplier: 0.5, edgeFadeEnabled: true, forcedImageWidth: 640, forcedImageHeight: 380, keyboardNav: true, activeClassName: 'carousel-center'});
			}else if ((widthWindow < 1025) && (widthWindow > 768)){
				carousel.reload({flankingItems: 1, opacityMultiplier: 0.5, edgeFadeEnabled: true, forcedImageWidth: 640, forcedImageHeight: 380, keyboardNav: true, activeClassName: 'carousel-center'});
			}else if (widthWindow < 769){
				carousel.reload({flankingItems: 0, opacityMultiplier: 0.5, edgeFadeEnabled: true, keyboardNav: true, activeClassName: 'carousel-center'});
			}else{
				carousel.reload({flankingItems: 3, opacityMultiplier: 0.5, edgeFadeEnabled: true, forcedImageWidth: 640, forcedImageHeight: 380, keyboardNav: true, activeClassName: 'carousel-center'});
			};
		}

		resizeCarousel();

		$(window).bind('resizeEnd', function() {
			resizeCarousel();
			return false;
		});

		$(window).resize(function() {
			if(this.resizeTO) clearTimeout(this.resizeTO);
			this.resizeTO = setTimeout(function() {
				$(this).trigger('resizeEnd');
			}, 500);
		});

		$('#carousel').bind('mousewheel DOMMouseScroll ', function(e) {
			e.preventDefault();
			
			delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);
			if (delta >= 0) {
				$('#div').css("background","red");
				carousel.next();
				return false;
			} else {
				carousel.prev();
				return false;
			}
			
		});
	}
	

	
	// //---------- Маска для телефона -------------
	// $.mask.definitions['~'] = "[+-]";
	// $("#phone").mask("(999) 999-9999");

	// // Вызов функции подгрузки изображений
	// loadBigImg();
	// loadBigBacground();

	// // Вызов функции прижатия футера к низу экрана
	// footerBind('.js-main','.js-header,.js-footer');
	// $(window).on('resize',function(){footerBind('.js-main','.js-header,.js-footer')});
});

// // Загрузка больших изображений
// function loadBigImg() {
// 	var $imgDefer = $('[data-src]');

// 	$imgDefer.each(function(indx, element){
// 		var urlImgBig = $(this).attr("data-src");
// 		$(this).attr("src", urlImgBig);
// 	});
// }

// function loadBigBacground() {
// 	var $imgDefer = $('[data-background]');

// 	$imgDefer.each(function(indx, element){
// 		var urlBackgroundBig = $(this).attr("data-background");
// 		$(this).css("background-image", "url("+ urlBackgroundBig +")");
// 	});
// }

//-------------- Fixed Menu ---------------------
function showHeaderScroll(selPos,fixedMenu){

	var positionSensor = document.getElementById(selPos);

	if(positionSensor){
		var fixedMenu = document.getElementById(fixedMenu);
		var sensorTopPos = positionSensor.getBoundingClientRect().top;
		var typeMenu = '';

		if ($(fixedMenu).hasClass('opacity')) {
			typeMenu = 'opacity';
		}

		
		var menuHidden = true;
		if(sensorTopPos <= 0) {
			$(fixedMenu).css("top", "-100px");
			$(fixedMenu).animate({top: "0"}, {duration: 400, easing: "linear"});
			menuHidden = false;
		}

		$(window).on("scroll", function() {
			sensorTopPos = positionSensor.getBoundingClientRect().top;
			if(sensorTopPos <= 0) {
				if(menuHidden) {
					$(fixedMenu).css("top", "-100px");
					$(fixedMenu).animate({top: "0"}, {duration: 400, easing: "linear"});
					menuHidden = false;
				}

				$(fixedMenu).addClass('fixed');
				if (typeMenu == 'opacity') {
					$(fixedMenu).removeClass('opacity');
				}
			}else if (sensorTopPos > 0) {
				if(!menuHidden) {
					$(fixedMenu).animate({top: "0"}, {duration: 0, easing: "linear"});
					menuHidden = true;
				}

				$(fixedMenu).removeClass('fixed');
				if (typeMenu == 'opacity') {
					$(fixedMenu).addClass('opacity');
				}
			}
		});
	}
}