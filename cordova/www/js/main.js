
// on détecte l'événément submit sur le formulaire
document.querySelector('form').addEventListener('submit',submitForm);

/**
 * Handler de l'événement submit du formulaire.
 * lance le chargement en ajax
 * qui correspondent à la recherche de l'utilisateur.
 * @param  {Event} event event submit lancé par le form
 * @see  #onSearchSuccess()
 */
function submitForm(event)
{
	console.log( 'submitForm' );
	// on empêche la page de se recharger
	event.preventDefault();

	// on récupère les informations du formulaires
	var search = document.querySelector('input[name=search]').value;
	var nombre = document.querySelector('input[name=nombre]').value;
	var debut = document.querySelector('input[name=debut]').value;
	var fin = document.querySelector('input[name=fin]').value;
	
	var dateJour = new Date();
	var dateDebut = new Date(debut);
	var dateFin = new Date(fin);

	// controle des dates
	if(dateDebut < dateJour)
	{
		alert("la date de départ doit être supérieure à la date du jour.");
		return null;
	}

	if(dateDebut > dateFin)
	{
		alert("la date de fin doit être supérieure à la date de départ.");
		return null;
	}

	// on vide la liste de résultats précédents
	document.querySelector('.resultsContainer ul.results').innerHTML = '';

	//si on était sur une page de détail on la supprime
	if(document.querySelector('#detail') != null)
	{
		document.querySelector('#detail').parentNode.removeChild(document.querySelector('#detail'));
	}

	// on affiche un message de loading
	document.querySelector('.resultsContainer h2').innerHTML = 'Chargement en cours';

	// requete ajax
	var request = new XMLHttpRequest();
	request.open('GET', 'https://www.airbnb.fr/search/search_results/?location='+search+'&guests='+nombre+'&checkin='+debut+'&checkout='+fin, true);
	request.onload = function(){
	    onSearchSuccess( request.responseText );
	}
	request.send();
}

/**
 * gestion de l'événement success sur l'appel ajax de recherche.
 * Affiche les résultats dans la page.
 */
 function onSearchSuccess( data )
 {
 	console.log( 'onSearchSuccess');
 	data = JSON.parse(data);
 	
 	// on récupère le tableau de résultats depuis l'ojet JSON "data"
	var results = data.results_json.search_results;
	
	// on masque le message de loading
	document.querySelector('.resultsContainer h2').innerHTML = 'Résultats';

	var ul = document.querySelector('.resultsContainer ul.results');
	
	// création de la liste de résultats
	for ( var i = 0, resultsLength = results.length; i < resultsLength; i++ )
	{
		var page = results[ i ].listing;
		// on crée un nouveau noeud html <li>
		// dans lequel on affiche le titre et l'image du bien
		var newLi = '<li class="list-group-item clearfix" > \
		<center> \
		<a href="#" onClick="onResultClick(event);"> \
			<img class="list-group-item-heading" style="width:50%;margin-left:25%;margin-right:25%" src ="'+page.picture_url+'"/>  \
			<p class="list-group-item-text">'+page.name+'</p> \
		</a> \
		</center> \
		</li>';
		
		ul.innerHTML += newLi;
	}
}

/**
 * gestion de l'événement click sur un des liens de résultat.
 * ouvre la page detail
 * @param  {Object} event [description]
 */
function onResultClick( event )
{
	event.preventDefault();
	console.log('onResultClick');

	// on vide la liste de résultats
	document.querySelector('.resultsContainer ul').innerHTML = '';

	// on récupère les données
	var titre = event.currentTarget.querySelector('p').innerHTML;
	var img = event.currentTarget.querySelector('img').src;

	document.querySelector('.resultsContainer h2').innerHTML = titre;

	var debut = document.querySelector('input[name=debut]').value;
	var fin = document.querySelector('input[name=fin]').value;

	// création de la page détail
	document.querySelector('.resultsContainer').innerHTML += '<div id="detail"> \
	<center><img class="list-group-item-heading" style="width:80%" src ="'+img+'"/></center> \
	<center><button type="button" class="btn btn-primary" onClick="app.ajouterAgenda();">Agenda</button>\
	<button type="button" class="btn btn-primary" onClick="app.sendSms()">Partager</button></center>\
	</div>';
}