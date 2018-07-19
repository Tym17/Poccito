#include <map>
#include <iostream>
#include "SFML/Graphics.hpp"
#include "SFML/Network.hpp"
#include "../include/entity.hpp"
#include "../include/ProtocolHandler.hpp"

int main(int ac, char **av)
{
	// Args check up
	if (ac != 4)
	{
		std::cerr << "Usage: ./poccitoClient.exe (ip) (port) (name)" << std::endl;
		return -1;
	}
	const std::string ip = std::string(av[1]);
	const int port = atoi(av[2]);
	const std::string username = std::string(av[3]);

	std::cout << "Launching:" << std::endl
		<< "  Ip: " << ip << std::endl
		<< "  port: " << port << std::endl
		<< "  name: " << username << std::endl;


	// Window/Scene preparation
	sf::RenderWindow window(sf::VideoMode(200, 200), "Poccito");

	std::map<int, Entity> players;
	std::map<int, Entity> npcs;
	int myId;


	// Player Spr;
	sf::Texture playerTex;
	sf::Sprite playerSpr;
	if (!playerTex.loadFromFile("assets/player.png"))
	{
		std::cerr << "Could not load player sprite." << std::endl;
		return -1;
	}
	playerSpr.setTexture(playerTex);


	// NPC Spr;
	sf::Texture npcTex;
	sf::Sprite npcSpr;
	if (!npcTex.loadFromFile("assets/npc.png"))
	{
		std::cerr << "Could not load NPC sprite." << std::endl;
		return -1;
	}
	npcSpr.setTexture(npcTex);


	// Connect to the server
	sf::TcpSocket socket;
	sf::Socket::Status status = socket.connect(ip, port);
	if (status != sf::Socket::Done)
	{
		std::cerr << "Error connecting server" << std::endl;
		return -1;
	}
	ProtocolHandler protocol(socket);
	if (!protocol.greet(username)) {
		return -1;
	}
	if (!protocol.recieve())
	{
		return -1;
	}
	std::cout << protocol.extract() << std::endl;

	// Window Loop
	while (window.isOpen())
	{
		sf::Event event;
		while (window.pollEvent(event))
		{
			if (event.type == sf::Event::Closed)
				window.close();
		}

		window.clear();
		// Draw all those things
		for (auto &it : players) {
			playerSpr.setPosition(it.second.x, it.second.y);
			window.draw(playerSpr);
		}
		for (auto &it : npcs) {
			npcSpr.setPosition(it.second.x, it.second.y);
			window.draw(npcSpr);
		}
		window.display();
	}

	return 0;
}