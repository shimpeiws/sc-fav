import app from 'app';
import Auth from './auth';
import BrowserWindow from 'browser-window';

export default class WindowManager {
    constructor(options) {
        this.clientId = options.clientId;
        this.auth = new Auth({
            loginCallback: () => {
                this.mainWindow = new BrowserWindow({ width: 350, height: 640 });
                this.mainWindow.on('closed', () => {
                    app.quit();
                });
                this.mainWindow.webContents.on('did-finish-load', () => {
                    this.auth.getToken().then((token) => {
                        this.mainWindow.webContents.send('token', token);
                    });
                });
                this.mainWindow.loadURL(`file://${__dirname}/..${options.indexPath}`);
            }
        });
        this.mainWindow = null;
    }

    openMainWindow(redirectUrl) {
        if(this.mainWindow) {
            return;
        }

        this.auth.login(`https://soundcloud.com/connect?client_id=${this.clientId}&response_type=token&scope=non-expiring&display=next&redirect_uri=${redirectUrl}`);
    }
}
