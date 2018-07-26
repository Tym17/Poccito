const package = require('./package.json');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const log = console.log;
const { spawnSync } = require('child_process');

// utils
function copyFileSync( source, target ) {

    var targetFile = target;

    //if target is a directory a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    log('  ' + chalk.gray(targetFile));
    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target, firstrun) {
    var files = [];

    //check if folder needs to be created or integrated
    var targetFolder = target;
    if (!firstrun) {
        targetFolder = path.join(target, path.basename(source));
    }
    if ( !fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
        log('  ' + chalk.gray(targetFolder));
    }

    //copy
    if ( fs.lstatSync(source).isDirectory() ) {
        files = fs.readdirSync(source);
        files.forEach(function (file) {
            var curSource = path.join(source, file);
            if ( fs.lstatSync(curSource).isDirectory() ) {
                copyFolderRecursiveSync(curSource, targetFolder, false);
            } else {
                copyFileSync(curSource, targetFolder);
            }
        } );
    }
}

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
baseDir = baseDir + '/';

let resourceDir = baseDir + 'resources';
log('  ' + chalk.grey(resourceDir));
fs.mkdirSync(resourceDir);
resourceDir = resourceDir + '/';

let assetsDir = baseDir + 'assets';
log('  ' + chalk.grey(assetsDir));
fs.mkdirSync(assetsDir);
assetsDir = assetsDir + '/';

let binDir = baseDir + 'bin';
log('  ' + chalk.grey(binDir));
fs.mkdirSync(binDir);
binDir = binDir + '/';

let installDir = baseDir + 'install';
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
log('Copying prebuilt binaries...');
let binRegex = /^electron-v.*-win.*/gmi;
let prebDirs = fs.readdirSync('./bin');
prebDirs = prebDirs.filter(x => {
    binRegex.lastIndex = 0;
    return binRegex.test(x);
});
if (prebDirs.length === 0) {
    log(chalk.red('Error: No Prebuilt directory in bin directory...'));
    return;
}
log('  Initiating copy of ' + chalk.yellow(prebDirs[0]));

copyFolderRecursiveSync('./bin/' + prebDirs[0], baseDir, true);

log('  Deleting default_app.asar');
fs.unlinkSync(resourceDir + 'default_app.asar');

log('\nPacking Launcher...');
let asar = require('asar');

let asarSrc = '../launcher/';
let asarDest = resourceDir + 'app.asar';

asar.createPackage(asarSrc, asarDest, () => {
    log('  ' + chalk.gray('Packed'));
    log(chalk.green('Done.\n'));

    let exeName = package.config.bin_name + '.exe';
    log('Polishing ' + chalk.yellow('electron.exe') + ' to ' + chalk.cyan(exeName));
    fs.copyFileSync(baseDir + 'electron.exe', baseDir + exeName);
    fs.unlinkSync(baseDir + 'electron.exe');
    let prc = spawnSync(package.config.rcedit, [baseDir + exeName, '--set-icon', './poccito.ico']);
    log(chalk.green('Done.\n'));
});
