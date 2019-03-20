let pepFrag = require('../index');
let test = require('tape');

test('Default Settings', function(t) {
    let fragments = pepFrag.fragment('ELVISLIVES');

    t.equal(Object.keys(fragments).length, 2, 'Correct number of ion types');
    t.equal(fragments.hasOwnProperty('b'), true, 'Has b ions');
    t.equal(fragments.hasOwnProperty('y'), true, 'Has y ions');

    t.equal(Object.keys(fragments.b).length, 1, 'Only one charge for b ions');
    t.equal(Object.keys(fragments.y).length, 1, 'Only one charge for y ions');
    t.equal(fragments.b.hasOwnProperty('1'), true, 'Singly charged b ions');
    t.equal(fragments.y.hasOwnProperty('1'), true, 'Singly charged y ions');

    t.end();
});

test('Illegal residues', function(t) {
    let fragments = pepFrag.fragment('HELLO');

    t.equal(Object.keys(fragments).length, 0, 'Nothing returned');

    t.end();
});

test('Ion types', function(t) {
    let fragments = pepFrag.fragment('ELVISLIVES', ['a', 'b', 'c', 'x', 'y', 'z']);

    t.equal(Object.keys(fragments).length, 6, 'Correct number of ion types');
    t.equal(fragments.hasOwnProperty('a'), true, 'Has a ions');
    t.equal(fragments.hasOwnProperty('b'), true, 'Has b ions');
    t.equal(fragments.hasOwnProperty('c'), true, 'Has c ions');
    t.equal(fragments.hasOwnProperty('x'), true, 'Has x ions');
    t.equal(fragments.hasOwnProperty('y'), true, 'Has y ions');
    t.equal(fragments.hasOwnProperty('z'), true, 'Has z ions');

    let weirdFragments = pepFrag.fragment('ALANINE', ['f']);
    t.equal(Object.keys(weirdFragments).length, 1, 'Correct number of ion types for bad type');
    t.equal(weirdFragments.f['1'].length, 0, 'No ions for bad type');

    t.end();

});

test('Charges', function(t) {
    let fragments = pepFrag.fragment('ALANINE', ['b', 'y'], [1,2]);

    t.equal(Object.keys(fragments.b).length, 2, 'Two charges for b ions');
    t.equal(Object.keys(fragments.y).length, 2, 'Two charges for y ions');

    t.end();

});

test('Accuracy', function(t) {
    let fragments = pepFrag.fragment('ACDEFGHIKLMNPQRSTVWY', ['a', 'b', 'c', 'x', 'y', 'z'], [1,2]);

    t.equal(Math.abs((fragments['a']['1'][0] - 44.04952) / 44.04952 * 1000000) < 2, true, 'a1 +1 within 2 ppm');
    t.equal(Math.abs((fragments['b']['1'][9] - 1114.53503) / 1114.53503 * 1000000) < 1, true, 'b10 +1 within 1 ppm');
    t.equal(Math.abs((fragments['c']['1'][17] - 2045.00557) / 2045.00557 * 1000000) < 1, true, 'c18 within 1 ppm');
    t.equal(Math.abs((fragments['x']['2'][0] - 1175.54085) / 1175.54085 * 1000000) < 1, true, 'x1 +2 within 1 ppm');
    t.equal(Math.abs((fragments['y']['2'][8] - 697.84795) / 697.84795 * 1000000) < 1, true, 'y9 +2 within 1 ppm');
    t.equal(Math.abs((fragments['z']['2'][16] - 225.60541) / 225.60541 * 1000000) < 3, true, 'z17 +2 within 3 ppm');

    t.end();
});

test('Modifications', function(t) {
    let fragments = pepFrag.fragment('ACDEFGHIKLMNPQRSTVWY', ['b'], [1], [{'position': 1, 'mass': 57.02}]);
    t.equal(Math.abs((fragments['b']['1'][1] - 232.07362) / 232.07362 * 1000000) < 2, true, 'b2 +1 within 2 ppm');

    let nTermFragments = pepFrag.fragment('PEPTIDE', ['b', 'y'], [1], [{'position': 0, 'mass':24}]);
    t.equal(Math.abs((nTermFragments['b']['1'][0] - 122.06009) / 122.06009 * 1000000) < 2, true, 'b1 +1 within 2 ppm')

    t.end();
});


