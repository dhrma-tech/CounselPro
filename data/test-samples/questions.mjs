// Original sample questions written by CounselPro for development and demos (ORIGINAL_SAMPLE).
// They follow each exam's question style but are not past papers. Replace with the owners'
// own question bank through /admin/questions/import.
// Maths uses KaTeX delimiters: \( ... \) inline, \[ ... \] display.

const base = (externalKey, exam, subject, chapter, extra) => ({
  externalKey,
  exam,
  subject,
  chapter,
  difficulty: 2,
  licenseStatus: 'ORIGINAL_SAMPLE',
  keyVerified: true,
  status: 'APPROVED',
  ...extra,
});

const mcq = (key, exam, subject, chapter, stem, options, correct, solution, extra = {}) =>
  base(key, exam, subject, chapter, {
    type: 'SINGLE_MCQ',
    translations: { en: { stem, options, solution }, ...(extra.translations || {}) },
    answer: { correct: [correct] },
    ...(extra.difficulty ? { difficulty: extra.difficulty } : {}),
  });

const multi = (key, exam, subject, chapter, stem, options, correct, solution) =>
  base(key, exam, subject, chapter, { type: 'MULTI_MCQ', difficulty: 3, translations: { en: { stem, options, solution } }, answer: { correct } });

const numerical = (key, exam, subject, chapter, stem, answer, solution, extra = {}) =>
  base(key, exam, subject, chapter, {
    type: 'NUMERICAL',
    translations: { en: { stem, solution }, ...(extra.translations || {}) },
    answer,
  });

const matrix = (key, exam, subject, chapter, stem, options, correct, solution) =>
  base(key, exam, subject, chapter, { type: 'MATRIX_MATCH', difficulty: 3, translations: { en: { stem, options, solution } }, answer: { correct: [correct] } });

const paragraph = (key, exam, subject, chapter, groupId, passage, stem, options, correct, solution) =>
  base(key, exam, subject, chapter, {
    type: 'PARAGRAPH',
    groupId,
    difficulty: 3,
    translations: { en: { passage, stem, options, solution } },
    answer: { correct: [correct] },
  });

const opts = (a, b, c, d) => ({ a, b, c, d });

// ------------------------------------------------------------------ MHT-CET

const MHT = 'MHT_CET';
export const mhtCetPhysics = [
  mcq('SAMPLE-MHT-PHY-001', MHT, 'Physics', 'Rotational Dynamics',
    String.raw`A solid sphere rolls on a horizontal surface without slipping. What fraction of its total kinetic energy is rotational?`,
    opts(String.raw`\(\tfrac{2}{7}\)`, String.raw`\(\tfrac{2}{5}\)`, String.raw`\(\tfrac{5}{7}\)`, String.raw`\(\tfrac{1}{2}\)`), 'a',
    String.raw`For a solid sphere \(I = \tfrac{2}{5}mR^2\) and \(v = R\omega\). So \(KE_{rot} = \tfrac{1}{5}mv^2\) and \(KE_{total} = \tfrac{1}{2}mv^2 + \tfrac{1}{5}mv^2 = \tfrac{7}{10}mv^2\). Fraction \(= \tfrac{1/5}{7/10} = \tfrac{2}{7}\).`),
  mcq('SAMPLE-MHT-PHY-002', MHT, 'Physics', 'Oscillations',
    'The length of a simple pendulum is increased by 21%. By what percentage does its time period increase?',
    opts('10%', '21%', '11%', '42%'), 'a',
    String.raw`\(T \propto \sqrt{L}\). New length is \(1.21L\), so \(T' = \sqrt{1.21}\,T = 1.1\,T\): an increase of 10%.`,
    {
      translations: {
        mr: {
          stem: 'साध्या लंबकाची लांबी 21% ने वाढवली, तर त्याचा आवर्तकाल किती टक्क्यांनी वाढेल?',
          options: opts('10%', '21%', '11%', '42%'),
          solution: String.raw`\(T \propto \sqrt{L}\). नवीन लांबी \(1.21L\), म्हणून \(T' = \sqrt{1.21}\,T = 1.1\,T\), म्हणजे 10% वाढ.`,
        },
      },
    }),
  mcq('SAMPLE-MHT-PHY-003', MHT, 'Physics', 'Current Electricity',
    String.raw`Two resistors of \(6\,\Omega\) and \(3\,\Omega\) are connected in parallel across a \(6\,\text{V}\) battery of negligible internal resistance. What current flows from the battery?`,
    opts('3 A', '1 A', '0.67 A', '2 A'), 'a',
    String.raw`Equivalent resistance \(= \tfrac{6 \times 3}{6 + 3} = 2\,\Omega\). So \(I = \tfrac{V}{R} = \tfrac{6}{2} = 3\,\text{A}\).`,
    {
      translations: {
        mr: {
          stem: String.raw`\(6\,\Omega\) आणि \(3\,\Omega\) चे दोन रोधक समांतर जोडणीत \(6\,\text{V}\) च्या बॅटरीला (अंतर्गत रोध नगण्य) जोडले आहेत. बॅटरीतून वाहणारी विद्युतधारा किती?`,
          options: opts('3 A', '1 A', '0.67 A', '2 A'),
          solution: String.raw`समतुल्य रोध \(= \tfrac{6 \times 3}{6 + 3} = 2\,\Omega\). म्हणून \(I = \tfrac{V}{R} = \tfrac{6}{2} = 3\,\text{A}\).`,
        },
      },
    }),
  mcq('SAMPLE-MHT-PHY-004', MHT, 'Physics', 'Wave Optics',
    String.raw`In Young's double-slit experiment, \(\lambda = 600\,\text{nm}\), slit separation \(d = 0.5\,\text{mm}\) and screen distance \(D = 1\,\text{m}\). What is the fringe width?`,
    opts('1.2 mm', '0.6 mm', '2.4 mm', '0.3 mm'), 'a',
    String.raw`\(\beta = \tfrac{\lambda D}{d} = \tfrac{600 \times 10^{-9} \times 1}{0.5 \times 10^{-3}} = 1.2 \times 10^{-3}\,\text{m} = 1.2\,\text{mm}\).`),
  mcq('SAMPLE-MHT-PHY-005', MHT, 'Physics', 'Dual Nature of Radiation and Matter',
    String.raw`What is the energy of a photon of wavelength \(620\,\text{nm}\)? (Use \(hc = 1240\,\text{eV nm}\).)`,
    opts('2.0 eV', '1.0 eV', '3.1 eV', '0.5 eV'), 'a',
    String.raw`\(E = \tfrac{hc}{\lambda} = \tfrac{1240}{620} = 2.0\,\text{eV}\).`),
];

