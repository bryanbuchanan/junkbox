# Junkbox

Junkbox is a file browser and manager written in PHP intended to share and manage files in a presentable way.

**Disclaimer:** Absolutely no warranty is provided with the software. Use at your own risk. In fact, don't use this at all.

## Installation

1. Put the "\_index" folder inside the folder you'd like to share.
2. Visit **http://URL_TO_YOUR_FOLDER/_index** in your web browser.

## Setting Up Admin Accounts

Uploading, renaming, deleting, and folder creation are available for admin accounts. You can setup admin accounts by:

1.  Open the "_index/config.php" file, and change the value of this line to reflect the admin name and password you'd like to use:
		
		$admin[] = array('admin', 'password');

2. You can setup multiple admin accounts by making duplicates of this line with different names/passwords:

		$admin[] = array('steviej', 'password321');
		$admin[] = array('ashleys', 'password123');

## Limiting Access

To require a name and password to access your files:

1. Open the "_index/config.php" file, and uncomment this line:

		// $viewer[] = array('name', 'password');

	So it should look like this:

		$viewer[] = array('name', 'password');

2.  Replace "name" and "password" with the name/password you'd like to use (be sure to keep the quotes though).
3. You can setup multiple accounts by making duplicates of this line with different names/passwords:

		$viewer[] = array('kennyp', 'password123');
		$viewer[] = array('aprilb', 'anotherpassword');

## Limiting Access to Specific Folders

You can also create a name/password to protect individual folders, separately from the global "viewer" accounts already mentioned.

1. Create a text file on your computer named **_password.txt**.
2. Inside that txt file, put this:

		name: joe
		password: pdub
		
	And change "joe" and "pdub" to whatever name/password you'd like to require.
3. Upload the **_password.txt** file to the folder you'd like it to protect.

