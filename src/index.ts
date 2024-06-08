import { v4 as uuidv4 } from 'uuid';
import { GameManager } from './GameManager';

addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request) {
	const upgradeHeader = request.headers.get('Upgrade');
	if (upgradeHeader !== 'websocket') {
		return new Response('Server is up', { status: 400 });
	}
	const { searchParams } = new URL(request.url);
	const username = searchParams.get('name')!;

	const [client, socket] = Object.values(new WebSocketPair());

	const id = uuidv4();
	socket.accept();

	const gameManager = GameManager.getInstance();

	gameManager.addUser({ socket, username, id });
	console.log('connected ', username);

	socket.addEventListener('close', (evt) => {
		gameManager.removeUser(socket);
		gameManager.removeGame(socket);

		console.log(`${username} : disconnected`);
	});

	return new Response(null, {
		status: 101,
		webSocket: client,
	});
}
