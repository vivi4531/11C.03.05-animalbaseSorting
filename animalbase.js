"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];


// The prototype for all animals: 
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0
};

function start( ) {
    console.log("ready");

    // Add event-listeners to filter and sort buttons
    document.querySelector("[data-filter=cat]").addEventListener("click", showAllCats); 
    document.querySelector("[data-filter=dog]").addEventListener("click", showAllDogs); 
    document.querySelector("[data-filter=all]").addEventListener("click", showAllAnimals); 

    document.querySelector("[data-sort=name]").addEventListener("click", sortAnimalsAfterName); 

    loadJSON();
}


async function loadJSON() {
    const response = await fetch("animals.json");
    const jsonData = await response.json();
    
    // when loaded, prepare data objects
    prepareObjects( jsonData );
}

function prepareObjects( jsonData ) {
    allAnimals = jsonData.map( preapareObject );

    // TODO: This might not be the function we want to call first
    displayList(allAnimals);
}

function preapareObject( jsonObject ) {
    const animal = Object.create(Animal);
    
    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;

    return animal;
}

function showAllCats(){
    console.log("Cat filter button clicked"); 

    const allCats = [];
    allAnimals.forEach((animal) =>{
        if(animal.type== "cat"){
            allCats.push(animal);
        }
    });
    displayList(allCats); 

}

function showAllDogs(){
    console.log("Dog filter button clicked"); 

    const allDogs = [];
    allAnimals.forEach((animal) =>{
        if(animal.type== "dog"){
            allDogs.push(animal);
        }
    });
    displayList(allDogs); 

}

function showAllAnimals(){
    console.log("All filter button clicked"); 
    displayList(allAnimals); 
}

function sortAnimalsAfterName(){
    console.log("Animals sorted alfabetical after name"); 
    if (event.target.dataset.sortDirection === "asc") {
        event.target.dataset.sortDirection = "desc";
        console.log("Animals sorted ascending by name")
        nameAsc();
    } else {
        console.log("Animals sorted descnding by name")
        nameDesc();
        event.target.dataset.sortDirection = "asc";
    }
    }
    //condition - ascending
    function nameAsc(){
        console.log(allAnimals)
        function compareName(a, b){
        if(a.name < b.name) {
        //A before B
        return -1;
        } else if (a.name > b.name){
        //A after B
        return 1;
        }
        }   
        allAnimals.sort(compareName)
        displayList(allAnimals)
      }
    //condition - descending
    function nameDesc(){
        console.log(allAnimals)
        function compareName(a, b){
        if(a.name < b.name) {
        return 1;
        } else if (a.name > b.name){
        return -1;
        }
        }   
        allAnimals.sort(compareName)
        displayList(allAnimals)
      }

function displayList(animals) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    animals.forEach( displayAnimal );
}

function displayAnimal( animal ) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}


