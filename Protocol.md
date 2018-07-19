#Protocol


## Client to Server
```
HI {NAME}
```
Tells the server the client is connecting and his name.


## Server to client
```
HELLO {ID} {X} {Y}
```
Responds to `HI` by telling the player its Id and position.