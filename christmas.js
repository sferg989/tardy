
var mixed = {
    'sib 1' : ['sib 4','sib 5','sib 6'],
    'sib 2' : ['sib 1','sib 4','sib 5','sib 6']
};

/*
var mixed = {
    'sib 1' : ['sib 4','sib 5','sib 6','sib 7','sib 8','sib 9','sib 10'],
    'sib 2' : ['sib 1','sib 4','sib 5','sib 6']
};*/
//console.log(mixed);
var siblings= [
    "sib 1",
    "sib 2",
    "sib 3",
    "sib 4",
    "sib 5",
    "sib 6",
    "sib 7",
    "sib 8",
    "sib 9",
    "sib 112",
    "sib 11",
    "sib 12",
    "sib 13",
    "sib 14",
    "sib 15",
    "sib 16"
];

var sib_copy = [...siblings];
//console.log(mixed, siblings);

function determinePartner(sibling) {
    let exclusion_list = [...sib_copy];
    //determine are there secondary exclusions for this sibling.
    //console.log(Object.keys(mixed).length)

    for (i = 0; i < Object.keys(mixed).length; i++) {aasdasd
        if( sibling == Object.keys(mixed)[i]){
            //sibling has exclusions
            //console.log(`THis ${sibling} Has exclusions`);
            //what are the exclusions
            //console.log(mixed[sibling]);
            for (z = 0; z < mixed[sibling].length; z++) {
                    console.log(exclusion_list.indexOf(mixed[sibling][z]));

                exclusion_list.splice(
                    exclusion_list.indexOf(mixed[sibling][z]),1);
            }
            console.log(exclusion_list);
        }

    }

    let sibling_chosen = _.sample(exclusion_list);
    while (sibling == sibling_chosen) {
        sibling_chosen = _.sample(exclusion_list);
    }
    sib_copy.splice(
        sib_copy.indexOf(sibling_chosen),1);

    return `<br> string text ${sibling} partner with ${sibling_chosen}`;

}

function pairSiblings(){
    document.getElementById("demo").innerHTML = siblings.map(determinePartner);
}
window.onload = function() {
    // all of your code goes in here
    // it runs after the DOM is built
    pairSiblings();
}

