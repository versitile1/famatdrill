let used = false;
let startStop = document.getElementById("timer");
let started = false;
let timer = document.querySelector("h1");
let startTime = Date.now();
let question = (new URL(window.location.href)).search.slice(1)
let questionText = document.querySelector("p");
let answerText = document.querySelector('h6')

//Start stop
function startTimer(){
	if (started == false && used == false){ //Start Timer
		startTime = Date.now();
		startStop.innerHTML = 'Stop';
		questionCreator(question)
		started = true;
	} else if (started == true){ //Stop Timer
		startStop.innerHTML = 'Completed';
		started = false;
		used = true;
		answerText.style.display = '';
	}
}

//Operating the Timer
function update(timestamp){
	if(started == true){
		timer.innerHTML = parseInt((Date.now() - parseInt(startTime))/1000);
	}
	window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);

//Navigation Functions
function reload(){
	location.reload();
}
function randomTopic(){
	window.location.href = window.location.origin + this.location.pathname + '?random';
}
function goHome(){
	window.location.href = window.location.origin + this.location.pathname;
}
function trackLoads(){
	if (localStorage.getItem('pageLoadCount')) {
		// If it exists, parse and increment the value
		let count = parseInt(localStorage.getItem('pageLoadCount'));
		count += 1;
		localStorage.setItem('pageLoadCount', count); // Update the value in localStorage
		return count
	} else {
		// If it doesn't exist, initialize it with a value of 1
		localStorage.setItem('pageLoadCount', 1);
		return 1
	}
}
document.getElementById("counter").innerHTML += trackLoads();


//Speed Space Bar
document.addEventListener("keydown", function(event) {
	if (event.code === "Space") {
		if (!used){startTimer()} else {reload()}
	}
});

//Create Question
function questionCreator(nameOfQuestion){	
	let [problemAnswer, problemQuestion] = eval(nameOfQuestion + '()')
	questionText.innerHTML = problemQuestion;
	answerText.innerHTML = problemAnswer;
}

//RNG
function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
function randomChoice(choices) {
	var index = Math.floor(Math.random() * choices.length);
	return choices[index];
}

//Trig
function trig_values(){
	let trigvals = {
			"sin(π/3)": "√3/2", "sin(π/6)": "1/2", "sin(π/4)": "√2/2", "sin(π/2)": "1", "sin(π)": "0", "sin(3π/2)": "-1", 
			"sin(π/12)": "√6/4-√2/4", "sin(5π/12)": "√6/4+√2/4", "sin(2π/3)": "√3/2", "sin(5π/6)": "1/2", "sin(7π/6)": "-1/2", 
			"sin(4π/3)": "-√3/2", "sin(5π/4)": "-√2/2", "sin(7π/4)": "-√2/2", "sin(11π/6)": "-1/2", 
			"cos(π/3)": "1/2", "cos(π/6)": "√3/2", "cos(π/4)": "√2/2", "cos(π/2)": "0", "cos(π)": "-1", "cos(3π/2)": "0", 
			"cos(π/12)": "√6/4+√2/4", "cos(5π/12)": "√6/4-√2/4", "cos(2π/3)": "-1/2", "cos(5π/6)": "-√3/2", "cos(7π/6)": "-√3/2", 
			"cos(4π/3)": "-1/2", "cos(5π/4)": "-√2/2", "cos(7π/4)": "√2/2", "cos(11π/6)": "√3/2", 
			"tan(π/3)": "√3", "tan(π/6)": "√3/3", "tan(π/4)": "1", "tan(π/2)": "undefined", "tan(π)": "0", "tan(3π/2)": "undefined", 
			"tan(π/12)": "2-√3", "tan(5π/12)": "2+√3", "tan(2π/3)": "-√3", "tan(5π/6)": "-√3/3", "tan(7π/6)": "√3/3", 
			"tan(4π/3)": "√3", "tan(5π/4)": "1", "tan(7π/4)": "-1", "tan(11π/6)": "-√3/3"
	};
	question = randomChoice(Object.keys(trigvals))
	return [trigvals[question], question]
} 

//Vectors

