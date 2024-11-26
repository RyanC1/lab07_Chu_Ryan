function displayDrinkInfo() {
    let params = new URL( window.location.href ); //get URL of search bar
    let ID = params.searchParams.get( "docID" ); //get value for key "id"
    console.log( ID );

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection( "drinks" )
        .doc( ID )
        .get()
        .then( doc => {
            thisDrink = doc.data();
            drinkCode = thisDrink.code;
            drinkName = doc.data().name;
            
            // only populate title, and image
            document.getElementById( "drinkName" ).innerHTML = drinkName;
            let imgEvent = document.querySelector( ".drink-img" );
            imgEvent.src = "../images/" + drinkCode + ".jpg";
        } );
}
displayDrinkInfo();

function saveDrinkDocumentIDAndRedirect(){
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('drinkDocID', ID);
    window.location.href = 'review.html';
}

function populateReviews() {
    console.log("test");
    let drinkCardTemplate = document.getElementById("reviewCardTemplate");
    let drinkCardGroup = document.getElementById("reviewCardGroup");

    let params = new URL(window.location.href); // Get the URL from the search bar
    let drinkID = params.searchParams.get("docID");

    // Double-check: is your collection called "Reviews" or "reviews"?
    db.collection("reviews")
        .where("drinkDocID", "==", drinkID)
        .get()
        .then((allReviews) => {
            reviews = allReviews.docs;
            console.log(reviews);
            reviews.forEach((doc) => {
                var title = doc.data().title;
                var level = doc.data().level;
                var season = doc.data().season;
                var description = doc.data().description;
                var worthIt = doc.data().worthIt;
                var sketchy = doc.data().sketchy;
                var time = doc.data().timestamp.toDate();
                var rating = doc.data().rating; // Get the rating value
                console.log(rating)

                console.log(time);

                let reviewCard = drinkCardTemplate.content.cloneNode(true);
                reviewCard.querySelector(".title").innerHTML = title;
                reviewCard.querySelector(".time").innerHTML = new Date(
                    time
                ).toLocaleString();
                reviewCard.querySelector(".level").innerHTML = `Level: ${level}`;
                reviewCard.querySelector(".season").innerHTML = `Season: ${season}`;
                reviewCard.querySelector(".sketchy").innerHTML = `Skecthy: ${sketchy}`;
                reviewCard.querySelector(".worth-it").innerHTML = `Worth it: ${worthIt}`;
                reviewCard.querySelector( ".description").innerHTML = `Description: ${description}`;

                // Populate the star rating based on the rating value
                
	              // Initialize an empty string to store the star rating HTML
								let starRating = "";
								// This loop runs from i=0 to i<rating, where 'rating' is a variable holding the rating value.
                for (let i = 0; i < rating; i++) {
                    starRating += '<span class="material-icons">star</span>';
                }
								// After the first loop, this second loop runs from i=rating to i<5.
                for (let i = rating; i < 5; i++) {
                    starRating += '<span class="material-icons">star_outline</span>';
                }
                reviewCard.querySelector(".star-rating").innerHTML = starRating;

                drinkCardGroup.appendChild(reviewCard);
            });
        });
}

populateReviews();

