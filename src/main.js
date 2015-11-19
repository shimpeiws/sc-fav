import app from 'app';
import BrowserWindow from 'browser-window';
import CrashReporter from 'crash-reporter';
import url from 'url';
import querystring from 'querystring';

class Auth {
    constructor(options) {
        this.client_id = options.client_id;
        this.token     = null;
        this.setupProtocol();
    }
    
    setupProtocol() {
        let protocol = require('protocol');
        protocol.registerHttpProtocol('sc-fav', (req) => {
            let uri = url.parse(req.url);

            switch(uri.host) {
            case 'oauth':
                if (uri.pathname !== '/callback'){
                    return;
                }

                let hash = uri.hash.substr(1);
                let token = querystring.parse(hash).access_token;

                // TODO: Open MainWindow
                break;
            default:

            }
        });
    }

    login(loadUrl) {
        let loginWindow = new BrowserWindow({
            width: 400,
            height: 500,
            resizable: false,
            'node-integration': false
        });
        loginWindow.loadUrl(loadUrl);
    }
}

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
    
    let auth = new Auth({client_id: '964d428beee7b8d4350fc942c594fd7d'});
    auth.login('https://soundcloud.com/connect?client_id=964d428beee7b8d4350fc942c594fd7d&response_type=token&scope=non-expiring&display=next&redirect_uri=sc-fav://oauth/callback');

    mainWindow.on('closed', () => {
        app.quit();
    });
});
