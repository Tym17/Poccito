const { shell, remote } = require('electron');
const { spawn } = require('child_process');
const config = require('./config.json');

module.exports = launch = {

    msRedis: function () {
        alert(config.msredis);
    },

    game: function () {
        let nickname = document.getElementById('nickname').value;
        let ip = document.getElementById('ip').value;
        let port = document.getElementById('port').value;
        alert(config.game);
    },

    tymcom: function () {
        shell.openExternal('http://tym17.com');
    },

    quit: function () {
        let window = remote.getCurrentWindow();
        window.close();
    }
}