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


/* Right Click
----------------------------------------------------------------------------- */


	admin.rightClick = function() {
	
		$('body').click(function() {
			$('.content .selected').removeClass('selected');
			$('#menu').remove();
		});
	
		$('body').bind('contextmenu', function(event) {
			$('.content .selected').removeClass('selected');
			$('#menu').remove();
		});
	
		$('.content > li').bind('contextmenu', function(event) {

			// Remove existing menus
			$('#menu').remove();
			
			// Set classes
			$('.content .selected').removeClass('selected');
			$(this).addClass('selected');
			
			// Get target
			var target = $(this).children('a').attr('href');
			
			// Menu
			var $menu = $('<ul id="menu" data-target="' + target + '">\
				<li><a class="rename" href="#">Change Name</a></li>\
				<li><a class="delete" href="' + home_uri + '/' + index_folder + '/actions/delete.php">Delete</a></li>\
				</ul>');
						 		 
		 	var offsetX = 0;
		 	var offsetY = -8;
		 	var windowWidth = $(window).width();
		 	var windowHeight = $(window).height();

			$menu.css({
				top: (event.pageY + offsetY) + "px",
				left: (event.pageX + offsetX) + "px"
			});
			
			$('body').append($menu);
			
			// Disable menu
			return false;
				
		});
	
	};
    
	
/* Delete
----------------------------------------------------------------------------- */
	
	
	admin.delete = function() {
	
		// Get properties
		var target = current_path + "/" + $(this).closest('#menu').data('target');
		var target = target.replace(/^\//, '');
		var action = $(this).attr('href');
		var $listItem = $('.content a[href="' + $(this).closest('#menu').data('target') + '"]').parent();

		// Remove menu
		$('#menu').remove();
								
		// Delete
		if (admin.deleteConfirm(target, $listItem)) {
			$.post(action, { target: target }, function(data) {
				if (data == "success") $listItem.remove();
			});	
		}
		
		return false;
		
	};
	
	admin.deleteConfirm = function(target, $listItem) {
	
		admin.deleteConfirm.confirmed = "error";
	
		// Confirm
		if (!confirm("Are you sure you want to delete this?")) {
		
			admin.deleteConfirm.confirmed = false;
			
		} else {
		
			// Confirm deletion of folder contents too
			if ($listItem.hasClass('folder')) {
			
				$.ajax({
					type: "post",
					url: home_uri + '/' + index_folder + '/actions/empty.php',
					data: { target: target },
					async: false,
					dataType: "json",
					success: function(data) {
					
						if (data.message > 0) {
											
							var language = ( data.message < 2 ? "There is " + data.message + " file " : "There are " + data.message + " files ");
				
							if (confirm(language + "inside this folder that will also be permanently erased. Would you like to delete anyway?")) {
								admin.deleteConfirm.confirmed = true;
							} else {
								admin.deleteConfirm.confirmed = false;
							}

						} else {

							admin.deleteConfirm.confirmed = true;
				
						}
						
					}

				});

			} else {
		
				admin.deleteConfirm.confirmed = true;
		
			}
			
		}
		
		return admin.deleteConfirm.confirmed;
				
	};
	
	
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
		// $('input[type=text]').live('keyup', safeName);
		// $('input[type=text]').live('change', safeName);
		
		$('#folder a').click(admin.newFolder);
		admin.rightClick();
		$('a.delete').live('click', admin.delete);


	});	

