// import rainbowSDK
import rainbowSDK from "./rainbow-sdk.min.js"; // If you do not use the bundler
// import rainbowSDK from 'rainbow-web-sdk'; // If you use the bundler (for example - Webpack)

var Conversation = "";
var api_addr = "https://apisdkesc.sutd.org/"; // if you deploy somewhere else, you will need to modify this

var onReady = function onReady() {
  console.log("[Hello World] :: On SDK Ready !");
};

var onLoaded = function onLoaded() {
  console.log("[Hello World] :: On SDK Loaded !");
  var APPID = "f073b5c05e4911ea9a6dcf004cf8c14e";
  var APPSECRET =
    "qNqw5dEnPTSoBEsxnlj4Mjw2BedJ93gaRXq6KLa8JNHPnNovsMHsB4zjytdP4TVz";
  rainbowSDK
    .initialize(APPID, APPSECRET)
    .then(() => {
      console.log("[Hello World] :: Rainbow SDK is initialized!");
    })
    .catch((err) => {
      console.log("[Hello World] :: Something went wrong with the SDK.", err);
    });
};
document.addEventListener(rainbowSDK.RAINBOW_ONREADY, onReady);
document.addEventListener(rainbowSDK.RAINBOW_ONLOADED, onLoaded);
rainbowSDK.start();
rainbowSDK.load();

// Listen when the SDK is ready
document.addEventListener(rainbowSDK.RAINBOW_ONREADY, onReady);

// end of import rainbowSDK

