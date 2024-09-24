let allSelectors = document.querySelectorAll('select');
let extraLink = (new URL(window.location.href)).search.slice(1)
let all_topics = [
		'trig_values',
		'trig_double',
		'trig_half',
		'trig_stop',
		'trig_ptos',
		'vec_angles',
		'vec_pointtoplane',
		'vec_pointtoline',
		'vec_paraarea',
		'vec_dotproducts',
		'vec_cosangle',
		'vec_sinangle',
		'vec_threepointstoplane'
	];

function getRandomArrayElement(arr) {
	if (arr.length === 0) {
		throw new Error("Array is empty");
	}
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
}

function start(){
	for (let i = 0; i < allSelectors.length; i++){
		if (allSelectors[i].value != 'null'){
			window.location.href = `${this.location}/famatdrill/input.html?${allSelectors[i].value}`;
		}
	}
}

function chooseTopic(){
	window.location.href= `${this.location}/famatdrill/input.html?${getRandomArrayElement(all_topics)}`;
}

if (extraLink=='random'){
	chooseTopic();
}
