import {Config} from '../app.config';

export default class BaseModel {

    constructor(data) {
        if (typeof data == 'object') {
            this.populate(data);
        }
    }

    meta() {
        return {
            model: 'base',
            fields: []
        };
    }

    exists(value) {
        if (typeof value == 'undefined')
            return false;
        if (value == null)
            return false;
        return true;
    }


    isPersisted() {
        return this.exists(this.id);
    }

    populate(values) {
        let fields = this.meta().fields;
        Object.keys(values).forEach(key => {
            let value = values[key];
            if (fields.indexOf(key) > -1) {
                this[key] = value;
            } else {
                console.warn("Invalid key: " + key + " attempted to be set on model: " + this.meta().model);
            }
        })
    }

    save() {

    }

    toJson() {
        return JSON.stringify(this);
    }

}
