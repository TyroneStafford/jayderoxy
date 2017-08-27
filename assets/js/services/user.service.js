import ApiService from './api.service';

export default class UserService {

    constructor() {
        this.apiService = new ApiService();
    }

    login(username, password) {
        /**
         * We're just going to use the skyy vodka credentials
         * to log the user in.
         */
        console.log("HELLO!");
    }
}