export const mhtCetChemistry = [
  mcq('SAMPLE-MHT-CHE-001', MHT, 'Chemistry', 'Solid State',
    'How many atoms are there in one unit cell of a face-centred cubic (fcc) lattice?',
    opts('1', '2', '4', '6'), 'c',
    String.raw`Corners: \(8 \times \tfrac{1}{8} = 1\). Face centres: \(6 \times \tfrac{1}{2} = 3\). Total \(= 4\).`),
  mcq('SAMPLE-MHT-CHE-002', MHT, 'Chemistry', 'Solutions',
    String.raw`4 g of NaOH (molar mass \(40\,\text{g mol}^{-1}\)) is dissolved in 500 g of water. What is the molality of the solution?`,
    opts('0.2 m', '0.1 m', '0.4 m', '0.8 m'), 'a',
    String.raw`Moles of NaOH \(= \tfrac{4}{40} = 0.1\). Molality \(= \tfrac{0.1}{0.5\,\text{kg}} = 0.2\,\text{m}\).`),
  mcq('SAMPLE-MHT-CHE-003', MHT, 'Chemistry', 'Chemical Kinetics',
    'A first-order reaction has a half-life of 30 minutes. How long does it take for 75% of the reactant to react?',
    opts('60 min', '45 min', '90 min', '120 min'), 'a',
    'After one half-life 50% remains; after two half-lives 25% remains, i.e. 75% has reacted. Time = 2 × 30 = 60 min.'),
  mcq('SAMPLE-MHT-CHE-004', MHT, 'Chemistry', 'Electrochemistry',
    String.raw`How much charge is needed to deposit 1 mol of copper from a solution of \(\text{Cu}^{2+}\) ions? (\(1\,F = 96500\,\text{C mol}^{-1}\))`,
    opts('96500 C', '193000 C', '48250 C', '289500 C'), 'b',
    String.raw`\(\text{Cu}^{2+} + 2e^- \rightarrow \text{Cu}\). Each mole needs 2 mol of electrons \(= 2F = 193000\,\text{C}\).`),
  mcq('SAMPLE-MHT-CHE-005', MHT, 'Chemistry', 'Alcohols, Phenols and Ethers',
    String.raw`What is the IUPAC name of \(\text{CH}_3\text{CH(OH)CH}_3\)?`,
    opts('Propan-1-ol', 'Propan-2-ol', '2-Methylethanol', 'Propanal'), 'b',
    'The longest chain has three carbons and the –OH group is on carbon 2, so the name is propan-2-ol.'),
];

