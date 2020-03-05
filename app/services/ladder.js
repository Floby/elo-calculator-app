import Ky from 'ky'
import Service from '@ember/service'
import ENV from 'elo-calculator-app/config/environment'

export default class LadderService extends Service {
  constructor () {
    super(...arguments)
    this.baseUrl = ENV.baseApiUrl
  }

  async currentLadder () {
    const ladder = await Ky.get(`${this.baseUrl}/ladder`).json()
    return ladder
  }

  async saveGame (players, winner, sessionId) {
    if (!players.includes(winner)) {
      throw Error('The winner must be amongst the players')
    }
    const payload = players.map((name) => ({
      name, won: name === winner
    }))
    await Ky.post(`${this.baseUrl}/games?session_id=${sessionId}`, { json: payload })
  }
}
