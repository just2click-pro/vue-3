import dayjs from 'dayjs'

export interface Post {
  id: string
  title: string
  created: dayjs.Dayjs
  html?: string
  markdown?: string
}

export const today: Post = {
  id: '1',
  title: 'Today',
  created: dayjs(),
}

export const thisWeek: Post = {
  id: '2',
  title: 'This week',
  created: dayjs().subtract(2, 'days'),
}

export const thisMonth: Post = {
  id: '3',
  title: 'This month',
  created: dayjs().subtract(12, 'days'),
}
