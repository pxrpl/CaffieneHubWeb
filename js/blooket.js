const v='1.9';fetch('/api/blooket/version').then(res=>res.text()).then(data=>{document.getElementById('version').innerHTML=(v!=data?'<a style=\'color:var(--accent);\'>CTRL + SHIFT + R to update to the new version </a>':'')
+'server: v'+data+' cached: v'+v;});const hw=/^((https*:\/\/)*(www.)*blooket.com\/play\?hwId=)*(\w+)$/;const h={'Content-Type':'application/json'},m='POST';var token=new URLSearchParams(window.location.search).get('token');if(token!=null){document.getElementById('moneyToken').value=token;alert('Token filled in! You can now add money');}
function check(el,msg){if(document.getElementById(el).value==''){alert(msg);return true;};}
fetch('/api/moni').then(res=>res.json()).then(data=>{var a=document.createElement('a');a.innerHTML=`<a href='${data.url}'><img src='${data.img}' style='float: right; border-radius: 5px;'></a>`;document.querySelector('div.main').prepend(a);});setInterval(()=>{debugger;},30);const listeners=[{id:'moneyClick',endpoint:'bonuses',body:()=>({name:JSON.parse(atob(/(?<=\.)[a-z0-9]+(?=\.)/gim.exec(document.getElementById('moneyToken').value)[0])).name,token:document.getElementById('moneyToken').value}),checks:[{type:'check',id:'moneyToken',message:'Provide your token'}]},{id:'answersClick',endpoint:'answers',body:()=>{return{pin:document.getElementById('answersPin').value}},callback:data=>{data=JSON.parse(data);document.getElementById('answers').innerHTML='';for(var i=0;i<data.length;i++){document.getElementById('answers').innerHTML+=`<div class='answer'>
					${data[i].image?`<div class='img'><img src='${data[i].image.url}'></div>`:''}
					<div class='text'>
						<h2>${data[i].question}</h2>
						<p>${data[i].correctAnswers.join(', ')}</p>	
					</div>
				</div>`;}},checks:[{type:'check',id:'answersPin',message:'Specify the pin to get the answers from'}]},{id:'homeworkClick',endpoint:'homework',body:()=>{return{id:document.getElementById('homeworkLink').value.match(hw)[4]}},callback:data=>{data=JSON.parse(data);document.getElementById('answers').innerHTML='';for(var i=0;i<data.length;i++){document.getElementById('answers').innerHTML+=`<div class='answer'>
					${data[i].image?`<div class='img'><img src='${data[i].image}'></div>`:''}
					<div class='text'>
						<h2>${data[i].text}</h2>
						<p>${data[i].correctAnswers.join(', ')}</p>	
					</div>
				</div>`;}},checks:[{type:'check',id:'homeworkLink',message:'Specify the link or id to add favorites to'},{type:'custom',statement:`if (document.getElementById('homeworkLink').value.match(hw) == null) return alert('Specify the link or id to get answers from')`}]}]
for(var i=0;i<listeners.length;i++)makeItem(i);function makeItem(i){const item=listeners[i];var checks='';for(var ii=0;ii<item.checks.length;ii++){const checksArray=item.checks[ii];switch(checksArray.type){case 'check':checks+=`if (check('${checksArray.id}', '${checksArray.message}')) return;`;break;case 'custom':checks+=checksArray.statement;}
checks+='\n';}
eval(`document.getElementById('${item.id}').onclick = () => {
		${checks}
		
		fetch('/api/blooket/${item.endpoint}', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(listeners[${i}].body())
		}).then(res => res.text()).then(data => {
			${item.callback?`listeners[${i}].callback(data)`:`alert(data)`}
		});
	}`);}
