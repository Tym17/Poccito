const package = require('./package.json');
const fs = require('fs');
const chalk = require('chalk');
const log = console.log;

// build client sources + launcher proper directory
log('=== ' + chalk.cyan('Poccito Builder ') + 'v' + chalk.grey(package.version) + ' ===\n');

// === Folder Structure ===
log('Creating Folder structure...');
let baseDir = package.config.out_directory + 'build';
log('  ' + chalk.grey(baseDir));
fs.mkdirSync(baseDir);

baseDir = baseDir + '/' + package.config.directory_name;
log('  ' + chalk.grey(baseDir));
fs.mkdirSync(baseDir);

let assetsDir = baseDir + '/assets';
log('  ' + chalk.grey(assetsDir));
fs.mkdirSync(assetsDir);
assetsDir = assetsDir + '/';

let binDir = baseDir + '/bin';
log('  ' + chalk.grey(binDir));
fs.mkdirSync(binDir);
binDir = binDir + '/';

let installDir = baseDir + '/install';
log('  ' + chalk.grey(installDir));
fs.mkdirSync(installDir);

log(chalk.green('Done.\n'));

// === Copying Game ===
log('Copying Game...');

let MsRedisPath = installDir + '/vcredist_x86.exe';
log('  ' + chalk.yellow(MsRedisPath));
fs.copyFileSync(package.config.msredis, MsRedisPath);

let gameDir = '../client/Release/';
log('  Copying binaries...');
let gameFiles = fs.readdirSync(gameDir);
let goodFileRegex = /.*(dll|exe)$/gmi;
gameFiles.forEach(f => {
    if (goodFileRegex.test(f)) {
        log('  ' + chalk.magenta(binDir + f));
        fs.copyFileSync(gameDir + f, binDir + f);
    }
    goodFileRegex.lastIndex = 0;
});

let assetsSource = package.config.assets_source;
log('  Copying assets...');
let assetsFiles = fs.readdirSync(assetsSource);
assetsFiles.forEach(f => {
    log('  ' + chalk.magenta(assetsDir + f));
    fs.copyFileSync(assetsSource + f, assetsDir + f);
});
log(chalk.green('Done.\n'));

// === Packing Launcher ===
log('Packing Launcher...');