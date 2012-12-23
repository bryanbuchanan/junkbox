<?

if (isset($_POST)):

	include "../config.php";
	
	// Admin
	if (isset($_COOKIE[$admin_key])):
		setcookie($admin_key, true, time() - 3600, '/');
	endif;

	// Local
	if (isset($_GET['key'])):
		setcookie($_GET['key'], true, time() - 3600, '/');
	endif; 
	
	// Access
	if (isset($_COOKIE[$access_key])):
		setcookie($access_key, true, time() - 3600, '/');
	endif;

endif;

header('Location: ' . $_SERVER['HTTP_REFERER']);

?>