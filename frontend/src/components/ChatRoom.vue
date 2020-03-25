<template>
  <div class="chatroom">
    <div class="chat-header">
      <button class="end_chat_button" v-on:click="endChat()">End Chat</button>
    </div>
    <div class="chat-body">
      <!-- <div class="agent_chat" v-for="item of agent_msgs" v-bind:key="item.id">
        <img src="../assets/agent_logo.png" />
        <span class="agent_msg">{{item}}</span>
        <br />
      </div> -->
      <!-- <div class="guest_chat" v-for="item of guest_msgs" v-bind:key="item.id">
        <span class="guest_msg">{{item}}</span>
        <img class="guest_logo" src="../assets/guest_logo.png" />
        <br />
      </div> -->
      <div class="single" v-for="item of msgs" v-bind:key="item.id">
        <div :class="[item.from + '_chat']" v-if="item.me">
          <span :class="[item.from + '_msg']">{{item.content}}</span>
          <img :class="[item.from + '_logo']" src=""/>
          <br />
        </div>
        <div :class="[item.from + '_chat']" v-else>
          <img :class="[item.from + '_logo']" src=""/>
          <span :class="[item.from + '_msg']">{{item.content}}</span>
          <br />
        </div>
      </div>

    </div>
    <div class="chat-input">
        <textarea @keyup.enter.exact="send()" @keydown.enter.exact.prevent
    @keydown.enter.shift.exact="newline" v-model="inputContent"></textarea>
      <button v-on:click="send()">Send</button>
    </div>
  </div>
</template>

<script>
import rainbowSDK from 'rainbow-web-sdk'
export default {
  name: 'chatroom',
  data () {
    return {
      msgs: [
        {'from': 'guest', 'me': true, 'content': '1 hello from guest'},
        {'from': 'agent', 'me': false, 'content': '1 halo from agent'},
        {'from': 'agent', 'me': false, 'content': 'May I help you? '}
      ],

      // agent_msgs: [
      //   'agentm1',
      //   'agentm2',
      //   'agentm3',
      //   'agent4',
      //   'agent4',
      //   'agent4',
      //   'agent4',
      //   'agent4',
      //   'agent4',
      //   'agent4'
      // ],
      // guest_msgs: ['g1', 'g2', 'g3'],
      inputContent: ''
    }
  },
  methods: {
    endChat () {
      console.log('end chat here')
      this.$router.push('Bye')
      // should clear localStorage and whatever here
      localStorage.last_name = ''
      localStorage.first_name = ''
      localStorage.phone_number = ''
      localStorage.selected_skill = ''
    },
    send () {
      if (this.inputContent === '') {
        // pass
      } else {
        console.log(this.inputContent)
        rainbowSDK.conversations.openConversationForContact('e')
        this.msgs.push({'from': 'guest', 'me': true, 'content': this.inputContent})
        // some code to send massage to somewhere
        //
        //
        // scroll to bottom
        this.$nextTick(() => {
          var scrollbar = document.querySelector('.chat-body')
          scrollbar.scrollTop = scrollbar.scrollHeight
        }
        )
        this.inputContent = ''
      }
    },
    newline () {
      this.inputContent = `${this.inputContent}`
    },
    get_msg () {
      console.log('i am retrieving message, timestamp:' + new Date().getTime())
    }
  },
  mounted () {
    // initialise rainbow sdk
    this.timer2 = setTimeout(() => {
      rainbowSDK.initialize('APPID', 'APPSECRET')
        .then(() => {
          console.log('[Hello World] :: Rainbow SDK is initialized!')
        })
        .catch(err => {
          console.log('[Hello World] :: Something went wrong with the SDK.', err)
        })
    }, 0)
    this.timer0 = setTimeout(() => { this.msgs.push({'from': 'agent', 'me': false, 'content': 'Hi, ' + localStorage.first_name + ', What can I do for you?'}) }, 1000)
    // in miniseconds
    this.timer1 = setInterval(() => { setTimeout(this.get_msg, 1) }, 3000)
  },
  beforeDestroy () {
    clearInterval(this.timer0)
    clearInterval(this.timer1)
    clearInterval(this.timer2)
  }
}
</script>

<style>
.agent_chat {
  margin-top: 7px;
  display: flex;
  justify-content: flex-start;
}

.guest_chat {
  margin-top: 7px;
  display: flex;
  justify-content: flex-end;
}

img {
  width: 30px;
  margin-top: 5px;
}

.chatroom {}

.chat-body {
  overflow: auto;
  width: 400px;
  height: 350px;
  border: 1px solid;
  background-color: rgb(250, 240, 226);
}

.agent_msg {
  border: 1px solid rgb(224, 250, 193);
  background-color: rgb(214, 247, 175);
  padding-top: 1px;
  padding-bottom: 1px;
  padding-left: 3px;
  padding-right: 8px;
  border-radius: 8px;
}

.agent_logo {
  background: url('../assets/agent_logo.png') center;
  background-size: cover;
  display: flex;
  justify-content: flex-start;
}

.guest_logo {
  margin-top: 4px;
  background: url('../assets/guest_logo.png') center;
  background-size:cover;
}

.guest_msg {
  border: 1px solid rgb(224, 250, 193);
  background-color: rgb(214, 247, 175);
  margin-top: 4px;
  padding-top: 0px;
  padding-bottom: 1px;
  padding-left: 6px;
  padding-right: 3px;
  border-radius: 8px;
}

::-webkit-scrollbar {
  width: 6px;
  background-color: rgb(250, 240, 226);
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #1767b1;
  border-radius: 8px;
}

.chat-input textarea {
  margin-top: 10px;
  width: 320px;
}

.chat-input button {
  position: relative;
  top: -10px;
    width: 70px;
    height: 35px;
    border-width: 0px;
    border-radius: 3px;
    background: rgb(14, 104, 194);
    cursor: pointer;
    color: white;
    font-size: 20px;
    font-weight: 600;
}
</style>
