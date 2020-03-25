import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import LiveChatButton from '@/components/LiveChatButton'
import FillForm from '@/components/FillForm'
import ChatRoom from '@/components/ChatRoom'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LiveChatButton',
      component: LiveChatButton
    },
    {
      path: '/fillform',
      name: 'FillForm',
      component: FillForm
    },
    {
      path: '/chatroom',
      name: 'ChatRoom',
      component: ChatRoom
    }
  ]
})
