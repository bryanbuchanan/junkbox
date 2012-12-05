/* RESEN */

/* Debug Logger
---------------------------------------------------------------- */


	function log(message) {
		if (window.console && window.console.log) {
			console.log(message);
		}
	}


/* Sign In
---------------------------------------------------------------- */


	function signIn() {
		$('#signin > a.button').click(function() {
			$(this).hide();
			$(this).siblings('form').show();
			$(this).siblings('form').find('[name="name"]').focus();
			return false;
		});
	}


/* Icons
---------------------------------------------------------------- */

	
	function icons() {
	
		// Images
		$('a[href$="pdf"] img').attr('src', home_uri + '/_index/images/icons/icon-image.png');
		$('a[href$="ai"] img').attr('src', home_uri + '/_index/images/icons/icon-ai.png');
		$('a[href$="eps"] img').attr('src', home_uri + '/_index/images/icons/icon-image.png');
		$('a[href$="tif"] img').attr('src', home_uri + '/_index/images/icons/icon-image.png');
		$('a[href$="bmp"] img').attr('src', home_uri + '/_index/images/icons/icon-image.png');
	
		// Videos
		$('a[href$="fla"] img').attr('src', home_uri + '/_index/images/icons/icon-fla.png');
		$('a[href$="flv"] img').attr('src', home_uri + '/_index/images/icons/icon-flv.png');
		$('a[href$="swf"] img').attr('src', home_uri + '/_index/images/icons/icon-swf.png');
		$('a[href$="mov"] img').attr('src', home_uri + '/_index/images/icons/icon-video.png');
		$('a[href$="mpg"] img').attr('src', home_uri + '/_index/images/icons/icon-video.png');
	
		// Documents
		$('a[href$="doc"] img, a[href$="docx"] img').attr('src', home_uri + '/_index/images/icons/icon-doc.png');
		$('a[href$="xls"] img, a[href$="xlsx"] img').attr('src', home_uri + '/_index/images/icons/icon-xls.png');
		
		// Archives
		$('a[href$="zip"] img').attr('src', home_uri + '/_index/images/icons/icon-zip.png');

	}
	
	
/* Thumbnail
---------------------------------------------------------------- */


	function thumbnail() {
	
		var file = $(this).children('a').attr('href');
		var $this = $(this);
		
		if (file.match(/(jpg|jpeg|gif|png)$/i)) {
			$.post(home_uri + '/' + index_folder + '/actions/thumbnail.php', { 
				file: file,
				current_path: current_path
			}, function(thumb) {
				$this.find('img').attr('src', thumb_current_uri + "/" + thumb).removeClass('icon');
				$this.addClass('thumb');
			});
		}
	
	}
	
	
/* Timeline
---------------------------------------------------------------- */
	

	$(document).ready(function() {
	
		icons();
		signIn();
		$('.inactive a').click(function() { return false; });
		$('.grid > li.file:not(.thumb)').each(thumbnail);

	});
			