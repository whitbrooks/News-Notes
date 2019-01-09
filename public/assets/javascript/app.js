// Grab the articles as a json
$.get("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display information on the page
    $("#articles").append(
      "<div class='card''><div class='card-body'><a class='card-title' target='_blank' href='" + data[i].link +"'>" + data[i].title + "</a><p class='card-text'>" + data[i].teaser + "</p><button data-id='" + data[i]._id + "' class='noteBtn btn btn-outline-primary btn-sm' data-toggle='modal' data-target='#notesModal' style='margin-right:10px;'>Add Note</button><button id='saveBtn' data-id='" + data[i]._id + "' class='btn btn-outline-primary btn-sm'>Save Article</button></div></div>"
    );
  }
});

// When you click the scrape button
$("#scrapeBtn").click(function() {

  $.ajax({
    method: "GET",
    url: "/scrape"
  })
    .done(function(data) {
      location.reload();
    });
});

// When you click the clear button
$("#clearBtn").click(function() {
  
  $.ajax({
    method: "POST",
    url: "/delete"
  })
  
    .done(function(data) {
      // Log the response
      console.log(data);
    });
  
  $("#articles").empty();
  
});


// When you click the add note button
$(document).on("click", ".noteBtn", function() {
  
  $(".modal-title").empty();
  $(".modal-body").empty();
  $(".modal-footer").empty();


  // get id from noteBtn
  var thisId = $(this).attr("data-id");
  console.log(thisId);

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);

      $(".modal-title").append("<h5>" + data.title + "</h5>");
      $(".modal-body").append("<textarea id='input' rows='4' cols='57'></textarea>");
      $(".modal-footer").append("<button data-id='" + data._id + "' id='saveChanges' type='button' class= 'btn btn primary' class='close' data-dismiss='modal' aria-label='Close'>Save Changes</button>");


      // If there's a note in the article
      if (data.note) {
        // Place the body of the note in the body textarea
        $(".modal-body").prepend(data.note.body);
      }
    });
});


// When you click the save changes button in notes modal
$(document).on("click", "#saveChanges", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log(thisId);

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from note textarea
      body: $("#input").val()
    }
  })
  
    .done(function(data) {
      // Log the response
      console.log(data);
 
    });

  // Remove the values entered in the input and textarea for note entry
  $("#input").val("");
});


// When you click the Save Article button on the homepage
$(document).on("click", "#saveBtn", function() {
  $(this).addClass("disabled");
  var thisId = $(this).attr("data-id");
  console.log(thisId);

  // Run a POST request to change "saved" to true
  $.ajax({
    method: "POST",
    url: "/save/" + thisId,
  })
  
    .done(function(data) {
      // Log the response
      console.log(data);
  
    });
  });

// when you click "my saved articles" on the homepage
$(document).on("click", "#savedPage", function() {

  $("#articles").empty();
  
  $.get("/saved", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display information on the page
      $("#articles").append(
        "<div class='card''><div class='card-body'><a class='card-title' target='_blank' href='" + data[i].link +"'>" + data[i].title + "</a><p class='card-text'>" + data[i].teaser + "</p><button data-id='" + data[i]._id + "' class='noteBtn btn btn-outline-primary btn-sm' data-toggle='modal' data-target='#notesModal' style='margin-right:10px;'>Add Note</button><button id='saveBtn' data-id='" + data[i]._id + "' class='btn btn-outline-primary btn-sm'>Save Article</button></div></div>"
      );
    }
  });
});