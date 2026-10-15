export const levelThemes = {
  C: { background: '#fff0b3', accent: '#d8ebcf', badge: '#edcd62', ink: '#365f3d', name: 'First discoveries' },
  B: { background: '#e0f1e5', accent: '#b6d6b8', badge: '#abd19d', ink: '#365f3d', name: 'Growing readers' },
  A: { background: '#fbe1d7', accent: '#e9a497', badge: '#f0b3a3', ink: '#365f3d', name: 'Confident readers' },
}

export const levelThemeStyle = level => {
  const theme = levelThemes[level]
  return { '--level-bg': theme.background, '--level-accent': theme.accent, '--level-badge': theme.badge, '--level-ink': theme.ink }
}