function vec_angle(){
	let v1 = randomNum(-6, 6);
	let v2 = randomNum(-6, 6);
	let v3 = randomNum(-6, 6);
	let u1 = randomNum(-6, 6);
	let u2 = randomNum(-6, 6);
	let u3 = randomNum(-6, 6);
	let dotProduct = (u1*v1) + (u2*v2) + (u3*v3);
	let magnitudeU = (u1*u1) + (u2*u2) + (u3*u3);
	let magnitudeV = (v1*v1) + (v2*v2) + (v3*v3);
	let answer = `(${dotProduct}/sqrt(${magnitudeU*magnitudeV}))`;
	return [answer, `What is the cosine of the angle between the vectors <${u1}, ${u2}, ${u3}> and <${v1}, ${v2}, ${v3}>?`];
}

function vec_pointtoplane() {
		// Generate random values
		const a = parseFloat(randomNum(-8, 8));
		const b = parseFloat(randomNum(-8, 8));
		const c = parseFloat(randomNum(-8, 8));
		const d = parseFloat(randomNum(-8, 8));
		const x0 = parseFloat(randomNum(-8, 8));
		const y0 = parseFloat(randomNum(-8, 8));
		const z0 = parseFloat(randomNum(-8, 8));

		// Calculate the distance
		const numerator = Math.abs(a * x0 + b * y0 + c * z0 + d);
		const denominatorSquared = a * a + b * b + c * c;

		// Function to compute gcd
		const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
		const gcdValue = gcd(numerator, denominatorSquared);

		// Simplify fraction
		const simplifiedNumerator = numerator / gcdValue;
		const simplifiedDenominatorSquared = denominatorSquared / gcdValue;

		// Format question and answer
		const question = `What is the distance from the point (${x0}, ${y0}, ${z0}) to the plane ${a}x + ${b}y + ${c}z + ${d} = 0?`;
		const answer = `The distance from the point to the plane is ${simplifiedNumerator}/sqrt${simplifiedDenominatorSquared}.`;

		return [answer, question];
}

function vec_pointtoline() {
	// Generate random values
	const a = parseFloat(randomNum(-5, 5)); // Line direction vector component
	const b = parseFloat(randomNum(-5, 5)); // Line direction vector component
	const c = parseFloat(randomNum(-5, 5)); // Line direction vector component
	const x1 = parseFloat(randomNum(-5, 5)); // Point on the line
	const y1 = parseFloat(randomNum(-5, 5)); // Point on the line
	const z1 = parseFloat(randomNum(-5, 5)); // Point on the line
	const x0 = parseFloat(randomNum(-5, 5)); // External point
	const y0 = parseFloat(randomNum(-5, 5)); // External point
	const z0 = parseFloat(randomNum(-5, 5)); // External point

	// Vector from point to line point
	const dx = x0 - x1;
	const dy = y0 - y1;
	const dz = z0 - z1;

	// Cross product of (dx, dy, dz) and (a, b, c)
	const crossX = dy * c - dz * b;
	const crossY = dz * a - dx * c;
	const crossZ = dx * b - dy * a;

	// Magnitude squared of the cross product vector
	const crossMagSquared = crossX * crossX + crossY * crossY + crossZ * crossZ;

	// Magnitude squared of the direction vector
	const dirMagSquared = a * a + b * b + c * c;

	// Format the question and answer
	const question = `What is the distance from the point (${x0}, ${y0}, ${z0}) to the line passing through (${x1}, ${y1}, ${z1}) with direction vector (${a}, ${b}, ${c})?`;
	const answer = `The distance from the point to the line is sqrt(${crossMagSquared}) / sqrt(${dirMagSquared}).`;

	// Return in the form [answer, question]
	return [answer, question];
}

