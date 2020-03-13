var app1 = new Vue({
    el: "#app",
    data: {
        formisShow: false,
        openButtonisShow: true,
        closeButtonisShow: false,
        chatisShow: false,
        customer_name: ''
    },
    methods: {
        openForm: function () {
            this.formisShow = true;
            this.openButtonisShow = false;
            this.closeButtonisShow = true;
        },
        closeForm: function () {
            this.formisShow = false;
            this.openButtonisShow = true;
            this.closeButtonisShow = false;
        },
        startChat: function () {
            this.formisShow = false;
            this.openButtonisShow = false;
            this.closeButtonisShow = false;
            this.chatisShow = true;


        },
        sendMsg: function (){

        }
    }
});
