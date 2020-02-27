import Component from '@glimmer/component'
import { action } from '@ember/object'

export default class BackButtonComponent extends Component {
  @action
  goBack (e) {
    e.preventDefault()
    window.history.back()
  }
}
