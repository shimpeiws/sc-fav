import _ from 'lodash';
import app from 'app';
import fs from 'fs';

export default class Config {
    constructor(options = {}) {
        this.options = _.extend({}, options);
        this.configFile = app.getPath('userData') + '/config.json';
    }

    set(key, val, callback) {
        this.options[key] = val;
        fs.writeFile(this.configFile, JSON.stringify(this.options), (err) =>  {
            if(err) {
                return callback(err);
            }

            callback(null);
        });
    }

    get(key, callback) {
        fs.readFile(this.configFile, function(err, data) {
            if(err) {
                return callback(err);
            }

            data = JSON.parse(data);
            return callback(null, data[key]);
        });
    }
}
