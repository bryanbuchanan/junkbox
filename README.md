# Junkbox

Junkbox is a file browser and manager written in PHP intended to share and manage files in a presentable way.

**Disclaimer:** Absolutely no warranty is provided with the software. Use at your own risk.

## Installation

1. Put the "_index" folder inside the folder you'd like to share, along side any existing files.  
2. Visit PATH_TO_YOUR_FOLDER/_index in your web browser and the script should finish the installation for you.

## Limiting Access

To require a name and password to access your files:

1. Open the "_index/config.php" file, and uncomment the line that starts with `$viewer[] = ...`
2.  Replace "name" and "password" with the name/password you'd like to use.
3. You can setup multiple accounts by making duplicates of this line with different names/passwords.

## Notes

- File *management* functionality is not yet working.
