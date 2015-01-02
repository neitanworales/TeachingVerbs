 var createStatement = "CREATE TABLE IF NOT EXISTS public_verbs( idVerb INTEGER, simpleform TEXT, pastform TEXT, pastpartform TEXT, translation TEXT, imagen TEXT, audio TEXT, marked INTEGER DEFAULT 0, PRIMARY KEY(idVerb));";
 
var selectAllStatement = "SELECT * FROM public_verbs";
//selectAllSomeOne = "SELECT * FROM public_verbs WHERE simpleform LIKE '?%' or translation LIKE '?%' or simpleform=? or translation=?";
//var insertStatement = "INSERT INTO public_verbs(simpleform, pastform, pastpartform, translation, imagen, audio) VALUES(?, ?, ?, ?, ?, ?)";
var insertStatement = "INSERT INTO public_verbs(simpleform, pastform, pastpartform, translation, imagen) VALUES(?, ?, ?, ?, ?)";
 //var updateStatement = "UPDATE Contacts SET firstName = ?, lastName = ?, phone = ? WHERE id = ?";
 //var deleteStatement = "DELETE FROM Contacts WHERE id=?";
var dropStatement = "DROP TABLE public_verbs";
 
if (!window.openDatabase)
    alert("Error: can't open local database");
if (!localStorage)
    alert("Error: localstorage not usable");
 
 var db = openDatabase("teaching", "1.0", "Teach", 20000);
 if(db!=null){
	 dropTable();
	 createTable();
 }

 var dataset;

function onError(tx, error) {
	alert(error.message);
}
 
function audioFilename(txt) {
	name = '';
	name = txt;

	switch(name.length)
	{
		case 1:				
			name='000'+name+'.mp3';	
			break;
		case 2:	
			name='00'+name+'.mp3';	
			break;
		case 3:	
			name='0'+name+'.mp3';	
			break;
		case 4:	
			name=name+'.mp3';	
			break;
	}
	return name;
}
      
function showRecords() {	
	db.transaction(function(tx) 
	{			
		tx.executeSql(selectAllStatement, [], function(tx, result) 
		{
			var xy = '';
			dataset = result.rows;
			//xy = '<table border=1><thead><tr><th>Simple Form</th><th>Past Form</th><th>Past Participie</th><th>ESP</th><th>:)</th></tr></thead><tbody>';
			xy = '<table><thead><tr><th><font>Simple Form</font></th><th>Past Form</th><th>Past Participle</th><th>Español</th><th>Audio</th></tr></thead><tbody>';
			for (var i = 0, item = null; i < dataset.length; i++) {
				item = dataset.item(i);
				xy += 
/*				'<tr><td>' + item['simpleform'] + '</td><td>' + item['pastform']+ '</td><td>' + item['pastpartform'] +'</td><td>' + item['translation'] +'</td><td><audio src="audios/'+audioFilename(+item['idVerb'])+'" controls></audio></td></tr>'; */
'<tr><td>' + item['simpleform'] + '</td><td>' + item['pastform']+ '</td><td>' + item['pastpartform'] +'</td><td>' + item['translation'] +'</td><td> <img src="img_app/play.jpg" height="30" width="30" onClick="playSound('+item['idVerb']+')"> </td></tr>'; 
			}
			xy+= '</tbody></table>';
			myGrid.innerHTML = xy;
		});
	
	});

}

