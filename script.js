// this grabs the current day from luxon
let currentDay = $("#currentDay").text(luxon.DateTime.local().toFormat("ff"));

// this grabs the current hour from luxuon
let currentTime = parseInt(luxon.DateTime.local().toFormat("H"));

// this for loop creates the time blocks
for (let i = 9; i < 18; i++) {
  // this appends the timeblock to the container by calling the "renderTimeBLock(i)" function
  //   and passing i from the for loop to it
  $(".container").append(renderTimeBlock(i));
}

// this is the meat of the js
// this function will dynamically create every part of our time block
// including classes and ids needed for our event listeners
function renderTimeBlock(hour) {
  const $timeSlot = $("<div>")
    .attr("id", "hour-" + hour)
    .attr("class", "row hour time-block");
  const $timeLabel = $("<div>").attr("class", "col-md-1");

  // these if statements are here are to make sure the correct "AM/PM" is appended to the hour
  // that we passed into our "renderTimeBlock(hour)" function
  // this is also where we're creating our "$timeLabel" variable
  if (hour > 12) {
    $timeLabel.text(hour - 12 + "PM");
  } else if (hour === 12) {
    $timeLabel.text(hour + "PM");
  } else {
    $timeLabel.text(hour + "AM");
  }

  // this creates our "$textArea" variable
  const $textArea = $("<textarea>").attr("class", "col-md-10 description");

  // but this is the the most important part of creating these text areas
  // this takes our hour that we passed into our "renderTimeBlock(hour)" function
  // and checks it against the "currentTime" that we pulled in as a global variable
  // at the top of our js script.
  // that way we can apply the correct class that our css will style based on if it's
  // the future hour, current hour or past our - in that order.
  if (hour > currentTime) {
    $textArea.addClass("future");
  } else if (hour == currentTime) {
    $textArea.addClass("present");
  } else if (hour < currentTime) {
    $textArea.addClass("past");
  }

  // this creates our save button for each time slot
  const $btn = $("<button>")
    .attr("class", "btn saveBtn col-md-1")
    .append($("<i>").attr("class", "fas fa-save"))
    .data("block-hour", hour);

  // Now that we've created all the variables we need to make each time slot
  // "$timeLabel", "$textArea", "$btn" we can append them to our "$timeSlot" variable
  $timeSlot.append($timeLabel, $textArea, $btn);

  // this returns our "$timeSlot" variable that our "renderTimeBlock()" function at the
  // top of the script is creating
  return $timeSlot;
}

// this for loop will look into our local storage so we can render to the screen
// whatever we had saved there before. This is above the event listener for the save
// button because we want to check and see if we already have something saved in there
// before we try and save something new.
for (let i = 9; i < 18; i++) {
  var getTimeBlock = localStorage.getItem("timeblock-" + i.toString());
  $(`#hour-${i} textarea`).text(getTimeBlock);
}

// this is the event listener for when we click on an element with the class of "time-block" or "btn"
$(".time-block .btn").on("click", function (e) {
    
  // this creates the variable "blockHour" by using this to look at "data" of whatever button we click on
  // and takes it value that we have assigned it with hour
  var blockHour = $(this).data("block-hour");

  //this creates the variable of "blockText" by passing a string literal of "`#hour-${blockHour} textarea`"
  //and getting its value.
  var blockText = $(`#hour-${blockHour} textarea`).val();

  // this sets our local storage by passing another string literal of "`timeblock-${blockHour}`" as the key
  // and the variable "blockText" as the value.
  localStorage.setItem(`timeblock-${blockHour}`, blockText);
});
