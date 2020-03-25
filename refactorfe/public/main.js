var LiveChatButton = Vue.extend({
  template: `  <div class="livechatbutton">
  <button class="open_button" v-on:click="openForm()">Live Chat</button>
</div>`,
  data() {
    return {};
  },
  methods: {
    openForm() {
      this.$router.push("fillform");
    }
  }
});

var FillForm = Vue.extend({
  template: `  <div class="fillform">
  <label>First Name</label>
  <input type="text" name id="first_name" v-model="first_name" />
  <br />

  <label>Last Name</label>
  <input type="text" name id="last_name" v-model="last_name" />
  <br />

  <label>Phone number</label>
  <input type="text" name id="phone_number" v-model="phone_number" />
  <br />

  <select v-model="selected_skill">
    <option disabled value="">Please choose what you want to consult</option>
    <option>Technical</option>
    <option>Billing</option>
    <option>General</option>
  </select>
  <br />

  <button class="submit" v-on:click="submit()" type="submit">Start Chatting</button>
</div>`,
  data() {
    return {
      guest_json: {},
      first_name: "",
      last_name: "",
      phone_number: "",
      selected_skill: "",
      post_url: "http://127.0.0.1:6062"
    };
  },
  methods: {
    submit() {
      // do some check
      if (
        this.last_name === "" ||
        this.first_name === "" ||
        this.phone_number === "" ||
        this.selected_skill === ""
      ) {
        alert("please fill in all the table");
        return;
      }
      var reg = /^\d+$/;
      if (reg.test(this.phone_number) === false) {
        alert("Please enter a valid phone number.");
        return;
      }

      //   console.log(this.first_name)
      //   console.log(this.select_skill)
      // and store data in localStorage
      localStorage.last_name = this.last_name;
      localStorage.first_name = this.first_name;
      localStorage.phone_number = this.phone_number;
      localStorage.selected_skill = this.selected_skill;
      // need send a request to backend
      this.guest_json["first_name"] = this.first_name;
      this.guest_json["last_name"] = this.last_name;
      this.guest_json["phone_number"] = this.phone_number;
      this.guest_json["selected_skill"] = this.selected_skill;
      console.log(this.guest_json);
      axios
        .post(this.post_url, this.guest_json, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(function(response) {
          // get guest id
          // then store in localStorage
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      this.$router.push("chatroom");
    }
  }
});

var ChatRoom = Vue.extend({
  template: `  <div class="chatroom">
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
</div>`,
  data() {
    return {
      msgs: [
        // some demo message
        { from: "guest", me: true, content: "1 hello from guest" },
        { from: "agent", me: false, content: "1 halo from agent" },
        { from: "agent", me: false, content: "May I help you? " }
      ],
      inputContent: ""
    };
  },
  methods: {
    endChat() {
      console.log("end chat here");
      this.$router.push("Bye");
      // should clear localStorage and whatever here
      localStorage.removeItem(last_name);
      localStorage.removeItem(first_name);
      localStorage.removeItem(phone_number);
      localStorage.removeItem(selected_skill);
    },
    send() {
      if (this.inputContent === "") {
        // pass
      } else {
        console.log(this.inputContent);
        this.msgs.push({ from: "guest", me: true, content: this.inputContent });
        // some code to send massage to somewhere
        //
        //
        // scroll to bottom
        this.$nextTick(() => {
          var scrollbar = document.querySelector(".chat-body");
          scrollbar.scrollTop = scrollbar.scrollHeight;
        });
        this.inputContent = "";
      }
    },
    newline() {
      this.inputContent = `${this.inputContent}`;
    },
    get_msg() {
      console.log("i am retrieving message, timestamp:" + new Date().getTime());
    }
  },
  mounted() {
    // initialise rainbow sdk
    this.timer0 = setTimeout(() => {
      this.msgs.push({
        from: "agent",
        me: false,
        content: "Hi, " + localStorage.first_name + ", What can I do for you?"
      });
    }, 1000);
    // in miniseconds
    this.timer1 = setInterval(() => {
      setTimeout(this.get_msg, 1);
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.timer0);
    clearInterval(this.timer1);
  }
});

var Bye = Vue.extend({
  template: `    <div class="bye">
  <p>Thank you for contacting us.</p>
  <p>Wish you have a good day</p>
</div>`,
})



const routes = [
  { path: "/", component: LiveChatButton },
  { path: "/fillform", component: FillForm },
  { path: "/chatroom", component: ChatRoom},
  { path: "/bye", component: Bye}
];

const router = new VueRouter({
  routes //  routes: routes
});

const app = new Vue({
  router
}).$mount("#app");