export const mhtCetMaths = [
  mcq('SAMPLE-MHT-MAT-001', MHT, 'Mathematics', 'Differentiation',
    String.raw`If \(y = e^{2x}\), what is the value of \(\dfrac{d^2y}{dx^2}\) at \(x = 0\)?`,
    opts('4', '2', '1', '8'), 'a',
    String.raw`\(y' = 2e^{2x}\), \(y'' = 4e^{2x}\). At \(x = 0\), \(y'' = 4\).`),
  mcq('SAMPLE-MHT-MAT-002', MHT, 'Mathematics', 'Definite Integrals',
    String.raw`Evaluate \(\displaystyle\int_0^{\pi/2} \sin^2 x \, dx\).`,
    opts(String.raw`\(\tfrac{\pi}{4}\)`, String.raw`\(\tfrac{\pi}{2}\)`, '1', String.raw`\(\tfrac{1}{2}\)`), 'a',
    String.raw`\(\sin^2 x = \tfrac{1 - \cos 2x}{2}\). Integrating from 0 to \(\tfrac{\pi}{2}\) gives \(\tfrac{\pi}{4} - 0 = \tfrac{\pi}{4}\).`),
  mcq('SAMPLE-MHT-MAT-003', MHT, 'Mathematics', 'Matrices',
    String.raw`Find the determinant of \(\begin{bmatrix} 2 & 3 \\ 1 & 4 \end{bmatrix}\).`,
    opts('5', '11', '−5', '8'), 'a',
    String.raw`\(2 \times 4 - 3 \times 1 = 8 - 3 = 5\).`),
  mcq('SAMPLE-MHT-MAT-004', MHT, 'Mathematics', 'Probability',
    'Two fair dice are thrown. What is the probability that the sum of the numbers is 7?',
    opts(String.raw`\(\tfrac{1}{6}\)`, String.raw`\(\tfrac{1}{12}\)`, String.raw`\(\tfrac{7}{36}\)`, String.raw`\(\tfrac{5}{36}\)`), 'a',
    String.raw`Favourable pairs: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 of 36. Probability \(= \tfrac{1}{6}\).`),
  mcq('SAMPLE-MHT-MAT-005', MHT, 'Mathematics', 'Vectors',
    String.raw`What is the angle between the vectors \(\hat{i} + \hat{j}\) and \(\hat{j} + \hat{k}\)?`,
    opts(String.raw`\(\tfrac{\pi}{3}\)`, String.raw`\(\tfrac{\pi}{4}\)`, String.raw`\(\tfrac{\pi}{6}\)`, String.raw`\(\tfrac{\pi}{2}\)`), 'a',
    String.raw`\(\cos\theta = \tfrac{(1)(0) + (1)(1) + (0)(1)}{\sqrt{2}\,\sqrt{2}} = \tfrac{1}{2}\), so \(\theta = \tfrac{\pi}{3}\).`),
];

export const mhtCetBiology = [
  mcq('SAMPLE-MHT-BIO-001', MHT, 'Biology', 'Genetic Basis of Inheritance',
    'What is the phenotypic ratio in the F2 generation of a Mendelian dihybrid cross?',
    opts('9 : 3 : 3 : 1', '3 : 1', '1 : 2 : 1', '1 : 1 : 1 : 1'), 'a',
    'Independent assortment of two gene pairs gives 9 : 3 : 3 : 1 in the F2 generation.'),
  mcq('SAMPLE-MHT-BIO-002', MHT, 'Biology', 'Molecular Basis of Inheritance',
    'Which nitrogenous base is found in DNA but not in RNA?',
    opts('Thymine', 'Uracil', 'Adenine', 'Guanine'), 'a',
    'RNA contains uracil in place of thymine.'),
  mcq('SAMPLE-MHT-BIO-003', MHT, 'Biology', 'Human Reproduction',
    'Where does fertilisation usually take place in humans?',
    opts('Ampullary region of the fallopian tube', 'Uterus', 'Cervix', 'Ovary'), 'a',
    'The ovum and sperm usually meet in the ampulla (ampullary–isthmic junction) of the fallopian tube.'),
  mcq('SAMPLE-MHT-BIO-004', MHT, 'Biology', 'Respiration and Energy Transfer',
    'What is the net gain of ATP (by substrate-level phosphorylation) from glycolysis of one glucose molecule?',
    opts('2 ATP', '4 ATP', '36 ATP', '8 ATP'), 'a',
    '4 ATP are produced and 2 ATP are used, so the net gain is 2 ATP (plus 2 NADH).'),
  mcq('SAMPLE-MHT-BIO-005', MHT, 'Biology', 'Biotechnology',
    'The restriction enzyme EcoRI is obtained from which organism?',
    opts('Escherichia coli', 'Bacillus amyloliquefaciens', 'Haemophilus influenzae', 'Thermus aquaticus'), 'a',
    'EcoRI is named after Escherichia coli strain RY13.'),
];

// ------------------------------------------------------------------ JEE Main

