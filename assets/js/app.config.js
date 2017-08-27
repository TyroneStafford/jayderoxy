export var Config = {
    debug: true,
    domains: {
        "localhost": "development",
        "monsterlab.co.za": "staging",
        "live-url.com": "production" //update this
    },

    environments: {
        "development": {
            //development config settings go here
        },
        "staging": {
            //staging config settings go here
        },
        "production": {
            //production config settings go here
        }
    },

    getEnvironmentConfig(key) {

        let environment = this.getEnvironment();
        if (typeof this.environments[environment][key] !== 'undefined') {
            return this.environments[environment][key];
        }
        console.warn("Config value: " + key + " is not set for environment: " + environment);
    },

    getEnvironment() {
        let domain = window.location.hostname;
        if (typeof this.domains[domain]) {
            return this.domains[domain];
        }
        return "development";
    }
};