import app from 'app';
import BrowserWindow from 'browser-window';
import url from 'url';
import querystring from 'querystring';
import Config from './config';

export default class Auth {
    constructor(options) {
        this.config        = new Config({configFilePath: app.getPath('userData') + '/config.json'});
        this.token         = null;
        this.loginWindow   = null;
        this.loginCallback = options.loginCallback;
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

                this.loginWindow.close();

                let hash = uri.hash.substr(1);
                let token = querystring.parse(hash).access_token;
                this.config.set('token', token)
                .then(() => {
                    // Do Nothing
                })
                .catch((err) => {
                    // TODO: Error handling
                });

                this.loginCallback();

                break;
            default:

            }
        });
    }

    login(url) {
        this.loginWindow = new BrowserWindow({
            width: 400,
            height: 500,
            resizable: false,
            'node-integration': false
        });
        this.loginWindow.loadURL(url);
    }

    getToken() {
        return new Promise((resolve, reject) => {
            this.config.get('token')
            .then((token) => {
                resolve(token);
            })
            .catch((error) => {
                // TODO: Error handling
            });
        });
    }
}
