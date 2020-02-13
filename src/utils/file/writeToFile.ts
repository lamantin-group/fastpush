import jetpack = require('fs-jetpack')
import { WritableData } from 'fs-jetpack/types'

export async function writeFile(file: string, content: WritableData) {
  await jetpack.writeAsync(file, content)
}
