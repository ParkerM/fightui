import {FightServer} from './lib/fightserver';

const server = new FightServer();

const port = process.env.PORT || '3000';
server.start(port, () => {
  console.log(`Listening on ${port}`);
});
