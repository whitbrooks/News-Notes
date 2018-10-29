// Grab the articles as a json
$.get("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append(
      "<div class='card'><div class='card-body'><a class='card-title' target='_blank' href='" + data[i].link +"'>" + data[i].title + "</a><p class='card-text'>" + data[i].teaser + "</p><button data-id='" + data[i]._id + "' class='noteBtn btn btn-outline-primary btn-sm' data-toggle='modal' data-target='#notesModal' style='margin-right:10px;'>Add Note</button><button id='saveBtn' data-id='" + data[i]._id + "' class='btn btn-outline-primary btn-sm'>Save Article</button></div></div>"
    );
  }
});

// When you click the scrape button
$("#scrapeBtn").click(function() {
  alert('Articles up-to-date!');

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
      $(".modal-body").append("<textarea id='input' rows='4' cols='50'></textarea>");
      $(".modal-footer").append("<button data-id='" + data._id + "' id='saveChanges' type='button' class='btn btn-primary'>Save Changes</button>");


      // If there's a note in the article
      if (data.note) {
        // Place the body of the note in the body textarea
        $(".modal-body").prepend(data.note);
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

  



// // When you click the save save button
// $("#saveNoteBtn").click(function() {

//   // Save the id 
//   var thisId = $(this).attr("data-id");
//   console.log(thisId);

//   $.ajax({
//     method: "GET",
//     url: "/articles/" + thisId
//   })
//     // With that done, add the note information to the page
//     .done(function(data) {
//       console.log(data);

//       $(".modal-title").append("<h5>" + data.title + "</h5>");
//       $(".input").append("<textarea id='bodyinput' name='body'></textarea>");
//       $(".input").append("<button data-id='" + data._id + "' id='savenote' class='btn btn-primary btn-sm' style='margin-top:20px;'data-dismiss='modal'>Save Note</button>");

//       // If there's a note in the article
//       if (data.note) {
//         // Place the body of the note in the body textarea
//         $("#bodyinput").val(data.note.body);
//       }
//     });
// });



// // When you click the Save Note button
// $(document).on("click", "#savenote", function() {
//   // Grab the id associated with the article from the submit button
//   var thisId = $(this).attr("data-id");
//   console.log(thisId);

//   // Run a POST request to change the note, using what's entered in the inputs
//   $.ajax({
//     method: "POST",
//     url: "/articles/" + thisId,
//     data: {
//       // Value taken from note textarea
//       body: $("#bodyinput").val()
//     }
//   })
  
//     .done(function(data) {
//       // Log the response
//       console.log(data);
//       // Empty the notes section
//       // $("#bodyinput").empty();
//     });

//   // Remove the values entered in the input and textarea for note entry
//   $("#bodyinput").val("");
// });



// // When you click the Save Article button
// $(document).on("click", "#btn-save", function() {
//   $(this).addClass("disabled");
//   var thisId = $(this).attr("data-id");
//   console.log(thisId);

//   $.ajax({
//     method: "PUT",
//     url: "/saved/" + thisId,
   
//   })
  
//   .done(function(data) {
//       console.log(data);
//   });
// });



  // // Whenever someone clicks a p tag
  // $(document).on("click", "p", function() {
  //   // Empty the notes from the note section
  //   $("#notes").empty();
  //   // Save the id from the p tag
  //   var thisId = $(this).attr("data-id");
  
  //   // Now make an ajax call for the Article
  //   $.ajax({
  //     method: "GET",
  //     url: "/articles/" + thisId
  //   })
  //     // With that done, add the note information to the page
  //     .then(function(data) {
  //       console.log(data);
  //       // The title of the article
  //       $("#notes").append("<h2>" + data.title + "</h2>");
  //       // An input to enter a new title
  //       $("#notes").append("<input id='titleinput' name='title' >");
  //       // A textarea to add a new note body
  //       $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
  //       // A button to submit a new note, with the id of the article saved to it
  //       $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
  //       // If there's a note in the article
  //       if (data.note) {
  //         // Place the title of the note in the title input
  //         $("#titleinput").val(data.note.title);
  //         // Place the body of the note in the body textarea
  //         $("#bodyinput").val(data.note.body);
  //       }
  //     });
  // });
  
  // // When you click the savenote button
  // $(document).on("click", "#savenote", function() {
  //   // Grab the id associated with the article from the submit button
  //   var thisId = $(this).attr("data-id");
  
  //   // Run a POST request to change the note, using what's entered in the inputs
  //   $.ajax({
  //     method: "POST",
  //     url: "/articles/" + thisId,
  //     data: {
  //       // Value taken from title input
  //       title: $("#titleinput").val(),
  //       // Value taken from note textarea
  //       body: $("#bodyinput").val()
  //     }
  //   })
  //     // With that done
  //     .then(function(data) {
  //       // Log the response
  //       console.log(data);
  //       // Empty the notes section
  //       $("#notes").empty();
  //     });
  
  //   // Also, remove the values entered in the input and textarea for note entry
  //   $("#titleinput").val("");
  //   $("#bodyinput").val("");
  // });
  