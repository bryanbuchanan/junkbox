# Junkbox

Junkbox is a file browser and manager written in PHP intended to share and manage files in a presentable way.

![Junkbox](https://raw.github.com/bryanbuchanan/junkbox/master/screenshot.png)

## Installation

1. Put the `_index` folder inside the folder you'd like to share.
2. Visit `http://URL_TO_YOUR_FOLDER/_index` in your web browser.

## Setting Up Admin Accounts

Uploading, renaming, deleting, file/folder moving, and folder creation are available for admin accounts.

To setup admin accounts, open the `_index/config.php` file, and change the value of this line to reflect the admin name and password you'd like to use:
		
```php
$admin[] = array('name', 'password');
```

You can setup multiple admin accounts by making duplicates of this line with different names/passwords:

```php
$admin[] = array('steviej', 'password321');
$admin[] = array('ashleys', 'password123');
```

## Limiting Access

Limiting access to individual folders is possible by adding a `_password.txt` file to the folder you'd like to protect. In the text file, define the name and password required to view the folder's contents:

```
name: joe
password: password1
```

For added security, you can use a file name other than "_password.txt" to set passwords, as long as you update the "local_password_file" definition in your config.php file.