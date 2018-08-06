const residue_masses = {
  "A": 71.03711,
  "R": 156.10111,
  "N": 114.04293,
  "D": 115.02694,
  "C": 103.00919,
  "E": 129.04259,
  "Q": 128.05858,
  "G": 57.02146,
  "H": 137.05891,
  "I": 113.08406,
  "L": 113.08406,
  "K": 128.09496,
  "M": 131.04049,
  "F": 147.06841,
  "P": 97.05276,
  "S": 87.03203,
  "T": 101.04768,
  "W": 186.07931,
  "Y": 163.06333,
  "V": 99.06841
};

// These are the mass shifts to go from the residue mass to the ion
// This is a helpful resource https://www.uab.edu/proteomics/pdf_files/2011/BMG744-01-14-11.pdf
const A_SHIFT = -27.994915; // -CO
const B_SHIFT = 0; // Nothing
const C_SHIFT = 17.026548; // NH3
const X_SHIFT = 27.994915 + 18.010565 - (2 * 1.007276466812); // CO2
const Y_SHIFT = 18.010565; // H2O
const Z_SHIFT = -17.026548 + 18.010565; // -NH3 + H2O

const PROTON = 1.007276466812;

module.exports.fragment = function(sequence, ion_types=['b', 'y'], fragment_charges=[1], modifications=[]) {
  sequence = sequence.toUpperCase();
  const ILLEGAL = [ 'B', 'J', 'O', 'U', 'X', 'Z' ];

  let sequenceList = sequence.split("");

  // For now we don't handle ambiguous symbols, just return nothing
  let overlap = sequenceList.filter(val => -1 !== ILLEGAL.indexOf(val));
  if(overlap.length > 0) {
    return {};
  }

  // Convert the residues to masses
  let massList = sequenceList.map((residue) => {
    return residue_masses[residue];
  });

  // Add in the modifications
  for (var i=0; i<modifications.length; i++) {
    let mod = modifications[i];
    let pos = mod.position;
    let mass = mod.mass;
    massList[pos] = massList[pos] + mass;
  }

  // Accumulate the masses into a running total both forwards and backwards
  let len = massList.length;
  let forwardMasses = new Array(len);
  let backwardMasses = new Array(len);
  forwardMasses[0] = massList[0];
  backwardMasses[len-1] = massList[len-1];
  for(var i=1; i<massList.length; i++) {
    let j = len - 1 - i;
    forwardMasses[i] = forwardMasses[i-1] + massList[i];
    backwardMasses[j] = backwardMasses[j+1] + massList[j];
  }
  forwardMasses.pop();
  backwardMasses.shift();

  let results = {};

  // Now we go over the ion types and fragment charges
  ion_types.forEach(function(type) {
    let ions = [];
    results[type] = {};
    switch(type) {
      case 'a':
        ions = calculateIons(A_SHIFT, forwardMasses);
        break;
      case 'b':
        ions = calculateIons(B_SHIFT, forwardMasses);
        break;
      case 'c':
        ions = calculateIons(C_SHIFT, forwardMasses);
        break;
      case 'x':
        ions = calculateIons(X_SHIFT, backwardMasses);
        break;
      case 'y':
        ions = calculateIons(Y_SHIFT, backwardMasses);
        break;
      case 'z':
        ions = calculateIons(Z_SHIFT, backwardMasses);
        break;
      default:
        break;
    }
    fragment_charges.forEach(function(charge) {
      let charged_ions = ions.map((ion) => {
        return (ion + charge * PROTON) / charge;
      });
      results[type][charge] = charged_ions;
    })
  });
  
  return results;
}

calculateIons = (shift, masses) => {
  let ions = masses.map((mass) => {
    return mass + shift;
  });
  return ions;
}
