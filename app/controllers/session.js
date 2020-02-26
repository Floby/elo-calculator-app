import Controller from '@ember/controller'
import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object'
import { inject as service } from '@ember/service'

export default class SessionController extends Controller {
  @service session
  @service ladder
  @tracked winner
  initialize () {
  }

  get players () {
    return this.model.players.map((name) => ({
      name,
      selected: name === this.winner
    }))
  }

  @action
  selectWinner (name) {
    this.winner = name
  }

  @action
  async saveGame (e) {
    e.preventDefault()
    await this.ladder.saveGame(this.model.players, this.winner)
    this.model.addWinner(this.winner)
    this.session.save(this.model)
    this.winner = undefined
  }
}

