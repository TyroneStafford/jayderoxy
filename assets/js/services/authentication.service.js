import jwtDecode from 'jwt-decode';

export default class AuthenticationService {

    constructor() {
    }

    getUser() {
        return {
            user: localStorage.getItem('current_user'),
            token: localStorage.getItem('jwt_token')
        }
    }

    setUser(user, jwtToken) {
        localStorage.setItem('current_user', user);
        localStorage.setItem('jwt_token', jwtToken);
    }

    logout() {
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("current_user");
    }

    isAuthenticated() {
        let user = this.getUser();
        if ((user.user == null) || (user.token == null)) {
            this.logout();
            return false;
        } else {
            //lets make sure this token is valid
            let valid = this.tokenIsExpired(user.token);
            if (!valid) {
                this.logout();
                return false;
            }
        }
        return true;
    }

    tokenIsExpired(token) {
        try {
            let decoded = jwtDecode(token);
            let now = Math.floor((new Date().getTime() / 1000));
            if (now >= decoded.exp) {
                return false;
            }
        } catch (e) {
            return false;
        }
        return true;
    }

    guard(to, from, next) {
        if ((to.meta.hasOwnProperty("requires_auth")) && (to.meta.requires_auth == true)) {
            if (!this.isAuthenticated()) {
                next('/');
                return;
            }
        }
        next();
    }

}