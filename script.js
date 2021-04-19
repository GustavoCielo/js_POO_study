class Traveler {
    constructor(name, food = 1, isHealthy = true) {
        this.name = name;
        this.food = food;
        this.isHealthy = isHealthy;
    }
    hunt() {
        this.food += 2;
    }

    eat() {
        if (this.food > 0) {
            this.food -= 1;
        }
        if (this.food < 1) {
            this.isHealthy = false;
        }
    }
}

class Wagon {
    constructor(capacity, passengers = []) {
        this.capacity = capacity;
        this.passengers = passengers;
    }
    getAvailableSeatCount() {
        return this.capacity - this.passengers.length
    }
    join(traveler) {
        if (this.capacity > this.passengers.length) {
            this.passengers.push(traveler)        
        }
    }
    shouldQuarantine() {
        for (let i = 0; i < this.passengers.length; i++) {
            if (this.passengers[i].isHealthy === false) {
                return true;
            }
        }
        return false;
    }
    totalFood() {
        let total = this.passengers.reduce((acc, current) => {
            return acc + current.food;  
        }, 0)
        return total
    }
}

class Doctor extends Traveler {
    constructor(name, food, isHealthy) {
        super(name, food, isHealthy)
    }

    heal(traveler) {
        traveler.isHealthy = true;
    }
}

class Hunter extends Traveler {
    constructor(name, food = 2, isHealthy) {
        super(name, food, isHealthy)
        this.food = 2;
    }

    hunt() {
        this.food += 5;
    }

    eat() {
        if (this.food > 1) {
            this.food -= 2;
        }
        if (this.food === 1) {
            this.food--;
        }
    }

    giveFood(traveler, numOfFoodUnits) {
        if (this.food >= numOfFoodUnits) {
            traveler.food += numOfFoodUnits;
            this.food -= numOfFoodUnits;
        }
    }
}



// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');

console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);

wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);

sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();

console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);

henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)

console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);

drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);

sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente

console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);
