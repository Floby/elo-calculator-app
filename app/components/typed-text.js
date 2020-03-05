import { computed, action } from '@ember/object'
import Component from '@glimmer/component'

export default class TypedTextComponent extends Component {
  @computed('args.text')
  get letters () {
    return this.args.text.split('')
  }

  get typingSpeed () {
    const ms = this.letterMs
    return `${ms}ms`
  }

  get typingDelay () {
    const ms = this.initialDelayMs
    return `${ms}ms`
  }

  @computed('args.delay')
  get initialDelayMs () {
    const ms = this.args.delay || 0
    return ms
  }

  @computed('args.spacing')
  get letterMs () {
    const ms = this.args.spacing || 15
    return ms
  }

  get totalTypingMs () {
    const letterCount = this.letters.length
    const ms = this.letterMs
    return letterCount * ms
  }

  @action
  startWatch () {
    this.watch = setTimeout(() => {
      this.args.onTyped && this.args.onTyped()
    }, this.totalTypingMs)
  }

  @action
  stopWatch () {
    clearTimeout(this.watch)
    delete this.watch
  }
}