const JM = 'JEE_MAIN';
export const jeeMainPhysics = [
  mcq('SAMPLE-JM-PHY-001', JM, 'Physics', 'Kinematics',
    String.raw`A ball is thrown vertically upward with a speed of \(20\,\text{m/s}\). What is the maximum height it reaches? (Take \(g = 10\,\text{m/s}^2\).)`,
    opts('20 m', '40 m', '10 m', '30 m'), 'a',
    String.raw`\(v^2 = u^2 - 2gh \Rightarrow 0 = 400 - 20h \Rightarrow h = 20\,\text{m}\).`,
    {
      translations: {
        hi: {
          stem: String.raw`एक गेंद को \(20\,\text{m/s}\) के वेग से ऊर्ध्वाधर ऊपर फेंका जाता है। गेंद अधिकतम कितनी ऊँचाई तक जाएगी? (\(g = 10\,\text{m/s}^2\) लें)`,
          options: opts('20 m', '40 m', '10 m', '30 m'),
          solution: String.raw`\(v^2 = u^2 - 2gh \Rightarrow 0 = 400 - 20h \Rightarrow h = 20\,\text{m}\).`,
        },
      },
    }),
  mcq('SAMPLE-JM-PHY-002', JM, 'Physics', 'Gravitation',
    String.raw`A planet has the same density as Earth but twice its radius. If the escape speed on Earth is \(11.2\,\text{km/s}\), what is it on the planet?`,
    opts('22.4 km/s', '11.2 km/s', '15.8 km/s', '44.8 km/s'), 'a',
    String.raw`\(v_e = \sqrt{2GM/R}\) and \(M \propto \rho R^3\), so \(v_e \propto R\sqrt{\rho}\). Doubling \(R\) doubles \(v_e\): \(22.4\,\text{km/s}\).`),
  mcq('SAMPLE-JM-PHY-003', JM, 'Physics', 'Electrostatics',
    'A parallel-plate capacitor is charged and then disconnected from the battery. The plate separation is then doubled. What happens to the stored energy?',
    opts('It doubles', 'It halves', 'It stays the same', 'It becomes four times'), 'a',
    String.raw`Charge \(Q\) stays the same. Doubling separation halves \(C\). Since \(U = \tfrac{Q^2}{2C}\), the energy doubles.`),
  mcq('SAMPLE-JM-PHY-004', JM, 'Physics', 'Moving Charges and Magnetism',
    'A proton moves parallel to a uniform magnetic field. What is the magnetic force on it?',
    opts('Zero', String.raw`\(qvB\)`, String.raw`\(qvB/2\)`, 'It depends on the mass of the proton'), 'a',
    String.raw`\(F = qvB\sin\theta\) and \(\theta = 0\), so \(F = 0\).`),
  numerical('SAMPLE-JM-PHY-005', JM, 'Physics', 'Laws of Motion',
    String.raw`A 2 kg block at rest on a frictionless floor is pushed by a constant horizontal force of 10 N for 3 s. What is its final speed in m/s?`,
    { exact: 15 },
    String.raw`\(a = \tfrac{F}{m} = 5\,\text{m/s}^2\). \(v = at = 5 \times 3 = 15\,\text{m/s}\).`),
];

export const jeeMainChemistry = [
  mcq('SAMPLE-JM-CHE-001', JM, 'Chemistry', 'Atomic Structure',
    String.raw`How many orbitals are there in the shell with principal quantum number \(n = 3\)?`,
    opts('9', '3', '6', '18'), 'a',
    String.raw`Number of orbitals \(= n^2 = 9\) (one 3s, three 3p, five 3d).`),
  mcq('SAMPLE-JM-CHE-002', JM, 'Chemistry', 'Chemical Bonding',
    String.raw`What is the hybridisation of the carbon atom in \(\text{CO}_2\)?`,
    opts('sp', String.raw`sp\(^2\)`, String.raw`sp\(^3\)`, String.raw`dsp\(^2\)`), 'a',
    'Carbon forms two σ bonds and has no lone pairs, so it is sp hybridised and the molecule is linear.'),
  mcq('SAMPLE-JM-CHE-003', JM, 'Chemistry', 'Thermodynamics',
    'Which of the following is an intensive property?',
    opts('Temperature', 'Volume', 'Mass', 'Enthalpy'), 'a',
    'Intensive properties do not depend on the amount of substance. Temperature is intensive; the others are extensive.'),
  mcq('SAMPLE-JM-CHE-004', JM, 'Chemistry', 'Ionic Equilibrium',
    'What is the pH of a 0.001 M HCl solution?',
    opts('3', '1', '11', '2'), 'a',
    String.raw`HCl is a strong acid: \([\text{H}^+] = 10^{-3}\), so pH \(= 3\).`),
  numerical('SAMPLE-JM-CHE-005', JM, 'Chemistry', 'Some Basic Concepts of Chemistry',
    String.raw`What is the mass, in grams, of 0.5 mol of \(\text{H}_2\text{SO}_4\)? (H = 1, S = 32, O = 16)`,
    { exact: 49 },
    String.raw`Molar mass \(= 2 + 32 + 64 = 98\,\text{g/mol}\). Mass \(= 0.5 \times 98 = 49\,\text{g}\).`),
];

