# Protocol

## Client to Server
```
HI {NAME}
```
Tells the server the client is connecting and his name.
```
MV {UP|DOWN|LEFT|RIGHT}
```
Tells the server in which direction the client is moving.

## Server to client
```
HELLO {ID} {X} {Y}
```
Responds to `HI` by telling the player its Id and position.

```
NEW {ID} {X} {Y} {NAME}
```
Server tells other client that a player connected

```
QUIT {ID}
```
Player with ID quit

```
PPOS {ID} {X} {Y}
```
User {ID} has a new pos