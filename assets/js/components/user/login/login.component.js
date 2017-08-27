export var LoginComponent = {
    template: require('./login.html'),
    data() {
        return {
            form_data: {
                email : '',
                password: ''
            }
        }
    },
    created: function() {
        
    },
    methods: {
        submit: function() {
            this.$validator.validateAll().then(() => {
                // eslint-disable-next-line
                alert('From Submitted!');
            }).catch(() => {
                // eslint-disable-next-line
                alert('Correct them errors!');
            });
        }
    }
};