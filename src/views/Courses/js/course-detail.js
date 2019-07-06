import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios'
let marked = require('marked')

export default {
  name: 'courseDetail',
  components: {
    BaseCard,
    BaseButton,
    BaseTextArea,
    ModalDeleteConfirmation,
    InfiniteLoading
  },
  data () {
    return {
      courseDetail: {
        id: '',
        title: '',
        description: '',
        material: ''
      },
      discussions: [],
      discussion: {
        comment: ''
      },
      discussionPaging: {
        page: 1,
        size: 4,
        totalRecords: 0
      },
      showDeleteConfirmationModal: false,
      state: ''
    }
  },
  computed: {
    ...mapGetters([
      'course',
      'courseDiscussions'
    ]),
    descriptionCompiledMarkdown: function () {
      return marked(this.courseDetail.description)
    },
    isMaximumPage () {
      return Math.ceil(this.discussionPaging.totalRecords / this.discussionPaging.size) === this.discussionPaging.page
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions([
      'fetchCourseById',
      'fetchCourseDiscussions',
      'submitCourseDiscussion',
      'deleteCourseById'
    ]),
    initPage () {
      this.initCourse()
    },
    initCourse () {
      let data = {
        code: this.$route.params.code,
        id: this.$route.params.id
      }
      this.fetchCourseById({
        data,
        callback: this.successFetchCourseById,
        fail: this.failFetchCourseById
      })
    },
    successFetchCourseById () {
      this.courseDetail = this.course
    },
    failFetchCourseById () {
      this.$toasted.error('Fail to load course detail, please refresh the page')
    },
    initDiscussion ($state) {
      this.state = $state
      let data = {
        code: this.$route.params.code,
        id: this.$route.params.id,
        page: this.discussionPaging.page
      }
      this.fetchCourseDiscussions({
        data,
        callback: this.successFetchCourseDiscussions,
        fail: this.failFetchCourseDiscussions
      })
    },
    successFetchCourseDiscussions (response, paging) {
      this.discussionPaging = paging
      this.discussions.push(...response)
      if (this.isMaximumPage) {
        this.state.complete()
      } else {
        this.discussionPaging.page++
        this.state.loaded()
      }
    },
    failFetchCourseDiscussions () {
      this.$toasted.error('Fail to load course discussion, please refresh the page')
    },
    postDiscussion () {
      const data = {
        code: this.$route.params.code,
        id: this.$route.params.id,
        content: { ...this.discussion }
      }
      this.submitCourseDiscussion({
        data,
        callback: this.successSubmitCourseDiscussion,
        fail: this.failSubmitCourseDiscussion
      })
    },
    successSubmitCourseDiscussion (response) {
      this.$toasted.success('Successfully added course discussion')
      this.discussion.comment = ''
      this.discussions.unshift(response)
    },
    failSubmitCourseDiscussion () {
      this.$toasted.error('Fail to post course discussion, please try again')
    },
    downloadMaterial (url) {
      axios({ method: 'get', url: url, responseType: 'arraybuffer' })
        .then(response => { this.forceFileDownload(response) })
        .catch(() => console.log('error occurred'))
    },
    forceFileDownload (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      document.body.appendChild(link)
      link.click()
    },
    goToEditCourse () {
      this.$router.push({
        name: 'editCourse',
        params: {
          id: this.$route.params.id,
          code: this.$route.params.code
        }
      })
    },
    openDeleteConfirmationModal () {
      this.showDeleteConfirmationModal = true
    },
    deleteCourse () {
      let data = {
        id: this.$route.params.id,
        code: this.$route.params.code
      }
      this.deleteCourseById({
        data,
        callback: this.successDeleteCourseById,
        fail: this.failDeleteCourseById
      })
    },
    successDeleteCourseById () {
      this.$router.push({ name: 'courseDetail' })
      this.$toasted.success('Successfully delete course')
      this.showDeleteConfirmationModal = false
    },
    failDeleteCourseById () {
      this.$toasted.error('Fail to delete course')
      this.showDeleteConfirmationModal = false
    }
  }
}
