<?

if (!empty($_POST)):

	include "../config.php";

	// Admin login
	if (isset($admin)):
		foreach ($admin as $account):
			if ($_POST['name'] == $account[0]
			and $_POST['password'] == $account[1]):
				setcookie($admin_key, true, time() + 7200, '/');
				header('Location: ' . $_SERVER['REQUEST_URI']);
				die();
			endif;
		endforeach;
	endif;
	
	// Access login
	if (isset($viewer)):
		foreach ($viewer as $account):
			if ($_POST['name'] == $account[0]
			and $_POST['password'] == $account[1]):
				setcookie($access_key, true, time() + 7200, '/');
				header('Location: ' . $_SERVER['REQUEST_URI']);
				die();
			endif;
		endforeach;
	endif;
	
endif;

header('Location: ' . $_SERVER['HTTP_REFERER']);

?>