const { shell, remote } = require('electron');
const { spawn } = require('child_process');
const config = require('./config.json');

module.exports = launch = {

    msRedis: function () {
        let window = remote.getCurrentWindow();
        window.minimize();
        let prc = spawn(config.msredis);
        prc.stdout.on('data', data => {
            console.log(`[MsRedis] ${data}`);
        });
        prc.stderr.on('data', data => {
            console.log(`[MsRedis Error] ${data}`);
        })
        prc.on('close', code => {
            console.log(`Exited MsRedis with code ${code}`);
            window.restore();
        });
    },

    game: function () {
        let nickname = document.getElementById('nickname').value;
        let ip = document.getElementById('ip').value;
        let port = document.getElementById('port').value;
        let window = remote.getCurrentWindow();
        window.minimize();
        let prc = spawn(config.game, [ip, port, nickname]);
        prc.stdout.on('data', data => {
            console.log(`[Game] ${data}`);
        });
        prc.stderr.on('data', data => {
            console.log(`[Game Error] ${data}`);
        })
        prc.on('close', code => {
            console.log(`Exited game with code ${code}`);
            window.restore();
        });
    },

    tymcom: function () {
        shell.openExternal('http://tym17.com');
    },

    quit: function () {
        let window = remote.getCurrentWindow();
        window.close();
    }
}