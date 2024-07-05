# youtubemediacontrol
This userscript is intended for using the previous and next media control buttons when not not playing a playlist.  

## Details
Whenever youtube sets 'previoustrack' or 'nexttrack' they're replaced by a callback.  
The nexttrack callback clicks the element with the 'ytp-next-button' class.  
The previoustrack callback clicks the element with the 'ytp-prev-button' class if it is visible, if it is not visible it calls history.back.  
