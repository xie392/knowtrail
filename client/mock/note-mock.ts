import { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker'
import { response } from './response-ignore'

const notes: any[] = []
Array.from({ length: 30 }).forEach(() => {
  notes.push({
    id: faker.string.nanoid(5), // id
    title: faker.lorem.sentence(), // 标题
    content: faker.lorem.paragraph(), // 内容
    description: faker.lorem.paragraph(), // 描述
    createTime: faker.date.past(), // 创建时间
    updateTime: faker.date.past(), // 更新时间
    is_private: faker.datatype.boolean(), // 是否为私密,默认 false
    is_starred: faker.datatype.boolean(), // 是否为收藏,默认 false
    is_shared: faker.datatype.boolean(), // 是否为分享,默认 false
    is_liked: faker.datatype.boolean(), // 是否为点赞,默认 false
    is_archived: faker.datatype.boolean(), // 是否为归档,默认 false
    is_deleted: faker.datatype.boolean(), // 是否为删除,默认 false
    is_trashed: faker.datatype.boolean(), // 是否为回收,默认 false
    is_pinned: faker.datatype.boolean(), // 是否为置顶,默认 false
    is_locked: faker.datatype.boolean(), // 是否为锁定,默认 false
    author: {
      id: faker.string.nanoid(8), // id
      name: faker.person.fullName(), // 名称
      avatar: faker.image.avatar(), // 头像
      is_focused: faker.datatype.boolean() // 是否为关注,默认 false
    }
  })
})

const books: any[] = []
Array.from({ length: 30 }).forEach(() => {
  books.push({
    id: faker.string.nanoid(5), // id
    title: faker.lorem.sentence(), // 标题
    description: faker.lorem.paragraph(), // 内容
    cover_pic: faker.image.url(), // 封面
    createTime: faker.date.past(), // 创建时间
    updateTime: faker.date.past(), // 更新时间
    is_private: faker.datatype.boolean(), // 是否为私密,默认 false
    is_starred: faker.datatype.boolean(), // 是否为收藏,默认 false
    is_shared: faker.datatype.boolean(), // 是否为分享,默认 false
    is_liked: faker.datatype.boolean(), // 是否为点赞,默认 false
    is_archived: faker.datatype.boolean(), // 是否为归档,默认 false
    is_deleted: faker.datatype.boolean(), // 是否为删除,默认 false
    is_trashed: faker.datatype.boolean(), // 是否为回收,默认 false
    is_pinned: faker.datatype.boolean(), // 是否为置顶,默认 false
    is_locked: faker.datatype.boolean(), // 是否为锁定,默认 false
    author: {
      id: faker.string.nanoid(8), // id
      name: faker.person.fullName(), // 名称
      avatar: faker.image.avatar(), // 头像
      is_focused: faker.datatype.boolean() // 是否为关注,默认 false
    }
  })
})

export default [
  {
    // 笔记推荐列表
    url: '/api/explore/recommend/notes',
    method: 'get',
    response: (query: any) => {
      const { page = 1, limit = 10, sort = 'desc' } = query
      const start = (page - 1) * limit
      const end = start + limit
      notes.sort((a, b) => {
        if (sort === 'desc') {
          return b.createTime - a.createTime
        } else {
          return a.createTime - b.createTime
        }
      })
      return response(notes.slice(start, end))
    }
  },
  {
    // 笔记推荐列表
    url: '/api/explore/recommend/notes/{id}',
    method: 'get',
    response: (query: any) => {
      const { id } = query
      return response(notes.find((note: any) => note.id === id))
    }
  },
  {
    url: '/api/explore/recommend/books',
    method: 'get',
    response: (query: any) => {
      const { page = 1, limit = 10, sort = 'desc' } = query
      const start = (page - 1) * limit
      const end = start + limit
      books.sort((a, b) => {
        if (sort === 'desc') {
          return b.createTime - a.createTime
        } else {
          return a.createTime - b.createTime
        }
      })
      return response(books.slice(start, end))
    }
  }
] as MockMethod[]
