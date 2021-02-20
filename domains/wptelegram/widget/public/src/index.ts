import $ from 'jquery';

import './style.scss';

$(() => {
	const iframe = $('.wptelegram-widget-message iframe');

	iframe.on('load', function () {
		const $this = $(this);
		if ($this.contents().find('body').is(':empty')) {
			$this.parent().remove();
		} else {
			$this.trigger('resize_iframe');
		}
	});

	iframe.on('resize_iframe', function () {
		$(this).height($(this).contents().find('body').height());
	});
});
