/* RESEN */
/* Javascript
----------------------------------------------------------------------------- */
			

/* FUNCTION: HOVER
----------------------------------------------------------------------------- */


	function hoverAdmin() {
	
		$('.edit .grid li > a').mousedown(function() {
			
			if (!$(this).closest('li').hasClass('selected')) {

				$(this).closest('ul').children().removeClass('selected');			
				$(this).closest('li').addClass('selected');
				
			} else {
			
				$(this).closest('ul').children().removeClass('selected');			
			
			}
			
		});
		
		$('.edit .grid li > a').click(function() { return false; });

		$('.edit .grid li.folder > a').dblclick(function() { 
		
			window.location = $(this).attr('href');
			return false;
		
		});
		
		$('.edit .grid li:not(.folder) > a').dblclick(function() { 
		
			window.open($(this).attr('href'), '_blank');
			return false;
		
		});

		$('.edit').click(function() {
			
			$(this).find('.selected').removeClass('selected');			

		});

	}


/* FUNCTION: REMOVE
----------------------------------------------------------------------------- */

	
	function remove(file) {

		if (confirm('Are you sure you want to delete this file?\nThis cannot be undone.')) {

			$.post(site_host + '.index/actions/remove.php', { file: file, remove: true }, function(data) { 
			
				if (data.match('success')) {
					
					var fileName = file.split('/').pop();
					$('.grid').find('a[href$="' + fileName + '"]').closest('li').remove();
			
				} else if (data.match(/empty/i)) {
				
					alert('Folder must be empty in order to delete it.');
				
				} else {
				
					alert('Error');
				
				}
								
			});
								
			return false;
	
		} else {
	
			return false;			
	
		}
	
	}
	
	
/* FUNCTION: UNZIP
----------------------------------------------------------------------------- */

		
	function unzip(file) {
	
		$.post(site_host + '.index/actions/unzip.php', { file: file, directory: directory }, function(data) { 
			
			console.log(data);
			
			if (data.match('success')) {
			
			//	$('.grid > .selected').remove();
	
			} else {
			
			//	alert('Error');
			
			}
							
		});
	
	}
		
		
/* FUNCTION: RENAME
----------------------------------------------------------------------------- */

	
	function rename() {
	
		$('.edit .grid strong').click(function() {
		
			if (!$(this).closest('li').hasClass('selected')) {

				$(this).closest('ul').children().removeClass('selected');			
				$(this).closest('li').addClass('selected');
				
			}
		
			$(this).hide();
						
			$('<form action="' + site_host + '.index/actions/rename.php" method="post" enctype="multipart/form-data"><input type="hidden" name="path" value="' + directory + '" /><input type="hidden" name="old_name" value="' + $(this).children('a').text() + '" /><input type="text" name="new_name" value="' + $(this).children('a').text() + '" autocomplete="off" /></form>').insertAfter($(this));
			
			$(this).siblings('form').find('input').focus();
			
			$(this).siblings('form').find('input').blur(function() {
			
				var newValue = $(this).val();
				var oldValue = $(this).parents('form').siblings('strong').children('a').text();

				$(this).parents('form').hide();
				$(this).parents('form').siblings('strong').children('a').text(newValue);
				$(this).parents('form').siblings('strong').show();

				if (newValue != oldValue) {
				
					$(this).parents('form').ajaxSubmit(function(data) { console.log(data); $(this).remove(); });
					$(this).closest('li').find('a').attr('href', newValue);
					icons();

				} else {
				
					$(this).parents('form').remove();
				
				}
							
			});
			
			$(this).siblings('form').find('input').keydown(function(e) {
			
				if (e.which === 13) {
			
					var newValue = $(this).val();
					var oldValue = $(this).parents('form').siblings('strong').children('a').text();

					$(this).parents('form').hide();
					$(this).parents('form').siblings('strong').children('a').text(newValue);
					$(this).parents('form').siblings('strong').show();
					
					if (newValue != oldValue) {
					
						$(this).parents('form').ajaxSubmit(function() { $(this).remove(); });
						$(this).closest('li').find('a').attr('href', newValue);
						icons();
	
					} else {
					
						$(this).parents('form').remove();
					
					}
				
					return false;

				}
								
			});
			
			return false;
		
		});
	
	}
	
	
/* FUNCTION: MOVE
----------------------------------------------------------------------------- */


	function move() {
	
		$('.edit .grid > li').draggable({ revert: true });
		
		$('.edit .grid > li.folder').droppable({

			hoverClass: 'droppable',
			drop: function() {
			
				var new_path = directory + $(this).find('strong a').text() + "/";
				var file = $('.ui-draggable-dragging').find('strong a').text();

				$.post(site_host + '.index/actions/move.php', {
				
					old_path: directory,
					new_path: new_path,
					file: file
					
				});
					
				$('.ui-draggable-dragging').remove();
			
			}
		
		});
		
		$('#tools #back:not(.inactive) a').droppable({

			tolerance: 'pointer',
			hoverClass: 'droppable',
			drop: function() {

				var new_path = directory + $(this).attr('href');
				var file = $('.ui-draggable-dragging').find('strong a').text();

				$.post(site_host + '.index/actions/move.php', {
				
					old_path: directory,
					new_path: new_path,
					file: file
					
				});
					
				$('.ui-draggable-dragging').remove();
			
			}
		
		});
	
	}
	
	
