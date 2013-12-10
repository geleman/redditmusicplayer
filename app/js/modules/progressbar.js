

function ProgressBar(link) {
	var self=this;
	var current = 10;
	var interval = null;

	self.element = $(link);
	self.bar = $(link + " .bar");

	var shift = function() {
		current += 5;
		self.bar.css({"width": current  + "%"});
	}
	var reset = function() {
		current = 0;
		self.bar.css({"width": current  + "%"});
		if (interval) {
			window.clearInterval(interval)
		}
	}
	var autoShift = function() {
		interval = window.setInterval(function() {
			if (current >= 100) {
				reset();
			} else {
				shift();
			}
		}, 1000);
	}
	var disable = function() {
		self.element.removeClass("activated");
		if (interval) {
			interval = window.clearInterval(interval);
			interval = window.clearInterval(interval);
		}
	}

	self.start = function() {
		self.element.addClass("activated");
		reset();
	}
	self.end = function() {
		current=100;
		self.bar.css({"width": "100%"});
		window.setTimeout(disable, 200)
	}

	self.set = function(percent) {
		current=percent;
		self.bar.css({"width": percent+"%"});
	}

	self.seek = function(percent) {
		current=percent;
		self.bar.stop(true, true);
		self.bar.css({"width": percent+"%"});
	}

	// Enable MVP pattern (this is the secret for everything)
	$.observable(self);

	self.on("start", function() {
	  self.start();
	  autoShift();
	})
	self.on("end", function() {
	  	self.end();
	})
}


module.exports = ProgressBar;