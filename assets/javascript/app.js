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

		// Run AJAX call to the Giphy API
		$.ajax({
			url: queryURL,
			method: "GET"
		})
		.catch(function(error) {
			console.log(error);
		})
		// Store the retrieved data inside "response" object
		.then(function(response){
			console.log(queryURL);
			console.log(response);
			var results = response.data;
			for(var i = 0; i < results.length; i++) {
				// var bikes = $("topicButton");
				var Image = $("<img/>");
				Image.addClass("bikeImg")
				Image.attr("src",results[i].images.fixed_height.url);
				Image.attr("data-still", results[i].images.fixed_height_still.url)
				Image.attr("data-animate", results[i].images.fixed_height.url)
				.attr("data-state","animate");
				Image.prependTo($("#images"));
			}
		});
	});

$("#find-topic").on("click", function(event){
	event.preventDefault();
	var bikeButton = $("#topic-input").val();
	topics.push(bikeButton);
	makeButton();
	console.log("work");
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
	});
  