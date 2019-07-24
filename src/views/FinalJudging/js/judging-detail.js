import { mapActions, mapGetters } from 'vuex'
import BaseInput from '@/components/BaseInput'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import ModalSelectMultipleStudents from '@/components/modals/ModalSelectMultipleStudents'

export default {
  name: 'JudgingDetail',
  components: {
    BaseInput,
    BaseCard,
    BaseButton,
    BaseTextArea,
    ModalSelectMultipleStudents
  },
  data () {
    return {
      judgingDetail: {
        name: '',
        description: '',
        students: []
      },
      selectedStudents: [],
      isLoading: true,
      editMode: false,
      showSelectStudentModal: false
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'judging',
      'students',
      'user'
    ]),
    returnButtonText () {
      return this.editMode ? 'Cancel' : 'Return'
    },
    actionButtonText () {
      return this.editMode ? 'Save' : 'Edit'
    }
  },
  methods: {
    ...mapActions([
      'fetchJudgingDetail',
      'fetchUserById',
      'updateJudging'
    ]),
    initPage () {
      this.fetchJudgingDetail({
        data: {
          batchCode: this.$route.params.batchCode,
          judgingId: this.$route.params.judgingId
        },
        callback: this.successFetchingJudgingDetail,
        fail: this.failedFetchingJudgingDetail
      })
    },
    successFetchingJudgingDetail () {
      this.judgingDetail.name = this.judging.name
      this.judgingDetail.description = this.judging.description
      this.judgingDetail.students = this.judging.students
      this.judging.students.forEach((item) => {
        this.fetchUserById({
          data: {
            id: item.id
          },
          callback: this.getUserById,
          fail: this.failedFetchingJudgingDetail
        })
      })
      this.isLoading = false
    },
    getUserById () {
      this.selectedStudents.push(this.user)
    },
    failedFetchingJudgingDetail () {
      this.$toasted.error('Something went wrong')
    },
    goToComparison () {
      this.$router.push({
        name: 'comparison',
        params: {
          judgingId: this.$route.params.judgingId
        }
      })
    },
    toggleSelectStudentModal () {
      this.showSelectStudentModal = true
    },
    closeSelectStudentModal () {
      this.showSelectStudentModal = false
    },
    setSelectedStudents (selectedStudentList) {
      this.selectedStudents = selectedStudentList
      this.closeSelectStudentModal()
    },
    actionButtonClicked () {
      if (this.editMode) {
        this.judgingDetail.students = []
        this.selectedStudents.forEach((item) => {
          this.judgingDetail.students.push(item.id)
        })
        let data = {
          batchCode: this.$route.params.batchCode,
          judgingId: this.$route.params.judgingId
        }
        let payload = {
          id: this.$route.params.judgingId,
          ...this.judgingDetail
        }
        this.updateJudging({
          data,
          payload,
          callback: this.successUpdatingJudging,
          fail: this.failUpdatingJudging
        })
      }
      this.editMode = !this.editMode
    },
    returnButtonClicked () {
      this.editMode ? this.editMode = !this.editMode : this.$router.push({
        name: 'judgingList',
        params: {
          batchCode: this.$route.params.batchCode
        }
      })
    },
    successUpdatingJudging () {
      this.$toasted.success('Successfully updated final judging')
      this.$router.push({
        name: 'judgingList',
        params: {
          batchCode: this.$route.params.batchCode
        }
      })
    },
    failUpdatingJudging () {
      this.$toasted.error('Something went wrong')
    }
  }
}
