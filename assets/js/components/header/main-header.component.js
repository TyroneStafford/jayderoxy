require('./main-header.scss');

export var HeaderComponent = {
    template: require('./main-header.html'),
    props: ['title','content'],
    data() {
        return {

        }
    },
    created() {
        console.log(this.links);
    },
    methods: {
        // toggleMenu : function() {
        //     this.state.menuActive = !this.state.menuActive ? true : false;
        // },
        // goToHome: function() {
        //   window.location.href = "/";
        // }
    }
};