import {UserRegisterComponent} from "../components/index";

export var RegisterController = {
    props: [],
    data() {
        return {}
    },
    template: require('../../../html/register.html'),

    components: {
        'registration-form': UserRegisterComponent
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