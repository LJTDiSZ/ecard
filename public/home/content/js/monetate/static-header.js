window.cafepress = window.cafepress || {};
window.cafepress.globalHeader = window.cafepress.globalHeader || {};

window.cafepress.globalHeader.staticHeader = function(){
	var self = this;
	var data = {
		header: $('.header-outer'),
		staticClassName: 'static',
		lastScroll: 0,
		headerTop: $('.header-outer').offset() ? $('.header-outer').offset().top : 0,
		headerHeight: $('.header-outer').outerHeight()
	};
	
	self.init = function(){
		if(data.header.length < 1){
			return;
		}
		bindSticky();
		cafepress.globalHeader.matchMedia(570, widthChange);
	};
	
	function bindSticky(){
		$.getScript('content/mobile2.0/js/vendor/jquery.sticky.js', function(){
			$(data.header).sticky({topSpacing:0});
		});
	};
	
	function widthChange(mq) {
		if(mq.matches)
			bindShopSubMenuWorkaround();
		else
			unbindShopSubMenuWorkaround();
	};

	function bindShopSubMenuWorkaround(){
		$('#sub-nav-shop, #sub-nav-cart').on('activeChanged', onMenuActiveChanged).on('heightChanged', onMenuHeightChanged);
	};

	function unbindShopSubMenuWorkaround(){
		$('#sub-nav-shop, #sub-nav-cart').off('activeChanged', onMenuActiveChanged).off('heightChanged', onMenuHeightChanged);
	};

	function setMenuHeight(selector){
		var rect = selector.get(0).getBoundingClientRect();
		var extraHeight = rect.bottom - $(window).height();

		if (extraHeight > 0){
			var originalHeight = selector.height();
			selector.height(originalHeight - extraHeight)
		}
	};

	function onMenuHeightChanged(){
		$('html, body').outerHeight(getBodyHeight(this));
	};

	function onMenuActiveChanged (e){
		if ($(this).hasClass('active')){					
			data.lastScroll = $('body').scrollTop();
			var top = Math.min(data.lastScroll, data.headerTop);
			$('html, body').outerHeight(getBodyHeight(this)).css({'overflow' : 'hidden'}).scrollTop(top);
		} else {	
			$('html, body').css({'height': 'auto', 'overflow' : 'auto'}).scrollTop(data.lastScroll);
		}
	};
	
	function getBodyHeight(subNavElement) {
		var bodyHeight = $(subNavElement).outerHeight() + data.headerHeight - 7 + ($(".bb").outerHeight() || 0);
		return bodyHeight;
	};
	
	return self;
}();

window.cafepress.globalHeader.staticHeader.init();