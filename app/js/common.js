$( function() {
    $("#datepicker").datepicker();
  });


$('#timepicker').timepicker({
    timeFormat: 'h:mm p',
    interval: 60,
    minTime: '0',
    maxTime: '12:00pm',
    defaultTime: '11',
    startTime: '8:00',
    dynamic: false,
    dropdown: true,
    scrollbar: true
});

$('.menuIcon').click(function() {
  $( ".navbarList" ).toggle("slow");
});
