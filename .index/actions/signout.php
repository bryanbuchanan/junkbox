<?

if (isset($_POST)):

	include "../config.php";
	
	if (isset($_COOKIE[$admin_key])):
		setcookie($admin_key, true, time() - 3600, '/');
	endif;
	
	if (isset($_COOKIE[$access_key])):
		setcookie($access_key, true, time() - 3600, '/');
	endif;

endif;

header('Location: ' . $_SERVER['HTTP_REFERER']);

?>