var peptide_cutter = require('./index');

var cut = new peptide_cutter({
    'enzyme': 'trypsin',
    'num_missed_cleavages': 0,
    'min_length': 2,
    'max_length': 30
});
console.log(cut);

var peptides = cut.cleave("MRPAAAWKPAAAMKPAAAWRPAAAKIIIRPNNN");
for(var i=0; i<peptides.length; i++) {
    console.log(peptides[i]);
}
