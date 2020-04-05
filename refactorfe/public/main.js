// import rainbowSDK
import rainbowSDK from "./rainbow-sdk.min.js"; // If you do not use the bundler
// import rainbowSDK from 'rainbow-web-sdk'; // If you use the bundler (for example - Webpack)

var Conversation = "";

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

  <button class="submit" v-on:click="submit()" type="submit">Start Chatting</button>
</div>`,
  data() {
    return {
      guest_json: {},
      first_name: "",
      last_name: "",
      phone_number: "",
      selected_skill: "",
      post_url: "https://apisdkesc.sutd.org/createguest",
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
          if (localStorage.agentAvailable == true) {
        	this.$router.push('chatroom');
        	console.log("push to chatroom");
          } else {
            this.$router.push('waiting');
            console.log("push to waiting");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    
  },
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
      console.log(endcalljson);
      axios.post("https://apisdkesc.sutd.org/endcall", endcalljson);
      localStorage.clear();

      this.$router.push("Bye");
      // should clear localStorage and whatever here
      // localStorage.removeItem(last_name);
      // localStorage.removeItem(first_name);
      // localStorage.removeItem(phone_number);
      // localStorage.removeItem(selected_skill);
      // remove whole localStorage
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
    // for test only
    // this.timer4 = setTimeout(() => {
    //   var myRainbowLogin =
    //     "93pn2uk4c30c6362pw4r9qo5n50ctb0tanldb9bt@f073b5c05e4911ea9a6dcf004cf8c14e.sandbox.openrainbow.com"; // Replace by your login
    //   var myRainbowPassword = "X,V/j}776~3QXjuF1M3xnjY4US]P38d[Tjz@Rp<4"; // Replace by your password

    //   // The SDK for Web is ready to be used, so you can sign in
    //   console.log("Start logging in");
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
    // }, 1);

    this.timer6 = setTimeout(() => {
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
      localStorage.msgs = JSON.stringify(this.msgs);
    }, 1);

    // sync msgs with localStorage.msgs
    // all msgs wil be added to localStorage.msgs
    // then assign value in localStorage.msgs to this.msgs
    this.timer5 = setInterval(() => {
      setTimeout(() => {
        this.msgs = JSON.parse(localStorage.msgs);
      }, 1);
    }, 500);

    // this.timer0 = setTimeout(() => {
    //   var msgs_t = JSON.parse(localStorage.msgs);

    //   msgs_t.push({
    //     from: "agent",
    //     me: false,
    //     content: "Hi, " + localStorage.first_name + "!"
    //   });
    //   msgs_t.push({
    //     from: "agent",
    //     me: false,
    //     content: "We are looking for an agent to connect you to."
    //   });
    //   localStorage.msgs = JSON.stringify(msgs_t);
    // }, 10);

    // run after 5 senconds only once
    this.timer3 = setTimeout(() => {
      // get Contact object using JID in localStorage
      // https://hub.openrainbow.com/#/documentation/doc/sdk/web/api/contacts#module_Contacts+getContactById

      // var myRainbowLogin =
      //   "93pn2uk4c30c6362pw4r9qo5n50ctb0tanldb9bt@f073b5c05e4911ea9a6dcf004cf8c14e.sandbox.openrainbow.com"; // Replace by your login
      // var myRainbowPassword = "X,V/j}776~3QXjuF1M3xnjY4US]P38d[Tjz@Rp<4"; // Replace by your password

      var myRainbowLogin = localStorage.guest_login;
      var myRainbowPassword = localStorage.guest_password;

      console.log(myRainbowLogin);
      console.log(myRainbowPassword);

      // The SDK for Web is ready to be used, so you can sign in
      console.log("Start logging in");
      rainbowSDK.connection
        .signin(myRainbowLogin, myRainbowPassword)
        .then(function (account) {
          console.log("login successful");
          // Successfully signed to Rainbow and the SDK is started completely. Rainbow data can be retrieved.
          // localStorage.JID = "5e7c74ba35c8367f99b90644"; // guest
          // localStorage.JID =
          //   "d6aabfd1a348467a990f0dfcb94b5218@sandbox-all-in-one-rbx-prod-1.rainbow.sbg"; // agent

          var contactJID = localStorage.jid_a; // agent JID
          console.log("This agent JID " + contactJID);

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
                  console.log("if loop");
                  rainbowSDK.conversations
                    .openConversationForContact(selectedContact)
                    .then(function (conversation) {
                      console.log("test");
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

                      // send to Ryan saying chat is started
                      var temp_json = {};
                      temp_json["jid_a"] = localStorage.jid_a;
                      // Ryan IP
                      axios
                        .post(
                          "https://apisdkesc.sutd.org/update/cSuccess",
                          temp_json
                        )
                        .then(function (res) {
                          console.log(res);
                        });
                      document.addEventListener(
                        rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED,
                        onNewMessageReceived
                      );
                    })
                    .catch(function (err) {
                      console.log(
                        "Fail to create a conversation using contact: " +
                          contact_t
                      );
                      console.log(err);
                    });
                } else {
                  // Strange, no contact with that Id. Are you sure that the id is correct?
                }
              })
              .catch(function (err) {
                //Something when wrong with the server. Handle the trouble here
                console.log(err);
              });
          }
          // console.log("selectedContact");
          // console.log(selectedContact);

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
        })
        .catch(function (err) {
          console.log("login error");
          console.log(err);
          // An error occurs (e.g. bad credentials). Application could be informed that sign in has failed
        });
    }, 5000);
    // console.log(this.contact_i);

    // // console.log(this.contact_i.JSON());
    // if (this.contact_i != null) {
    //   // https://hub.openrainbow.com/#/documentation/doc/sdk/web/api/conversations#module_Conversations+getConversationById

    //   rainbowSDK.conversations
    //     .openConversationForContact(this.contact_i)
    //     .then(function(promise) {
    //       if (promise != null) {
    //         this.conversation_i = promise;
    //         console.log("Conversation estabished");
    //         // https://hub.openrainbow.com/#/documentation/doc/sdk/web/guides/Chatting_with_Rainbow_users
    //         document.addEventListener(
    //           rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED,
    //           this.onNewMessageReceived
    //         );
    //       } else {
    //         console.log(
    //           "Fail to create a conversation using contact: " + this.contact_i
    //         );
    //       }
    //     });
    // } else {
    //   console.log("No contact found using JID: " + localStorage.JID);
    // }

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
          .post("https://apisdkesc.sutd.org/cusagent", { jid_c: localStorage.jid_c })
          .then((res) => {
            if (res.data.agentAvailable == true) {
              // sometimes need res.body.field
              localStorage.jid_c = res.data.jid_c;
              localStorage.jid_a = res.data.jid_a;
              this.$router.push('chatroom');
            } else {
              // do nothing
              console.log("Still no agent available");
            }
          });
        // remember to get agent id
      }, 0);
    }, 4000);
  },
});

var Rerouting = Vue.extend({
  template: `<div class="retoute_screen>>We are rerouting you. Please hold on.</div>`,
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
