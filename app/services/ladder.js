import Ky from 'ky'
import Service from '@ember/service'

export default class LadderService extends Service {
  constructor () {
    super(...arguments)
    this.baseUrl = 'http://localhost:1337'
  }

  async currentLadder () {
    const ladder = await Ky.get(`${this.baseUrl}/ladder`).json()
    return ladder
  }
}
