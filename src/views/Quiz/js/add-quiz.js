import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseSelect from '@/components/BaseSelect'
export default {
  name: 'AddQuiz',
  components: {
    BaseCard,
    BaseButton,
    BaseInput,
    BaseSelect
  },
  data () {
    return {
      questionBankList: [],
      page: 1,
      selectedBank: [],
      selectAllClicked: false
    }
  },
  mounted () {
    const container = document.querySelector('.scrollable-container')
    container.addEventListener('scroll', e => {
      if (Math.ceil(container.scrollTop + container.clientHeight) >= container.scrollHeight) {
        this.initPage()
      }
    })
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'questionBanks'
    ])
  },
  methods: {
    ...mapActions([
      'fetchQuestionBankList',
      'setSelectedBank'
    ]),
    initPage () {
      this.fetchQuestionBankList({
        data: {
          page: this.page,
          pageSize: 10
        },
        callback: this.successFetchingQuestionBankList,
        fail: this.failFetchingQuestionBankList
      })
    },
    successFetchingQuestionBankList () {
      if (this.selectAllClicked) {
        this.selectedBank.push(...this.questionBanks.map(bank => bank.id))
      }
      this.questionBankList = [
        ...this.questionBankList,
        ...this.questionBanks
      ]
      this.page++
    },
    failFetchingQuestionBankList () {
      this.$toasted.error('Something went wrong')
    },
    questionBankSelected (id) {
      const idx = this.selectedBank.indexOf(id)
      idx !== -1 ? this.selectedBank.splice(idx, 1) : this.selectedBank.push(id)
    },
    toggleAllBank () {
      this.selectedBank.length === this.questionBankList.length ? this.deselectAll() : this.selectAll()
    },
    deselectAll () {
      let items = document.getElementsByName('selected-banks')
      for (let i = items.length-1; i >= 0; i--) {
        if (this.selectedBank.indexOf(items[i].value !== -1)) {
          items[i].checked = false
          this.selectedBank.splice(i, 1)
        }
      }
      this.selectAllClicked = false
    },
    selectAll () {
      let items = document.getElementsByName('selected-banks')
      for (let i = 0; i < items.length; i++) {
        if (!this.selectedBank.includes(items[i].value)) {
          this.selectedBank.push(items[i].value)
        }
      }
      this.selectAllClicked = true
    },
    goToAddQuizDetail () {
      let payload = this.selectAllClicked ? ['ALL'] : this.selectedBank
      this.setSelectedBank({
        payload
      })
      this.$router.push({
        name: 'addQuizDetail'
      })
    }
  }
}
