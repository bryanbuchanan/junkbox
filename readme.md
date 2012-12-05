# Junkbox

Junkbox is a file browser and manager written in PHP intended to share and manage files in a presentable way.

**Disclaimer:** Absolutely no warranty is provided with the software. Use at your own risk. In fact, don't use this at all.

## Installation

1. Put the "\_index" folder inside the folder you'd like to share, along side any existing files.  
2. Visit **http://URL_TO_YOUR_FOLDER/_index** in your web browser and the script should finish the installation for you.

## Limiting Access

To require a name and password to access your files:

1. Open the "_index/config.php" file, and uncomment this line:

		// $viewer[] = array('name', 'password');

	So it should look like this:

		$viewer[] = array('name', 'password');

2.  Replace "name" and "password" with the name/password you'd like to use (be sure to keep the quotes though).
3. You can setup multiple accounts by making duplicates of this line with different names/passwords:

		$viewer[] = array('kenny', 'password123');
		$viewer[] = array('stevie', 'anotherpassword');

## Notes

- File management functionality is not yet working.
