# Peptide Fragmenter

[![Build Status](https://travis-ci.org/emptyport/peptide-fragmenter.svg?branch=master)](https://travis-ci.org/emptyport/peptide-fragmenter)
[![codecov](https://codecov.io/gh/emptyport/peptide-fragmenter/branch/master/graph/badge.svg)](https://codecov.io/gh/emptyport/peptide-fragmenter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A library for *in silico* fragmentation of proteins and peptides.

View on npm [here](https://www.npmjs.com/package/peptide-fragmenter).


## Installation
npm install peptide-fragmenter --save

## Usage
#### Quickstart
``` javascript
var pepFrag = require('peptide-fragmenter');

let fragments = pepFrag.fragment('ACDEFGHIKLMNPQRSTVWY', ['b','y'], [1,2], [{'position': 1, 'mass': 57.02}]);
console.log(fragments);
```

Output
``` javascript
{ b: 
   { '1': 
      [ 72.044386466812,
        232.073576466812,
        347.10051646681205,
        476.14310646681207,
        623.211516466812,
        680.232976466812,
        817.291886466812,
        930.375946466812,
        1058.470906466812,
        1171.554966466812,
        1302.595456466812,
        1416.638386466812,
        1513.6911464668121,
        1641.7497264668123,
        1797.8508364668123,
        1884.8828664668124,
        1985.9305464668123,
        2084.998956466812,
        2271.0782664668122 ],
     '2': 
      [ 36.525831466812,
        116.54042646681201,
        174.053896466812,
        238.57519146681202,
        312.10939646681203,
        340.62012646681205,
        409.14958146681204,
        465.69161146681205,
        529.7390914668119,
        586.2811214668119,
        651.8013664668119,
        708.822831466812,
        757.349211466812,
        821.378501466812,
        899.4290564668121,
        942.9450714668121,
        993.4689114668121,
        1043.0031164668121,
        1136.0427714668122 ] },
  y: 
   { '1': 
      [ 2381.115051466812,
        2221.085861466812,
        2106.0589214668116,
        1977.0163314668118,
        1829.9479214668117,
        1772.9264614668118,
        1635.8675514668118,
        1522.783491466812,
        1394.688531466812,
        1281.6044714668121,
        1150.563981466812,
        1036.521051466812,
        939.4682914668119,
        811.4097114668119,
        655.308601466812,
        568.276571466812,
        467.228891466812,
        368.16048146681203,
        182.08117146681198 ],
     '2': 
      [ 1191.061163966812,
        1111.046568966812,
        1053.5330989668118,
        989.0118039668118,
        915.4775989668118,
        886.9668689668118,
        818.4374139668118,
        761.8953839668119,
        697.8479039668119,
        641.305873966812,
        575.7856289668119,
        518.7641639668119,
        470.237783966812,
        406.208493966812,
        328.157938966812,
        284.64192396681204,
        234.11808396681198,
        184.583878966812,
        91.544223966812 ] 
    } 
}
```

#### fragment(sequence, ion_types, fragment_charges, modifications)
* `sequence` is the only required parameter for this method and is the amino acid sequence you wish to fragment. B, J, O, U, X, and Z are not valid residues and will result in no fragments being returned.
* `ion_types` is an array of ion types to calculate. The default is ```['b', 'y']```. You can also calculate a, c, x, and z ions.
* `fragment_charges` is an array of charge states to predict for the fragments. The default is ```[1]```. You can pass in any integer values.
* `modifications` is an array of objects containing information about the position and mass of modifications. The default is ```[]``` being no modifications.

The output of this function is an object in which the keys are the ion types. Each ion type itself is an object with the fragment charges as the keys. Each charge key holds an array of m/z values correlating to each fragment. The final fragment (corresponding to the full length peptide) is excluded from all ion types.

The m/z values match pretty closely with the [online Proteomics Toolkit Fragment Ion Calculator](http://db.systemsbiology.net:8080/proteomicsToolkit/FragIonServlet.html), but the values don't quite exactly match, probably just due to slightly different input values for the residue masses and whatnot. In most cases the m/z values are within 1 ppm. The lower the m/z value the higher the deviation (up to about 3 ppm), but generally speaking these differences are not significant, especially given the fact that the tolerances for peptide spectrum matching are often either 0.5 Da or 20 ppm (which are both far above my 1 ppm deviation). Even a tolerance of 0.01 Da is above that deviation (0.01 Da is 5 ppm at m/z 2000 and 50 ppm at m/z 200).

## Tests
You can run `npm test` to run the tests after installing the development dependencies. 

## Future functionality
There are currently no planned improvements to this module. I am open to suggestions so let me know if you think something is missing.

## License
This software is released under the MIT license

## Support this project!

[![Support this project on Patreon!](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/MikeTheBiochem)
