# Junkbox

Junkbox is a file browser and manager written in PHP intended to share and manage files in a presentable way.

**Disclaimer:** Absolutely no warranty is provided with the software. Use at your own risk.

## Installation

1. Put the "_index" folder inside the folder you'd like to share, along side any existing files.  
![image](http://f.cl.ly/items/1w032r0v1o2Z0D3o291A/Screen%20Shot%202012-12-04%20at%202.13.18%20PM.png)
2. Visit PATH_TO_YOUR_FOLDER/_index in your web browser and the script should finish the installation for you.
![image](http://f.cl.ly/items/0u213p2t3S1p2628331i/Screen-Shot-2012-12-04-at-2.19.22-PM.png)

## Limiting Access

To require a name and password to access your files:

1. Open the "_index/config.php" file, and uncomment the line that starts with `$viewer[] = ...`
2.  Replace "name" and "password" with the name/password you'd like to use.
3. You can setup multiple accounts by making duplicates of this line with different names/passwords.

## Notes

- File *management* functionality is not yet working.
