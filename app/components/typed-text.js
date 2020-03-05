import delay from 'delay'
import { computed, action } from '@ember/object'
import { inject as service } from '@ember/service'
import { tracked } from '@glimmer/tracking'
import Component from '@glimmer/component'

export default class TypedTextComponent extends Component {
  @service lock

  @tracked locked = true

  @computed('args.text')
  get letters () {
    if (this.args.text) {
      const text = String(this.args.text)
      return text.split('')
    } else {
      return []
    }
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
  async startWatch () {
    await this.lock.withLock('typed-text', async () => {
      this.watch = delay(this.totalTypingMs)
      this.locked = false
      await this.watch
      this.args.onTyped && this.args.onTyped()
    })
  }

  @action
  stopWatch () {
    this.watch.clear()
    delete this.watch
  }
}
