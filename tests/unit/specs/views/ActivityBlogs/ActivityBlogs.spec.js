import activityBlogs from '@/views/ActivityBlogs/ActivityBlogs'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import config from '@/config/index'

describe('ActivityBlogs', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    return lv
  }

  function initStore () {
    const state = {
      activityBlog: {},
      activityBlogs: [],
      accessList: {
        add: true,
        delete: true,
        read: true,
        edit: true
      }
    }
    const actions = {
      initialState: jest.fn(),
      fetchActivityBlogById: jest.fn(),
      fetchActivityBlogs: jest.fn(),
      uploadResource: jest.fn()
    }
    const getters = {
      activityBlog: state => state.activityBlog,
      activityBlogs: state => state.activityBlogs,
      accessList: state => state.accessList
    }
    const store = new Vuex.Store({
      modules: {
        activityBlogs: {
          state,
          actions,
          getters
        }
      }
    })
    return {
      store,
      state,
      actions,
      getters
    }
  }

  function createWrapper (store, options) {
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    const $route = {
      params: {
        id: 'sample-id'
      }
    }
    const $router = {
      push: jest.fn()
    }
    const marked = jest.fn()
    return shallowMount(activityBlogs, {
      ...options,
      store,
      localVue,
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'font-awesome-icon',
        'vue-toasted'
      ],
      mocks: {
        $toasted,
        $route,
        $router,
        marked
      },
      sync: false
    })
  }

  function initComponent () {
    localVue = generateLocalVue()
    store = initStore()
    wrapper = createWrapper(store.store)
  }

  beforeEach(() => {
    initComponent()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('compileToMarkdown', () => {
    expect(wrapper.vm.compileToMarkdown('hello')).toEqual('<p>hello</p>\n')
  })

  test('goToActivityBlogDetail', () => {
    const push = jest.fn()
    wrapper.vm.$router.push = push
    wrapper.vm.goToActivityBlogDetail('sample-id')
    expect(push).toHaveBeenCalledWith({
      name: 'activityBlogDetail',
      params: { id: 'sample-id' }
    })
  })

  test('goToAddActivityBlog', () => {
    const push = jest.fn()
    wrapper.vm.$router.push = push
    wrapper.vm.goToAddActivityBlog()
    expect(push).toHaveBeenCalledWith({
      name: 'addActivityBlog'
    })
  })

  test('goToEditActivityBlog', () => {
    const push = jest.fn()
    wrapper.vm.$router.push = push
    wrapper.vm.goToEditActivityBlog('sample-id')
    expect(push).toHaveBeenCalledWith({
      name: 'editActivityBlog',
      params: { id: 'sample-id' }
    })
  })

  test('openDeleteConfirmationModal', () => {
    wrapper.vm.openDeleteConfirmationModal('sample-id')
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(true)
    expect(wrapper.vm.selectedId).toEqual('sample-id')
  })

  test('closeDeleteConfirmationModal', () => {
    wrapper.vm.closeDeleteConfirmationModal()
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
    expect(wrapper.vm.selectedId).toEqual('')
  })

  test('failLoadActivityBlogList', () => {
    wrapper.vm.failLoadActivityBlogList()
    expect(wrapper.vm.isLoading).toEqual(false)
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('deleteThisActivityBlog', () => {
    const closeDeleteConfirmationModalSpy = jest.spyOn(wrapper.vm, 'closeDeleteConfirmationModal')
    const spy = jest.spyOn(wrapper.vm, 'deleteActivityBlogById')
    wrapper.vm.deleteThisActivityBlog()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(closeDeleteConfirmationModalSpy).toHaveBeenCalledTimes(1)
  })

  test('successDeleteActivityBlogById', () => {
    const loadActivityBlogListSpy = jest.spyOn(wrapper.vm, 'loadActivityBlogList')
    wrapper.vm.successDeleteActivityBlogById()
    expect(loadActivityBlogListSpy).toHaveBeenCalledTimes(1)
  })

  test('failDeleteActivityBlogById', () => {
    wrapper.vm.failDeleteActivityBlogById()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('successLoadActivityBlogList', () => {
    const paging = {
      page: 1,
      size: 10,
      totalRecords: 20
    }
    wrapper.vm.successLoadActivityBlogList(paging)
    expect(wrapper.vm.isLoading).toEqual(false)
    expect(wrapper.vm.paging).toEqual(paging)
  })

  test('loadPage', () => {
    const spy = jest.spyOn(wrapper.vm, 'loadActivityBlogList')
    wrapper.vm.loadPage(1)
    expect(wrapper.vm.paging.page).toEqual(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('loadPreviousPage', () => {
    const spy = jest.spyOn(wrapper.vm, 'loadActivityBlogList')
    wrapper.vm.paging.page = 2
    wrapper.vm.loadPreviousPage()
    expect(wrapper.vm.paging.page).toEqual(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('loadNextPage', () => {
    const spy = jest.spyOn(wrapper.vm, 'loadActivityBlogList')
    wrapper.vm.paging.page = 2
    wrapper.vm.loadNextPage()
    expect(wrapper.vm.paging.page).toEqual(3)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
