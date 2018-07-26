# Poccito
> Electron + Node.js + SFML = Online Game

Proof of concept of a small online game featuring nicknamed players & non playable characters. Server uses node.js for scalability and portability, Launcher uses electron for the ease of styling and GUI needs, client uses C++/SFML for a very fast rendering without additional operations.

## License
Overall code is licensed under MIT license however font files are licensed under Open Font License and come from Google fonts.

## How to play ?
[Get the lastest release](https://github.com/Tym17/Poccito/releases)

## How do I host a server ?
Make sure the ports of your machine are open and then move into the server's directory and run
```
yarn install
yarn start
```

Additional informations in [the server's README.md](todo)

## How do I edit the client ?
Open the visual studio solution and build from there. Make sure to rebuild on release mode once you are done and to run the build script to bundle the client with the launcher.

## How do I edit the launcher ?
Navigate to the launcher's directory and run
```
yarn install
yarn start
```

The launcher is a basic electron project, so it works the same way the electron starter works.

Additional informations in [the launcher's README.md](todo)

## How do I bundle everything for my players ?
Make sure your launcher is ready and your client compiled on release with all the good dlls next to it if you're linking the SFML dynamically and navigate to the buildtools directory and run
```
yarn install
yarn build
```

Additional informations in [the buildtools' README.md](todo)