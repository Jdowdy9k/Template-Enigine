class Engineer {
    constructor(name, id, email, officenumber){
        this.name = name;
        this.id = id;
        this.email = email;
        this.github = github;
    }
    getName() {
        return this.name;
    }
    getId () {
        return this.id;
    }
    getEmail () {
        return this.email;
    }
    getGithub () {
        return this.github;
    }
    getRole () {
        return "engineer";
    }
}

module.exports = Engineer;