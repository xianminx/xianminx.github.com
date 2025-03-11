interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Xiangqi - Chinese Chess',
    description: `Xiangqi is a two-player strategy board game. The goal is to capture the opponent's general.`,
    imgSrc: '/static/images/chinese_chess.png',
    href: 'https://ai-chinese-chess.vercel.app/xiangqi',
  },
  {
    title: 'Halving Number Game',
    description: `Starting with a number, players take turns making moves. The player forced to reach 0 loses the game.`,
    imgSrc: '/static/images/halvingnumber.png',
    href: 'https://ai-chinese-chess.vercel.app/games/halvingnumber',
  },
  {
    title: 'Hexapawn Game',
    description: `Hexapawn is a two-player strategy board game. The goal is to capture the opponent's general.`,
    imgSrc: '/static/images/hexapawn.png',
    href: 'https://ai-chinese-chess.vercel.app/games/hexapawn',
  },
]

export default projectsData
