import { Command, Options, command, option, param, params } from 'clime'

export class SomeOptions extends Options {
  @option({
    flag: 't',
    description: 'timeout that does nothing',
  })
  timeout: number

  // You can also create methods and properties.
  get timeoutInSeconds(): number {
    return this.timeout / 1000
  }
}

@command()
export default class extends Command {
  execute(
    @param({
      required: true,
      description: 'required parameter foo',
    })
    foo: string,
    @param({
      description: 'optional parameter bar',
    })
    bar: number,
    @params({
      type: String,
      description: 'extra parameters',
    })
    args: string[],
    options: SomeOptions,
  ) {
    return 'Hello, Clime!'
  }
}
