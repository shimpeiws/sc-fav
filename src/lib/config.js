import _ from 'lodash';
import app from 'app';
import fs from 'fs';

export default class Config {
    constructor(options = {}) {
        console.log('config INIT!!!');
        this.options = _.extend({}, options);
        this.configFile = app.getPath('userData') + '/config.json';
        console.log('this.configFile', this.configFile);
    }

    set(key, val, callback) {
        console.log('key', key);
        console.log('val', val);
        this.options[key] = val;
        fs.writeFile(this.configFile, JSON.stringify(this.options), (err) =>  {
            console.log("setError occured!!!!", err);
            if(err) {
                return callback(err);
            }

            callback(null);
        });
    }

    get(key, callback) {
        fs.readFile(CONFIG_FILE, function(err, data) {
            if(err) {
                return callback(err);
            }

            data = JSON.parse(data);
            return callback(null, data[key]);
        });
    }
}
