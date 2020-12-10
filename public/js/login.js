let signinform=document.querySelector('.sign-in-form');
let registerform=document.querySelector('.register-form');
signinform.addEventListener('submit',function(e)
						   {
	e.preventDefault();
	let email=document.getElementById('sign-in-email').value;
	let password=document.getElementById('sign-in-password').value;
	fetch('https://parking-lot.run-ap-south1.goorm.io/users/login',{
		method: 'POST',
		headers:{
			'Content-Type' :'application/json'
		},
		body:JSON.stringify({email,password})
	}).then((resp)=>{
		if(resp.status ===400)
			{
				return new Error();
			}
	return resp.json();
	}).then((data)=>{
		window.location.href=data.redirectURL;
	}).catch(()=>alert('wrong email or password'));
})
registerform.addEventListener('submit',function(e)
						   {
	e.preventDefault();
	let email=document.getElementById('register-email').value;
	let password=document.getElementById('register-password').value;
	let repassword=document.getElementById('register-re-enter-password').value;
	let name=document.getElementById('register-name').value;
	let phoneno=document.getElementById('register-phoneno').value;
	if(password!=repassword)
		{
			return;
		}
	fetch('https://parking-lot.run-ap-south1.goorm.io/users/register',{
		method: 'POST',
		headers:{
			'Content-Type' :'application/json'
		},
		body:JSON.stringify({email,password,name,phoneno})
	}).then((resp)=>resp.text()).then((data)=>alert(data));
})