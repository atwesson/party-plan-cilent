let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3001';
        break;
    case 'git.heroku.com/efa112budgetapp.git':
        APIURL = 'https://git.heroku.com/efa112budgetapp.git'
}

export default APIURL