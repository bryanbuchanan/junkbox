# Junkbox

Junkbox is a file browser and manager written in PHP intended to share and manage files in a presentable way.

## Installation

1. Put the `_index` folder inside the folder you'd like to share.
2. Visit `http://URL_TO_YOUR_FOLDER/_index` in your web browser.

## Setting Up Admin Accounts

Uploading, renaming, deleting, and folder creation are available for admin accounts. To setup admin accounts:

1.  Open the `_index/config.php` file, and change the value of this line to reflect the admin name and password you'd like to use:
		
		$admin[] = array('admin', 'password');

2. You can setup multiple admin accounts by making duplicates of this line with different names/passwords:

		$admin[] = array('steviej', 'password321');
		$admin[] = array('ashleys', 'password123');

## Limiting Access

Limiting access to individual folders is possible by adding a `_password.txt` file to the folder you'd like to protect. In the text file, define the name and password required to view the folder's contents:

	name: joe
	password: password1