function vec_paraarea() {
		// Generate random vectors
		const ax = parseFloat(randomNum(-5, 5)); // First vector x-component
		const ay = parseFloat(randomNum(-5, 5)); // First vector y-component
		const az = parseFloat(randomNum(-5, 5)); // First vector z-component
		const bx = parseFloat(randomNum(-5, 5)); // Second vector x-component
		const by = parseFloat(randomNum(-5, 5)); // Second vector y-component
		const bz = parseFloat(randomNum(-5, 5)); // Second vector z-component

		// Cross product of (ax, ay, az) and (bx, by, bz)
		const crossX = ay * bz - az * by;
		const crossY = az * bx - ax * bz;
		const crossZ = ax * by - ay * bx;

		// Magnitude squared of the cross product vector
		const crossMagSquared = crossX * crossX + crossY * crossY + crossZ * crossZ;

		// Format the question and answer
		const question = `What is the area of the parallelogram formed by the vectors (${ax}, ${ay}, ${az}) and (${bx}, ${by}, ${bz})?`;
		const answer = `The area of the parallelogram is sqrt(${crossMagSquared}).`;

		// Return in the form [answer, question]
		return [answer, question];
}

function vec_dotproducts() {
	// Define the number of dimensions for the vectors
	const dimensions = 3;

	// Helper function to generate random vectors
	function generateRandomVector() {
		const vector = [];
		for (let i = 0; i < dimensions; i++) {
			vector.push(randomNum(-10, 10)); // Generating components between -10 and 10
		}
		return vector;
	}

	// Helper function to calculate the dot product of two vectors
	function calculateDotProduct(v1, v2) {
		let dotProduct = 0;
		for (let i = 0; i < dimensions; i++) {
			dotProduct += v1[i] * v2[i];
		}
		return dotProduct;
	}

	// Generate two random vectors
	const vector1 = generateRandomVector();
	const vector2 = generateRandomVector();

	// Calculate the dot product
	const dotProduct = calculateDotProduct(vector1, vector2);

	// Check if the dot product is zero
	const isPerpendicular = dotProduct === 0;

	// Format the question string
	const question = isPerpendicular
		? `Are the vectors [${vector1.join(', ')}] and [${vector2.join(', ')}] perpendicular?`
		: `What is the dot product of vectors [${vector1.join(', ')}] and [${vector2.join(', ')}]?`;

	// Return the result as an array: [answer, question]
	return [isPerpendicular ? 'Yes' : dotProduct, question];
}

function mat_det() {
	// Helper function to generate a random integer between min and max
	function randomNum(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// Function to calculate determinant of a 2x2 matrix
	function det2x2(matrix) {
			return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
	}

	// Recursive function to calculate determinant of a matrix (NxN)
	function matrix_det(matrix) {
			const n = matrix.length;

			// Base case for a 2x2 matrix
			if (n === 2) {
					return det2x2(matrix);
			}

			// Base case for a 3x3 matrix to reduce recursion depth
			if (n === 3) {
					return (
							matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
							matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
							matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
					);
			}

			// For larger matrices (4x4, etc.), use cofactor expansion
			let determinant = 0;
			for (let i = 0; i < n; i++) {
					// Create submatrix by removing the first row and the current column
					const subMatrix = matrix.slice(1).map(row => row.filter((_, index) => index !== i));

					// Calculate cofactor and use it recursively
					const cofactor = matrix[0][i] * mat_det(subMatrix);

					// Add or subtract cofactor based on position
					determinant += (i % 2 === 0 ? 1 : -1) * cofactor;
			}

			return determinant;
	}

	// Generate either a 3x3 or 4x4 matrix
	const size = Math.random() < 0.5 ? 3 : 4;  // Randomly choose 3x3 or 4x4
	let matrix = [];

	// Fill the matrix with random values between -6 and 6
	for (let i = 0; i < size; i++) {
			matrix.push([]);
			for (let j = 0; j < size; j++) {
					matrix[i].push(randomNum(-4, 4));
			}
	}

	// Function to format the matrix as a string that looks like a matrix
	function formatMatrix(matrix) {
			return matrix.map(row => `| ${row.join("  ")} |`).join("&#32;");
	}

	// Format the matrix for display
	let formattedMatrix = formatMatrix(matrix);

	// Calculate the determinant of the matrix
	let determinant = matrix_det(matrix);

	// Create the question with formatted matrix
	let question = `What is the determinant of the matrix:\n${formattedMatrix}\n?`;

	return [determinant, question];
}

