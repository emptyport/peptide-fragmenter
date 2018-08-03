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


