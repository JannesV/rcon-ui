export interface GameDigResponse {
  name: string;
  map: string;
  password: boolean;
  raw: GameDigResponseRaw;
  maxplayers: number;
  players: any[];
  bots: Bot[];
  connect: string;
  ping: number;
}

export interface Bot {
  name: string;
  raw: BotRaw;
}

export interface BotRaw {}

export interface GameDigResponseRaw {
  protocol: number;
  folder: string;
  game: string;
  appId: number;
  numplayers: number;
  numbots: number;
  listentype: string;
  environment: string;
  secure: number;
  version: string;
  steamid: string;
  tags: string[];
}
