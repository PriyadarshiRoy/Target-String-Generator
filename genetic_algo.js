function genetic_algo(){

	target = document.getElementById("target").value;
	//INITIAL POPULATION
	// Generates a random initial population of strings
	generate_pop();
	var generation = 1;
	let timer = setInterval(function() {
		if (found != 0) 
			clearInterval(timer);

		if(found==0){
			// Calculate fitness
			calc_fitness();
			// Sort in descending order by fitness
			sortByFitness();
			
			console.log("Generation = " + generation);
			console.log("Fittest string: " + pop[0]);
			document.querySelector('#generation').innerHTML = "<h3>Generation : " + generation + "</h3>";
			document.querySelector('#fitness').innerHTML = "<h3>Fitness : " + averageFitness() + "</h3>";
			document.querySelector('#mutation').innerHTML = "<h3>Mutation : " + mutationrate + "</h3>";
			document.querySelector('#strings').innerHTML += pop[0] + "<br>";
			
			// Eliminate bottom half of sorted array 
			naturalSelection();
			generation++;
			
			// Crossover
			calcCrossover();
			
			//Mutation
			mutate();
		}
	}, 0);
}