$(document).ready(function() {

  $('input.search').focus(); //do first!

  Header.init();
  Gateway.init();
  Gateway.clock.init();
  CV_TriggerZone.init();

});
