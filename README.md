# Poccito
> Electron + Node.js + SFML = Online Game

Proof of concept of a small online game featuring nicknamed players & non playable characters. Server uses node.js for scalability and portability, Launcher uses electron for the ease of styling and GUI needs, client uses C++/SFML for a very fast rendering without additional operations. The launcher also features a setup file in case the player doesn't have the proper dlls on his computer.

## License
Overall code is licensed under MIT license however font files are licensed under Open Font License and come from Google fonts.

## How to play ?
[Get the lastest release](https://github.com/Tym17/Poccito/releases)

## How do I host a server ?
Git clone or copy the server's directory and make sure the ports of your machine are open and then move into the server's directory and run this inside of the server's directory
```
yarn install
yarn start
```

Additional informations in [the server's README.md](https://github.com/Tym17/Poccito/blob/master/server/README.md)

## How do I edit the client ?
Open the visual studio solution and build from there. Make sure to rebuild on release mode once you are done and to run the build script to bundle the client with the launcher. You might also need to reconfigure the location for the SFML Libraries/includes. The client uses SFML 2.5


[Tutorial on how to use SFML with Visual Studio](https://www.sfml-dev.org/tutorials/2.5/start-vc.php)


## How do I edit the launcher ?
Navigate to the launcher's directory and run
```
yarn install
yarn start
```

The launcher is a basic electron project, so it works the same way the electron starter works.

Additional informations in [the launcher's README.md](https://github.com/Tym17/Poccito/blob/master/launcher/README.md)

## How do I bundle everything for my players ?
Make sure your launcher is ready and your client compiled on release with all the good dlls next to it if you're linking the SFML dynamically and navigate to the buildtools directory and run
```
yarn install
yarn build
```

Additional informations in [the buildtools' README.md](https://github.com/Tym17/Poccito/blob/master/buildtools/README.md)
