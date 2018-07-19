#pragma once
#include <queue>
#include "SFML/Network.hpp"
#define BUFFER_LENGTH 255

#define P_UP "UP"
#define P_DOWN "DOWN"
#define P_LEFT "LEFT"
#define P_RIGHT "RIGHT"

class ProtocolHandler
{
	sf::TcpSocket &socket;
	std::queue<std::string> cmds;

public:
	ProtocolHandler(sf::TcpSocket &sock);

	bool greet(const std::string &name);
	bool move(const std::string &mv);

	bool recieve();
	bool haveCmds();
	std::string extract();
};