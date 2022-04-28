import { alert, Stack } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export default (title, text) => {
   return alert({
      title,
      text, 
      delay: 2000,
      sticker: false,
      width: '280px',
      
      stack: new Stack({
        dir1: 'down',
        dir2: 'right',
        firstpos1: 25,
        firstpos2: 25,
        spacing1: 36,
        spacing2: 36,
        push: 'bottom',
        modal: true, 
        overlayClose: true,
        context: document.body,
      }),
    });
}