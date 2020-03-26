// import rainbowSDK
import rainbowSDK from "./rainbow-sdk.min.js"; // If you do not use the bundler
// import rainbowSDK from 'rainbow-web-sdk'; // If you use the bundler (for example - Webpack)

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
    .catch(err => {
      console.log("[Hello World] :: Something went wrong with the SDK.", err);
    });
};
document.addEventListener(rainbowSDK.RAINBOW_ONREADY, onReady);

document.addEventListener(rainbowSDK.RAINBOW_ONLOADED, onLoaded);
rainbowSDK.start();
rainbowSDK.load();
console.log(rainbowSDK.version());

// var onReady = function onReady() {
//   var myRainbowLogin = "zee.dummyy@gmail.com"; // Replace by your login
//   var myRainbowPassword = "3V<.8FygXu>2"; // Replace by your password

//   // The SDK for Web is ready to be used, so you can sign in
//   rainbowSDK.connection
//     .signin(myRainbowLogin, myRainbowPassword)
//     .then(function(account) {
//       console.log("login successful");
//       // Successfully signed to Rainbow and the SDK is started completely. Rainbow data can be retrieved.
//     })
//     .catch(function(err) {
//       console.log("login error");
//       console.log(err);
//       // An error occurs (e.g. bad credentials). Application could be informed that sign in has failed
//     });
// };

// Listen when the SDK is ready
document.addEventListener(rainbowSDK.RAINBOW_ONREADY, onReady);

// end of import rainbowSDK

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
    <option>Tablet</option>
    <option>Phone</option>
    <option>Computer</option>
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
      post_url: "http://10.12.190.247:3002/createguest"
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
          // like normal ways to read json
          // localStorage.JID = response.data.JID;
          // localStorage.guestEmail = response.data.d;
          // localStorage.guestPassword = response.data.p;
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
      inputContent: "",
      // _i means infomation
      contact_i: "",
      conversation_i: ""
    };
  },
  methods: {
    endChat() {
      console.log("end chat here");
      this.$router.push("Bye");
      // should clear localStorage and whatever here
      // localStorage.removeItem(last_name);
      // localStorage.removeItem(first_name);
      // localStorage.removeItem(phone_number);
      // localStorage.removeItem(selected_skill);
      // remove whole localStorage
      localStorage.clear();
    },
    send() {
      if (this.inputContent === "") {
        // pass
      } else {
        console.log(this.inputContent);
        this.msgs.push({ from: "guest", me: true, content: this.inputContent });
        localStorage.msgs = JSON.stringify(this.msgs);
        // some code to send massage to somewhere
        // https://hub.openrainbow.com/#/documentation/doc/sdk/web/guides/Chatting_with_Rainbow_users
        rainbowSDK.im.sendMessageToConversation(
          conversation_i,
          inputContent + " read!"
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
      let message = event.detail.message;
      this.conversation_i = event.detail.conversation;
      // Do something with the new message received
      console.log(message);
      // new messages should be pushed to msgs
      // this.msgs.push();
    }
  },
  mounted() {
    // for test only
    this.timer4 = setTimeout(() => {
      var myRainbowLogin =
        "1e3c0gj4xg3ploq9wcykfoxpkh5mzfcmb41pyh47@f073b5c05e4911ea9a6dcf004cf8c14e.sandbox.openrainbow.com"; // Replace by your login
      var myRainbowPassword = "ImG2HK2+w652CB*i1]z1[I71IKVOYf*i4Q06Al_0"; // Replace by your password

      // The SDK for Web is ready to be used, so you can sign in
      rainbowSDK.connection
        .signin(myRainbowLogin, myRainbowPassword)
        .then(function(account) {
          console.log("login successful");
          // Successfully signed to Rainbow and the SDK is started completely. Rainbow data can be retrieved.
        })
        .catch(function(err) {
          console.log("login error");
          console.log(err);
          // An error occurs (e.g. bad credentials). Application could be informed that sign in has failed
        });
    }, 0);

    this.timer0 = setTimeout(() => {
      this.msgs.push({
        from: "agent",
        me: false,
        content: "Hi, " + localStorage.first_name + ", What can I do for you?"
      });
    }, 1000);

    this.timer2 = setTimeout(() => {
      if (localStorage.msgs != null) {
        this.msgs = JSON.parse(localStorage.msgs);
        console.log(localStorage.msgs);
        this.$nextTick(() => {
          var scrollbar = document.querySelector(".chat-body");
          scrollbar.scrollTop = scrollbar.scrollHeight;
        });
        return;
      }
      this.msgs.push({
        from: "agent",
        me: false,
        content: "Connecting..."
      });
    }, 2000);

    // run after 2 senconds only once
    this.timer3 = setTimeout(() => {
      // get Contact object using JID in localStorage
      // https://hub.openrainbow.com/#/documentation/doc/sdk/web/api/contacts#module_Contacts+getContactById
      localStorage.JID = "5e7c74ba35c8367f99b90644"; // guest
      localStorage.JID =
        "d6aabfd1a348467a990f0dfcb94b5218@sandbox-all-in-one-rbx-prod-1.rainbow.sbg"; // agent

      this.contact_i = rainbowSDK.contacts.searchByJid(localStorage.JID);
      // var v;
      var s = this.contact_i.then(v => {
        // console.log(v)
        // this.contact_i = v;
        rainbowSDK.conversations
          .openConversationForContact(v)
          .then(function(promise) {
            if (promise != null) {

              this.conversation_i = promise;
              console.log("Conversation estabished");
              // https://hub.openrainbow.com/#/documentation/doc/sdk/web/guides/Chatting_with_Rainbow_users
              document.addEventListener(
                rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED,
                this.onNewMessageReceived
              );
            } else {
              console.log(
                "Fail to create a conversation using contact: " + this.contact_i
              );
            }
          });
      });

      console.log(this.contact_i);

      // console.log(this.contact_i.JSON());
      if (this.contact_i != null) {
        // https://hub.openrainbow.com/#/documentation/doc/sdk/web/api/conversations#module_Conversations+getConversationById
        console.log("opening conversation");
        rainbowSDK.conversations
          .openConversationForContact(this.contact_i)
          .then(function(promise) {
            if (promise != null) {
              this.conversation_i = promise;
              console.log("Conversation estabished");
              // https://hub.openrainbow.com/#/documentation/doc/sdk/web/guides/Chatting_with_Rainbow_users
              document.addEventListener(
                rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED,
                this.onNewMessageReceived
              );
            } else {
              console.log(
                "Fail to create a conversation using contact: " + this.contact_i
              );
            }
          });
      } else {
        console.log("No contact found using JID: " + localStorage.JID);
      }
    }, 10000);

    // we have a new message listener
    // we do not need this part, maybe
    // check for new messages every 3 seconds

    // this.timer1 = setInterval(() => {
    //   setTimeout(this.get_msg, 1);
    // }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.timer0);
    clearInterval(this.timer1);
    clearInterval(this.timer2);
  }
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
  }
});

const routes = [
  { path: "/", component: LiveChatButton },
  { path: "/fillform", component: FillForm },
  { path: "/chatroom", component: ChatRoom },
  { path: "/bye", component: Bye }
];

const router = new VueRouter({
  routes //  routes: routes
});

const app = new Vue({
  router
}).$mount("#app");
