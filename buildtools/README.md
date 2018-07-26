# Building Poccito

```
yarn install
yarn build
```

You need to place a flavor of prebuilt electron binaries inside the `bin` folder as well as configure in the `package.json` correctly. 


Additionally use `yarn clean` to delete the build directory.


## Configuration
```json
{
    "config": {
        "msredis": "path/to/your/visualstudio/redistributable/vcredist_x86.exe",
        "out_directory": "../",
        "directory_name": "Poccito",
        "assets_source": "path/to/your/client/assets",
        "bin_name": "poccito",
        "rcedit": "path/to/your/rcedit-x64.exe"
    }
}
```

## Where to get required binaries

* rcedit: [Github](https://github.com/electron/rcedit)
* vcredist_x86.exe: *should be present within your Visual Studio installation*
* prebuilt electron binaries: [Github](https://github.com/electron/electron/releases)

## Where to go from there ?

Once everything is built, you only have to zip up the entire thing and put it where your players can download it or send it directly to them.