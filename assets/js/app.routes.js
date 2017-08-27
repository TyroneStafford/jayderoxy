/**
 * When adding a new route, make sure to:
 * - Create a new controller in js/controllers
 * - Import that controller
 * - Assign that controller to the route
 */
import { HomeController } from './controllers/home.controller';
import { LoggedInController } from './controllers/logged-in.controller';
import { LoginController } from './controllers/login.controller';
import { RegisterController } from './controllers/register.controller';

export var Routes = [
    {
        path: '/',
        component: HomeController,
        meta: {
            class: "home-page",
            requires_auth: false
        }
    },
    {
        path: '/login',
        component: LoginController,
        meta: {
            class: "login-page",
            requires_auth: false
        }
    },
    {
        path: '/logged-in',
        component: LoggedInController,
        meta: {
            requires_auth: true
        }
    },
    {
        path: '/register',
        component: RegisterController,
        meta: {
            class: "register-page",
            requires_auth: false
        }
    }
];