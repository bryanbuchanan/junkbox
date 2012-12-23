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
		// Get password values
		$current_folder = "$home_folder/" . $_POST['local_password'];		
		$local_restriction = find_password($current_folder, $_POST['nest_depth']);
		// Compare credentials
		if ($_POST['name'] == $local_restriction['name']
		and $_POST['password'] == $local_restriction['password']):
			setcookie($local_restriction['key'], true, time() + 7200, '/');
			header('Location: ' . $_SERVER['REQUEST_URI']);
			die();
		endif;
	endif;
	
endif;

header('Location: ' . $_SERVER['HTTP_REFERER']);

?>