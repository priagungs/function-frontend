import Vue from 'vue'
import Router from 'vue-router'
import assignments from '@/views/Assignment/Assignments'
import addAssignment from '@/views/Assignment/AddAssignment'
import assignmentRooms from '@/views/Assignment/AssignmentRooms'
import assignmentDetail from '@/views/Assignment/AssignmentDetail'
import questionBanks from '@/views/QuestionBank/QuestionBanks'
import questionBankDetail from '@/views/QuestionBank/QuestionBankDetail'
import addQuestionBank from '@/views/QuestionBank/AddQuestionBank'
import questionBankQuestionList from '@/views/QuestionBank/QuestionBankQuestionList'
import questionBankAddQuestion from '@/views/QuestionBank/QuestionBankAddQuestion'
import questionBankQuestionDetail from '@/views/QuestionBank/QuestionBankQuestionDetail'
import quizzes from '@/views/Quiz/Quiz'
import addQuiz from '@/views/Quiz/AddQuiz'
import addQuizDetail from '@/views/Quiz/AddQuizDetail'
import quizDetail from '@/views/Quiz/QuizDetail'
import feeds from '@/views/Feeds/Feeds.vue'
import announcements from '@/views/Announcements/Announcements.vue'
import announcementDetail from '@/views/Announcements/AnnouncementDetail.vue'
import announcementForm from '@/views/Announcements/AnnouncementForm.vue'
import activityBlogs from '@/views/ActivityBlogs/ActivityBlogs.vue'
import activityBlogDetail from '@/views/ActivityBlogs/ActivityBlogDetail.vue'
import ActivityBlogForm from '@/views/ActivityBlogs/ActivityBlogForm.vue'
import users from '@/views/Users/Users.vue'
import stickyNotes from '@/views/StickyNotes/StickyNotesDetail.vue'
import editStickyNote from '@/views/StickyNotes/EditStickyNote.vue'
import UserForm from '@/views/Users/UserForm.vue'
import config from '@/config/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: config.app.pages.feeds,
      name: 'feeds',
      component: feeds,
      meta: {
        title: 'Feeds'
      }
    },
    {
      path: config.app.pages.activityBlogs.list,
      name: 'activityBlogs',
      component: activityBlogs,
      meta: {
        title: 'Activity Blogs'
      }
    },
    {
      path: config.app.pages.activityBlogs.detail,
      name: 'activityBlogDetail',
      component: activityBlogDetail,
      meta: {
        title: 'Activity Blog Detail'
      }
    },
    {
      path: config.app.pages.activityBlogs.add,
      name: 'addActivityBlog',
      component: ActivityBlogForm,
      meta: {
        title: 'Add Activity Blog'
      },
      props: { editMode: false }
    },
    {
      path: config.app.pages.activityBlogs.edit,
      name: 'editActivityBlog',
      component: ActivityBlogForm,
      meta: {
        title: 'Edit Activity Blog'
      },
      props: { editMode: true }
    },
    {
      path: config.app.pages.announcements.list,
      name: 'announcements',
      component: announcements,
      meta: {
        title: 'Announcements'
      }
    },
    {
      path: config.app.pages.announcements.detail,
      name: 'announcementDetail',
      component: announcementDetail,
      meta: {
        title: 'Announcements Detail'
      }
    },
    {
      path: config.app.pages.announcements.edit,
      name: 'editAnnouncement',
      component: announcementForm,
      meta: {
        title: 'Edit Announcements'
      },
      props: { editMode: true }
    },
    {
      path: config.app.pages.announcements.add,
      name: 'addAnnouncement',
      component: announcementForm,
      meta: {
        title: 'Add Announcements'
      },
      props: { editMode: false }
    },
    {
      path: config.app.pages.courses,
      name: 'courses',
      component: feeds,
      meta: {
        title: 'Courses'
      }
    },
    {
      path: config.app.pages.files,
      name: 'files',
      component: feeds,
      meta: {
        title: 'Files'
      }
    },
    {
      path: config.app.pages.users.list,
      name: 'users',
      component: users,
      meta: {
        title: 'Users'
      }
    },
    {
      path: config.app.pages.users.add.student,
      name: 'addStudent',
      component: UserForm,
      meta: {
        title: 'Add Student'
      },
      props: {
        studentMode: true,
        editMode: false
      }
    },
    {
      path: config.app.pages.users.add.user,
      name: 'addUser',
      component: UserForm,
      meta: {
        title: 'Add User'
      },
      props: {
        studentMode: false,
        editMode: false
      }
    },
    {
      path: config.app.pages.users.edit.student,
      name: 'editStudent',
      component: UserForm,
      meta: {
        title: 'Edit Student'
      },
      props: {
        studentMode: true,
        editMode: true
      }
    },
    {
      path: config.app.pages.users.edit.user,
      name: 'editUser',
      component: UserForm,
      meta: {
        title: 'Edit User'
      },
      props: {
        studentMode: false,
        editMode: true
      }
    },
    {
      path: config.app.pages.grades,
      name: 'grades',
      component: feeds,
      meta: {
        title: 'Grades'
      }
    },
    {
      path: config.app.pages.stickyNotes.detail,
      name: 'stickyNotes',
      component: stickyNotes,
      meta: {
        title: 'Sticky Notes'
      }
    },
    {
      path: config.app.pages.stickyNotes.edit,
      name: 'editStickyNote',
      component: editStickyNote,
      meta: {
        title: 'Edit Sticky Note'
      }
    },
    {
      path: config.app.pages.questionBanks.list,
      name: 'questionBanks',
      component: questionBanks,
      meta: {
        title: 'Question Banks'
      }
    },
    {
      path: config.app.pages.questionBanks.detail,
      name: 'questionBankDetail',
      component: questionBankDetail,
      meta: {
        title: 'Question Bank Detail'
      }
    },
    {
      path: config.app.pages.questionBanks.add,
      name: 'addQuestionBank',
      component: addQuestionBank,
      meta: {
        title: 'Add Question Bank'
      }
    },
    {
      path: config.app.pages.questionBanks.questions.list,
      name: 'questionBankQuestionList',
      component: questionBankQuestionList,
      meta: {
        title: 'Question List'
      }
    },
    {
      path: config.app.pages.questionBanks.questions.add,
      name: 'questionBankAddQuestion',
      component: questionBankAddQuestion,
      meta: {
        title: 'Add Question'
      }
    },
    {
      path: config.app.pages.questionBanks.questions.detail,
      name: 'questionBankQuestionDetail',
      component: questionBankQuestionDetail,
      meta: {
        title: 'Question Detail'
      }
    },
    {
      path: config.app.pages.quizzes.list,
      name: 'quizzes',
      component: quizzes,
      meta: {
        title: 'Quizzes'
      }
    },
    {
      path: config.app.pages.quizzes.add,
      name: 'addQuiz',
      component: addQuiz,
      meta: {
        title: 'Add Quiz'
      }
    },
    {
      path: config.app.pages.quizzes.addDetail,
      name: 'addQuizDetail',
      component: addQuizDetail,
      meta: {
        title: 'Add Detail'
      }
    },
    {
      path: config.app.pages.quizzes.detail,
      name: 'quizDetail',
      component: quizDetail,
      meta: {
        title: 'Quiz Detail'
      }
    },
    {
      path: config.app.pages.assignments.list,
      name: 'assignments',
      component: assignments,
      meta: {
        title: 'Assignments'
      }
    },
    {
      path: config.app.pages.assignments.detail,
      name: 'assignmentDetail',
      component: assignmentDetail,
      meta: {
        title: 'Assignment Detail'
      }
    },
    {
      path: config.app.pages.assignments.add,
      name: 'addAssignment',
      component: addAssignment,
      meta: {
        title: 'Add Assignments'
      }
    },
    {
      path: config.app.pages.assignments.rooms.list,
      name: 'assignmentRooms',
      component: assignmentRooms,
      meta: {
        title: 'Rooms'
      }
    },
    {
      path: config.app.pages.assignments.rooms.detail,
      name: 'assignmentRoomDetail',
      component: quizDetail,
      meta: {
        title: 'Assignment'
      }
    },
    {
      path: config.app.pages.finalJudging,
      name: 'finalJudging',
      component: feeds
    }
  ]
})
