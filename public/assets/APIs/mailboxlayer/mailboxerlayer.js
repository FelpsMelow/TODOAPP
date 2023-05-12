function validar_email() {

  var access_key = 'lhOfwVC32BcsyI5slHkgTX1coEpB2DqA';
  var email_address = document.querySelector(".email").value

  var myHeaders = new Headers();
  myHeaders.append("apikey", access_key);
  
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };
  
  fetch("https://api.apilayer.com/email_verification/check?email=" + email_address, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}