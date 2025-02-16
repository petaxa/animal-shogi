import type { Game, PlayerID } from 'boardgame.io'
import { Client } from 'boardgame.io/client'
import { ref, type Ref } from 'vue'
import { SocketIO } from 'boardgame.io/multiplayer'
import type { ClientOpts, ClientState } from 'boardgame.io/dist/types/src/client/client'
import type { animalShogiState } from '../../../animal-shogi-core/src/client'

export type BoardGameIo = {
  client: ReturnType<typeof Client<animalShogiState>>
  state: Ref<ClientState<animalShogiState>>
}

export function boardgameIo(
  game: Game,
  // style: 'single' | 'multi',
  style: string,
  matchID?: string,
  playerID?: PlayerID,
): BoardGameIo {
  // TODO: playerID, matchID の存在チェックを行わないといけない
  // TODO: 共通オプションを共通化したい
  const clientOpts: ClientOpts =
    style === 'single'
      ? {
          game,
          debug: {
            collapseOnLoad: true,
            hideToggleButton: true,
          },
        }
      : {
          game,
          multiplayer: SocketIO({ server: 'localhost:8000' }),
          playerID,
          matchID,
          debug: {
            collapseOnLoad: true,
            hideToggleButton: true,
          },
        }

  const client = Client(clientOpts)
  const state = ref(client.getState())

  client.start()
  client.subscribe((s) => (state.value = s))

  return {
    client,
    state,
  }
}
