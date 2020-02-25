import { tracked } from '@glimmer/tracking'
import Controller from '@ember/controller'

export default class NewSessionController extends Controller {
  @tracked model
  @tracked ladderPlayersSelection
  @tracked challengers = ['Hello']

  initialize () {
    this.ladderPlayersSelection = this.model.map((name) => {
      return { name, selected: false }
    })
  }
}
