import courseApi from '@/api/controller/courses'

export const state = {
  courseList: [],
  masterCourseList: [],
  course: {},
  masterCourse: {}
}

export const mutations = {
  SET_COURSES (state, payload) {
    state.courseList = [...payload]
  },
  SET_MASTER_COURSES (state, payload) {
    state.masterCourseList = [...payload]
  },
  SET_COURSE_BY_ID (state, payload) {
    state.course = { ...payload }
  },
  SET_MASTER_COURSE_BY_ID (state, payload) {
    state.masterCourse = { ...payload }
  }
}

export const actions = {
  fetchCourses ({ commit }, { data, callback, fail }) {
    courseApi.getCourseList(({ data: response, paging }) => {
      commit('SET_COURSES', response)
      callback(paging)
    }, data, fail)
  },
  fetchMasterCourses ({ commit }, { data, callback, fail }) {
    courseApi.getMasterCourseList(({ data: response, paging }) => {
      commit('SET_MASTER_COURSES', response)
      callback(paging)
    }, data, fail)
  },
  fetchCourseById ({ commit }, { data, callback, fail }) {
    courseApi.getCourseDetail(({ data: response }) => {
      commit('SET_COURSE_BY_ID', response)
      callback()
    }, data, fail)
  },
  fetchMasterCourseById ({ commit }, { data, callback, fail }) {
    courseApi.getMasterCourseDetail(({ data: response }) => {
      commit('SET_MASTER_COURSE_BY_ID', response)
      callback()
    }, data, fail)
  }
}

export const getters = {
  courseList (state) {
    return state.courseList
  },
  masterCourseList (state) {
    return state.masterCourseList
  },
  course (state) {
    return state.course
  },
  masterCourse (state) {
    return state.masterCourse
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
