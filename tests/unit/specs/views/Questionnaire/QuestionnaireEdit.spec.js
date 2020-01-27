import QuestionnairesEdit from '@/views/Questionnaire/QuestionnairesEdit'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import questionnaireApi from '@/api/controller/questionnaire'

jest.mock('@/api/controller/questionnaire')

describe('QuestionnaireResultsQuestionDetail', () => {
  let wrapper
  let store

  function initStore (initState) {
    let state = {
      currentQuestionnaireAdmin: {},
      currentAppraisee: [],
      currentQuestions: [],
      currentAppraiser: [],
      ...initState
    }
    let getters = {
      currentQuestionnaireAdmin: () => state.currentQuestionnaireAdmin,
      currentQuestions: () => state.currentQuestions,
      currentAppraisee: () => state.currentAppraisee,
      currentAppraiser: () => state.currentAppraiser
    }
    let actions = {
      fetchCurrentQuestionnaireAdmin: jest.fn(),
      setCurrentQuestionnaireAdmin: jest.fn(),
      fetchCurrentQuestions: jest.fn(),
      fetchCurrentAppraisee: jest.fn(),
      fetchCurrentAppraiser: jest.fn(),
      toast: jest.fn()
    }
    const store = new Vuex.Store({
      modules: {
        myQuestionnaire: {
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

  function initWrapper (propsData, route, initState) {

    const $route = {
      params: {}
    }
    const $router = {}

    const localVue = createLocalVue()
    localVue.use(Vuex)

    store = initStore(initState)

    wrapper = shallowMount(QuestionnairesEdit, {
      store: store.store,
      localVue,
      propsData,
      stubs: [
        'QuestionnaireForm',
        'QuestionCard',
        'font-awesome-icon',
        'QuestionnaireParticipantCard',
        'BaseButton',
        'ModalAddQuestion',
        'ModalDeleteConfirmation',
        'ModalChatroom',
        'ReminderMemberModal',
        'UserSimpleCard'
      ],
      mocks: {
        $route,
        $router
      }
    })
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('created', () => {
    const fetchingQuestions = jest.spyOn(QuestionnairesEdit.methods, 'fetchingQuestions')
    const fetchingAppraisee = jest.spyOn(QuestionnairesEdit.methods, 'fetchingAppraisee')
    const fetchingAppraiser = jest.spyOn(QuestionnairesEdit.methods, 'fetchingAppraiser')

    initWrapper()
    expect(store.actions.fetchCurrentQuestionnaireAdmin).toHaveBeenCalled()
    expect(fetchingQuestions).toHaveBeenCalled()
    expect(fetchingAppraisee).toHaveBeenCalled()
    expect(fetchingAppraiser).toHaveBeenCalled()
  })

  test('currentAppraiseeTemp watch', () => {
    const computedAppraisee = jest.spyOn(QuestionnairesEdit.methods, 'computedAppraisee')
    initWrapper()
    wrapper.vm.currentAppraiseeTemp = 'test'
    expect(computedAppraisee).toHaveBeenCalled()
  })

  test('currentAppraiserTemp watch', () => {
    const computedAppraiser = jest.spyOn(QuestionnairesEdit.methods, 'computedAppraiser')
    initWrapper()
    wrapper.vm.currentAppraiserTemp = 'test'
    expect(computedAppraiser).toHaveBeenCalled()
  })

  test('computedAppraisee case 1', () => {
    initWrapper()
    wrapper.vm.currentAppraiseeTemp = null
    expect(wrapper.vm.computedAppraisee()).toEqual([])
  })

  test('computedAppraisee case 2', () => {
    initWrapper()
    wrapper.vm.currentAppraiseeTemp = 'test'
    expect(wrapper.vm.computedAppraisee()).toEqual(store.state.currentAppraisee)
  })

  test('computedAppraiser case 1', () => {
    initWrapper()
    wrapper.vm.currentAppraiserTemp = null
    expect(wrapper.vm.computedAppraisee()).toEqual([])
  })

  test('computedAppraiser case 2', () => {
    initWrapper()
    wrapper.vm.currentAppraiserTemp = 'test'
    expect(wrapper.vm.computedAppraisee()).toEqual(store.state.currentAppraiser)
  })

  test('setCurrentQuestionnaire', () => {
    initWrapper()
    wrapper.vm.setCurrentQuestionnaire('test')
    expect(store.actions.setCurrentQuestionnaireAdmin).toHaveBeenCalled()
  })

  test('goToUpdateDescription case 1', () => {
    initWrapper()
    let spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.currentQuestionnaireAdmin.title = ' '
    wrapper.vm.currentQuestionnaireAdmin.description = ' '
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToUpdateDescription()
    expect(spy).toHaveBeenCalled()
  })

  test('goToUpdateDescription case 2', () => {
    initWrapper()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.currentQuestionnaireAdmin.title = 'title'
    wrapper.vm.currentQuestionnaireAdmin.description = ' '
    wrapper.vm.goToUpdateDescription()
    expect(spy).toHaveBeenCalled()
  })

  test('goToUpdateDescription case 3', () => {
    initWrapper()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.currentQuestionnaireAdmin.title = ' '
    wrapper.vm.currentQuestionnaireAdmin.description = 'description'
    wrapper.vm.goToUpdateDescription()
    expect(spy).toHaveBeenCalled()
  })

  test('goToUpdateDescription case 4', () => {
    initWrapper()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.currentQuestionnaireAdmin.description = 'description'
    wrapper.vm.currentQuestionnaireAdmin.title = 'title'
    wrapper.vm.currentQuestionnaireAdmin.dueDate = Date.now()
    wrapper.vm.currentQuestionnaireAdmin.startDate = Date.now() + 10
    wrapper.vm.goToUpdateDescription()
    expect(spy).toHaveBeenCalled()
  })

  test('goToUpdateDescription case 5', () => {
    initWrapper()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.currentQuestionnaireAdmin.description = 'description'
    wrapper.vm.currentQuestionnaireAdmin.title = 'title'
    const date = Date.now()
    wrapper.vm.currentQuestionnaireAdmin.dueDate = date
    wrapper.vm.currentQuestionnaireAdmin.startDate = date
    wrapper.vm.goToUpdateDescription()
    expect(spy).toHaveBeenCalled()
  })

  test('goToUpdateDescription case 6', () => {
    initWrapper()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.currentQuestionnaireAdmin.description = 'description'
    wrapper.vm.currentQuestionnaireAdmin.title = 'title'
    const date = Date.now()
    wrapper.vm.currentQuestionnaireAdmin.dueDate = date
    wrapper.vm.currentQuestionnaireAdmin.startDate = 0
    wrapper.vm.goToUpdateDescription()
    expect(spy).toHaveBeenCalled()
  })

  test('goToUpdateDescription case 7', () => {
    questionnaireApi.updateQuestionnaire = success => {
      success({
        data: {
        }
      })
    }
    const spy = jest.spyOn(QuestionnairesEdit.methods, 'setCurrentQuestionnaire')
    initWrapper()
    const spy2 = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.currentQuestionnaireAdmin.description = 'description'
    wrapper.vm.currentQuestionnaireAdmin.title = 'title'
    let date = new Date()
    wrapper.vm.currentQuestionnaireAdmin.startDate = date
    wrapper.vm.currentQuestionnaireAdmin.dueDate = date
    wrapper.vm.goToUpdateDescription()
    expect(spy).not.toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()
  })

  test('goToUpdateDescription case 8', () => {
    questionnaireApi.updateQuestionnaire = success => {
      success({
        data: {
        }
      })
    }
    const spy = jest.spyOn(QuestionnairesEdit.methods, 'setCurrentQuestionnaire')
    initWrapper()
    const spy2 = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.currentQuestionnaireAdmin.description = 'description'
    wrapper.vm.currentQuestionnaireAdmin.title = 'title'
    wrapper.vm.currentQuestionnaireAdmin.startDate = Date.now()
    wrapper.vm.currentQuestionnaireAdmin.dueDate = Date.now() + 86400
    wrapper.vm.goToUpdateDescription()
    expect(spy).toHaveBeenCalled()
    expect(spy2).not.toHaveBeenCalled()
  })

  test('submitMessageErrorCallback', () => {
    global.console.log = jest.fn()
    initWrapper()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.submitMessageErrorCallback('err')
    expect(console.log).toHaveBeenCalledWith('err')
    expect(spy).toHaveBeenCalled()
  })

  test('submitQuestionErrorCallback', () => {
    global.console.log = jest.fn()
    initWrapper()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.submitQuestionErrorCallback('err')
    expect(console.log).toHaveBeenCalledWith('err')
    expect(spy).toHaveBeenCalled()
  })

  test('deleteErrorCallback', () => {
    global.console.log = jest.fn()
    initWrapper()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.deleteErrorCallback('err')
    expect(console.log).toHaveBeenCalledWith('err')
    expect(spy).toHaveBeenCalled()
  })

  test('updateErrorCallback', () => {
    global.console.log = jest.fn()
    initWrapper()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.updateErrorCallback('err')
    expect(console.log).toHaveBeenCalledWith('err')
    expect(spy).toHaveBeenCalled()
  })

  test('addErrorCallback', () => {
    global.console.log = jest.fn()
    initWrapper()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.addErrorCallback('err')
    expect(console.log).toHaveBeenCalledWith('err')
    expect(spy).toHaveBeenCalled()
  })

  test('errorHandler', () => {
    global.console.log = jest.fn()
    initWrapper()
    wrapper.vm.errorHandler('err')
    expect(console.log).toHaveBeenCalledWith('err')
  })

  test('resetDeleteConfirmationModalQuestion', () => {
    initWrapper()
    wrapper.vm.deleteConfirmationModalQuestion.show = true
    wrapper.vm.resetDeleteConfirmationModalQuestion()
    expect(wrapper.vm.deleteConfirmationModalQuestion.show).toBe(false)
  })

  test('openDeleteConfirmationModalQuestion', () => {
    initWrapper()
    wrapper.vm.deleteConfirmationModalQuestion.show = false
    wrapper.vm.openDeleteConfirmationModalQuestion(1, {})
    expect(wrapper.vm.deleteConfirmationModalQuestion.show).toBe(true)
  })

  test('submitAddQuestion', () => {
    initWrapper()
    let data = {}
    wrapper.vm.submitAddQuestion(data)
    expect(wrapper.vm.currentQuestionsTemp[0]).toEqual(data)
  })

  test('fetchingQuestions', () => {
    initWrapper()
    wrapper.vm.fetchingQuestions()
    expect(store.actions.fetchCurrentQuestions).toHaveBeenCalled()
  })

  test('deleteTheQuestionQuestionnaire', () => {
    questionnaireApi.deleteQuestionQuestionnaire = success => {
      success()
    }
    const spy = jest.spyOn(QuestionnairesEdit.methods, 'fetchingQuestions')
    const spyDeleteModal = jest.spyOn(QuestionnairesEdit.methods, 'resetDeleteConfirmationModalQuestion')
    initWrapper()
    const spy2 = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.deleteTheQuestionQuestionnaire()
    expect(spy).toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()
    expect(spyDeleteModal).toHaveBeenCalled()
  })

  test('openEditModal', () => {
    initWrapper()
    wrapper.vm.questionModal = false
    wrapper.vm.openEditModal({})
    expect(wrapper.vm.questionModal).toBe(true)
  })

  test('closeQuestionModal', () => {
    initWrapper()
    wrapper.vm.questionModal = true
    wrapper.vm.closeQuestionModal()
    expect(wrapper.vm.questionModal).toBe(false)
  })

  test('updateTheQuestionQuestionnaire', () => {
    questionnaireApi.updateQuestionQuestionnaire = success => {
      success()
    }
    const spy = jest.spyOn(QuestionnairesEdit.methods, 'fetchingQuestions')
    const spyCloseModal = jest.spyOn(QuestionnairesEdit.methods, 'closeQuestionModal')
    initWrapper()
    wrapper.vm.question = {
      index: 0
    }
    wrapper.vm.currentQuestionsTemp[0] = {}
    wrapper.vm.updateTheQuestionQuestionnaire({})
    expect(spy).toHaveBeenCalled()
    expect(spyCloseModal).toHaveBeenCalled()
  })

  test('fetchingAppraisee', () => {
    initWrapper()
    wrapper.vm.fetchingAppraisee()
    expect(store.actions.fetchCurrentAppraisee).toHaveBeenCalled()
  })

  test('fetchingAppraiseeCallback', () => {
    initWrapper()
    wrapper.vm.currentAppraiseeTemp = ''
    wrapper.vm.fetchingAppraiseeCallback({ data: 'test' })
    expect(wrapper.vm.currentAppraiseeTemp).toEqual('test')
  })

  test('openDeleteConfirmationModalParticipantAppraisee', () => {
    initWrapper()
    wrapper.vm.deleteConfirmationModalParticipant.show = false
    wrapper.vm.deleteConfirmationModalParticipant.isAppraisee = false
    wrapper.vm.openDeleteConfirmationModalParticipantAppraisee({})
    expect(wrapper.vm.deleteConfirmationModalParticipant.show).toBe(true)
    expect(wrapper.vm.deleteConfirmationModalParticipant.isAppraisee).toBe(true)
  })

  test('openDeleteConfirmationModalParticipantAppraiser', () => {
    initWrapper()
    wrapper.vm.deleteConfirmationModalParticipant.show = false
    wrapper.vm.deleteConfirmationModalParticipant.isAppraisee = true
    wrapper.vm.openDeleteConfirmationModalParticipantAppraiser({})
    expect(wrapper.vm.deleteConfirmationModalParticipant.show).toBe(true)
    expect(wrapper.vm.deleteConfirmationModalParticipant.isAppraisee).toBe(false)
  })

  test('closeDeleteConfirmationModalParticipant', () => {
    initWrapper()
    wrapper.vm.deleteConfirmationModalParticipant.show = true
    wrapper.vm.closeDeleteConfirmationModalParticipant()
    expect(wrapper.vm.deleteConfirmationModalParticipant.show).toBe(false)
  })

  test('submitParticipant case 1', () => {
    questionnaireApi.deleteAppraiseeQuestionnaire = success => {
      success()
    }
    const spy = jest.spyOn(QuestionnairesEdit.methods, 'fetchingAppraisee')
    const spyCloseModal = jest.spyOn(QuestionnairesEdit.methods, 'closeDeleteConfirmationModalParticipant')
    initWrapper()
    wrapper.vm.deleteConfirmationModalParticipant.isAppraisee = true
    wrapper.vm.deleteTheParticipant()
    expect(spy).toHaveBeenCalled()
    expect(spyCloseModal).toHaveBeenCalled()
  })

  test('submitParticipant case 2', () => {
    questionnaireApi.deleteAppraiserQuestionnaire = success => {
      success()
    }
    const spy = jest.spyOn(QuestionnairesEdit.methods, 'fetchingAppraiser')
    const spyCloseModal = jest.spyOn(QuestionnairesEdit.methods, 'closeDeleteConfirmationModalParticipant')
    initWrapper()
    wrapper.vm.deleteConfirmationModalParticipant.isAppraisee = false
    wrapper.vm.deleteTheParticipant()
    expect(spy).toHaveBeenCalled()
    expect(spyCloseModal).toHaveBeenCalled()
  })

  test('fetchingAppraiser', () => {
    initWrapper()
    wrapper.vm.fetchingAppraiser()
    expect(store.actions.fetchCurrentAppraiser).toHaveBeenCalled()
  })

  test('fetchingAppraiserCallback', () => {
    initWrapper()
    wrapper.vm.currentAppraiserTemp = ''
    wrapper.vm.fetchingAppraiserCallback({ data: 'test' })
    expect(wrapper.vm.currentAppraiserTemp).toEqual('test')
  })
})
