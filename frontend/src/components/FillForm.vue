/* eslint-disable camelcase */
<template>
  <div class="fillform">
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
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'fillform',
  data () {
    return {
      guest_json: {},
      first_name: '',
      last_name: '',
      phone_number: '',
      selected_skill: '',
      post_url: 'http://127.0.0.1:6062'
    }
  },
  methods: {
    submit () {
    // do some check
      if (this.last_name === '' || this.first_name === '' || this.phone_number === '' || this.selected_skill === '') {
        alert('please fill in all the table')
        return
      }
      var reg = /^\d+$/
      if (reg.test(this.phone_number) === false) {
        alert('Please enter a valid phone number.')
        return
      }

      //   console.log(this.first_name)
      //   console.log(this.select_skill)
      // and store data in localStorage
      localStorage.last_name = this.last_name
      localStorage.first_name = this.first_name
      localStorage.phone_number = this.phone_number
      localStorage.selected_skill = this.selected_skill
      // need send a request to backend
      this.guest_json['first_name'] = this.first_name
      this.guest_json['last_name'] = this.last_name
      this.guest_json['phone_number'] = this.phone_number
      this.guest_json['selected_skill'] = this.selected_skill
      console.log(this.guest_json)
      axios.post(this.post_url, this.guest_json, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          // get guest id
          // then store in localStorage
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      this.$router.push('chatroom')
    }
  }
}
</script>
<style>
.fillform {
  width: 350px;
  height: 500px;
}

label {
  display: block;
}

input {
  display: inline-block;
    font-size: 16px;
    width: 80%;
    border-width: 1px;
    margin: 0 6px 16px 0;
    min-height: 20px;
    max-height: none;
}
select {
  width: 80%;
    font-size: 16px;
  height: 24px;
}

  button.submit {
    margin-top: 10px;
    width: 50%;
    height: 30px;
    border-width: 0px;
    border-radius: 1px;
    background: rgb(14, 104, 194);
    cursor: pointer;
    outline: none;
    font-family: Microsoft YaHei;
    color: white;
    font-size: 17px;
    font-weight: 600;
}
</style>
