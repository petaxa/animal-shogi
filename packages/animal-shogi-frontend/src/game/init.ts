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

type Option =
  | {
      style: 'single'
    }
  | {
      style: 'multi'
      matchId: string
      playerId: PlayerID
    }

export function boardgameIo(game: Game, option: Option): BoardGameIo {
  if (option.style === 'multi' && (!option.playerId || !option.matchId)) {
    throw new Error('missed multi options')
  }

  const baseOpts: ClientOpts = {
    game,
    debug: {
      collapseOnLoad: true,
      hideToggleButton: true,
    },
  }
  const additionalOpts: Partial<ClientOpts> =
    option.style === 'single'
      ? {}
      : {
          multiplayer: SocketIO({ server: 'localhost:8000' }),
          playerID: option.playerId,
          matchID: option.matchId,
        }
  const clientOpts: ClientOpts = { ...baseOpts, ...additionalOpts }

  const client = Client(clientOpts)
  const state = ref(client.getState())

  client.start()
  client.subscribe((s) => (state.value = s))

  return {
    client,
    state,
  }
}
