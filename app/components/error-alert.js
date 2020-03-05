import delay from 'delay'
import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object'
import Component from '@glimmer/component'

export default class ErrorAlertComponent extends Component {
  @tracked acknowledged = false

  @action
  async acknowledgeError (e) {
    e.preventDefault()
    this.acknowledged = true
    await delay(200)
    this.args.onAcknowledged && this.args.onAcknowledged()
  }
}
