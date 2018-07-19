#pragma once
#include <queue>
#include "SFML/Network.hpp"
#define BUFFER_LENGTH 255

class ProtocolHandler
{
	sf::TcpSocket &socket;
	std::queue<std::string> cmds;

public:
	ProtocolHandler(sf::TcpSocket &sock);

	bool greet(const std::string &name);

	bool recieve();
	bool haveCmds();
	std::string extract();
};