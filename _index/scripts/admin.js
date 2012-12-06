/* RESEN */
/* Javascript
----------------------------------------------------------------------------- */
	
	
	var admin = new Object();
			

/* FUNCTION: HOVER
----------------------------------------------------------------------------- */





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

		

		
		
/* FUNCTION: RENAME
----------------------------------------------------------------------------- */

	
	
	
/* FUNCTION: MOVE
----------------------------------------------------------------------------- */


	
	
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

			
	
/* New Folder
----------------------------------------------------------------------------- */


	admin.newFolder = function() {

		$.post(home_uri + '/' + index_folder + '/actions/folder.php', { 
			folder: current_path + '/untitled_folder'
		}, function(data) {
			location.reload(true);
		});
				
		return false;
	
	};


/* FUNCTION: RIGHT CLICK
----------------------------------------------------------------------------- */


	
    
	
	
/* Timeline
----------------------------------------------------------------------------- */
	

	$(document).ready(function() {
		
		// DnD
		/*
		$(window).bind('dragenter', upload.dragenter);
		$(window).bind('dragover', upload.cancelAction);			
		$('#dragging').live('dragleave', upload.dragleave);
		$(window).bind('drop', upload.drop);
		*/
		
		// rename();
		// move();
		$('input[type=text]').live('keyup', safeName);
		$('input[type=text]').live('change', safeName);
		$('#folder a').click(admin.newFolder);
		//rightClick();
		//diskSpace();

	});	

