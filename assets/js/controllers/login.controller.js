import { LoginComponent } from "../components/index";

export var LoginController = {
    props: [],
    data() {
        return {}
    },
    template: require('../../../html/login.html'),

    components: {
        'login': LoginComponent
    },

    created() {

    },

    mounted() {
        this.fixMDLFields();
    }
};

/**
 Important notes:
 - Application states is accessed through `this.$parent.appState`
 - If you want to pass route params you need to add the property to the props array
 **/