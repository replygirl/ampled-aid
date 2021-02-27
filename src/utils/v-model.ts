export const useModelKey = <T extends Record<string, any>>(
  props: T,
  k: string
) =>
  typeof props?.modelValue === undefined
    ? k
    : ('modelValue' as keyof typeof props)

export const useModelValue = (props: any, k: string) =>
  typeof props.modelValue === undefined ? props[k] : props.modelValue
