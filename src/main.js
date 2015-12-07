import app from 'app';
import CrashReporter from 'crash-reporter';
import WindowManager from './lib/window_manager';

if(process.env.NODE_ENV === 'develop'){
    CrashReporter.start();
}

app.on('ready', () => {
    let window = new WindowManager({
        clientId: '964d428beee7b8d4350fc942c594fd7d',
        indexPath: '/renderer/index.html'
    });
    window.openMainWindow('sc-fav://oauth/callback');
});
