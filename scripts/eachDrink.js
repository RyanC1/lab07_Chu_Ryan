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