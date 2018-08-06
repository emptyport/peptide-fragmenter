var pepFrag = require('./index');

//console.log(pepFrag.fragment('ELVISLIVES', ['a','b','c','x','y','z'], [1]));
console.log(pepFrag.fragment('ACDEFGHIKLMNPQRSTVWY', ['b','y'], [1,2], [{'position': 1, 'mass': 57.02}]));