export const jeeMainMaths = [
  mcq('SAMPLE-JM-MAT-001', JM, 'Mathematics', 'Quadratic Equations',
    String.raw`What is the sum of the roots of \(2x^2 - 6x + 1 = 0\)?`,
    opts('3', '−3', String.raw`\(\tfrac{1}{2}\)`, '6'), 'a',
    String.raw`Sum of roots \(= -\tfrac{b}{a} = \tfrac{6}{2} = 3\).`),
  mcq('SAMPLE-JM-MAT-002', JM, 'Mathematics', 'Sequences and Series',
    'Find the sum of the first 10 terms of the AP 3, 7, 11, …',
    opts('210', '200', '230', '190'), 'a',
    String.raw`\(S_{10} = \tfrac{10}{2}\,[2(3) + 9(4)] = 5 \times 42 = 210\).`),
  mcq('SAMPLE-JM-MAT-003', JM, 'Mathematics', 'Limits and Continuity',
    String.raw`Evaluate \(\displaystyle\lim_{x \to 0} \frac{\sin 3x}{x}\).`,
    opts('3', '1', '0', String.raw`\(\tfrac{1}{3}\)`), 'a',
    String.raw`\(\tfrac{\sin 3x}{x} = 3 \cdot \tfrac{\sin 3x}{3x} \to 3 \times 1 = 3\).`),
  mcq('SAMPLE-JM-MAT-004', JM, 'Mathematics', 'Coordinate Geometry',
    'What is the distance between the points (1, 2) and (4, 6)?',
    opts('5', '7', String.raw`\(\sqrt{7}\)`, '25'), 'a',
    String.raw`\(\sqrt{(4-1)^2 + (6-2)^2} = \sqrt{9 + 16} = 5\).`),
  numerical('SAMPLE-JM-MAT-005', JM, 'Mathematics', 'Permutations and Combinations',
    'In how many different ways can the letters of the word LEVEL be arranged?',
    { exact: 30 },
    String.raw`5 letters with L twice and E twice: \(\tfrac{5!}{2!\,2!} = \tfrac{120}{4} = 30\).`),
];

// ------------------------------------------------------------------ JEE Advanced

const JA = 'JEE_ADV';
export const jeeAdvPhysics = [
  mcq('SAMPLE-JA-PHY-001', JA, 'Physics', 'Circular Motion',
    String.raw`A particle moves in a circle of radius 2 m with a constant speed of 4 m/s. What is the magnitude of its acceleration?`,
    opts(String.raw`\(8\,\text{m/s}^2\)`, String.raw`\(2\,\text{m/s}^2\)`, String.raw`\(16\,\text{m/s}^2\)`, 'Zero'), 'a',
    String.raw`Only centripetal acceleration: \(a = \tfrac{v^2}{r} = \tfrac{16}{2} = 8\,\text{m/s}^2\).`),
  mcq('SAMPLE-JA-PHY-002', JA, 'Physics', 'Oscillations',
    String.raw`Two identical springs, each of spring constant \(k\), are joined in series. What is the effective spring constant?`,
    opts(String.raw`\(\tfrac{k}{2}\)`, String.raw`\(2k\)`, String.raw`\(k\)`, String.raw`\(\tfrac{k}{4}\)`), 'a',
    String.raw`In series, \(\tfrac{1}{k_{eff}} = \tfrac{1}{k} + \tfrac{1}{k} = \tfrac{2}{k}\), so \(k_{eff} = \tfrac{k}{2}\).`),
  multi('SAMPLE-JA-PHY-003', JA, 'Physics', 'Thermodynamics',
    'An ideal gas expands isothermally. Which of the following statements are correct?',
    opts('Its internal energy does not change', 'The work done by the gas is positive', 'The heat absorbed equals the work done by the gas', 'Its temperature increases'),
    ['a', 'b', 'c'],
    String.raw`For an ideal gas, \(U\) depends only on \(T\), so \(\Delta U = 0\). In expansion \(W > 0\). From the first law, \(Q = W\). Temperature is constant, so (D) is wrong.`),
  numerical('SAMPLE-JA-PHY-004', JA, 'Physics', 'Work, Energy and Power',
    String.raw`A 1 kg body is dropped from rest from a height of 5 m. What is its speed (in m/s) just before it hits the ground? (Take \(g = 10\,\text{m/s}^2\), ignore air resistance.)`,
    { exact: 10 },
    String.raw`\(v = \sqrt{2gh} = \sqrt{2 \times 10 \times 5} = 10\,\text{m/s}\).`),
  matrix('SAMPLE-JA-PHY-005', JA, 'Physics', 'Electromagnetic Induction',
    String.raw`Match each quantity in List-I with its SI unit in List-II.
<table><tr><th>List-I</th><th>List-II</th></tr>
<tr><td>(P) Magnetic flux</td><td>(1) weber</td></tr>
<tr><td>(Q) Inductance</td><td>(2) henry</td></tr>
<tr><td>(R) Capacitance</td><td>(3) farad</td></tr>
<tr><td>(S) Magnetic field</td><td>(4) tesla</td></tr></table>`,
    opts('P→1, Q→2, R→3, S→4', 'P→4, Q→2, R→3, S→1', 'P→1, Q→3, R→2, S→4', 'P→2, Q→1, R→4, S→3'), 'a',
    'Magnetic flux is measured in weber, inductance in henry, capacitance in farad and magnetic field in tesla.'),
];

