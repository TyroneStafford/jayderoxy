/**
 * Each link has a visibility setting.
 * Options are:
 * - always
 * - logged-in
 * - not-logged-in
 * @type {{links: *[]}}
 */

export var MainMenu = {

    links: [
        {
            title: 'Home',
            href: '/',
            visibility: "always",
            links: [
                {
                    title: 'Test Submenu Link',
                    href:'/',
                    visibility: 'logged-in'
                }
            ]
        },
        {
            title: 'Log In',
            href: '/login',
            visibility: "not-logged-in",
            links: []
        },
        {
            title: 'Register',
            href: '/register',
            visibility: "not-logged-in",
            links: []
        }
    ]

};

//export var OtherMenu = {};
//export var AnotherMenu = {};