import sum from 'hash-sum'
import { ref } from 'vue'

export const useId = (prefix = 'el') => ref(`${prefix}-${sum(Math.random())}`)
