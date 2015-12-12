import _ from 'lodash';
import fs from 'fs';

export default class Config {
    constructor(options = {}) {
        this.options = _.extend({}, options);
        this.configFile = this.options.configFilePath;
    }

    set(key, val) {
        this.options[key] = val;
        return new Promise((resolve, reject) => {
            fs.writeFile(this.configFile, JSON.stringify(this.options), (error) =>  {
                if(error) {
                    reject(error);
                }

                resolve();
            });
        });
    }

    get(key) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.configFile, (error, data) => {
                if(error) {
                    reject(error);
                }

                data = JSON.parse(data);
                resolve(data[key]);
            });
        });
    }
}
