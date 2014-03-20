// Eitan 17.03.2014 
sap.designstudio.sdk.Component.subclass("com.iprosis.gaugepack.gilatGaugeC", function() {

	var that = this;
	var minValue = null, maxValue = null, jValue = null, gValue = 0, noDec = null, dZone = null, dZoneColor = null,gaugeType = 1;
	var segmentStart = null, segmentEnd = null, noTicks = null, dValue = null;
	this._alive = false;
	this._sl = null;
	var divName1, divName2;
	var jgauge1, jgauge2;
		
	function hex2RGB(hexColor){
		var rGB = parseInt((cutHex(hexColor)).substring(0,2),16);
		var RgB = parseInt((cutHex(hexColor)).substring(2,4),16);
		var RGb = parseInt((cutHex(hexColor)).substring(4,6),16);
		
		var finalRGB = "rgba(" + rGB + "," + RgB + "," + RGb + ",1)";
		return finalRGB;
	}
	
	function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h;}
		
	this.init = function() {					  		
		if (this._alive) {   
			 return;  
		} else {
			
			// Amit 19.03.2014 -{
			
				divName1 = "G1" + this.$().attr('id');
				jgauge1 = new jGauge();
				jgauge1.id 			= divName1;
				jgauge1.imagePath = 'img/Gauge2.png';
				jgauge1.needle.imagePath = 'img/GaugeNeedle2.png';
				jgauge1.width 		= 120;
				jgauge1.height 		= 120;
				jgauge1.segmentStart = -140;
				jgauge1.segmentEnd 	= -40;
				jgauge1.imagePath = 'img/gauge1.png';
				jgauge1.needle.imagePath = 'img/gauge1Needle.png';
				jgauge1.ticks.color = 'rgba(0, 0, 0, 1)';
				jgauge1.ticks.labelRadius = 75;
				jgauge1.ticks.thickness = 1;
				jgauge1.ticks.labelPrecision = 1;
				jgauge1.ticks.radius = 60;
				jgauge1.needle.xOffset = 0;
				jgauge1.needle.yOffset = 0;
				jgauge1.label.yOffset = 0; 
				jgauge1.range.radius = 58;
				jgauge1.range.thickness = 2;
				jgauge1.range.end = -30;
				
				divName2 = "G2" + this.$().attr('id');
				jgauge2 = new jGauge();
				jgauge2.id 			= divName2;
				jgauge2.width 		= 140;
				jgauge2.height 		= 120;
				jgauge2.segmentStart = -180;
				jgauge2.segmentEnd 	= 0;
				jgauge2.imagePath = 'img/Gauge2.png';
				jgauge2.needle.imagePath = 'img/GaugeNeedle2.png';
				jgauge2.ticks.color = 'rgba(182, 182, 195, 1)';
				jgauge2.ticks.labelRadius = 57;
				jgauge2.ticks.thickness =4;
				jgauge2.ticks.labelPrecision = 1;
				jgauge2.ticks.radius = 47;
				jgauge2.needle.xOffset = 0;
				jgauge2.needle.yOffset = 0;
				jgauge2.range.radius = 46;
				jgauge2.range.thickness = 4;
				jgauge2.range.end = 0;
				// Amit 19.03.2014 {-
			this.$().click(function() {
				that.fireEvent("onclick");
			});
			
			this._sl = jgauge1;
			this._alive = true;	
		}		
	};
	
	this.afterUpdate = function() {
		// Amit 19.03.2014 -{
		switch (gaugeType){
			case 1:
				this.$().html('<div id="' + divName1 + '" class="jgauge"></div>' );
				jgauge1.init();
				this._sl = jgauge1;
				break;
			
			case 2:
				this.$().html('<div id="' + divName2 + '" class="jgauge"></div>' );
				jgauge2.init();
				this._sl = jgauge2;
				break;
			}
		// Amit 19.03.2014 }-
		dValue = parseFloat(dZone.data).toFixed(noDec);
		var sDangerZone = this._sl.segmentStart + (dValue / (maxValue - minValue)) * Math.abs(this._sl.segmentStart - this._sl.segmentEnd);
		var RGBColor = hex2RGB(dZoneColor);
		this._sl.ticks.count	= noTicks;
		this._sl.ticks.start	= minValue;
		this._sl.ticks.end 		= maxValue;
		this._sl.updateTicks();
		this._sl.range.start	= sDangerZone;
		this._sl.range.color	= RGBColor;
		this._sl.updateRange();
		
		
		gValue = parseFloat(jValue.data).toFixed(noDec);
		
		
		setTimeout(function() {
			that._sl.setValue(gValue);
			that.firePropertiesChanged(["cellValue"]);
		}, 1000);
	};
	// Amit 19.03.2014 -{
	this.GaugeType = function(value) {
		if(value===undefined) {
			return gaugeType;
		} else {
			gaugeType = value;
			return this;
		};
	};
	// Amit 19.03.2014 }-
	this.MinValue = function(value) {
		if(value===undefined) {
			return minValue;
		} else {
			minValue = value;
			return this;
		};
	};
	
	this.MaxValue = function(value) {
		if(value===undefined) {
			return maxValue;
		} else {
			maxValue = value;
			return this;
		};
	};
	
	this.JValue = function(value) {
		if(value===undefined) {
			return jValue;
		} else {
			jValue = value;
			return this;
		};
	};
	
	this.NoDec = function(value) {
		if(value===undefined) {
			return noDec;
		} else {
			noDec = value;
			return this;
		};
	};
	
	this.DZone = function(value) {
		if(value===undefined) {
			return dZone;
		} else {
			dZone = value;
			return this;
		};
	};
	
	this.DZoneColor = function(value) {
		if(value===undefined) {
			return dZoneColor;
		} else {
			dZoneColor = value;
			return this;
		};
	};
	
	this.NoTicks = function(value) {
		if(value===undefined) {
			return noTicks;
		} else {
			noTicks = value;
			return this;
		};
	};
	
	this.cellValue = function(value) {
		if(value===undefined) {
			return gValue;
		} else {
			gValue = value;
			return this;
		};
	};

});