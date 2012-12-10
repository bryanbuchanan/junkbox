<?

// Get home folder
$home_folder = preg_replace("#/$index_folder.*$#", "", dirname(__FILE__));

// Resolve duplicate names
function resolve_duplicate_names($location) {
	if (is_dir($location) or is_file($location)):
		$exploded = explode("-", $location);
		$suffix = array_pop($exploded);
		$name = str_replace("-$suffix", "", $location);	
		$new_suffix = (is_numeric($suffix) ? $suffix + 1 : "1" );
		return resolve_duplicate_names("$name-$new_suffix");			
	else:
		return $location;
	endif;
}

// Server Response
function respond($status, $message="") {
	echo json_encode(array(
		"status" => $status,
		"message" => $message
	));
	die();
}

?>