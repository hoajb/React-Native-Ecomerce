const palette = {
  purple: '#6200ee',
  green: '#03dac6',
  red: '#b00020',
  orange: '#dd6b54',
  black: '#0B0B0B',
  bg: '#F0F2F3',
  white: '#ffffff',
  gray_info: '#F0FFF3',
}

export const theme = {
  colors: {
    background: palette.bg,
    foreground: palette.black,
    primary: palette.purple,
    secondary: palette.orange,

    success: palette.green,
    danger: palette.red,
    failure: palette.red,
    info: palette.gray_info,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontFamily: 'Raleway',
      fontSize: 36,
      fontWeight: 'bold',
    },
    body: {
      fontFamily: 'Merriweather',
      fontSize: 16,
    },
  }
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.black,
    foreground: palette.white,
  }
}