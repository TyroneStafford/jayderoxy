import UserModel from '../models/user';

export default class Examples {

    runAll() {
        console.group("Running Some Examples!");
        this.createUser();
        //this.getMultipleUsers();
        console.groupEnd();
    }

    createUser() {

        console.log("Creating a new User Model");

        let user = new UserModel({
            'first_name': 'Jarryd',
            'last_name' : 'WAM',
            'email_address': 'jarryd1@wearemonsters.co.za',
            'password': 'password'
        });
        console.log(user);
        console.log("User toJson");
        console.log(user.toJson());
        console.log("Getters are also supported!!");
        console.log(user.fullname);

    }

    getUser() {


    }

    getMultipleUsers() {

    }

}