const KINETICS_PASSAGE = String.raw`A first-order reaction \(A \rightarrow B\) has a rate constant \(k = 0.0693\,\text{min}^{-1}\). Use \(\ln 2 = 0.693\).`;

export const jeeAdvChemistry = [
  mcq('SAMPLE-JA-CHE-001', JA, 'Chemistry', 'Redox Reactions',
    String.raw`What is the oxidation state of chromium in \(\text{K}_2\text{Cr}_2\text{O}_7\)?`,
    opts('+6', '+3', '+7', '+2'), 'a',
    String.raw`\(2(+1) + 2x + 7(-2) = 0 \Rightarrow x = +6\).`),
  mcq('SAMPLE-JA-CHE-002', JA, 'Chemistry', 'Hydrogen Bonding',
    'Which of these hydrides has the highest boiling point?',
    opts(String.raw`\(\text{H}_2\text{O}\)`, String.raw`\(\text{H}_2\text{S}\)`, String.raw`\(\text{H}_2\text{Se}\)`, String.raw`\(\text{H}_2\text{Te}\)`), 'a',
    'Water molecules form strong intermolecular hydrogen bonds, which give it by far the highest boiling point.'),
  multi('SAMPLE-JA-CHE-003', JA, 'Chemistry', 'Aromaticity',
    'Which of the following species are aromatic?',
    opts('Benzene', 'Cyclopentadienyl anion', 'Cyclooctatetraene', 'Pyridine'),
    ['a', 'b', 'd'],
    String.raw`Benzene, the cyclopentadienyl anion and pyridine are planar, cyclic and fully conjugated with 6 π electrons (\(4n+2\), \(n = 1\)). Cyclooctatetraene has 8 π electrons and is tub-shaped, so it is not aromatic.`),
  numerical('SAMPLE-JA-CHE-004', JA, 'Chemistry', 'd- and f-Block Elements',
    String.raw`How many unpaired electrons are present in the \(\text{Fe}^{3+}\) ion? (Atomic number of Fe = 26)`,
    { exact: 5 },
    String.raw`\(\text{Fe}^{3+}\): [Ar] \(3d^5\). All five d electrons are unpaired.`),
  paragraph('SAMPLE-JA-CHE-005', JA, 'Chemistry', 'Chemical Kinetics', 'SAMPLE-JA-KINETICS', KINETICS_PASSAGE,
    'What is the half-life of the reaction?',
    opts('10 min', '6.93 min', '100 min', '1 min'), 'a',
    String.raw`\(t_{1/2} = \tfrac{0.693}{k} = \tfrac{0.693}{0.0693} = 10\,\text{min}\).`),
  paragraph('SAMPLE-JA-CHE-006', JA, 'Chemistry', 'Chemical Kinetics', 'SAMPLE-JA-KINETICS', KINETICS_PASSAGE,
    String.raw`How long does it take for the concentration of \(A\) to fall to one-quarter of its initial value?`,
    opts('20 min', '10 min', '40 min', '30 min'), 'a',
    String.raw`One-quarter means two half-lives: \(2 \times 10 = 20\,\text{min}\).`),
];

