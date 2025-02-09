import { BoardGameIoPlayer0Key, BoardGameIoPlayer1Key } from '@/symbols'
import type { Game } from 'boardgame.io'
import { Client } from 'boardgame.io/client'
import type { App } from 'vue'
import { ref } from 'vue'
import { Local } from 'boardgame.io/multiplayer'

export function boardgameIo(game: Game) {
  // TODO: ADR を書きながら構造について吟味する
  const clientPlayer0 = Client({ game, multiplayer: Local(), playerID: '0' })
  const statePlayer0 = ref(clientPlayer0.getState())

  const clientPlayer1 = Client({ game, multiplayer: Local(), playerID: '1' })
  const statePlayer1 = ref(clientPlayer1.getState())

  return {
    install(app: App) {
      clientPlayer0.start()
      clientPlayer0.subscribe((s) => (statePlayer0.value = s))

      clientPlayer1.start()
      clientPlayer1.subscribe((s) => (statePlayer1.value = s))

      app.provide(BoardGameIoPlayer0Key, { client: clientPlayer0, state: statePlayer0 })
      app.provide(BoardGameIoPlayer1Key, { client: clientPlayer1, state: statePlayer1 })
    },
  }
}
