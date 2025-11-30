
if (localStorage.getItem("secrets")===null) {
	var secrets = {};
} else {
	var secrets =JSON.parse(localStorage.getItem("secrets"));
}
var codedisplays = document.getElementById("codedisplays");
var len = null
function displaysecrets() {
	if (Object.keys(secrets).length === 0){
		codedisplays.textContent="No codes set up yet, add some!";
		codedisplays.innerHTML+=("<p><button id='service0' onclick='newentry();'>New</button></p>"); //the "New" button is called "service#" # being the amount of services, so it gets selected when the user gets to the bottom
	} else {
		len = Object.keys(secrets).length;
		codedisplays.textContent="";
		for (var i = 0; i < len; i++) {
			service=Object.keys(secrets)[i];
			codedisplays.innerHTML+=("<p><input type=text id='service"+String(i)+"'value='"+service+"'><button id='delete"+String(i)+"' onclick='delentry(\""+String(i)+"\");'>Delete</button></p>");
			codedisplays.innerHTML+=("<p>Secret:<input type=text onclick='newentry();' id='secret"+String(i)+"'value='"+secrets[service]["secret"]+"'></p>");
		}
		codedisplays.innerHTML+=("<p><button id='service"+String(len)+"' onclick='newentry();'>New</button></p>"); //the "New" button is called "service#" # being the amount of services, so it gets selected when the user gets to the bottom
	}
}
displaysecrets();
document.getElementById("service0").focus();
var selectedType = "service";
var selectedServiceId=0;
function save() {
	if (confirm("Save changes and exit?")===true) {
		len = Object.keys(secrets).length;
		secrets = {};
		for (var i = 0; i<len; i++) {
			secrets[document.getElementById("service"+i).value] = {"secret":(document.getElementById("secret"+i).value)} 
		}
		localStorage.setItem("secrets", JSON.stringify(secrets));
		window.location.href = "index.html";
	}
}
function exitwithoutsaving() {
	if (confirm("Exit without saving?")===true) {
		window.location.href = "index.html";
	}
}
function newentry() {
	len = Object.keys(secrets).length;
	secrets = {};
	for (var i = 0; i<len; i++) {
		secrets[document.getElementById("service"+i).value] = {"secret":(document.getElementById("secret"+i).value)} 
		console.log(document.getElementById("service"+i).value)
	}
	selectedType = "service";
	selectedServiceId = len;
	var newentryid=len+1;
	secrets["Entry "+newentryid] = {"secret":""};
	displaysecrets();
	document.getElementById(selectedType+selectedServiceId).focus();
}
function delentry(entry) {
	if (confirm("Delete entry "+(entry+1)+"?") === true) {
		delete secrets[Object.keys(secrets)[entry]]
	}
	displaysecrets();
}
function moveup() {
	var el=null;
	deleteselected=false;
	if (selectedType==="secret") {
		el=document.getElementById("delete"+selectedServiceId)
		if (el) {
			el.focus();
			selectedType="delete";
		}
	}else if (selectedType==="delete") {
		el=document.getElementById("service"+selectedServiceId)
		if (el) {
			el.focus();
			selectedType="service";
		}
	} else {
		if (selectedServiceId === 0) {
			selectedType = "savebtn";
			document.getElementById("savebtn").focus();
		} else{
			el = document.getElementById("secret"+(selectedServiceId-1))
			if (el) {
				el.focus();
				selectedServiceId--;
				selectedType="secret";
			}
		}
	}
}

function movedown() {
	var el=null;
	deleteselected=false;
	if (selectedType === "savebtn") {
		selectedType = "service";
		selectedServiceId = 0;
		document.getElementById("service"+selectedServiceId).focus();
	} else {
		if (selectedType==="service") {
			el=document.getElementById("delete"+selectedServiceId)
			if (el) {
				el.focus();
				selectedType="delete";
			}
		} else if (selectedType==="delete") {
			el = document.getElementById("secret"+selectedServiceId)
			if (el) {
				el.focus();
				selectedType="secret";
			}
		}
		else {
			el = document.getElementById("service"+(selectedServiceId+1))
			if (el) {
				el.focus();
				selectedServiceId++;
				selectedType="service";
			}
		}
	}
}

window.addEventListener("load", () => {

document.addEventListener("keydown", evt => {
    console.log("Pressed:", evt.key);

    if (evt.key === "ArrowUp") {
        moveup();
    }
	if (evt.key === "ArrowDown") {
        movedown();
    }
	if (evt.key === "Backspace") {
        exitwithoutsaving();
    }
	
});

});