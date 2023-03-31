// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAqKzA3s21AgL98_vqlYUe4ef7WMcyDzRc",
    authDomain: "tril1-427a4.firebaseapp.com",
    databaseURL: "https://tril1-427a4-default-rtdb.firebaseio.com",
    projectId: "tril1-427a4",
    storageBucket: "tril1-427a4.appspot.com",
    messagingSenderId: "288621995286",
    appId: "1:288621995286:web:30500ff06974b62e729c37",
    measurementId: "G-PRCMDXC20X"
      
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // Initialize variables
    const auth = firebase.auth()
    const database = firebase.database()
    
    // Set up our register function
    function register () {
      // Get all our input fields
      email = document.getElementById('email').value
      password = document.getElementById('password').value
      
    
      // Validate input fields
      if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
        // Don't continue running the code
      }
     
      // Move on with Auth
      auth.createUserWithEmailAndPassword(email, password)
      .then(function() {
        // Declare user variable
        var user = auth.currentUser
    
        // Add this user to Firebase Database
        var database_ref = database.ref()
    
        // Create User data
        var user_data = {
          email : email,
         
          last_login : Date.now()
        }
    
        // Push to Firebase Database
        database_ref.child('users/' + user.uid).set(user_data)
    
        // DOne
        alert('User Created!!')
      })
      .catch(function(error) {
        // Firebase will use this to alert of its errors
        var error_code = error.code
        var error_message = error.message
    
        alert(error_message)
      })
    }
    
    // Set up our login function
    function login () {
      // Get all our input fields
      email = document.getElementById('email').value
      password = document.getElementById('password').value
    
      // Validate input fields
      if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
        // Don't continue running the code
      }
    
      auth.signInWithEmailAndPassword(email, password)
      .then(function() {
        // Declare user variable
        var user = auth.currentUser
    
        // Add this user to Firebase Database
        var database_ref = database.ref()
    
        // Create User data
        var user_data = {
          last_login : Date.now()
        }
    
        // Push to Firebase Database
        database_ref.child('users/' + user.uid).update(user_data)
    
        // DOne
        alert('User Logged In!!')
        window.location.assign("index.html")
    
      })
      .catch(function(error) {
        // Firebase will use this to alert of its errors
        var error_code = error.code
        var error_message = error.message
    
        alert(error_message)
      })
    }
    
    
    
    
    // Validate Functions
    function validate_email(email) {
      expression = /^[^@]+@\w+(\.\w+)+\w$/
      if (expression.test(email) == true) {
        // Email is good
        return true
      } else {
        // Email is not good
        return false
      }
    }
    
    function validate_password(password) {
      // Firebase only accepts lengths greater than 6
      if (password < 6) {
        return false
      } else {
        return true
      }
    }
    
    function validate_field(field) {
      if (field == null) {
        return false
      }
    
      if (field.length <= 0) {
        return false
      } else {
        return true
      }
    }