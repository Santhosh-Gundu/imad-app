console.log('Loaded!');
//alert("welcome to profile page");
var button = document.getElementById("counter");

button.onclick = function(){
	
	//Create  a request to the counter end point.
		var request = new XMLHttpRequest();
		
	
		request.onreadystatechange = function(){
				
				if(request.readyState == XMLHttpRequest.DONE){
					if(request.status == 200){
						//Capture the response and store it in a variable
						var counter = request.responseText;
						//Render the variable in the correct span
						var span =  document.getElementById("clicked");
						span.innerHTML = counter.toString();
					}
				}
		};
	
	
	
	
	
	//make the request
	//request.open('GET' , 'http://localhost/counter',true);
	request.open('GET', 'http://santugundu.imad.hasura-app.io/counter', true);
	request.send(null);
};


