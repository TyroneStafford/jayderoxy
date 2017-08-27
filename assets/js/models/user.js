import BaseModel from './base';

export default class UserModel extends BaseModel {

    constructor(data) {
        super(data);
    }

    meta() {
        /**
         * Use the fields property to define the list of fields that
         * this model can be populated with
         */
        return {
            model: 'user',
            fields: ['id', 'first_name','last_name', 'email_address', 'username', 'password']
        };
    }

    get fullname() {
        return this.first_name + " " + this.last_name;
    }
    
}

/**
 Important Notes:
 - All class models must have a meta() property which returns
   -- model (the model name)
   -- fields (list of populable fields)
 */