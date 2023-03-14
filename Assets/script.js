// variable to store and loop through scheduler
let myDay = [
    {
      id: "0",
      hour: "09",
      time: "09",
      meridiem: "am",
      reminder: "",
    },
    {
      id: "1",
      hour: "10",
      time: "10",
      meridiem: "am",
      reminder: "",
    },
    {
      id: "2",
      hour: "11",
      time: "11",
      meridiem: "am",
      reminder: "",
    },
    {
      id: "3",
      hour: "12",
      time: "12",
      meridiem: "pm",
      reminder: "",
    },
    {
      id: "4",
      hour: "01",
      time: "13",
      meridiem: "pm",
      reminder: "",
    },
    {
      id: "5",
      hour: "02",
      time: "14",
      meridiem: "pm",
      reminder: "",
    },
    {
      id: "6",
      hour: "03",
      time: "15",
      meridiem: "pm",
      reminder: "",
    },
    {
      id: "7",
      hour: "04",
      time: "16",
      meridiem: "pm",
      reminder: "",
    },
    {
      id: "8",
      hour: "05",
      time: "17",
      meridiem: "pm",
      reminder: "",
    },
  ];
  
  // gets data for the header date
  function getHeaderDate() {
    const currentHeaderDate = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currentHeaderDate);
  }
  
  // saves data to localStorage
  function saveReminders() {
    localStorage.setItem("myDay", JSON.stringify(myDay));
  }
  
  // sets any data in localStorage to the view
  function displayReminders() {
    myDay.forEach((_thisHour) => {
      $(`#${_thisHour.id}`).val(_thisHour.reminder);
    });
  }
  
  // sets any existing localStorage data to the view if it exists
  function init() {
    const storedDay = JSON.parse(localStorage.getItem("myDay"));
  
    if (storedDay) {
      myDay = storedDay;
    }
  
    saveReminders();
    displayReminders();
  }
  
  // loads header date
  getHeaderDate();
  
  // creates the visuals for the scheduler body
  myDay.forEach((thisHour) => {
    // creates timeblocks row
    const hourRow = $("<form>").attr({
      class: "row",
    });
    $(".container").append(hourRow);
  
    // creates time field
    const hourField = $("<div>")
      .text(`${thisHour.hour}${thisHour.meridiem}`)
      .attr({
        class: "col-md-2 hour",
      });
  
    // creates schdeduler data
    const hourPlan = $("<div>")
      .attr({
        class: "col-md-9 description p-0",
      });
    const planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
      planData.attr({
        class: "past",
      });
    } else if (thisHour.time === moment().format("HH")) {
      planData.attr({
        class: "present",
      });
    } else if (thisHour.time > moment().format("HH")) {
      planData.attr({
        class: "future",
      });
    }

    // creates save button
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})


// saves data to be used in localStorage
$(".saveBtn").on("click", function (event) {
    event.preventDefault();
    var savePlan = $(this).siblings(".description").children(".future").attr("id");
    myDay[savePlan].reminder = $(this).siblings(".description").find(".future").val();
    console.log(savePlan);
    saveReminders();
    displayReminders();
  });
  
  // loads any existing localstorage data after components created
  init();