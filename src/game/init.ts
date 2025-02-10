import type { Game, PlayerID } from 'boardgame.io'
import { Client } from 'boardgame.io/client'
import { ref, type Ref } from 'vue'
import { SocketIO } from 'boardgame.io/multiplayer'
import type { ClientState } from 'boardgame.io/dist/types/src/client/client'
import type { animalShogiState } from './client'

export type BoardGameIo = {
  client: ReturnType<typeof Client<animalShogiState>>
  state: Ref<ClientState<animalShogiState>>
}

export function boardgameIo(game: Game, playerID: PlayerID): BoardGameIo {
  const client = Client({
    game,
    multiplayer: SocketIO({ server: 'localhost:8000' }),
    playerID,
  })
  const state = ref(client.getState())

  client.start()
  client.subscribe((s) => (state.value = s))
  return {
    client,
    state,
  }
}