var LiveChatButton = Vue.extend({
  template: `  <div class="livechatbutton" >
  <button class="open_button" v-on:click="openForm()">Live Chat</button>
</div>`,
  data() {
    return {};
  },
  methods: {
    openForm() {
      this.$router.push("fillform");
    },
  },
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
    <option>Tablet</option>
    <option>Phone</option>
    <option>Computer</option>
  </select>
  <br />

  <button class="submit" :disabled="submit_disabled" v-on:click="submit()" type="submit">Start Chatting</button>
</div>`,
  data() {
    return {
      guest_json: {},
      first_name: "",
      last_name: "",
      phone_number: "",
      submit_disabled: false,
      selected_skill: "",
      post_url: api_addr + "createguest",
    };
  },
  methods: {
    // submit button
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
      this.submit_disabled = true;
      // and store data in localStorage
      localStorage.last_name = this.last_name;
      localStorage.first_name = this.first_name;
      localStorage.phone_number = this.phone_number;
      localStorage.selected_skill = this.selected_skill;
      // need send a request to backend
      this.guest_json["first_name"] = this.first_name;
      this.guest_json["last_name"] = this.last_name;
      this.guest_json["phone_number"] = this.phone_number;
      this.guest_json["skill"] = this.selected_skill;
      console.log(this.guest_json);

      axios
        .post(this.post_url, this.guest_json, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // get guest id
          // then store in localStorage
          console.log(response);
          localStorage.jid_a = response.data.jid_a;
          localStorage.jid_c = response.data.jid_c;
          localStorage.id_c = response.data.id_c;
          localStorage.agentAvailable = response.data.agentAvailable;
          // like normal ways to read json
          // localStorage.JID = response.data.JID;
          localStorage.guest_login = response.data.guest_login;
          localStorage.guest_password = response.data.guest_password;
          // true or false
          console.log(localStorage.agentAvailable);
          if (localStorage.agentAvailable == "true") {
            this.$router.push("chatroom");
            console.log("push to chatroom");
          } else {
            this.$router.push("waiting");
            console.log("push to waiting");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    setTimeout(() => {
      if (localStorage.jid_c != undefined) {
        if (localStorage.agentAvailable == "true") {
          this.$router.push("chatroom");
        } else {
          this.$router.push("waiting");
        }
      }
    }, 0);
  },
  destroyed() {},
});

var ChatRoom = Vue.extend({
  template: `  <div class="chatroom">
  <div class="chat-header">
    <button class="end_chat_button" v-on:click="endChat()">End Chat</button>
    <button class="reroute_button" v-on:click="reroute()">Reroute</button>
  </div>
  <div class="chat-body">
    <!-- <div class="agent_chat" v-for="item of agent_msgs" v-bind:key="item.id">
      <img src="./assets/agent_logo.png" />
      <span class="agent_msg">{{item}}</span>
      <br />
    </div> -->
    <!-- <div class="guest_chat" v-for="item of guest_msgs" v-bind:key="item.id">
      <span class="guest_msg">{{item}}</span>
      <img class="guest_logo" src="./assets/guest_logo.png" />
      <br />
    </div> -->
    <div class="single" v-for="item of msgs" v-bind:key="item.id">
      <div :class="[item.from + '_chat']" v-if="item.me">
        <span :class="[item.from + '_msg']">{{item.content}}</span>
        <img :class="[item.from + '_logo']" :src="'https://escproject.sutd.org/assets/' + [item.from + '_logo.png']"/>
        <br />
      </div>
      <div :class="[item.from + '_chat']" v-else>
        <img :class="[item.from + '_logo']" :src="'https://escproject.sutd.org/assets/' + [item.from + '_logo.png']"/>
        <span :class="[item.from + '_msg']">{{item.content}}</span>
        <br />
      </div>
    </div>

  </div>
  <div class="chat-input">
      <textarea @keyup.enter.exact="send()" @keydown.enter.exact.prevent
  @keydown.enter.shift.exact="newline" v-model="inputContent" :disabled="textareaDisabled"></textarea>
    <button v-on:click="send()">Send</button>
  </div>
</div>`,
  data() {
    return {
      textareaDisabled: true,
      msgs: [
        // some demo message
        { from: "guest", me: true, content: "1 hello from guest" },
        { from: "agent", me: false, content: "1 halo from agent" },
        { from: "agent", me: false, content: "May I help you? " },
      ],
      inputContent: "",
      // _i means infomation
      contact_i: "",
      conversation_i: "",
      end_call_url: "http://",
    };
  },
  methods: {
    endChat() {
      console.log("end chat here");
      // close conversation
      rainbowSDK.conversations.closeConversation(Conversation);
      var endcalljson = {};
      endcalljson["id_c"] = localStorage.id_c;
      endcalljson["jid_a"] = localStorage.jid_a;
      endcalljson["jid_c"] = localStorage.jid_c;
      console.log(endcalljson);
      axios.post(api_addr + "endcall", endcalljson);
      localStorage.clear();

      this.$router.push("Bye");
    },
    reroute() {
      this.$router.push("rerouting");
    },
    send() {
      if (this.inputContent === "") {
        // pass
      } else {
        console.log(this.inputContent);
        var msgs_t = JSON.parse(localStorage.msgs);

        msgs_t.push({ from: "guest", me: true, content: this.inputContent });
        localStorage.msgs = JSON.stringify(msgs_t);
        // some code to send massage to somewhere
        // https://hub.openrainbow.com/#/documentation/doc/sdk/web/guides/Chatting_with_Rainbow_users
        // var Conversation = localStorage.getItem("Conversation");
        console.log(Conversation);

        rainbowSDK.im.sendMessageToConversation(
          Conversation,
          this.inputContent
        );

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
    },

    onNewMessageReceived(event) {
      // let message = event.detail.message;
      this.conversation_i = event.detail.conversation;
      // Do something with the new message received

      event.detail.message.then(function (res) {
        console.log(res);
        // console.log()
      });
      // new messages should be pushed to msgs
      // this.msgs.push();
    },
  },
  mounted() {
    var that = this;
    this.textareaDisabled = true;
    let onNewMessageReceived = function (event) {
      let message = event.detail.message;
      console.log(message);
      // let Conversation = event.detail.conversation;
      console.log(message["data"]);
      var msgs_t = JSON.parse(localStorage.msgs);
      msgs_t.push({
        from: "agent",
        me: false,
        content: message["data"],
      });
      localStorage.msgs = JSON.stringify(msgs_t);
      // Do something with the new message received
    };
    document.addEventListener(
      rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED,
      onNewMessageReceived
    );

    let init_conversation = () => {
      var contactJID = localStorage.jid_a; // agent JID
      console.log("This agent JID is " + contactJID);
      var selectedContact = null;
      /* Handler called when user clicks on a contact */
      var onContactSelected = function (contactId) {
        selectedContact = rainbowSDK.contacts.getContactByJID(contactId);
      };
      console.log("Print selectedContact " + selectedContact);
      // Contact not found locally, ask to the server
      if (selectedContact == undefined || selectedContact == null) {
        rainbowSDK.contacts
          .searchByJid(contactJID)
          .then((contact_t) => {
            selectedContact = contact_t;
            console.log(selectedContact);

            // console.log(selectedContact)
            if (selectedContact) {
              // Ok, we have the contact object
              rainbowSDK.conversations
                .openConversationForContact(selectedContact)
                .then(function (conversation) {
                  console.log(conversation);
                  localStorage.setItem("Conversation", conversation);
                  Conversation = conversation;
                  console.log("Conversation estabished");
                  console.log(Conversation);
                  // https://hub.openrainbow.com/#/documentation/doc/sdk/web/guides/Chatting_with_Rainbow_users4

                  rainbowSDK.im.sendMessageToConversation(
                    conversation,
                    "New customer!"
                  );
                  console.log("First message sent!");

                  // should send to backend that conversation is established
                  var temp_json = {};
                  temp_json["jid_a"] = localStorage.jid_a;
                  axios
                    .post(api_addr + "update/cSuccess", temp_json)
                    .then(function (res) {
                      console.log(res);
                    });
                  that.textareaDisabled = false;
                  var msgs_t = JSON.parse(localStorage.msgs);
                  msgs_t.push({
                    from: "agent",
                    me: false,
                    content: "Connected! You can start chatting now.",
                  });
                  localStorage.msgs = JSON.stringify(msgs_t);
                })
                .catch(function (err) {
                  console.log(
                    "Fail to create a conversation using contact: " + contact_t
                  );
                  console.log(err);
                });
            } else {
              // Strange, no contact with that Id. Are you sure that the id is correct?
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    };

    this.timer0 = setTimeout(() => {
      if (localStorage.msgs != undefined) {
        // if localStorage got something,
        // just break it out
        return;
      }

      this.msgs.push({
        from: "agent",
        me: false,
        content: "Hi, " + localStorage.first_name + "!",
      });
      this.msgs.push({
        from: "agent",
        me: false,
        content: "We are looking for an agent to connect you to.",
      });
      this.msgs.push({
        from: "agent",
        me: false,
        content:
          "Connecting, please hang on. We are sorry that you cannot send messages now.",
      });
      localStorage.msgs = JSON.stringify(this.msgs);
    }, 1);

    // sync msgs with localStorage.msgs
    // all msgs wil be added to localStorage.msgs
    // then assign value in localStorage.msgs to this.msgs
    this.timer1 = setInterval(() => {
      setTimeout(() => {
        this.msgs = JSON.parse(localStorage.msgs);
        // scroll to bottom
        this.$nextTick(() => {
          var scrollbar = document.querySelector(".chat-body");
          scrollbar.scrollTop = scrollbar.scrollHeight;
        });
      }, 1);
    }, 500);

    // run after 5 senconds only once
    this.timer2 = setTimeout(() => {
      // get Contact object using JID in localStorage
      var myRainbowLogin = localStorage.guest_login;
      var myRainbowPassword = localStorage.guest_password;
      // The SDK for Web is ready to be used, so you can sign in
      console.log("Start logging in");
      rainbowSDK.connection
        .signin(myRainbowLogin, myRainbowPassword)
        .then(function (account) {
          console.log("login successful");
          init_conversation(localStorage.jid_a); // init conversation
        })
        .catch(function (err) {
          console.log("login error");
          console.log(err);
          // An error occurs (e.g. bad credentials). Application could be informed that sign in has failed
        });
    }, 5000);

    // reroute
    this.timer3 = setInterval(() => {
      setTimeout(() => {
        axios
          .post(api_addr + "cusagent", {
            jid_c: localStorage.jid_c,
          })
          .then((res) => {
            console.log("reroute", res);
            if (res.data.agentAvailable == true) {
              // sometimes need res.body.field
              localStorage.jid_c = res.data.jid_c;
              localStorage.jid_a = res.data.jid_a;
              rainbowSDK.conversations.closeConversation(Conversation); // close current conversation
              init_conversation();
            } else {
              // do nothing
              console.log("Still no agent available from loop");
            }
          });
      }, 0);
    }, 5000);

    let _this = this;
    window.onbeforeunload = function (e) {
      if (_this.$route.fullPath == "/chatroom") {
        e = e || window.event;
        // IE8 Firefox 4
        if (e) {
          e.returnValue = "";
        }
        // end chat
        console.log("end chat here");
        // close conversation
        rainbowSDK.conversations.closeConversation(Conversation);
        var endcalljson = {};
        endcalljson["id_c"] = localStorage.id_c;
        endcalljson["jid_a"] = localStorage.jid_a;
        endcalljson["jid_c"] = localStorage.jid_c;
        console.log(endcalljson);
        axios.post(api_addr + "endcall", endcalljson);
        localStorage.clear();
        //
        return "";
      } else {
        window.onbeforeunload = null;
      }
    };
  },

  beforeDestroy() {
    clearInterval(this.timer0);
    clearInterval(this.timer1);
    clearInterval(this.timer2);
    clearInterval(this.timer3);
  },
});

var Bye = Vue.extend({
  template: `    <div class="bye">
  <p>Thank you for contacting us.</p>
  <p>Wish you have a good day</p>
  <p>You can close the tab now</p>
</div>`,
  mounted() {
    setTimeout(() => {
      localStorage.clear();
    }, 0);
  },
});

var Waiting = Vue.extend({
  template: `<div class="waiting_screen"><div class="load-container"> Please wait a while, we are looking for a suitable agent for you.<div class="loader"></div></div></div>`,
  mounted() {
    this.timer0 = setInterval(() => {
      setTimeout(() => {
        // every 4 seconds check whether or not agent is available
        // Ryan IP
        axios
          .post(api_addr + "cusagent", {
            jid_c: localStorage.jid_c,
          })
          .then((res) => {
            if (res.data.agentAvailable == true) {
              // sometimes need res.body.field
              localStorage.jid_c = res.data.jid_c;
              localStorage.jid_a = res.data.jid_a;
              this.$router.push("chatroom");
            } else {
              // do nothing
              console.log("Still no agent available");
            }
          });
        // remember to get agent id
      }, 0);
    }, 4000);
    // close tab
    let _this = this;
    window.onbeforeunload = function (e) {
      if (_this.$route.fullPath == "/waiting") {
        e = e || window.event;
        // IE8 Firefox 4
        if (e) {
          e.returnValue = "";
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        this.console.log("customer closes waiting, sending cancelcall");

        axios.post(api_addr + "cancelcall", {
          jid_c: localStorage.jid_c,
        });
        return "";
      } else {
        window.onbeforeunload = null;
      }
    };
  },
  beforeDestroy() {
    clearInterval(this.timer0);
  },
});

var Rerouting = Vue.extend({
  template: `<div class="retoute_screen">Which department do you want to go to?
  <br /><br />
  <select v-model="selected_skill">
  <option disabled value="">Please choose what you want to consult</option>
  <option>Tablet</option>
  <option>Phone</option>
  <option>Computer</option>
  </select>
  <br />
  <div class="rerouting_msg"> {{rerouting_msg}} </div>
  <button class="submit" :disabled="button_disable" v-on:click="submit()" type="submit">Start rerouting</button></div>`,
  data() {
    return {
      selected_skill: "",
      rerouting_msg: "",
      button_disable: false,
    };
  },
  methods: {
    submit() {
      if (this.selected_skill == "") {
        alert("Please select one department.");
        return;
      }
      localStorage.selected_skill = this.selected_skill;
      this.rerouting_msg =
        "We are reouting you to " +
        this.selected_skill +
        " department, please hold on.";
      this.button_disable = true;
      // do some requests here
      var post_url = api_addr + "reroute";
      var rerouting_json = {};
      rerouting_json["jid_c"] = localStorage.jid_c;
      rerouting_json["skill"] = localStorage.selected_skill;
      axios
        .post(post_url, rerouting_json, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          localStorage.jid_a = response.data.jid_a;
          localStorage.removeItem("msgs");
          this.$router.push("chatroom");
        });
    },
  },
});

const routes = [
  { path: "/", component: LiveChatButton },
  { path: "/fillform", component: FillForm },
  { path: "/chatroom", component: ChatRoom },
  { path: "/bye", component: Bye },
  { path: "/waiting", component: Waiting },
  { path: "/rerouting", component: Rerouting },
];

const router = new VueRouter({
  routes, //  routes: routes
});

const app = new Vue({
  router,
}).$mount("#app");
