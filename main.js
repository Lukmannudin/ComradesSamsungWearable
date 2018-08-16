(function() {
	var val_filed1 = 'Waw';
	var val_filed2 = 'Wow';
	localStorage.setItem("key_filed1", val_filed1);
	localStorage.setItem("key_filed2", val_filed2);
	
	var msg = "field 1 : " + localStorage.getItem("key_filed1") + ",  field 2 : " + localStorage.getItem("key_filed2");
	console.log(msg);
	document.getElementById('secondContent').innerHTML = msg;
});

	