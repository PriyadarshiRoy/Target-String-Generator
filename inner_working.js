const pop_max = 100;
var current_pop;
var pop = [];
var fitness = [];
var target = "";
var mutationrate = 0.02;
var found = 0;

// Generates a random value between two ranges
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
  //The maximum is exclusive and the minimum is inclusive
}

// Generate a random string
function random_string(){
	var i = 0; 
	var string = "";
	while(i<target.length){
		var gene = String.fromCharCode(getRandomInt(32, 123));
		string+=gene;
		i++;
	}
	return string;
}

function generate_pop(){
	var i = 0;
	while(i<pop_max){
		pop.push(random_string());
		i++;
	}
	current_pop = pop.length;
}

//Find fitness of each string
function fitnessOfString(string){
	var i = 0;
	var match = 0;
	while(i<target.length){
		if(string.charAt(i)==target.charAt(i))
			match++;
		i++;
	}
	if(match==target.length)
		found=1;
	return (match/target.length);
}

//Find fitness of population
function calc_fitness(){
	fitness = [];
	var i = 0;
	while(i<current_pop){
		fitness.push(fitnessOfString(pop[i]));
		i++;
	}
}

// Average fintess
function averageFitness(){
	var avg = 0;
	var sum = 0;
	for(let i=0; i<current_pop; i++){
		sum += fitness[i];
	}
	avg = sum/current_pop;
	return avg;
}

// Sort strings according to decreasing fitness
function sortByFitness(){
	for (let i = 0; i < ( current_pop - 1 ); i++) {
    	for (let j = 0; j < current_pop - i - 1; j++) {
        	if (fitness[j] < fitness[j+1]) {
           		let temp = fitness[j];
           		fitness[j] = fitness[j+1];
           		fitness[j+1] = temp;

           		temp = pop[j];
           		pop[j] = pop[j+1];
           		pop[j+1] = temp;
           	}
        }
    }
}

// Eliminate lower half of sorted list/array
function eliminate(){
	var i = current_pop;
	while(i>pop_max){
		pop.pop();
		i--;
	}
}

// Obtain new population
function naturalSelection(){
	eliminate();
	current_pop = pop.length;
	fitness = [];
}

// Crossover between two parents
function crossover(parentA, parentB){
	var child = "";
	var crossover_point = target.length/2;
	child = parentA.substring(0,crossover_point) + parentB.substring(crossover_point, target.length);
	return child;
}

// Crossover in current population
function calcCrossover(){
	var children = 0;
	for(let i=0; i<current_pop-1; i++){
		for(let j=i+1; j<current_pop; j++){
			let child = crossover(pop[i], pop[j]);
			pop.push(child);
			children++;
		}
	}
	current_pop += children;
}

// Mutation
function mutateString(string, rate){
	var mutatedstring = "";
	for(let i=0;i<target.length;i++){
		if(Math.random()< rate){
			mutatedstring += String.fromCharCode(getRandomInt(32, 123));
		}else{
			mutatedstring += string.charAt(i);
		}
	}
	return mutatedstring;
}

function mutate(){
	for(let i=0; i<current_pop; i++){
		pop[i] = mutateString(pop[i], mutationrate);
	}
}