/* FUNCTION: SAFE FILE NAME
----------------------------------------------------------------------------- */


	function safeName(event) {
		
		if (event.keyCode != 37 && event.keyCode != 39 && !$(this).hasClass('big')) {
		
			if ($(this).parents('.grid').length > 0 && $(this).parents('.folder').length == 0) {
		
				// Allow .
				var name = $(this).val().replace(/\&/g, 'and').replace(/\s/g, '_').replace(/[^a-zA-Z0-9_\-\.]/g, '').replace(/_{2,}/g, '_').toLowerCase();
			
			} else {
			
				// Don't Allow .
				var name = $(this).val().replace(/\&/g, 'and').replace(/\s/g, '_').replace(/[^a-zA-Z0-9_\-]/g, '').replace(/_{2,}/g, '_').toLowerCase();

			}
			
			$(this).val(name);
		
		}
		
	}
	
	
/* FUNCTION: SWF UPLOADER PREP
----------------------------------------------------------------------------- */

	
	function uploaderPrep() {					

	var settings = {
			
			flash_url : site_host + ".index/flash/swfupload.swf",
			upload_url: site_host + ".index/actions/upload.php?directory=" + directory,
			file_post_name: "upload_file",

			post_params: { 
			
				'PHPSESSID': session,
				// 'id': id
				
			},
			file_post_name: 'upload_file',
			file_size_limit: "100 MB",
			file_types: '*.*',
			file_types_description: 'Files',
			file_upload_limit: 100,
			file_queue_limit: 0,
			custom_settings: {
				progress_target: 'progress',
				upload_successful: false
			},
	 
			button_width: '1000',
			button_height: '1000',
			button_placeholder_id: 'buttonPlaceholder',
			button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,

			file_queued_handler: fileQueued,
			file_queue_error_handler: fileQueueError,
			file_dialog_complete_handler: fileDialogComplete,
			upload_progress_handler: uploadProgress,
			upload_error_handler: uploadError,
			upload_success_handler: uploadSuccess,
			upload_complete_handler: uploadComplete,
			queue_complete_handler: queueComplete,

			debug: false
			
		};

		swfu = null;
		swfu = new SWFUpload(settings);
		
	}
			
	
/* FUNCTION: NEW FOLDER
----------------------------------------------------------------------------- */


	function newFolder() {

		$.post(site_host + '.index/actions/folder.php', {
		
			folder: 1,
			file: directory + "new_folder_1"
			
		}, function(data) {
		
			location.reload(true);

		});
				
		return false;
	
	}


/* FUNCTION: RIGHT CLICK
----------------------------------------------------------------------------- */


	function rightClick() {

		$('ul.grid > li').rightClick(function(event) {
		
			var fileName = $(this).find('strong a').text();
		
			$(this).addClass('selected');
		
			$('#overlay').remove();
		
		//	if (fileName.match(/\.zip$/i)) {
		
		//		$('body').append('<div id="overlay"><ul id="rightclick"><li class="url"><a href="#">Show URL</a></li><li class="unzip"><a href="#">Unzip</a></li><li class="delete"><a href="#">Delete</a></li></ul></div>');

		//	} else {
			
				$('body').append('<div id="overlay"><ul id="rightclick"><li class="url"><a href="#">Show URL</a></li><li class="delete"><a href="#">Delete</a></li></ul></div>');
			
		//	}

			var left = event.clientX;
			var top = event.clientY;
					
			if (left > $(window).width() - $('#rightclick').width()) var left = $(window).width() - $('#rightclick').width();
			if (top > $(window).height() - $('#rightclick').height()) var top = $(window).height() - $('#rightclick').height();
	
			$('#rightclick').css('top', top + 'px');
			$('#rightclick').css('left', left + 'px');
			
			$('#rightclick .url a').click(function() {
						
				var url = window.location.href + $('.grid > .selected > a').attr('href');
				$('#rightclick').hide();
				$('<input type="text" class="big" value="' + url + '" />').appendTo('#overlay').focus();
				$('input.big').click(function() { return false; });
				return false;
				
			});
			
			$('#rightclick .unzip a').click(function() {
						
				var file = $('.grid > .selected').find('strong a').text();
				unzip(file);
				
			});
	
			$('#rightclick .delete a').click(function() {
			
				var file = directory + $('.grid > .selected').find('strong a').text();
				remove(file);
				diskSpace(20);
					
			});			
			
			$('#overlay').click(closeRightClick);
			$('#overlay').rightClick(closeRightClick);
				
		});		
    
    }
    
    function closeRightClick() {
  
      	$('#rightclick .url a').unbind('click');
    	$('#rightclick .delete a').unbind('click');
    	$('.selected').removeClass('selected');
		$(this).remove();
		return false;
    
    }
    
    
/* FUNCTION: DISK SPACE CHECK
----------------------------------------------------------------------------- */


	function diskSpace() {
	
		/*
		$.post('/actions/disk_space', function(space) {
				
			if (space > 0) {
			
				$('#tools #file').removeClass('inactive');
				$('#tools #file a span').text('Upload File');

			} else {
			
				$('#tools #file').addClass('inactive');
				$('#tools #file a span').text('Disk Space Full');
			
			}
		
		});
		*/
	
	}
	
	
/* Timeline
----------------------------------------------------------------------------- */
	

	$(document).ready(function() {

		// Upload Button
		$('input[name="upload_file"]').change(upload.selectFile);
		
		// DnD
		$(window).bind('dragenter', upload.dragenter);
		$(window).bind('dragover', upload.cancelAction);			
		$('#dragging').live('dragleave', upload.dragleave);
		$(window).bind('drop', upload.drop);
		
		hoverAdmin();
		rename();
		move();
		$('input[type=text]').live('keyup', safeName);
		$('input[type=text]').live('change', safeName);
		//uploaderPrep();
		$('#folder a.button').click(newFolder);
		rightClick();
		diskSpace();

	});	

