import { Config } from './app.config';
import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';
import {Routes} from './app.routes';
// import { Directives } from './app.directives';
import Vuex from 'vuex';
import { State } from './app.state';
import VeeValidate from 'vee-validate';
// import { MainMenu } from './app.menus';
// import { MainMenuComponent } from './components/menus/main-menu.component';
// import { HeaderComponent } from './components/header/main-header.component';

import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters);

/**
 * Import the services we intend to use.
 */
import {
    AuthenticationService
} from './services/index';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VeeValidate);

const auth = new AuthenticationService();
const router = new VueRouter({
    routes: Routes
});

router.beforeEach((to,from,next) => { return auth.guard(to,from,next); });

Vue.prototype.fixMDLFields = function() {
    //a fix for MDL input fields. Sorry a bit hacky...
    //should be called in the 'mounted' callback of controllers. using: this.fixMDLFields();
    window.componentHandler.upgradeDom();
};

// for (var key in Directives) {
//   Vue.Directive(key, Directives[key]);
// }

const state = new Vuex.Store(State);
state.config = Config;
state.router = router;
// state.mainMenu = MainMenu;

const application = new Vue({
    router: router,
    data: {
        containerClass: {
            "mdl-layout__content": true
        },
        appState: state
    },
    components: {
        // 'main-menu': MainMenuComponent,
        // 'main-header': HeaderComponent
    },
    provide: {
        appState: state,
        authService: auth
    },
    watch: {'$route': function() { this.onRouteChange(); }},
    methods: {
        onRouteChange() {
            this.containerClass = {"mdl-layout__content" : true};
            if (this.$route.meta.hasOwnProperty("class")) this.containerClass[this.$route.meta.class] = true;
            var layout = document.querySelector('.mdl-layout');
            if (layout.hasOwnProperty('MaterialLayout')) layout.MaterialLayout.toggleDrawer();
        }
    },
    created() {

    },
    mounted() {
        this.onRouteChange();
    }
}).$mount("#application");

//inject the sass
require('../scss/main.scss');
