function isOdd(num) { return num % 2;}

function rand(floor, ceil){
	return Math.floor( (Math.random() * (ceil-floor)) +floor);
};

function overlappingBox(location, startpoint, endpoint){
	if (location[0] > startpoint[0] &&
			location[1] > startpoint[1] &&
			location[0] < endpoint[0] &&
			location[1] < endpoint[1]){
				return true;
			}else{
				return false;
			}
};
