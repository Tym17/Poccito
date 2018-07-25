#include <map>
#include <iostream>
#include <functional>
#include <sstream>
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
	sf::RenderWindow window(sf::VideoMode(500, 500), "Poccito");

	std::map<int, Entity> players;
	std::map<int, Entity> npcs;
	std::map< std::string, std::function<void(std::vector<std::string>)>> commandHandle;
	int myId;
	// Player related commands
	commandHandle["HELLO"] = [&myId, username, &players](std::vector<std::string> args) {
		myId = atoi(args[1].c_str());
		players[myId] = {
			myId,
			atoi(args[2].c_str()),
			atoi(args[3].c_str()),
			username
		};
	};
	commandHandle["NEW"] = [&players](std::vector<std::string> args) {
		int pId = atoi(args[1].c_str());
		players[pId] = {
			pId,
			atoi(args[2].c_str()),
			atoi(args[3].c_str()),
			args[4].c_str()
		};
	};
	commandHandle["QUIT"] = [&players](std::vector<std::string> args) {
		players.erase(atoi(args[1].c_str()));
	};
	commandHandle["PPOS"] = [&players](std::vector<std::string> args) {
		int pId = atoi(args[1].c_str());
		players[pId].x = atoi(args[2].c_str());
		players[pId].y = atoi(args[3].c_str());
	};
	// NPC related commands
	commandHandle["NPC"] = [&npcs](std::vector<std::string> args) {
		int nId = atoi(args[1].c_str());
		npcs[nId] = {
			nId,
			atoi(args[2].c_str()),
			atoi(args[3].c_str()),
			args[4].c_str()
		};
	};
	commandHandle["NPOS"] = [&npcs](std::vector<std::string> args) {
		int nId = atoi(args[1].c_str());
		npcs[nId].x = atoi(args[2].c_str());
		npcs[nId].y = atoi(args[3].c_str());
	};

	// Font
	sf::Font font;
	if (!font.loadFromFile("assets/Gaegu-Regular.ttf"))
	{
		std::cerr << "Could not load fond." << std::endl;
		return -1;
	}
	sf::Text text;
	text.setFont(font);
	text.setCharacterSize(15);
	text.setFillColor(sf::Color::White);
	sf::Text npcText;
	npcText.setFont(font);
	npcText.setCharacterSize(15);
	npcText.setFillColor(sf::Color::Green);

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
	socket.setBlocking(false);
	ProtocolHandler protocol(socket);
	if (!protocol.greet(username)) {
		return -1;
	}

	// Window Loop
	std::string cmds;
	std::string token;
	while (window.isOpen())
	{
		sf::Event event;
		while (window.pollEvent(event))
		{
			if (event.type == sf::Event::Closed)
				window.close();
			if (event.type == sf::Event::KeyPressed)
			{
				if (event.key.code == sf::Keyboard::Z)
				{
					protocol.move(P_UP);
				}
				else if (event.key.code == sf::Keyboard::S) {
					protocol.move(P_DOWN);
				}
				else if (event.key.code == sf::Keyboard::Q) {
					protocol.move(P_LEFT);
				}
				else if (event.key.code == sf::Keyboard::D) {
					protocol.move(P_RIGHT);
				}
			}
		}
		if (!protocol.recieve()) {
			return -1;
		}
		while (protocol.haveCmds()) {
			cmds = protocol.extract();
			std::stringstream ss(cmds);
			std::vector<std::string> args;

			while (std::getline(ss, token, ' ')) {
				args.push_back(token);
			}
			if (args.size() == 0) {
				continue;
			}
			if (args[0] == "HELLO") {
				commandHandle["HELLO"](args);
			}
			else if (args[0] == "NEW") {
				commandHandle["NEW"](args);
			}
			else if (args[0] == "QUIT") {
				commandHandle["QUIT"](args);
			}
			else if (args[0] == "PPOS") {
				commandHandle["PPOS"](args);
			}
			else if (args[0] == "NPC") {
				commandHandle["NPC"](args);
			}
			else if (args[0] == "NPOS") {
				commandHandle["NPOS"](args);
			}
		}

		window.clear();
		// Draw all those things
		for (auto &it : players) {
			text.setString(it.second.name);
			text.setPosition(it.second.x - (text.getGlobalBounds().width / 2), it.second.y - 17);
			window.draw(text);
			playerSpr.setPosition(it.second.x, it.second.y);
			window.draw(playerSpr);
		}
		for (auto &it : npcs) {
			npcText.setString(it.second.name);
			npcText.setPosition(it.second.x - (npcText.getGlobalBounds().width / 2), it.second.y - 17);
			window.draw(npcText);
			npcSpr.setPosition(it.second.x, it.second.y);
			window.draw(npcSpr);
		}
		window.display();
	}

	return 0;
}