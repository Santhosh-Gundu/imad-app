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

//submit name


var submit = document.getElementById("submit");
submit.onclick = function(){
	
	
	//Create  a request to the counter end point.
		var request = new XMLHttpRequest();
		
	
		request.onreadystatechange = function(){
				
				if(request.readyState == XMLHttpRequest.DONE){
					if(request.status == 200){
						//Capture the response and store it in a variable
						
						var names	 = request.responseText;
						names = JSON.parse(names);
						//Render the variable in the correct span
							var i = 0;
							var list = "";
							for( ; i < names.length ; i++){
								list += "<li>"+names[i]+"</li>";
								}
								var unOrderedList = document.getElementById("list");
								unOrderedList.innerHTML = list;
					}
				}
		};
				//Take user input value (texbox value)
				var nameInput = document.getElementById("name");
				var name = nameInput.value;
	//make the request
		//request.open('GET' , 'http://localhost/submit-name?name='+name,true);
		request.open('GET', 'http://santugundu.imad.hasura-app.io/submit-name?name='+name, true);
		request.send(null);
	
	 
	
	
};

