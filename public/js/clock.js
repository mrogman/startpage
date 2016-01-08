Gateway.clock = {

	monthNames: [ "January", "February", "March", "April", "May", "June", "July",
	 							"August", "September", "October", "November", "December" ],

	dayNames: [	"Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday" ],

	getElements: function() {
		this.$container = $('div.clock');
	},

	init: function() {
		var newDate = new Date();
		newDate.setDate(newDate.getDate());

		var dateString = this.dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' +
		 this.monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear()

		$('#Date').html(dateString);

		this.refresh()
		this.start()
	},

	start: function() {
		this.refreshInterval = setInterval(this.refresh, 1000);
	},

	stop: function() {
		clearInterval(this.refreshInterval);
	},

	refresh: function() {
		var seconds = new Date().getSeconds();
		$("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);

		var minutes = new Date().getMinutes();
		$("#min").html(( minutes < 10 ? "0" : "" ) + minutes);

		var hours = new Date().getHours();
		$("#hours").html(( hours < 10 ? "0" : "" ) + hours);
	},

	attach: function() {
		Gateway.$top.prepend(this.detachable);
		this.detachable.hide().delay(200).fadeIn('slow');
		return this
	},

	detach: function() {
		this.detachable = this.$container.detach();
	}

}
