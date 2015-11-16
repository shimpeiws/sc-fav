import app from 'app';
import BrowserWindow from 'browser-window';
import CrashReporter from 'crash-reporter';

let mainWindow = null;

if(process.env.NODE_ENV === 'develop'){
    CrashReporter.start();
}

app.on('ready', () => {
    if(mainWindow) {
        return;
    }

    mainWindow = new BrowserWindow({ width: 350, height: 640 });

    mainWindow.loadUrl('file://' + __dirname + '/renderer/index.html');
    mainWindow.on('closed', () => {
        app.quit();
    });
});
