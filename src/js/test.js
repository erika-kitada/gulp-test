$(function() {
	$("#menu li:first-child").attr("id", "menuListFirst");

	$("#mainContents h2.title").wrap("<div class=\"h2\"></div>");

	$("#sidebar").stick_in_parent();

	var returnPageTop = $(".returnPageTop");
	$(window).scroll(function () {
		if ($(this).scrollTop() > 400) {
			returnPageTop.fadeIn();
		} else {
			returnPageTop.fadeOut();
		}
	});
	returnPageTop.click(function () {
		$('body, html').animate({ scrollTop: 0 }, 1000, "easeInOutSine");
		return false;
	});
});
