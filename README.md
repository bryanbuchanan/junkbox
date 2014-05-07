# Junkbox

Junkbox is a file browser and manager written in PHP intended to share and manage files in a presentable way.

![Junkbox](https://raw.github.com/bryanbuchanan/junkbox/master/screenshot.png)

## Demo

1. Go to http://junkbox.resen.co and view the file browser.
2. To use it as an admin, sign in with the name "admin" and password "password".

## Installation

1. Put the `_index` folder inside the folder you'd like to share.
2. Visit `http://URL_TO_YOUR_FOLDER/_index/index.php` in your web browser.

## Setting Up Admin Accounts

Uploading, renaming, deleting, file/folder moving, and folder creation are available for admin accounts.

To setup admin accounts, open the `_index/config.php` file, and change the values in the `$admins` array to match the credentials you'd like to use:
		
```php
$admins = array(
	(object) array(
		"name" => "name",
		"password" => "5f4dcc3b5aa765d61d8327deb882cf99"
	),
	(object) array(
		"name" => "admin",
		"password" => "5f4dcc3b5aa765d61d8327deb882cf99"
	)
);
```

Admin passwords must be encrypted using PHP's md5 function. You can do so here <http://resen.co/pw>.

## Limiting Access

Limiting access to individual folders is possible by adding a `_password.txt` file to the folder you'd like to protect. In the text file, define the name and password required to view the folder's contents:

```
name: joe
password: password1
```

For added security, you can use a file name other than "_password.txt" to set passwords, as long as you update the "local_password_file" definition in your config.php file.

