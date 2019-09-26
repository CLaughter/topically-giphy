$(document).ready(function() {
  //Array for searched topics to be added
  var topics = [
    "motorcycles",
    "camping",    
    "shooting",
    "fishing"
  ];

	// create buttons in HTML from the topics above
	var makeButton = function() {
		$("#topicButtons").empty();
		for(var i = 0; i < topics.length; i++) {
			var buttons = $('<button class="search">'+ topics[i] + '</button>') 
			buttons.appendTo('#topicButtons');
		}
	}
	makeButton();
  

	// API key 
	var APIKey = "35F89lKQAF73pmm6Vi02rvvNZLa8URcx"
	
	// Build the URL we need to query the database
	$(document).on("click", ".search", function(){
		$("#images").empty();
		// event.preventDefault() can be used to prevent an event's default behavior.
    // it prevents the submit button from trying to submit a form when clicked
		event.preventDefault();
				
    var motorcycle  = $(this).text();
    // limit= 10
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + motorcycle + "&api_key=" + APIKey + "&limit=10";

		// Run our AJAX call to the Giphy API
		$.ajax({
			url: queryURL,
			method: "GET"
		})
		.catch(function(error) {
			console.log(error);
		})
		// Store the retrieved data inside of an object called "response"
		.then(function(response){
			console.log(queryURL);
			console.log(response);
			var results = response.data;
			for(var i = 0; i < results.length; i++) {
				var bikes = $("topicButton");
				var Image = $("<img/>");
				Image.addClass("bikeImg")
				Image.attr("src",results[i].images.fixed_height.url);
				Image.attr("data-still", results[i].images.fixed_height_still.url)
				Image.attr("data-animate", results[i].images.fixed_height.url)
				.attr("data-state","animate");
				// bikes.append(p);
				// bikes.append(Image);
				Image.prependTo($("#images"));
			}
			// $(".bikeImg").on("click",function(){
			// 	var state = $(this).attr("data-state");
			// 	console.log(this);
			// 	if(state === "still") {
			// 		$(this).attr("src", $(this).data("animate"));
			// 		$(this).attr("data-state","animate");
			// 	} else {
			// 		$(this).attr("src", $(this).data("still"));
			// 		$(this).attr("data-state", "still");
			// 	}
			// });
		});
	});

$("#find-topic").on("click", function(event){
	event.preventDefault();
	var bikeButton = $("#topic-input").val();
	topics.push(bikeButton);
	makeButton();
	// $("#topicButtons").append(newButton);
	console.log("work");
	// queryURL = "https://api.giphy.com/v1/gifs/search?q=" + motorcycle + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
	// console.log(bikeButton);

	// $.ajax({
	// url:queryURL,
	// method: "GET"
	// }).done(function(response){
	// 	var results = response.data;
	// 	for (var i = 0; i < results.length; i++){
	// 		var bikes = $("<div/>");
	// 		var p = $("<p/>");
	// 		p.text(results[i].rating);
	// 		var bikeImage = $("bikeImg")
	// 		bikeImage.addClass("bikeImg")
	// 		bikeImage.attr("src",results[i].images.fixed_height_still.url);
	// 		bikeImage.attr("data-still",results[i].images.fixed_height_still.url);
	// 		bikeImage.attr("data-animate",results[i].images.fixed_height.url).attr("data-state", "still");
	// 		bikes.append(p);
	// 		bikes.append(bikeImage);
	// 		bikes.prependTo($("#gifs"));		
	// 		}
	// 	});
	});

	$(document).on("click", ".bikeImg", function(){
		var state = $(this).attr("data-state");
		console.log(this);
		if(state === "still") {
			$(this).attr("src",$(this).data("animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).data("still"));
			$(this).attr("data-state", "still");
		}
		});

	// $("#topic-input").val();
	// return false;
	});

  // $(".gif").on("click", function() {
  //   // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  //   var state = $(this).attr("data-state");
  //   // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  //   // Then, set the image's data-state to animate
  //   // Else set src to the data-still value
  //   if (state === "still") {
  //     $(this).attr("src", $(this).attr("data-animate"));
  //     $(this).attr("data-state", "animate");
  //   } else {
  //     $(this).attr("src", $(this).attr("data-still"));
  //     $(this).attr("data-state", "still");
  //   }
  // });
  