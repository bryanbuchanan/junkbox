<?

include "config.php";
include "library/functions.php";

/* Initial Setup
------------------------------------------------------------ */

$current_htaccess_content = ( is_file("../.htaccess") ? file_get_contents("../.htaccess", true) : "" );
$correct_htaccess_content = "Options Indexes FollowSymLinks\nDirectoryIndex " . $_SERVER['PHP_SELF'];

// Create .htaccess file if it doesn't exist or is incorrect
if ($current_htaccess_content != $correct_htaccess_content):
	$htaccess_file = fopen("../.htaccess", "w") or die("Can't create .htaccess file");
	fwrite($htaccess_file, $correct_htaccess_content);
	fclose($htaccess_file);
endif;

// Forward to home folder
if (preg_match("#/$index_folder/#", $_SERVER['REQUEST_URI'])):
	$forward_to = preg_replace("#$index_folder/index.php$#", "", $_SERVER['PHP_SELF']);
	header("Location: $forward_to");
	die();
endif;

/* --------------------------------------------------------- */

// Get environment variables
$debug = true;
$home_folder = preg_replace("#/$index_folder$#", "", dirname(__FILE__));
$home_uri = preg_replace("#/$index_folder/index.php$#", "", $_SERVER['PHP_SELF']);
$uri = preg_replace("#/$#", "", $_SERVER["REQUEST_URI"]);
$private = (isset($viewer) and count($viewer) > 0 ? true : false);

// Get page title
$page_title = str_replace($home_uri, "", $_SERVER['REQUEST_URI']);
$page_title = str_replace("%20", " ", $page_title);

// Get current path
$current_path= str_replace($home_uri, "", $_SERVER['REQUEST_URI']);
$current_path = preg_replace("#(^/|/$)#", "", $current_path);
$current_path = str_replace("%20", " ", $current_path);

// Current folder
$current_folder = "$home_folder/$current_path";

// Thumbnail folder
$thumb_home_uri = "$home_uri/$index_folder/thumbs";
$thumb_home_folder = "$home_folder/$index_folder/thumbs";
$thumb_current_folder = "$thumb_home_folder/$current_path";
$thumb_current_uri = "$thumb_home_uri/$current_path";

?>
<!doctype html>
<html>
<head>

	<title><?= $page_title ?></title>
	
	<meta charset="utf-8">
	
	<? if (!$search_engine_indexing): ?><meta name="robots" content="noindex"><? endif ?>

	<!-- Stylesheets -->
	<link href="<?= $home_uri ?>/<?= $index_folder ?>/styles/precedents.css" rel="stylesheet">
	<link href="<?= $home_uri ?>/<?= $index_folder ?>/styles/layout.css" rel="stylesheet">
	<link href="<?= $home_uri ?>/<?= $index_folder ?>/styles/content.css" rel="stylesheet">

	<!-- Internet Exploder -->
	<!--[if lt IE 7]><script>window.location="http://usestandards.com/upgrade?url="+document.location.href;</script><![endif]-->