export const jeeAdvMaths = [
  mcq('SAMPLE-JA-MAT-001', JA, 'Mathematics', 'Integration',
    String.raw`Evaluate \(\displaystyle\int_0^1 x e^x \, dx\).`,
    opts('1', String.raw`\(e - 1\)`, String.raw`\(e\)`, String.raw`\(\tfrac{1}{2}\)`), 'a',
    String.raw`By parts: \(\int x e^x dx = (x - 1)e^x\). From 0 to 1: \(0 - (-1) = 1\).`),
  mcq('SAMPLE-JA-MAT-002', JA, 'Mathematics', 'Quadratic Equations',
    String.raw`How many real solutions does \(x^2 - 5|x| + 6 = 0\) have?`,
    opts('4', '2', '1', '0'), 'a',
    String.raw`Put \(t = |x|\): \(t^2 - 5t + 6 = 0 \Rightarrow t = 2, 3\). So \(x = \pm 2, \pm 3\): four solutions.`),
  multi('SAMPLE-JA-MAT-003', JA, 'Mathematics', 'Application of Derivatives',
    String.raw`Let \(f(x) = x^3 - 3x\). Which of the following are correct?`,
    opts(String.raw`\(f\) has a local maximum at \(x = -1\)`, String.raw`\(f\) has a local minimum at \(x = 1\)`, String.raw`\(f\) is an odd function`, String.raw`\(f\) is increasing on \((-1, 1)\)`),
    ['a', 'b', 'c'],
    String.raw`\(f'(x) = 3x^2 - 3 = 0 \Rightarrow x = \pm 1\). \(f''(-1) = -6 < 0\) (max), \(f''(1) = 6 > 0\) (min). \(f(-x) = -f(x)\), so odd. On \((-1, 1)\), \(f' < 0\), so \(f\) is decreasing.`),
  numerical('SAMPLE-JA-MAT-004', JA, 'Mathematics', 'Probability',
    String.raw`A fair coin is tossed 3 times. If \(p\) is the probability of getting exactly 2 heads, find \(8p\).`,
    { exact: 3 },
    String.raw`\(p = \binom{3}{2}\left(\tfrac{1}{2}\right)^3 = \tfrac{3}{8}\), so \(8p = 3\).`),
  matrix('SAMPLE-JA-MAT-005', JA, 'Mathematics', 'Differentiation',
    String.raw`Match each function in List-I with the value of its derivative at \(x = 0\) in List-II.
<table><tr><th>List-I</th><th>List-II</th></tr>
<tr><td>(P) \(\sin x\)</td><td>(1) 0</td></tr>
<tr><td>(Q) \(e^{2x}\)</td><td>(2) 1</td></tr>
<tr><td>(R) \(x^2\)</td><td>(3) 2</td></tr>
<tr><td>(S) \(\ln(1 + 3x)\)</td><td>(4) 3</td></tr></table>`,
    opts('P→2, Q→3, R→1, S→4', 'P→1, Q→3, R→2, S→4', 'P→2, Q→4, R→1, S→3', 'P→3, Q→2, R→1, S→4'), 'a',
    String.raw`\((\sin x)' = \cos 0 = 1\); \((e^{2x})' = 2\); \((x^2)' = 0\); \((\ln(1 + 3x))' = \tfrac{3}{1 + 3x} = 3\).`),
];

// ------------------------------------------------------------------ NEET UG

const NE = 'NEET_UG';
export const neetPhysics = [
  mcq('SAMPLE-NEET-PHY-001', NE, 'Physics', 'Units and Measurements',
    'What are the dimensions of force?',
    opts(String.raw`\([MLT^{-2}]\)`, String.raw`\([MLT^{-1}]\)`, String.raw`\([ML^2T^{-2}]\)`, String.raw`\([ML^{-1}T^{-2}]\)`), 'a',
    String.raw`\(F = ma\), so \([F] = [M][LT^{-2}] = [MLT^{-2}]\).`),
  mcq('SAMPLE-NEET-PHY-002', NE, 'Physics', 'Work, Energy and Power',
    'What is the kinetic energy of a 2 kg body moving at 3 m/s?',
    opts('9 J', '6 J', '18 J', '3 J'), 'a',
    String.raw`\(KE = \tfrac{1}{2}mv^2 = \tfrac{1}{2} \times 2 \times 9 = 9\,\text{J}\).`),
  mcq('SAMPLE-NEET-PHY-003', NE, 'Physics', 'Ray Optics',
    'What is the power of a convex lens of focal length 50 cm?',
    opts('+2 D', '−2 D', '+0.5 D', '+50 D'), 'a',
    String.raw`\(P = \tfrac{1}{f(\text{m})} = \tfrac{1}{0.5} = +2\,\text{D}\).`),
  mcq('SAMPLE-NEET-PHY-004', NE, 'Physics', 'Nuclei',
    'A radioactive sample has a half-life of 10 days. What fraction of it remains after 30 days?',
    opts(String.raw`\(\tfrac{1}{8}\)`, String.raw`\(\tfrac{1}{3}\)`, String.raw`\(\tfrac{1}{4}\)`, String.raw`\(\tfrac{1}{16}\)`), 'a',
    String.raw`30 days = 3 half-lives, so \(\left(\tfrac{1}{2}\right)^3 = \tfrac{1}{8}\) remains.`),
];

