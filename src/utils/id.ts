import sum from 'hash-sum'
import { ref } from 'vue'
import type { Ref } from 'vue'

export const useId = (prefix = 'el') => ref(`${prefix}-${sum(Math.random())}`)