</head>
<body>

	<ul id="tools">
				
		<? if ("$home_uri/" == $_SERVER['REQUEST_URI']) $class = "inactive" ?>
		<li id="back" class="<?= $class ?>"><a class="button" href="../"><span>Back</span></a></li>

		<? if (isset($_COOKIE[$admin_key])): ?>

			<li id="folder"><a class="button" href="#folder"><span>New Folder</span></a></li>
			
		<? endif ?>	
		
		<? if (isset($_COOKIE[$admin_key]) or isset($_COOKIE[$access_key])): ?>

			<li id="signout"><a class="button" href="<?= $home_uri ?>/<?= $index_folder ?>/actions/signout.php">Sign Out</a></li>

		<? elseif (isset($viewer) or isset($admin)): ?>
			
			<li id="signin">
			
				<a class="button" href="#">Sign In</a>

				<form action="<?= $home_uri ?>/<?= $index_folder ?>/actions/signin.php" method="post">
					<input type="text" name="name" size="15" placeholder="Name">
					<input type="password" name="password" size="15" placeholder="Password">
					<input type="submit" value="Go &rarr;">
				</form>
									
			</li>
		
		<? endif ?>
						
	</ul>
	
	<a id="credit" href="http://resen.co/" target="_blank" rel="external">Resen</a>

	<? if ($private and !isset($_COOKIE[$admin_key]) and !isset($_COOKIE[$access_key])): else: ?>

		<ul class="content">

			<?
								
			// Get Files/Folders
			$dir = opendir($current_folder);
			$files = array();
			while (false !== ($file = readdir($dir))):
				if ($file != "."
				and $file != ".."
				and $file != ".svn"
				and $file != "/"
				and $file != $index_folder
				and $file != ".htaccess"
				and $file != ".DS_Store"
				and $file != ".git"
				and $file != ".gitignore"
				and substr_count($file, ".pureftpd") == 0):
					$random_key = rand(100,999);
					$date = filemtime("$current_folder/$file");
					$files[$date.$random_key] = $file;
				endif;
			endwhile;
			
			// Sort
			if ($sort == "name"):
				sort($files);
			else:
				ksort($files);
			endif;
			
			// Order
			if ($order == "desc") $files = array_reverse($files, true);
								
			// Create folder for thumbnails, if it doesn't already exist
			if (!is_dir($thumb_home_folder)) mkdir($thumb_home_folder);
			if (!is_dir($thumb_current_folder)) mkdir($thumb_current_folder);
		
			foreach ($files as $file):
								
				$file_name = pathinfo("$current_folder/$file");
				$file_name = $file_name['filename'];
			
				if (is_dir("$current_folder/$file")): ?>
				
					<!-- Folder -->
					<li class="folder">
						<a href="<?= $file ?>">
							<div class="image">
								<img src="<?= $home_uri ?>/<?= $index_folder ?>/images/icons/icon-folder.png" alt="<?= $file ?>" class="icon">
							</div>
							<strong><?= $file ?></strong>
							<span><?= date("M d Y", filemtime("$current_folder/$file")) ?></span>
						</a>	
					</li>
			
				<? elseif (is_file("$thumb_current_folder/$file_name.jpg")
				and filemtime("$current_folder/$file") < filemtime("$thumb_current_folder/$file_name.jpg")): ?>

					<!-- File with thumbnail -->
					<li class="file thumb">
						<a href="<?= $file ?>" title="<?= $file ?>" target="_blank">
							<div class="image">
								<img src="<?= "$thumb_current_uri/$file_name.jpg" ?>" alt="<?= $file ?>" class="icon">
							</div>
							<strong><?= $file ?></strong>
							<em><?= round((filesize("$current_folder/$file")) / 1000) ?>kb</em>
							<span><?= date("M d Y", filemtime("$current_folder/$file")) ?></span>
						</a>	
					</li>
					
				<? else: ?>
					
					<!-- File without thumbnail -->			
					<li class="file">
						<a href="<?= $file ?>" title="<?= $file ?>" target="_blank">
							<div class="image">
								<img src="<?= $home_uri ?>/<?= $index_folder ?>/images/icons/icon-file.png" alt="<?= $file ?>" class="icon">
							</div>
							<strong><?= $file ?></strong>
							<em><?= round((filesize("$current_folder/$file")) / 1000) ?>kb</em>
							<span><?= date("M d Y", filemtime("$current_folder/$file")) ?></span>
						</a>
					</li>
					
				<? endif ?>
			
			<? endforeach ?>

		</ul>
		
	<? endif ?>	

	<? if ($debug): ?>
		<div id="debug">
			$home_folder = <?= $home_folder ?><br>
			$home_uri = <?= $home_uri ?><br>
			$thumb_home_folder = <?= $thumb_home_folder ?><br>
			$thumb_home_uri = <?= $thumb_home_uri ?><br>
			$private = <?= $private ?><br>
			<br>
			$uri = <?= $uri ?><br>
			$current_folder = <?= $current_folder ?><br>
			$current_path = <?= $current_path ?><br>
			$thumb_current_folder = <?= $thumb_current_folder ?><br>
			$thumb_current_uri = <?= $thumb_current_uri ?><br>
		</div>
	<? endif ?>

	<!-- Javascript -->
	<script>
		var uri = "<?= $uri ?>";
		var home_uri = "<?= $home_uri ?>";
		var thumb_home_uri = "<?= $thumb_home_uri ?>";
		var current_path = "<?= $current_path ?>";
		var thumb_current_uri = "<?= $thumb_current_uri ?>";
		var index_folder = "<?= $index_folder ?>";
		var disallowed_file_types = "<?= $disallowed_file_types ?>";
	</script>
	<script src="<?= $home_uri ?>/<?= $index_folder ?>/scripts/jquery.js"></script>
	<script src="<?= $home_uri ?>/<?= $index_folder ?>/scripts/functions.js"></script>
	
	<? if (isset($_COOKIE[$admin_key])): ?>
		<!-- Admin Javascript -->
		<script src="<?= $home_uri ?>/<?= $index_folder ?>/scripts/admin.js"></script>
	<? endif ?>
	
</body>
</html>