function showSomeRecord(texto) {
	var selectAllSomeOne = "SELECT * FROM public_verbs WHERE simpleform like '%"+texto+"%' or translation like '%"+texto+"%'";	
	db.transaction(function(tx) 
	{			
		tx.executeSql(selectAllSomeOne, [], function(tx, result) 
		 {
			var xy='';
			dataset = result.rows; 
			for (var i = 0, item = null; i < dataset.length; i++) 
			{
				item = dataset.item(i);
				xy += '<table width="376" border="0">'
					+'<tr>'
					+'<th width="149" height="21">Simple Form</th>'
					+'<td width="217" rowspan="8"><img src="img/'+ item['imagen']+'" width="212" height="225" /></td>'
				  +'</tr>'
				  +'<tr>'
				+'	<td height="37">'+item['simpleform']+'</td>'
				  +'</tr>'
				  +'<tr>'
				+'	<th>Past Form</th>'
				  +'</tr>'
				  +'<tr>'
					+'<td height="39">'+item['pastform']+'</td>'
				  +'</tr>'
				  +'<tr>'
					+'<th height="23">Past Participle</th>'
				  +'</tr>'
				  +'<tr>'
					+'<td height="47">'+item['pastpartform']+'</td>'
				  +'</tr>'
				  +'<tr>'
					+'<th height="21">Español</th>'
				  +'</tr>'
				  +'<tr>'
					+'<td>'+item['translation'] + '</td>'
				  +'</tr>'
				+'</table>'
				+'<img src="img_app/play.jpg" height="60" width="60" onClick="playSound('+item['idVerb']+')">'
				+'<center><audio id="player'+item['idVerb']+'" src="audios/'+audioFilename(item['idVerb'])+'" preload="auto"></audio></center><br>';
			}
			resultado.innerHTML=xy;
		});	
	});
}

function createTable() { 
	db.transaction(function(tx) {
  		tx.executeSql(createStatement, [], showRecords, onError);
	});
	//alert('Tabla creada');
	insertarVerbos();
	//alert('Registros insertados');		
}

function insertRecord(simpleform, pastform, pastpartform, translation, imagen) {
	db.transaction(function(tx) {		
		tx.executeSql(insertStatement, [simpleform, pastform, pastpartform, translation, imagen]);
	});
}
     
//function insertRecord(simpleform, pastform, pastpartform, translation, imagen, audio) {
//	db.transaction(function(tx) {		
//		tx.executeSql(insertStatement, [simpleform, pastform, pastpartform, translation, imagen, audio]);
//	});
//}
      
//function loadRecord(i) {
//		var item = dataset.item(i); 
 //       	firstName.value = item['firstName'];
//			lastName.value = item['lastName'];
//			phone.value = item['phone'];
//			id.value = item['id']; 
//      }
 
//      function updateRecord() {
//        db.transaction(function(tx) {
//          tx.executeSql(updateStatement, [firstName.value, lastName.value, phone.value, id.value], loadAndReset, onError);
//        }); 
//      }
/*
      function deleteRecord(id) {
        db.transaction(function(tx) {
          tx.executeSql(deleteStatement, [id], showRecords, onError);
     		});
		resetForm();
      }
       


 function loadAndReset(){
 	resetForm();
 	showRecords();
 }
*/ 
 
function resetForm(){
	firstName.value = '';
	lastName.value = '';
	phone.value = '';
	id.value = ''; 
 }
 
       function dropTable() {
        db.transaction(function(tx) {
          tx.executeSql(dropStatement, []);
        });
		//alert('Tabla borrada');
      }
	  
	  
