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