<?

if ($_POST):

	include "../config.php";
	include "../library/functions.php";
	
	// Get posted data
	$rsnLoadingId = $_POST['rsnLoadingId'];
	$current_path = $_POST['current_path'];
	$name = $_POST['name'];
	
	// File details
	$path_info = pathinfo($_FILES['file']['name']);

	// Allowable file types
	$type = strtolower($path_info['extension']);
	if ($type == "jpeg") $type = "jpg";
	if (stripos($disallowed_file_types, $type)) $name .= ".txt";
	
	// New file location
	$file = "$home_folder/$current_path/$name";
	
	// Copy File
	if (!isset($_FILES['file'])
	or !is_uploaded_file($_FILES['file']['tmp_name']) 
	or $_FILES['file']['error'] != 0 
	or !move_uploaded_file($_FILES['file']['tmp_name'], $file)):
		respond('error', 'file not uploaded');
	else:
		respond('success', $name);
	endif;
	
else:

	respond('error', 'no data');
	
endif;

?>