function insertarVerbos()
{
	insertRecord('Abide','Abode','Abiden','Sufir, soportar,cumplir','1.jpg');
	insertRecord('Arise','Arose','Arisen','Levantarse, surgir','2.jpg');
	insertRecord('Awake','Awoke','Awoken','Despertarse, despertar','3.jpg');
	insertRecord('Bear','Bore','born','Aguantar, soportar, parir','4.jpg');
	insertRecord('Beat','Beat','Beaten','Golpear, derrotar, batir','5.jpg');
	insertRecord('Become','Became','Become','Convertirse en, llegar a ser, volverse, ponerse','6.jpg');
	insertRecord('Begin','Began','Begun','empezar','7.jpg');
	insertRecord('Bend','Bent','Bent','Doblar, torcer, inclinarse','8.jpg');
	insertRecord('Bet','Bet','Bet','Apostar','9.jpg');
	insertRecord('Bid','Bid','Bid','Ofrecer, pujar, licitar','10.jpg');
	insertRecord('Bind','Bound','Bound','Atar, unir, encuadernar','11.jpg');
	insertRecord('Bite','Bit','Bitten','Morder, picar','12.jpg');
	insertRecord('Bleed','Bled','Bled','Sangrar','13.jpg');
	insertRecord('Blow','Blew','Blown','Soplar','14.jpg');
	insertRecord('Break','Broke','Broken','Romper','15.jpg');
	insertRecord('Breed','Bred','Bred','Criar, engendrar','16.jpg');
	insertRecord('Bring','Brought','Brought','Traer','17.jpg');
	insertRecord('Broadcast','Broadcast','Broadcast','Transmitir','18.jpg');
	insertRecord('Build','Built','Built','Construir','19.jpg');
	insertRecord('Burn','Burnt','Burnt','Quemar','20.jpg');
	insertRecord('Burst','Burst','Burst','Explotar, reventar','21.jpg');
	insertRecord('Buy','Bought','Bought','Comprar','22.jpg');
	insertRecord('Cast','Cast','Cast','Lanzar, echar, emitir','23.jpg');
	insertRecord('Catch','Caught','Caught','Atrapar, asir, tomar','24.jpg');
	insertRecord('Choose','Chose','Chosen','Elegir','25.jpg');
	insertRecord('Clap','Clapt','Clapt','aplaudir','26.jpg');
	insertRecord('Cling','Clung','Clung','Agarrarse, adherirse, aferrarse','27.jpg');
	insertRecord('Clothe','Clad','Clad','Vestir, revestir, cubrir','28.jpg');
	insertRecord('Come','Came','Come','Venir','29.jpg');
	insertRecord('Cost','Cost','Cost','Costar','30.jpg');
	insertRecord('Creep','Crept','Crept','Gatear, arrastrarse','31.jpg');
	insertRecord('Cut','Cut','Cut','Cortar','32.jpg');
	insertRecord('Deal','Dealt','Dealt','Tratar con, repartir, dar','33.jpg');
	insertRecord('Dig','Dug','Dug','Cavar','34.jpg');
	insertRecord('Dive','Dove','Dived','Zambullirse, sumergirse, bucear','35.jpg');
	insertRecord('Do','Did','Done','Hacer','36.jpg');
	insertRecord('Draw','Drew','Drawn','Dibujar, extraer, sacar','37.jpg');
	insertRecord('Dream','Dreamt','Dreamt','Soñar','38.jpg');
	insertRecord('Drink','Drank','Drunk','Beber','39.jpg');
	insertRecord('Drive','Drove','Driven','Conducir, ir en coche, llevar en coche','40.jpg');
	insertRecord('Dwell','Dwelt','Dwelt','Habitar, morar','41.jpg');
	insertRecord('Eat','Ate','Eaten','Comer','42.jpg');
	insertRecord('Fall','Fell','Fallen','Caer, caerse','43.jpg');
	insertRecord('Feed','Fed','Fed','Alimentar/se, dar de comer','44.jpg');
	insertRecord('Feel','Felt','Felt','Sentir/se, palpar, tocar','45.jpg');
	insertRecord('Figth','Fought','Fought','Palear, combatir','46.jpg');
	insertRecord('Find','Found','Found','Encontrar','47.jpg');
	insertRecord('Fit','Fit','Fit','Encajar, quedar bien, instalar','48.jpg');
	insertRecord('Flee','Fled','Fled','Huir, huir de','49.jpg');
	insertRecord('Fling','Flung','Flung','Echar, arrojar','50.jpg');
	insertRecord('Fly','Flew','Flown','Volar','51.jpg');
	insertRecord('Forbid','Forbade','Forbidden','Prohibir','52.jpg');
	insertRecord('Forecast','Forecast','Forecast','Pronosticar, preveer','53.jpg');
	insertRecord('Foresee','Foresaw','Foreseen','Preveer','54.jpg');
	insertRecord('Foretell','Foretold','Foretold','Predecir','55.jpg');
	insertRecord('Forget','Forgot','Forgotten','Olvidar','56.jpg');
	insertRecord('Forgive','Forgave','Forgiven','Perdonar','57.jpg');
	insertRecord('Forsake','Forsook','Forsaken','Abandonar, desamparar','58.jpg');
	insertRecord('Freeze','Froze','Frozen','Congelar','59.jpg');
	insertRecord('Get','Got','Got/gotten','Conseguir, recibir, ponerse, llegar','60.jpg');
	insertRecord('Give','Gave','Given','Dar','61.jpg');
	insertRecord('Go','Went','Gone','Ir','62.jpg');
	insertRecord('Grind','Gruond','Ground','Moler','63.jpg');
	insertRecord('Grow','Grew','Grown','Crecer, cultivar','64.jpg');
	insertRecord('Handwrite','Handwrote','Handwritten','Escribir a mano','65.jpg');
	insertRecord('Hang','Hung','Hung','Colgar','66.jpg');
	insertRecord('Have','Had','Had','Tener','67.jpg');
	insertRecord('Hear','Heard','Heard','Oir','68.jpg');
	insertRecord('Hide','Hid','Hidden','Esconder/se','69.jpg');
	insertRecord('Hit','Hit','Hit','Golpear, pegar','70.jpg');
	insertRecord('Hold','Held','Held','Sostener, celebrar, esperar','71.jpg');
	insertRecord('Hurt','Hurt','Hurt','Herir, lastimar, doler','72.jpg');
	insertRecord('Inlay','Inlaid','Inlaid','Incrustar','73.jpg');
	insertRecord('Input','Input','Input','Entrar, introducir','74.jpg');
	insertRecord('Keep','Kept','Kept','Mantener, guardar, continuar, criar','75.jpg');
	insertRecord('Kneel','Knelt','Knelt','Arrodillarse, estar de rodillas','76.jpg');
	insertRecord('Knit','Knit','Knit','Tejer, tricotar','77.jpg');
	insertRecord('Know','Knew','Known','Saber, conocer','78.jpg');
	insertRecord('Lay','Laid','Laid','Poner, colocar','79.jpg');
	insertRecord('Lead','Led','Led','Guiar, llevar, conducir','80.jpg');
	insertRecord('Lean','Leant','Leant','Apoyarse, inclinarse','81.jpg');
	insertRecord('Leap','Leapt','Leapt','Saltar','82.jpg');
	insertRecord('Learn','Learnt','Learnt','Aprender, enterarse','83.jpg');
	insertRecord('Leave','Left','Left','Irse, dejar, marcharse','84.jpg');
	insertRecord('Lend','Lent','Lent','Prestar','85.jpg');
	insertRecord('Let','Let','Let','Dejar, permitir','86.jpg');
	insertRecord('Lie','Lay','Lain','Yacer, echarse, quedar','87.jpg');
	insertRecord('Light','Lit','Lit','Encender','88.jpg');
	insertRecord('Lose','Lost','Lost','Perder','89.jpg');
	insertRecord('Make','Made','Made','Hacer','90.jpg');
	insertRecord('Mean','Meant','Meant','Significar, querer decir, tener la intención de','91.jpg');
	insertRecord('Meet','Met','Met','Encontrarse con, conocer','92.jpg');
	insertRecord('Melt','Melted','Molten','Derretir','93.jpg');
	insertRecord('Mislead','Misled','Misled','Engañar, despistar, llevar por mal camino','94.jpg');
	insertRecord('Mistaje','Mistook','Mistaken','Confundir, interpretar mal','95.jpg');
	insertRecord('Misunderstad','Misunderstood','Misunderstood','Entender mal','96.jpg');
	insertRecord('Mow','Mowed','Mown','Segar, cortar','97.jpg');
	insertRecord('Overear','overheard','Overheard','Oir por casualidad, oir sin intención de ello','98.jpg');
	insertRecord('Overtake','Overtook','Overtaken','Sobrepasar','99.jpg');
	insertRecord('Pay','Paid','Paid','Pagar','100.jpg');
	insertRecord('Prove','Proved','Proven','Provar, resultar','101.jpg');
	insertRecord('Put','Put','Put','Poner','102.jpg');
	insertRecord('quit','quit','quit','Abandonar, rendirse, dejar','103.jpg');
	insertRecord('Read','Read','Read','Leer','104.jpg');
	insertRecord('Rid','Rid','Rid','Librar, desembarazar','105.jpg');
	insertRecord('Ride','Rode','Ridden','Andar en, pasear en, montar','106.jpg');
	insertRecord('Ring','Rang','Rung','sonar, llamar por teléfono','107.jpg');
	insertRecord('Rise','Rose','Risen','Levantarse, subir','108.jpg');
	insertRecord('Run','Ran','Run','Correr','109.jpg');
	insertRecord('Saw','Sawed','Sawn','Serrar, serruchar','110.jpg');
	insertRecord('Say','Said','Said','Decir','111.jpg');
	insertRecord('See','Saw','Seen','Ver','112.jpg');
	insertRecord('Seek','Sought','Sought','Buscar','113.jpg');
	insertRecord('Sell','Sold','Sold','Vender','114.jpg');
	insertRecord('Send','Sent','Sent','Enviar','115.jpg');
	insertRecord('Set','Set','Set','Poner, embientar','116.jpg');
	insertRecord('Sew','Sewed','Sewn','Coser','117.jpg');
	insertRecord('Shake','Shook','Shaken','Sacudir, agitar, hacer temblar','118.jpg');
	insertRecord('Shave','Shaved','Shaven','Afeitarse, rasurar','119.jpg');
	insertRecord('Shear','Shore','Shorn','Esquilar, cortar','120.jpg');
	insertRecord('Shed','Shed','Shed','Derramar, mudar, echar','121.jpg');
	insertRecord('Shine','Shone','Shone','Brillar, lustrar','122.jpg');
	insertRecord('Shoot','Shot','Shot','Disparar, matar a tiros','123.jpg');
	insertRecord('Show','Showed','Shown','Mostrar, exhibir','124.jpg');
	insertRecord('Shrink','Shrank','Shrunk','Encojer/se, reducir/se','125.jpg');
	insertRecord('Shut','Shut','Shut','Cerrar','126.jpg');
	insertRecord('Sing','Sang','Sung','Cantar','127.jpg');
	insertRecord('Sink','Sank','Sunk','Hundir/se','128.jpg');
	insertRecord('Sit','Sat','Sat','Sentar/se','129.jpg');
	insertRecord('Slay','Slew','Slain','Matar','130.jpg');
	insertRecord('Sleep','Slept','Slept','Dormir','131.jpg');
	insertRecord('Slide','Slid','Slid','Deslizar/se, resbalarse','132.jpg');
	insertRecord('Sling','Slung','Slung','Tirar, arrojar','133.jpg');
	insertRecord('Slink','Slunk','Slunk','Moverse sigilosamente, escabullirse','134.jpg');
	insertRecord('Slit','Slit','Slit','Rajar, cortar','135.jpg');
	insertRecord('Smell','Smelt','Smelt','Oler','136.jpg');
	insertRecord('Sneak','Snuck','Snuck','Entrar/salir/poner a hurtadillas','137.jpg');
	insertRecord('Sow','Sowed','Sown','Sembrar','138.jpg');
	insertRecord('Speak','Spoke','Spoken','Hablar','139.jpg');
	insertRecord('Speed','Sped','Sped','Acelerar, ir a toda velocidad','140.jpg');
	insertRecord('Spell','Spelt','Spelt','Deletrear','141.jpg');
	insertRecord('Spend','Spent','Spent','Gastar, pasar','142.jpg');
	insertRecord('Spill','Spilt','Spilt','Derramar, volcar','143.jpg');
	insertRecord('Spin','Spun','Spun','Girar, dar vueltas, hilar, tejer','144.jpg');
	insertRecord('Spit','Spat','Spat','Escupir','145.jpg');
	insertRecord('Split','Split','Splite','Partir, rajar, dividir','146.jpg');
	insertRecord('Spoil','Spoilt','Spoilt','Estropear, echar a perder, arruinar','147.jpg');
	insertRecord('Spread','Spread','Spread','Extender, desplegar, esparcir','148.jpg');
	insertRecord('Spring','Sprang','Sprung','Saltar','149.jpg');
	insertRecord('Stand','Stood','Stood','Estar de pie, pararse, soportar','150.jpg');
	insertRecord('Steal','Stole','Stolen','Robar','151.jpg');
	insertRecord('Stick','Stuck','Stuck','Pegar, clavar, atascarse, asomar','152.jpg');
	insertRecord('Sting','Stung','Stung','Picar, arder','153.jpg');
	insertRecord('Stink','Stank','Stunk','Apestar, oler mal','154.jpg');
	insertRecord('Stride','Strode','Stridden','Andar con pasos largos','155.jpg');
	insertRecord('Strike','Struck','Struck/Stricken','Golpear, dar(la hora)','156.jpg');
	insertRecord('String','Strung','Strung','Encordar, ensartar, atar','157.jpg');
	insertRecord('Strive','Strove','Striven','Luchar, esforzarse','158.jpg');
	insertRecord('Swear','Swore','Sworn','Jurar, decir palabrotas, malcedir','159.jpg');
	insertRecord('Sweat','Sweat','Sweat','Sudar','160.jpg');
	insertRecord('Sweep','Swept','Swept','Barrer, azotar','161.jpg');
	insertRecord('Swell','Swelled','Swollen','Hincharse, crecer, aumentar','162.jpg');
	insertRecord('Swim','Swam','Swum','Nadar','163.jpg');
	insertRecord('Swing','Swung','Swung','Balancear, mecer, colgar','164.jpg');
	insertRecord('Take','Took','Taken','Tomar, llevar','165.jpg');
	insertRecord('Teach','Taught','Taught','Enseñar','166.jpg');
	insertRecord('Tear','Tore','Torn','Desgarrar, romper, arrancar','167.jpg');
	insertRecord('Tell','Told','Told','Decir, contar','168.jpg');
	insertRecord('Think','Thought','Thought','Pensar','169.jpg');
	insertRecord('Thrive','Throve','Thriven','Prosperar, crecer mucho, desarrollarse','170.jpg');
	insertRecord('Throw','Threw','Thrown','Tirar, arrojar','171.jpg');
	insertRecord('Thrust','Thrust','Thrust','Empujar con fuerza, clavar','172.jpg');
	insertRecord('Tread','Trod','Trodden','Pisar, andar','173.jpg');
	insertRecord('Undergo','Underwent','Undergone','Sufrir, ser sometido a, recibir','174.jpg');
	insertRecord('Understand','Understood','Understood','Entender','175.jpg');
	insertRecord('Undertake','Undertook','Undertaken','Emprender, acometer','176.jpg');
	insertRecord('Upset','Upset','Upset','Enfadar, trastonar','177.jpg');
	insertRecord('Wake','Woke','Woken','Despertar','178.jpg');
	insertRecord('Wear','Wore','Worn','Usar, vestir, gastar','179.jpg');
	insertRecord('Weave','Wove','Woven','Tejer','180.jpg');
	insertRecord('Wed','Wed','Wed','Casarse, contraer matrimonio','181.jpg');
	insertRecord('Weep','Wept','Wept','Llorar','182.jpg');
	insertRecord('Wet','Wet','Wet','Mojar','183.jpg');
	insertRecord('Win','Won','Won','Ganar','184.jpg');
	insertRecord('Wind','Wound','Wound','Dar cuerda, serpentear, envolver, enrollar','185.jpg');
	insertRecord('Withdraw','Withdrew','Withdrawn','Retirar, sacar','186.jpg');
	insertRecord('Withhold','Withheld','Withheld','Retener, ocultar, no revelar','187.jpg');
	insertRecord('Withstand','Withstood','Withstood','Resistir, aguantar, oponerse','188.jpg');
	insertRecord('Wring','Wrung','Wrung','Torcer, retorcer, estrujar, escurrir','189.jpg');
	insertRecord('Write','Wrote','Written','Escribir','190.jpg');
	insertRecord('Accept','Accepted','Accepted','Aceptar','191.jpg');
	insertRecord('Add','Added','Added','Agregar','192.jpg');
	insertRecord('Admit','Admitted','Admitted','Admitir','193.jpg');
	insertRecord('Agree','Agreed','Agreed','Acordar, estar de acurdo','194.jpg');
	insertRecord('Allow','Allowed','Allowed','Permitir','195.jpg');
	insertRecord('Answer','Answered','Answered','Contestar, Responder','196.jpg');
	insertRecord('Arrive','Arrived','Arrived','Llegar','197.jpg');
	insertRecord('Ask','Asked','Asked','Preguntar','198.jpg');
	insertRecord('Believe','Believed','Believed','Creer','199.jpg');
	insertRecord('Belong','Belonged','Belonged','Pertenecer','200.jpg');
	insertRecord('Brush','Brushed','Brushed','Cepillar','201.jpg');
	insertRecord('Burn','Burned','Burned','Quemar','202.jpg');
	insertRecord('Call','Called','Called','Llamar','203.jpg');
	insertRecord('Cancel','Cancelled','Cancelled','Cancelar','204.jpg');
	insertRecord('Change','Changed','Changed','Cambiar','205.jpg');
	insertRecord('Clean','Cleaned','Cleaned','Limpiar','206.jpg');
	insertRecord('Close','Closed','Closed','Cerrar','207.jpg');
	insertRecord('Complain','Complained','Complained','Quejar','208.jpg');
	insertRecord('Complete','Completed','Completed','Completar','209.jpg');
	insertRecord('Cook','Cooked','Cooked','Cocinar','210.jpg');
	insertRecord('Copy','Copied','Copied','Copiar','211.jpg');
	insertRecord('Count','Counted','Counted','Contar','212.jpg');
	insertRecord('Cry','Cried','Cried','Llorar','213.jpg');
	insertRecord('Dance','Danced','Danced','Bailar','214.jpg');
	insertRecord('Decide','Decided','Decided','Decidir','215.jpg');
	insertRecord('Decorate','Decorated','Decorated','Decorar','216.jpg');
	insertRecord('Destroy','Destroyed','Destroyed','Destruir','217.jpg');
	insertRecord('Drop','Dropped','Dropped','Dejar caer','218.jpg');
	insertRecord('Dry','Dried','Dried','Secar','219.jpg');
	insertRecord('Enjoy','Enjoyed','Enjoyed','Difrutar','220.jpg');
	insertRecord('Escape','Scaped','Scaped','Escapar','221.jpg');
	insertRecord('Explain','Explained','Explained','Explicar','222.jpg');
	insertRecord('Fill','Filled','Filled','Llenar','223.jpg');
	insertRecord('Finish','Finished','Finished','Terminar','224.jpg');
	insertRecord('Fix','Fixed','Fixed','Arreglar, reparar','225.jpg');
	insertRecord('Follow','Followed','Followed','Seguir','226.jpg');
	insertRecord('Guess','Guessed','Guessed','Adivinar','227.jpg');
	insertRecord('Hoppen','Hoppened','Hoppened','Suceder','228.jpg');
	insertRecord('Hate','Hated','Hated','Odiar','229.jpg');
	insertRecord('Help','Helped','Helped','Ayudar','230.jpg');
	insertRecord('Imagine','Imagined','Imagined','Imaginar','231.jpg');
	insertRecord('Improve','Improved','Improved','Mejorar','232.jpg');
	insertRecord('Increase','Increased','Increased','Incrementar','233.jpg');
	insertRecord('Invent','Invented','Invented','Inventar','234.jpg');
	insertRecord('Invite','Invited','Invited','Invitar','235.jpg');
	insertRecord('Join','Joined','Joined','Unir','236.jpg');
	insertRecord('Jump','Jumped','Jumped','Saltar','237.jpg');
	insertRecord('Kill','Killed','Killed','Matar, asesinar','238.jpg');
	insertRecord('Kiss','Kissed','Kissed','Besar','239.jpg');
	insertRecord('Laugh','Laughed','Laughed','Reir','240.jpg');
	insertRecord('Learn','Learned','Learned','Aprender','241.jpg');
	insertRecord('Like','Liked','Liked','Gustar','242.jpg');
	insertRecord('Listen','Lestened','Listened','Escuchar','243.jpg');
	insertRecord('Live','Lived','Lived','Vivir','244.jpg');
	insertRecord('Look','Looked','Looked','Mirar','245.jpg');
	insertRecord('Love','Loved','Loved','Amar','246.jpg');
	insertRecord('Measure','Measured','Measured','Medir','247.jpg');
	insertRecord('Mention','Mentioned','Mentioned','Mencionar','248.jpg');
	insertRecord('Need','Needed','Needed','Necesitar','249.jpg');
	insertRecord('Notice','Noticed','Noticed','Notar','250.jpg');
	insertRecord('Offer','Offered','Offered','Ofrecer','251.jpg');
	insertRecord('Open','Opened','Opened','Abrir','252.jpg');
	insertRecord('Order','Ordered','Ordered','Ordenar','253.jpg');
	insertRecord('Organize','Organized','Organized','Organizar','254.jpg');
	insertRecord('Paint','Painted','Painted','Pintar','255.jpg');
	insertRecord('Place','Placed','Placed','Colocar','256.jpg');
	insertRecord('Play','Played','Played','Jugar, tocar','257.jpg');
	insertRecord('Please','Pleased','Pleased','Agradar','258.jpg');
	insertRecord('Practice','Praticed','Praticed','Practicar','259.jpg');
	insertRecord('Prepare','Prepared','Prepared','Preparar','260.jpg');
	insertRecord('Qualify','Qualified','Qualified','Calificar','261.jpg');
	insertRecord('Rain','Rained','Rained','Llorar','262.jpg');
	insertRecord('Receive','Received','Received','Recibir','263.jpg');
	insertRecord('Remember','Remembered','Remembered','Acordarse de','264.jpg');
	insertRecord('Remind','Reminded','Reminded','Recordar','265.jpg');
	insertRecord('Repeat','Repeated','Repeated','Repetir','266.jpg');
	insertRecord('Report','Reported','Reported','Reportar','267.jpg');
	insertRecord('Require','Required','Required','Requerir','268.jpg');
	insertRecord('Return','Returned','Returned','Regresar','269.jpg');
	insertRecord('Search','Searched','Searched','Buscar','270.jpg');
	insertRecord('Sign','Signed','Signed','Firmar','271.jpg');
	insertRecord('Sit','Sitted','Sitted','Sentar','272.jpg');
	insertRecord('Smile','Smiled','Smiled','Sonreir','273.jpg');
	insertRecord('Start','Started','Started','Empezar, comenzar','274.jpg');
	insertRecord('Stop','Stopped','Stopped','Parar, detener','275.jpg');
	insertRecord('Study','Studied','Studied','Estudiar','276.jpg');
	insertRecord('Talk','Talked','Talked','Hablar','277.jpg');
	insertRecord('Touch','Touched','Touched','Tocar','278.jpg');
	insertRecord('Translate','Translated','Translated','Traducir','279.jpg');
	insertRecord('Travel','Travelled','Travelled','Viajar','280.jpg');
	insertRecord('Try','Tried','Tried','Intentar, probar','281.jpg');
	insertRecord('Use','Used','Used','Usar','282.jpg');
	insertRecord('Visit','Visited','Visited','Visitar','283.jpg');
	insertRecord('Wait','Waited','Waited','Esperar','284.jpg');
	insertRecord('Walk','Walked','Walked','Caminar','285.jpg');
	insertRecord('Want','Wanted','Wanted','Querer','286.jpg');
	insertRecord('Watch','Watched','Watched','Ver','287.jpg');
	insertRecord('Wish','Wished','Wished','Desear','288.jpg');
	insertRecord('Work','Worked','Worked','Trabajar','289.jpg');
	insertRecord('Worry','Worried','Worried','Preocupar/se','290.jpg');
}

function detectedEnter()
{ 
	//$(document).keypress(function(event) {
	//	var keycode = (event.keyCode ? event.keyCode : event.which);
	//	if(keycode == '13') 
	//	{
			//alert(document.getElementById("buscador").value);
			if(document.getElementById("buscador").value.trim()!='')
			{
				showSomeRecord(document.getElementById("buscador").value.trim());				
			}
			else
			{		
				resultado.innerHTML		= '';
				history.go(-1);
			}
			//alert(resultado.innerHTML);
			//resultado.innerHTML=document.getElementById("buscador").value;
	//}
	//});
}