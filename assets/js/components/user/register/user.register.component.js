export var UserRegisterComponent = {
    template: require('./user.register.html'),
    props: [],
    data() {
        return {
            form_data: {
                first_name: '',
                last_name: '',
                email_address: '',
                password: '',
                repeat_password: ''
            }
        }
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