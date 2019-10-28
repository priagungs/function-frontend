import announcements from '@/views/Announcements/Announcements'
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Announcements', () => {
  let wrapper
  let actions
  let getters
  let state
  let store

  beforeEach(() => {
    state = {
      announcementList: [
        {
        "id": "sample-id-1",
        "title": "Announcements 1",
        "summary": "Summary goes here. Maximum 70 characters?",
        "description": "Description goes here. Currently there is no limit to description length.",
        "files": [
          {
            "id": "sample-id",
            "file": {
              "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
              "thumbnail": null
            }
          }
        ],
        "updatedAt": 1555980050616
      },
        {
          "id": "sample-id-2",
          "title": "Announcements 2",
          "summary": "Summary goes here. Maximum 70 characters?",
          "description": "Description goes here. Currently there is no limit to description length.",
          "files": [
            {
              "id": "sample-id",
              "file": {
                "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
                "thumbnail": null
              }
            }
          ],
          "updatedAt": 1555980050616
        },
        {
          "id": "sample-id-3",
          "title": "Announcements 3",
          "summary": "Summary goes here. Maximum 70 characters?",
          "description": "Description goes here. Currently there is no limit to description length.",
          "files": [
            {
              "id": "sample-id",
              "file": {
                "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
                "thumbnail": null
              }
            }
          ],
          "updatedAt": 1555980050616
        },
        {
          "id": "sample-id-4",
          "title": "Announcements 4",
          "summary": "Summary goes here. Maximum 70 characters?",
          "description": "Description goes here. Currently there is no limit to description length.",
          "files": [
            {
              "id": "sample-id",
              "file": {
                "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
                "thumbnail": null
              }
            }
          ],
          "updatedAt": 1555980050616
        },
        {
          "id": "sample-id-5",
          "title": "Announcements 5",
          "description": "Description goes here. Currently there is no limit to description length.",
          "files": [
            {
              "id": "sample-id",
              "file": {
                "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
                "thumbnail": null
              }
            }
          ],
          "updatedAt": 1555980050616
        }
      ],
      accessList: {
        add: true,
        delete: true,
        read: true,
        edit: true
      }
    }
    actions = {
      fetchAnnouncements: jest.fn(),
      deleteAnnouncementById: jest.fn()
    }
    getters = {
      announcementList: state => state.announcementList,
      accessList: state => state.accessList
    }
    store = new Vuex.Store({
      modules: {
        announcements: {
          state,
          actions,
          getters
        }
      }
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const spy = jest.spyOn(announcements.methods, 'loadAnnouncementList')
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      sync: false
    })
    expect(spy).toBeCalledTimes(1)
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('goToAnnouncementDetail $route.push to announcementDetail', () => {
    const push = jest.fn()
    const $route = {
      path: '/announcements',
      name: 'announcements',
      meta: {
        title: 'Announcements'
      }
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    wrapper.vm.$router.push = push
    wrapper.vm.goToAnnouncementDetail('sample-id-1')
    expect(push).toBeCalledWith({
      name: 'announcementDetail',
      params: {
        id: 'sample-id-1'
      }
    })
  })

  test('goToAddAnnouncement $route.push to addAnnouncement', () => {
    const push = jest.fn()
    const $route = {
      path: '/announcements',
      name: 'announcements',
      meta: {
        title: 'Announcements'
      }
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    wrapper.vm.$router.push = push
    wrapper.vm.goToAddAnnouncement()
    expect(push).toBeCalledWith({name: 'addAnnouncement'})
  })

  test('goToEditAnnouncement $route.push to editAnnouncement', () => {
    const push = jest.fn()
    const $route = {
      path: '/announcements',
      name: 'announcements',
      meta: {
        title: 'Announcements'
      }
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    wrapper.vm.$router.push = push
    wrapper.vm.goToEditAnnouncement('sample-id-1')
    expect(push).toBeCalledWith({
      name: 'editAnnouncement',
      params: {
        id: 'sample-id-1'
      }
    })
  })

  test('textPreview with summary', () => {
    const spy = jest.spyOn(announcements.methods, 'showLimitedPreviewText')
    const $route = {
      path: '/announcements',
      name: 'announcements',
      meta: {
        title: 'Announcements'
      }
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    const announcement = {
      summary: 'Summary goes here. Maximum 70 characters?'
    }
    wrapper.vm.textPreview(announcement)
    expect(spy).toBeCalledWith('Summary goes here. Maximum 70 characters?')
  })

  test('textPreview without summary', () => {
    const spy = jest.spyOn(announcements.methods, 'showLimitedPreviewText')
    const $route = {
      path: '/announcements',
      name: 'announcements',
      meta: {
        title: 'Announcements'
      }
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    const announcement = {
      summary: '',
      description: 'Description goes here. Currently there is no limit to description length.'
    }
    wrapper.vm.textPreview(announcement)
    expect(spy).toBeCalledWith('Description goes here. Currently there is no limit to description length.')
  })

  test('showLimitedPreviewText > 250 characters', () => {
    const $route = {
      path: '/announcements',
      name: 'announcements',
      meta: {
        title: 'Announcements'
      }
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    const text = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    expect(wrapper.vm.showLimitedPreviewText(text)).toEqual(text.slice(0, 250) + '...')
  })

  test('openDeleteConfirmationModal', () => {
    const $route = {
      path: '/announcements',
      name: 'announcements',
      meta: {
        title: 'Announcements'
      }
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    expect(wrapper.vm.selectedId).toBe('')
    expect(wrapper.vm.showDeleteConfirmationModal).toBe(false)
    wrapper.vm.openDeleteConfirmationModal('sample-id-1')
    expect(wrapper.vm.selectedId).toBe('sample-id-1')
    expect(wrapper.vm.showDeleteConfirmationModal).toBe(true)
  })

  test('closeDeleteConfirmationModal', () => {
    const $route = {
      path: '/announcements',
      name: 'announcements',
      meta: {
        title: 'Announcements'
      }
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    wrapper.vm.openDeleteConfirmationModal('sample-id-1')
    expect(wrapper.vm.selectedId).toBe('sample-id-1')
    expect(wrapper.vm.showDeleteConfirmationModal).toBe(true)
    wrapper.vm.closeDeleteConfirmationModal()
    expect(wrapper.vm.selectedId).toBe('')
    expect(wrapper.vm.showDeleteConfirmationModal).toBe(false)
  })

  test('deleteThisAnnouncement', () => {
    const spy = jest.spyOn(announcements.methods, 'deleteAnnouncementById')
    const closeDeleteConfirmationModalSpy = jest.spyOn(announcements.methods, 'closeDeleteConfirmationModal')
    const $route = {
      path: '/announcements',
      name: 'announcements',
      meta: {
        title: 'Announcements'
      }
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    wrapper.vm.selectedId = 'sample-id-1'
    wrapper.vm.deleteThisAnnouncement()
    expect(spy).toBeCalledTimes(1)
    expect(closeDeleteConfirmationModalSpy).toBeCalledTimes(1)
  })

  test('failLoadingAnnouncementList', () => {
    const $toasted = {
      error: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $toasted
      },
      sync: false
    })
    wrapper.vm.failLoadingAnnouncementList()
    expect(wrapper.vm.isLoading).toEqual(false)
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('successDeleteAnnouncementById', () => {
    const $router = {
      push: jest.fn()
    }
    const $toasted = {
      success: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $toasted,
        $router
      },
      sync: false
    })
    const loadAnnouncementListSpy = jest.spyOn(wrapper.vm, 'loadAnnouncementList')
    wrapper.vm.successDeleteAnnouncementById()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(loadAnnouncementListSpy).toHaveBeenCalledTimes(1)
  })

  test('failDeleteAnnouncementById', () => {
    const $toasted = {
      error: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $toasted
      },
      sync: false
    })
    wrapper.vm.failDeleteAnnouncementById()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('successLoadAnnouncementList', () => {
    const paging = {
      page: 1,
      size: 10,
      totalRecords: 20
    }
    wrapper.vm.successLoadAnnouncementList(paging)
    expect(wrapper.vm.isLoading).toEqual(false)
    expect(wrapper.vm.paging).toEqual(paging)
  })

  test('loadPage', () => {
    const spy = jest.spyOn(wrapper.vm, 'loadAnnouncementList')
    wrapper.vm.loadPage(1)
    expect(wrapper.vm.paging.page).toEqual(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
