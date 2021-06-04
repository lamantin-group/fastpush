import { gradle, gym, mapLanesToString } from '../src'
import { expect } from 'chai'

describe('gradle clean', () => {
  it(`gradle clean`, () => {
    expect(mapLanesToString([gradle('clean')])).to.equal(`lanes:'[gradle(task: "clean")]'`)
  })

  it(`plain gradle lane`, () => {
    expect(
      mapLanesToString([
        {
          name: 'gradle',
          args: [
            {
              name: 'task',
              value: 'clean',
            },
          ],
        },
      ]),
    )
      .to.equal(`lanes:'[gradle(task: "clean")]'`)
      .to.equal(mapLanesToString([gradle('clean')]))
  })

  it(`object with args`, () => {
    expect(
      mapLanesToString([
        gradle('clean', {
          system_properties: {
            name: 'value',
          },
        }),
      ]),
    ).to.equal(`lanes:'[gradle(task: "clean",system_properties: {"name" => "value"})]'`)
  })

  it('gym with nested args', () => {
    const output = mapLanesToString([
      gym({
        export_options: {
          provisioningProfiles: {
            'com.myapp': 'Provisioning Profile',
          },
        },
      }),
    ])

    expect(output).to.equal(
      `lanes:'[gym(export_options: {provisioningProfiles: {com.myapp: "Provisioning Profile"}})]'`,
    )
  })
})
