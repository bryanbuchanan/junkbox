<?

if (!empty($_POST)):

	include "../config.php";
	include "../library/functions.php";

	$target = "$home_folder/" . $_POST['target'];

	if (is_dir($target)):
	


	endif;
	
	echo "success";
	
endif;

?>