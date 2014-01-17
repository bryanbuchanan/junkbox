<?

if (!empty($_POST)):

	include "../_config.php";
	include "../library/functions.php";
	
	$target = "$home_folder/" . $_POST['target'] . "/*";
	$files = glob($target);
	
	respond('success', sizeof($files));
		
endif;

?>