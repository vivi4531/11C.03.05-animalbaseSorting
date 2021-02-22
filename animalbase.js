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
    document.querySelector("[data-sort=type]").addEventListener("click", sortAnimalsAfterType); 
    document.querySelector("[data-sort=desc]").addEventListener("click", sortAnimalsAfterDescription); 
    document.querySelector("[data-sort=age]").addEventListener("click", sortAnimalsAfterAge); 

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

//Sorting by name
function sortAnimalsAfterName(){
    console.log("Click on sort by name"); 
    allAnimals.sort(compareByName); 
    displayList(allAnimals); 
}

function compareByName(a,b){
    //Ascending
    console.log(`Look at ${a.name} and ${b.name}`); 
    if(a.name < b.name){
        console.log(`${a.name} should come first`);
        return -1; 
    } else {
        console.log(`${b.name} should come first`);
        return 1; 
    }
}

//Sorting by type
function sortAnimalsAfterType(){
    console.log("Click on sort by type"); 
    allAnimals.sort(compareBytype); 
    displayList(allAnimals); 
}

function compareBytype(a,b){
    //Ascending
    console.log(`Look at ${a.type} and ${b.type}`); 
    if(a.type < b.type){
        console.log(`${a.type} should come first`);
        return -1; 
    } else {
        console.log(`${b.type} should come first`);
        return 1; 
    }
}


//Sorting by description 
function sortAnimalsAfterDescription(){
    console.log("Click on sort by description"); 
    allAnimals.sort(compareByDesc); 
    displayList(allAnimals); 
}

function compareByDesc(a,b){
    //Ascending
    console.log(`Look at ${a.desc} and ${b.desc}`); 
    if(a.desc < b.desc){
        console.log(`${a.desc} should come first`);
        return -1; 
    } else {
        console.log(`${b.desc} should come first`);
        return 1; 
    }
}

//Sorting by age 
function sortAnimalsAfterAge(){
    console.log("Click on sort by age"); 
    allAnimals.sort(compareByage); 
    displayList(allAnimals); 
}

function compareByage(a,b){
    //Ascending
    console.log(`Look at ${a.age} and ${b.age}`); 
    if(a.age < b.age){
        console.log(`${a.age} should come first`);
        return -1; 
    } else {
        console.log(`${b.age} should come first`);
        return 1; 
    }
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


