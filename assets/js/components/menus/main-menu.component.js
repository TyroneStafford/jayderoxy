export var MainMenuComponent = {
    template: require('./main-menu.html'),
    props: [
        'links'
    ],
    inject: ['authService'],
    data() {
        return {

        }
    },
    created() {

    },
    methods: {

        isVisible(link) {
            if (typeof link.visibility == 'undefined')
                return true;

            switch (link.visibility) {
                case "logged-in":
                    return this.authService.isAuthenticated();
                case "not-logged-in":
                    return !this.authService.isAuthenticated();
                default:
                    return true;
            }

        },

        goTo(route) {
            this.$parent.appState.router.push(route);
        }
    }
};