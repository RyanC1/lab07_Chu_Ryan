var drinkDocID = localStorage.getItem("drinkDocID");    //visible to all functions on this page

function getDrinkName(id) {
    db.collection("drinks")
      .doc(id)
      .get()
      .then((thisDrink) => {
        var drinkName = thisDrink.data().name;
        document.getElementById("drinkName").innerHTML = drinkName;
          });
}

getDrinkName(drinkDocID);

// Add this JavaScript code to make stars clickable

// Select all elements with the class name "star" and store them in the "stars" variable
const stars = document.querySelectorAll('.star');

// Iterate through each star element
stars.forEach((star, index) => {
    // Add a click event listener to the current star
    star.addEventListener('click', () => {
        // Fill in clicked star and stars before it
        for (let i = 0; i <= index; i++) {
            // Change the text content of stars to 'star' (filled)
            document.getElementById(`star${i + 1}`).textContent = 'star';
        }
    });
});

function writeReview() {
    console.log("inside write review");
    let drinkTitle = document.getElementById("title").value;
    let drinkLevel = document.getElementById("level").value;
    let drinkSeason = document.getElementById("season").value;
    let drinkDescription = document.getElementById("description").value;
    let drinkWorthIt = document.querySelector('input[name="worth-it"]:checked').value;
    let drinkSketchy = document.querySelector('input[name="sketchy"]:checked').value;

    // Get the star rating
		// Get all the elements with the class "star" and store them in the 'stars' variable
    const stars = document.querySelectorAll('.star');
		// Initialize a variable 'hikeRating' to keep track of the rating count
    let drinkRating = 0;
		// Iterate through each element in the 'stars' NodeList using the forEach method
    stars.forEach((star) => {
				// Check if the text content of the current 'star' element is equal to the string 'star'
        if (star.textContent === 'star') {
						// If the condition is met, increment the 'hikeRating' by 1
            drinkRating++;
        }
    });

    console.log(drinkTitle, drinkLevel, drinkSeason, drinkDescription, drinkWorthIt, drinkSketchy, drinkRating);

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Get the document for the current user.
        db.collection("reviews").add({
            drinkDocID: drinkDocID,
            userID: userID,
            title: drinkTitle,
            level: drinkLevel,
            season: drinkSeason,
            description: drinkDescription,
            worthIt: drinkWorthIt,
            sketchy: drinkSketchy,
            rating: drinkRating, // Include the rating in the review
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            window.location.href = "thanks.html"; // Redirect to the thanks page
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'review.html';
    }
}