import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {
  stickyNotes,
  announcements,
  announcementDetails
} from '@/api-mock/mock/core-routes'

const mock = new MockAdapter(axios)

const methodMap = {
  GET: 'onGet',
  PUT: 'onPut',
  POST: 'onPost'
}

stickyNotes.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data)
})

announcements.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data)
})
