import {LoginComponent} from "../components/index";
import {Carousel,Slide} from "vue-carousel";
import { Parse } from "parse";

Parse.initialize(
  "ax3dc5DJ4HCykT0iQg1534CRMLNbRj5OqPfQNc7S",
  "I7eQbY79m207kSO254gsJatflRMNRIPjQmPLOSa5"
);
Parse.serverURL = 'https://pg-app-xe0mtwqz6juisyx1f5escelppya812.scalabl.cloud/1/';

export var HomeController = {
  props: [],
  data() {
    return {
      loggedIn: false,
      signup: false,
      userLogin: {
        email: '',
        password: ''
      },
      userSignup: {
        email: '',
        password: ''
      },
      clients: [],
      addClient: [
        {name: ''},
        {phone: ''},
        {email: ''}
      ],
      clientSelected: '',
      detailSelected: '',
      showModal: false,
      selectedPhone: '',
      selectedEmail: '',
      editState: false,
      noteTextArea: '',
      fileNameBefore: '',
      fileNameAfter: '',
      // notes: []
    }
  },

  template: require('../../../html/home.html'),

  components: {
    Parse,
    Carousel,
    Slide,
    'login': LoginComponent
  },

  created() {
    var clientloop = this.clients;
    var ClientList = Parse.Object.extend("ClientList");
    var query = new Parse.Query(ClientList);

    query.ascending('name');
    query.find({
      success: function(results) {
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          clientloop.push(object.attributes);
        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    // console.log(query);
  },

  methods: {
    clientCheck(){
      this.editState = false;
      this.notes = [];

      var clientItem = event.target.dataset.count;
      this.clientSelected = clientItem;
      this.selectedPhone = this.clients[clientItem].phone;
      this.selectedEmail = this.clients[clientItem].email;
    },

    clientAdd($event){
      var vm = this;
      var clientloop = this.clients;
      if (event) event.preventDefault();

      var ClientList = Parse.Object.extend("ClientList");
      var clientList = new ClientList();

      clientList.set("name", this.addClient.name);
      clientList.set("phone", this.addClient.phone);
      clientList.set("email", this.addClient.email);

      console.log(clientList);

      clientList.save(null, {
        success: function(results) {
          // Execute any logic that should take place after the object is saved.
          clientloop.push(results.attributes);

          var snackbarContainer = document.querySelector('#toast');
          var data = {message: 'Client Successfully saved'};
          snackbarContainer.MaterialSnackbar.showSnackbar(data);

          vm.addClient.name = '';
          vm.addClient.email = '';
          vm.addClient.phone = '';

          clientList.fetch({
            success: function(myObject) {
              // The object was refreshed successfully.
            },
            error: function(myObject, error) {
              // The object was not refreshed successfully.
              // error is a Parse.Error with an error code and message.
              var snackbarContainer = document.querySelector('#toast');
              var data = {message: 'Object not refreshed, try reloading'};
              snackbarContainer.MaterialSnackbar.showSnackbar(data);
            }
          });
        },
        error: function(clientList, error) {
          var snackbarContainer = document.querySelector('#toast');
          var data = {message: 'UH-OH, please try again'};
          snackbarContainer.MaterialSnackbar.showSnackbar(data);
        }
      });
    },

    refresh(){
      setTimeout(function(){
        getmdlSelect.init(".getmdl-select");
        componentHandler.upgradeDom();
      }, 100);
    },

    editing(){
      var clientToEdit = (this.clients[this.clientSelected].name);
      this.editState = true;
      document.getElementById('edit-phone').removeAttribute('readonly');
      document.getElementById('edit-email').removeAttribute('readonly');

      var ClientList = Parse.Object.extend("ClientList");
      var query = new Parse.Query(ClientList);

      query.equalTo('name', clientToEdit);

      query.find({
        success: function(results) {

        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
          var snackbarContainer = document.querySelector('#toast');
          var data = {message: '"Error: " + error.code + " " + error.message'};
          snackbarContainer.MaterialSnackbar.showSnackbar(data);
        }
      });
    },

    saving(){
      var vm = this;
      var clientToEdit = (this.clients[this.clientSelected].name);

      var ClientList = Parse.Object.extend("ClientList");
      var query = new Parse.Query(ClientList);

      query.equalTo('name', clientToEdit);
      query.first({
        success: function(object) {

          object.set("phone", vm.selectedPhone);
          object.set("email", vm.selectedEmail);
          object.save();

          var snackbarContainer = document.querySelector('#toast');
          var data = {message: 'Details Updated'};
          snackbarContainer.MaterialSnackbar.showSnackbar(data);

          vm.editState = false;

        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    },

    saveNote() {
      var vm = this;
      var clientToEdit = (this.clients[this.clientSelected].name);

      var ClientList = Parse.Object.extend("ClientList");
      var query = new Parse.Query(ClientList);

      query.equalTo('name', clientToEdit);
      query.first({
        success: function(object) {
          //save note
          object.add('notes', vm.noteTextArea);
          object.save();

          //
          var uploadBefore = document.getElementById("uploadBtnBefore");
          var uploadAfter = document.getElementById("uploadBtnAfter");

          if ((uploadBefore.files.length > 0) && (uploadAfter.files.length > 0)) {
            var fileBefore = uploadBefore.files[0];
            var nameBefore = "before.jpg";

            var fileAfter = uploadAfter.files[0];
            var nameAfter = "after.jpg";

            var parseFileBefore = new Parse.File(nameBefore, fileBefore);
            var parseFileAfter = new Parse.File(nameAfter, fileAfter);

            parseFileBefore.save().then(function() {
              // The file has been saved to Parse.
              object.add("picture_before", parseFileBefore);
              object.save();
              vm.fileNameBefore = '';
            }, function(error) {
              // The file either could not be read, or could not be saved to Parse.
            });
            parseFileAfter.save().then(function() {
              // The file has been saved to Parse.
              object.add("picture_after", parseFileAfter);
              object.save();
              vm.fileNameAfter = '';

            }, function(error) {
              // The file either could not be read, or could not be saved to Parse.
            });
          }
          //
          var snackbarContainer = document.querySelector('#toast');
          var data = {message: 'Note Added'};
          snackbarContainer.MaterialSnackbar.showSnackbar(data);

          vm.noteTextArea = '';
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    },

    onFileChangeBefore() {
      var vm = this;
      var element = document.getElementById('uploadBtnBefore');
      var files = element.files || element.dataTransfer.file;
      vm.fileNameBefore = files[0].name;
    },

    onFileChangeAfter() {
      var vm = this;
      var element = document.getElementById('uploadBtnAfter');
      var files = element.files || element.dataTransfer.file;
      vm.fileNameAfter = files[0].name;
    },

    noteIndex(event) {
      this.detailSelected = event.currentTarget.id;
      this.showModal = true;
    },

    closeModal(){
      this.showModal = false;
    },

    activateSignup(){
      this.signup = true;
    },

    deactivateSignup(){
      this.signup = false;
    },

    createUser(){
      var user = new Parse.User();
      user.set("username", this.userSignup.email);
      user.set("password", this.userSignup.password);
      user.set("email", this.userSignup.email);

      user.signUp(null, {
        success: function(user) {
          // Hooray! Let them use the app now.
          var snackbarContainer = document.querySelector('#toast');
          var data = {message: 'Success! You can now login'};
          snackbarContainer.MaterialSnackbar.showSnackbar(data);
          componentHandler.upgradeDom();
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          alert("Error: " + error.code + " " + error.message);
        }
      });
    },

    loginUser(){
      var vm = this;
      Parse.User.logIn(this.userLogin.email, this.userLogin.password, {
        success: function(user) {
          // Do stuff after successful login.
          vm.loggedIn = true;
          var snackbarContainer = document.querySelector('#toast');
          var data = {message: 'Successfully Logged in'};
          snackbarContainer.MaterialSnackbar.showSnackbar(data);
          setTimeout(function(){
            getmdlSelect.init(".getmdl-select");
            componentHandler.upgradeDom();
          }, 200);
        },
        error: function(user, error) {
          // The login failed. Check error to see why.
          alert("Error: " + error.code + " " + error.message);
        }
      });
    }

  },


  mounted() {
    //this.$parent.appState.state.loader.start('loading');
  }
};

/**
Important notes:
- Application states is accessed through `this.$parent.appState`
- If you want to pass route params you need to add the property to the props array
**/
