class Auth {
    constructor() {
        this.authenticated = false;
    }

    login(cd) {
        this.authenticated = true;
        cd();
    }

    logout(cd) {
        this.authenticated = false;
        localStorage.clear();
        cd();
    }

    isAuthenticated() {
        this.authenticated = (localStorage.getItem('state') != null);
        return this.authenticated;
    }
}
export default new Auth()