module.exports = {
  app: {
    pages: {
      feeds: '/',
      blogs: '/blogs',
      announcements: {
        list: '/announcements',
        add: '/announcements/add',
        detail: '/announcements/:id/detail',
        edit: '/announcements/:id/edit'
      },
      courses: '/courses',
      files: '/files',
      users: '/users',
      quizzes: '/quizzes',
      assignments: {
        list: '/assignments',
        add: '/assignments/add'
      },
      finalJudging: '/final-judging',
      grades: '/grades',
      stickyNotes: {
        detail: '/sticky-notes',
        edit: '/sticky-notes/edit'
      },
      chatrooms: '/chatrooms'
    }
  },
  api: {
    base_path: '',
    core: {
      auth: {
        status: '/api/core/auth',
        login: '/api/core/auth',
        logout: '/api/core/auth'
      },
      access: {
        accessList(url) {
          return `/api/core/user/access-list?url=${url}`
        },
        menuList: '/api/core/menu-list'
      },
      users: {},
      stickyNotes: {
        get: '/api/core/sticky-notes',
        post: '/api/core/sticky-notes'
      },
      announcements: {
        get (page, size) { return `/api/core/announcements?page=${page}&size=${size}` },
        post: '/api/core/announcements',
        detail: {
          get (id) {
            return `/api/core/announcements/${id}`
          },
          update (id) {
            return `/api/core/announcements/${id}`
          },
          delete (id) {
            return `/api/core/announcements/${id}`
          }
        }
      },
      profile: {
        get: '/api/core/user/profile',
        change_password: '/api/core/user/password'
      },
      blogs: {
        get: '/api/core/activity-blogs'
      }
    },
    scoring: {
      assignments: {
        list(batchCode, page, pageSize) {
          return `/api/scoring/batches/${batchCode}/assignments?page=${page}&size=${pageSize}`
        },
        create(batchCode, page, pageSize) {
          return `/api/scoring/batches/${batchCode}/assignments?page=${page}&size=${pageSize}`
        }
      }
    },
    communication: {
      chatrooms: {
        list(type, search, page, size) {
          return `/api/communication/chatrooms?type=${type}&search=${search}&page=${page}&size=${size}`
        },
        getDetails(chatroomId) {
          return `/api/communication/chatrooms/${chatroomId}`
        },
        getMessages(chatroomId, page, size) {
          return `/api/communication/chatrooms/${chatroomId}/messages?page=${page}&size=${size}`
        },
        create: '/api/communication/chatrooms/',
        createMessage(chatroomId) {
          return `/api/communication/chatrooms/${chatroomId}/messages`
        },
        update(chatroomId) {
          return `/api/communication/chatrooms/${chatroomId}`
        },
        updateReadStatus(chatroomId, messageId) {
          return `/api/ccommunication/chatrooms/${chatroomId}/messages/${messageId}/_read`
        }
      }
    }
  },
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
}
