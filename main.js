// Alternative:
// const secret = authenticator.generateSecret();
// Note: .generateSecret() is only available for authenticator and not totp/hotp
var totp = new jsOTP.totp();
var secrets =JSON.parse(localStorage.getItem("secrets"));
if (secrets === null) {secrets={}}
var len = Object.keys(secrets).length;
var errorout = null;
function displaysecrets() {
	if (Object.keys(secrets).length === 0){
		codedisplays.textContent="No accounts set up yet, add some in settings!";
	} else {
		len = Object.keys(secrets).length;
		codedisplays.textContent="";
		for (var i = 0; i < len; i++) {
			service=Object.keys(secrets)[i];
			console.log(service);
			codedisplays.innerHTML+=("<p id='service"+String(i)+"'>"+service+":</p>");
			codedisplays.innerHTML+=("<b id='secret"+String(i)+"'>"+secrets[service]+"</b>");
		}
	}
}
displaysecrets();

var endtime=60;
function generateAllCodes() {
	for (var i = 0; i < len; i++) {
		service=Object.keys(secrets)[i];
		try{
			timeCode = totp.getOtp(secrets[service].secret);
			document.getElementById("secret"+i).textContent = timeCode;
		} catch (errorout) {
			document.getElementById("secret"+i).textContent = "Error, is the secret correct?";
		}
	}
}
generateAllCodes();
function loop() {
	var timeleft=document.getElementById("timer");
	len = Object.keys(secrets).length;
	
	var seconds = new Date().getSeconds();
	if (endtime === 60 && seconds < 30 && seconds > 0) {
		endtime = 30;
		generateAllCodes();
	} else if (endtime === 30 && seconds < 60 && seconds > 30) {
		endtime = 60;
		generateAllCodes();
	} 
	timeleft.textContent="Time left: "+(endtime-seconds)
	setTimeout(loop, 1000);
}
loop();

window.addEventListener("load", () => {

document.addEventListener("keydown", evt => {
    console.log("Pressed:", evt.key);

    if (evt.key === "SoftLeft") {
		window.location.href = "editor.html";
    }
});

});
	
	
