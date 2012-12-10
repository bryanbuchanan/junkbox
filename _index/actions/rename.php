<?

if (!empty($_POST)):

	include "../config.php";
	include "../library/functions.php";

	$target = "$home_folder/" . $_POST['target'];

	if (is_dir($target)):
	

		shell_exec("rm -r $target");
	elseif (is_file($target)):
		unlink($target);
	endif;
	
	echo "success";
	
endif;

?>