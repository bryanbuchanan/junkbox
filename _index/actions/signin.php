<?

if (!empty($_POST)):

	include "../config.php";
	include "../library/functions.php";

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
	
	// Local folder login
	if (isset($_POST['local_password'])):
	
		// echo "local password found \n";
	
		// Get local password info
		$current_folder = "$home_folder/" . $_POST['local_password'];
		
		// echo "$home_folder/" . $_POST['local_password'] . " \n";
		
		
		
		$local_account_data = file_get_contents("$current_folder/_password.txt", true);
		
		// echo "$local_account_data \n";
		
		preg_match("#^name:\s*(.+?)$#im", $local_account_data, $local_name);
		preg_match("#^password:\s*(.+?)$#im", $local_account_data, $local_password);
		$local_key = md5($current_folder);
		$local_name = $local_name[1];
		$local_password = $local_password[1];
		
		// echo "$local_key \n";
		// echo "$local_name \n";
		// echo "$local_password \n";
		
		// Compare credentials
		if ($_POST['name'] == $local_name and $_POST['password'] == $local_password):
			setcookie($local_key, true, time() + 7200, '/');
			header('Location: ' . $_SERVER['REQUEST_URI']);
			die();	
		endif;
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