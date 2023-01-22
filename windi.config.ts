import { defineConfig } from 'windicss/helpers'

interface IOpacityItem {
  opacityVariable: string
  opacityValue?: number
}

function withOpacityValue(variable: string) {
  return ({ opacityValue }: IOpacityItem) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: {
          extralight: withOpacityValue('--color-primary-extralight'),
          light: withOpacityValue('--color-primary-light'),
          DEFAULT: withOpacityValue('--color-primary'),
        },
      },
      screens: {
        xs: '360px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
})
