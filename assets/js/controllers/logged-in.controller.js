export var LoggedInController = {
    props: [],
    data() {
        return {}
    },
    template: require('../../../html/logged-in.html'),
    mounted() {

    }
};

/**
 Important notes:
 - Application states is accessed through `this.$parent.appState`
 - If you want to pass route params you need to add the property to the props array
 **/