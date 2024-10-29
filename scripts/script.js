//---------------------------------
// Your own functions here
//---------------------------------


function sayHello() {
    //do something
}
//sayHello();    //invoke function

//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
      }).catch((error) => {
        // An error happened.
      });
}

function writeHikes() {
  //define a variable for the collection you want to create in Firestore to populate data
  var hikesRef = db.collection("drinks");

  hikesRef.add({
      code: "drink3",
      name: "Bad drink", //replace with your own city?
      type: "regular",
      roast: "dark",
      flavor: "bitter",
      details: "I would rather die than drink this.",
      price: 50,          //number value
      calories: 1000,       //number value
      last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
  });
}