export const neetChemistry = [
  mcq('SAMPLE-NEET-CHE-001', NE, 'Chemistry', 'Some Basic Concepts of Chemistry',
    'How many molecules are present in 18 g of water?',
    opts(String.raw`\(6.022 \times 10^{23}\)`, String.raw`\(3.011 \times 10^{23}\)`, String.raw`\(1.204 \times 10^{24}\)`, String.raw`\(18 \times 10^{23}\)`), 'a',
    String.raw`18 g of water is 1 mol, which contains \(N_A = 6.022 \times 10^{23}\) molecules.`),
  mcq('SAMPLE-NEET-CHE-002', NE, 'Chemistry', 'Classification of Elements and Periodicity',
    'Which element is the most electronegative?',
    opts('Fluorine', 'Oxygen', 'Chlorine', 'Nitrogen'), 'a',
    'Fluorine has the highest electronegativity (about 4.0 on the Pauling scale).'),
  mcq('SAMPLE-NEET-CHE-003', NE, 'Chemistry', 'Hydrocarbons',
    'What is the general formula of alkynes?',
    opts(String.raw`\(\text{C}_n\text{H}_{2n-2}\)`, String.raw`\(\text{C}_n\text{H}_{2n}\)`, String.raw`\(\text{C}_n\text{H}_{2n+2}\)`, String.raw`\(\text{C}_n\text{H}_{n}\)`), 'a',
    'Alkynes have one triple bond, so they have two fewer hydrogens than the corresponding alkene: CₙH₂ₙ₋₂.'),
  mcq('SAMPLE-NEET-CHE-004', NE, 'Chemistry', 'Biomolecules',
    'Glucose is best described as:',
    opts('An aldohexose', 'A ketohexose', 'An aldopentose', 'A disaccharide'), 'a',
    'Glucose has six carbons and an aldehyde group, so it is an aldohexose.'),
];

export const neetBotany = [
  mcq('SAMPLE-NEET-BOT-001', NE, 'Botany', 'Cell: The Unit of Life',
    'Apart from the nucleus, which of these organelles contains its own DNA?',
    opts('Mitochondrion', 'Golgi apparatus', 'Lysosome', 'Endoplasmic reticulum'), 'a',
    'Mitochondria (and chloroplasts) contain their own circular DNA and 70S ribosomes.'),
  mcq('SAMPLE-NEET-BOT-002', NE, 'Botany', 'Plant Kingdom',
    'In which group of plants are the seeds naked (not enclosed in a fruit)?',
    opts('Gymnosperms', 'Angiosperms', 'Pteridophytes', 'Bryophytes'), 'a',
    'Gymnosperms have ovules that are not enclosed in an ovary, so their seeds are naked.'),
  mcq('SAMPLE-NEET-BOT-003', NE, 'Botany', 'Photosynthesis in Higher Plants',
    'What is the first stable product of carbon fixation in the Calvin (C3) cycle?',
    opts('3-Phosphoglyceric acid', 'Oxaloacetic acid', 'Ribulose bisphosphate', 'Glucose'), 'a',
    'RuBisCO fixes CO₂ onto RuBP, forming two molecules of 3-phosphoglyceric acid (3-PGA).'),
  mcq('SAMPLE-NEET-BOT-004', NE, 'Botany', 'Principles of Inheritance and Variation',
    "Mendel's law of independent assortment was based on which kind of cross?",
    opts('Dihybrid cross', 'Monohybrid cross', 'Test cross', 'Back cross'), 'a',
    'Following two characters together in a dihybrid cross showed that they assort independently.'),
];

export const neetZoology = [
  mcq('SAMPLE-NEET-ZOO-001', NE, 'Zoology', 'Digestion and Absorption',
    'Which enzyme is present in human saliva?',
    opts('Salivary amylase (ptyalin)', 'Pepsin', 'Trypsin', 'Lipase'), 'a',
    'Saliva contains salivary amylase, which starts the digestion of starch.'),
  mcq('SAMPLE-NEET-ZOO-002', NE, 'Zoology', 'Breathing and Exchange of Gases',
    'What is the approximate tidal volume of a healthy adult at rest?',
    opts('500 mL', '1200 mL', '2500 mL', '150 mL'), 'a',
    'Tidal volume, the air breathed in or out in a normal breath, is about 500 mL.'),
  mcq('SAMPLE-NEET-ZOO-003', NE, 'Zoology', 'Body Fluids and Circulation',
    'Which blood vessel carries oxygenated blood from the lungs to the heart?',
    opts('Pulmonary vein', 'Pulmonary artery', 'Vena cava', 'Aorta'), 'a',
    'Pulmonary veins return oxygenated blood from the lungs to the left atrium.'),
  mcq('SAMPLE-NEET-ZOO-004', NE, 'Zoology', 'Evolution',
    "Darwin's finches of the Galápagos Islands are an example of:",
    opts('Adaptive radiation', 'Convergent evolution', 'Industrial melanism', 'Genetic drift only'), 'a',
    'Many finch species evolved from one ancestral type to fill different niches: adaptive radiation.'),
];

export const allSampleQuestions = [
  ...mhtCetPhysics, ...mhtCetChemistry, ...mhtCetMaths, ...mhtCetBiology,
  ...jeeMainPhysics, ...jeeMainChemistry, ...jeeMainMaths,
  ...jeeAdvPhysics, ...jeeAdvChemistry, ...jeeAdvMaths,
  ...neetPhysics, ...neetChemistry, ...neetBotany, ...neetZoology,
];
