import Controller from '@ember/controller'
import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object'

export default class SessionController extends Controller {
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
  saveGame (e) {
    e.preventDefault()
    this.winner = undefined
    debugger
  }
}

