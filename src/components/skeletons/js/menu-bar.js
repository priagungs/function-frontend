import { mapGetters } from 'vuex'

export default {
  name: 'MenuBar',
  data () {
    return {
      gradesSubmenuVisibility: false,
      questionnaireSubmenuVisibility: false
    }
  },
  computed: {
    ...mapGetters([
      'menuList',
      'currentUser'
    ]),
    showGrades () {
      return this.gradesSubmenuVisibility
    },
    showQuestionnaire () {
      return this.questionnaireSubmenuVisibility
    },
    quizRoute () {
      return this.currentUser.role === 'STUDENT' ? 'studentQuizzes' : 'quizBatch'
    },
    assignmentRoute () {
      return this.currentUser.role === 'STUDENT' ? 'studentAssignments' : 'assignmentBatch'
    }
  },
  methods: {
    toggleGradesMenu () {
      this.gradesSubmenuVisibility = !this.gradesSubmenuVisibility
      if (this.questionnaireSubmenuVisibility) this.questionnaireSubmenuVisibility = !this.questionnaireSubmenuVisibility
    },
    toggleQuestionnaireMenu () {
      this.questionnaireSubmenuVisibility = !this.questionnaireSubmenuVisibility
      if (this.gradesSubmenuVisibility) this.gradesSubmenuVisibility = !this.gradesSubmenuVisibility
    },
    isActive (name) {
      return this.$route.name === name
    },
    updateViewKey () {
      this.$emit('updateViewKey')
    },
    goToGithubIssue () {
      window.open("https://github.com/function-future/function-frontend/issues/new?assignees=priagungs%2C+jonathan016%2C+RickyKennedy25%2C+karnandohuang%2C+oliverrsebastian%2C+DavidWilliamK&labels=bug&template=bug_report.md&title=%5BBUG%5D")
    }
  }
}
