$(document).ready(function()
{
	$(".button-collapse").sideNav();
	init();
})

var currentColor;
var game;

var currentCategoryIndex = null;
var currentQuestionIndex = null;

var currentScore = null;

function getCurrentCategory()
{
	return game.categories[currentCategoryIndex];
}

function getCurrentQuestion()
{
	return game.categories[currentCategoryIndex].questions[currentQuestionIndex];
}

function resetGame()
{
	currentCategory = null;
	currentQuestion = null;
	currentScore = 0;
}

function giveQuestion()
{
	// hideQuestion();
	$(".questionLayout").slideUp("slow", function()
		{
			console.log(getCurrentCategory());
			console.log(getCurrentQuestion());
			$("#question").text(getCurrentQuestion().question);
			checkImage();
			setHints();
			hideAnswerFields();
			clearAnswerFields();
			console.log("Score: " + currentScore);
			showQuestion();
		});
}

function checkImage()
{
	$("#question-image").hide();

	if(getCurrentQuestion().image != null)
	{
		$("#question-image").attr("src", "img/" + getCurrentQuestion().image);
		$("#question-image").show();
	}
}

function validate()
{
	var max = getCurrentQuestion().hints.length;
	var answerFields = [$("#answer-field-0").val(), $("#answer-field-1").val(), $("#answer-field-2").val(), $("#answer-field-3").val(), $("#answer-field-4").val(), $("#answer-field-5").val()]
	var flag = true;

	console.log(answerFields);
	console.log(getCurrentQuestion().answers);

	for(var i = 0; i < max; i++)
	{
		if(!(validateField(answerFields[i], getCurrentQuestion().answers[i])))
			flag = false;

		if(!flag)
			break;
	}

	if(flag)
		currentScore++;
	else
	{
		alert("Wrong answer! The correct answer/s to this question is/are: " + getCurrentQuestion().answers)
	}

	if(currentQuestionIndex < 9)
	{
		currentQuestionIndex++;
		giveQuestion();
	}
	else
	{
		alert("Congratulations! You scored " + currentScore + " out of 10!");
		endQuestions();
		resetColor();
		resetGame();
	}
}

function validateField(a, b)
{
	console.log(a.toUpperCase());
	console.log(b.toUpperCase());

	if(a.toUpperCase() == b.toUpperCase())
		return true;
	return false;
}

function setHints()
{
	console.log(getCurrentQuestion().hints);

	switch(getCurrentQuestion().hints.length)
	{
		case 7: $("#answer-hint-6").text("Hint: " + getCurrentQuestion().hints[6]);
		case 6: $("#answer-hint-5").text("Hint: " + getCurrentQuestion().hints[5]);
		case 5: $("#answer-hint-4").text("Hint: " + getCurrentQuestion().hints[4]);
		case 4: $("#answer-hint-3").text("Hint: " + getCurrentQuestion().hints[3]);
		case 3: $("#answer-hint-2").text("Hint: " + getCurrentQuestion().hints[2]);
		case 2: $("#answer-hint-1").text("Hint: " + getCurrentQuestion().hints[1]);
		case 1: $("#answer-hint-0").text("Hint: " + getCurrentQuestion().hints[0]);
	}
}

function hideAnswerFields()
{
	$("#answer-0").show();
	$("#answer-1").show();
	$("#answer-2").show();
	$("#answer-3").show();
	$("#answer-4").show();
	$("#answer-5").show();
	$("#answer-6").show();

	switch(getCurrentQuestion().hints.length)
	{
		case 1: $("#answer-1").hide();
		case 2: $("#answer-2").hide();
		case 3: $("#answer-3").hide();
		case 4: $("#answer-4").hide();
		case 5: $("#answer-5").hide();
		case 6: $("#answer-6").hide();
	}
}

function hideImage()
{
	$("#question-image").show();

	if(getCurrentQuestion().image == null)
		$("#question-image").hide();
}

function clearAnswerFields()
{
	$(".questionCard").find('form')[0].reset();
}

function startQuestions(n)
{
	resetGame();
	hideMain();
	
	currentCategoryIndex = n;
	currentQuestionIndex = 0;

	giveQuestion();
}

function endQuestions()
{
	showMain();
	hideQuestion();
}

function hideMain()
{
	$(".mainMenu").slideUp("slow");
}

function showMain()
{
	$(".mainMenu").slideDown("slow");
	resetGame();
}

function hideQuestion()
{
	$(".questionLayout").slideUp("slow");
}

function showQuestion()
{
	$(".questionLayout").slideDown("slow");
}

function setColor(color)
{
	currentColor = color
	$("nav").removeClass('blue').addClass('accent-3', "slow", "swing").addClass(color, "slow", "swing");
	$("body").removeClass('white').addClass('accent-1', "slow", "swing").addClass(color, "slow", "swing");
}

function resetColor()
{
	$("nav").removeClass(currentColor).addClass('accent-3', "slow", "swing").addClass('blue', "slow", "swing");
	$("body").removeClass(currentColor).addClass("white", "slow", "swing").removeClass('accent-1');
}

function init()
{
	var c1q1 = new Question(
		null,
		"Scientific discipline that seeks to explain life at the molecular level",
		["B_ _ _ _ _ _ _ _ _ _ _ _"],
		["biochemistry"]);

	var c1q2 = new Question(
		null,
		"Major types of biomolecules",
		["A _ _ _ _ _   A _ _ _", "C _ _ _ _ _ _ _ _ _ _ _ _ _", "N _ _ _ _ _ _ _ _ _ _", "L _ _ _ _ _"],
		["amino acid", "carbohydrates", "nucleotides", "lipids"]);

	var c1q3 = new Question(
		null,
		"Major kinds of biological polymers",
		["P _ _ _ _ _ _ _", "N _ _ _ _ _ _   A _ _ _ _", "P _ _ _ _ _ _ _ _ _ _ _ _ _ _"],
		["proteins", "nucleic acids", "polysaccharides"]);

	var c1q4 = new Question(
		null,
		"It is the heat content of the system",
		["E _ _ _ _ _ _ _ _"],
		["enthalpy"]);

	var c1q5 = new Question(
		null,
		"It is the measure of how the energy is dispersed within the system",
		["E _ _ _ _ _ _"],
		["entropy"]);

	var c1q6 = new Question(
		null,
		"The term called if a molecule gains an electron",
		["R _ _ _ _ _ _ _ _"],
		["reduction"]);

	var c1q7 = new Question(
		null,
		"The term called if a molecule loses an electron through addition of oxygen",
		["O _ _ _ _ _ _ _ _"],
		["oxidation"]);

	var c1q8 = new Question(
		null,
		"Organisms that lack discrete nucleus and usually contain no internal membrane systems",
		["P _ _ _ _ _ _ _ _ _ _"],
		["prokaryotes"]);

	var c1q9 = new Question(
		null,
		"Organisms that have usually larger cells and contain nucleus and other membranebound organelles",
		["E _ _ _ _ _ _ _ _ _ _"],
		["eukaryotes"]);

	var c1q10 = new Question(
		null,
		"Prokaryotic organisms that inhabit extreme environments",
		["A _ _ _ _ _ _"],
		["Archaea"]);

	var c2q1 = new Question(
		null,
		"Type of bond that holds the water molecule together",
		["H _ _ _ _ _ _ _   B _ _ _"],
		["Hydrogen Bond"]);

	var c2q2 = new Question(
		null,
		"The measure of an atom's affinity for electrons",
		["E _ _ _ _ _ _ _ _ _ _ _ _ _ _"],
		["Electronegativity"]);

	var c2q3 = new Question(
		null,
		"Electrostatic interactions that occur between particles that are polar but not actually charged, usually weaker than hydrogen bond",
		["V _ _   D _ _   W _ _ _ _"],
		["van der Waals"]);

	var c2q4 = new Question(
		null,
		"Term for substances that are readily hydrated or \"waterloving\"",
		["H _ _ _ _ _ _ _ _ _ _"],
		["Hydrophilic"]);

	var c2q5 = new Question(
		null,
		"Term for substances that are relatively insoluble in water or \"waterfearing\"",
		["H _ _ _ _ _ _ _ _ _ _"],
		["Hydrophobic"]);

	var c2q6 = new Question(
		null,
		"Molecules that have both hydrophilic or hydrophobic portions",
		["A _ _ _ _ _ _ _ _ _ _"],
		["Amphiphilic"]);

	var c2q7 = new Question(
		null,
		"It is the hydrogen ion concentration in a solution",
		["P _"],
		["pH"]);

	var c2q8 = new Question(
		null,
		"General Example of a pH level",
		["A _ _ _ _ _", "B _ _ _ _", "N _ _ _ _ _ _"],
		["Acidic", "Basic", "Neutral"]);

	var c2q9 = new Question(
		null,
		"A solution the prevents changes in pH when acid or alkali is added to it",
		["B _ _ _ _ _"],
		["Buffer"]);

	var c2q10 = new Question(
		null,
		"Having an electrical or magnetic property, consisting of molecules with a dipole moment",
		["P _ _ _ _"],
		["Polar"]);

	var c3q1 = new Question(
		null,
		"The structural units of nucleic acids are called:",
		["N _ _ _ _ _ _ _ _ _"],
		["Nucleotide"]);

	var c3q2 = new Question(
		null,
		"What is the complement (ie. pair) of the nitrogenous base guanine?",
		["C _ _ _ _ _ _ _"],
		["Cytosine"]);

	var c3q3 = new Question(
		null,
		"What is the main structural difference (ie. functional group) between thymine and uracil?",
		["M _ _ _ _ _ g _ _ _ _"],
		["Methyl group"]);

	var c3q4 = new Question(
		null,
		"What is the linkage between nucleotides called?",
		["P _ _ _ _ _ _ _ _ _ _ _ _ _ b _ _ _"],
		["Phosphodiester bond"]);

	var c3q5 = new Question(
		"c3q5.jpg",
		"Complete the central dogma of molecular biology:",
		["T _ _ _ _ _ _ _ _ _ _"],
		["Translation"]);

	var c3q6 = new Question(
		null,
		"What method provides a relatively easy and rapid way to amplify a segment of DNA?",
		["P _ _ _ _ _ _ _ _ _ _   C _ _ _ _   R _ _ _ _ _ _ _"],
		["Polymerase Chain Reaction"]);

	var c3q7 = new Question(
		null,
		"What conformation does DNA have?",
		["A _ _ _ _   h _ _ _ _"],
		["Alpha helix"]);

	var c3q8 = new Question(
		null,
		"What type of nucleotide contains nitrogenous bases Adenine, Cytosine, Guanine and Uracil?",
		["R _ _ _ _ _ _ _ _ _   a _ _ _"],
		["Ribonucleic acid"]);

	var c3q9 = new Question(
		null,
		"What carbohydrate structure is the backbone of DNA?",
		["S _ _ _ _ - p _ _ _ _ _ _ _ _"],
		["Sugar-phosphate"]);

	var c3q10 = new Question(
		null,
		"The short segments of DNA that are copied many times and inserted randomly into the chromosomes are called?",
		["T _ _ _ _ _ _ _ _ _ _ _ _   e _ _ _ _ _ _ _ _"],
		["Transposable elements"]);

	var c4q1 = new Question(
		null,
		"What biological molecule consists of one or more polypeptides?",
		["P _ _ _ _ _ _"],
		["Proteins"]);

	var c4q2 = new Question(
		null,
		"Which amino acid group have essentially nonpolar side chains?",
		["H _ _ _ _ _ _ _ _ _ _"],
		["Hydrophobic"]);

	var c4q3 = new Question(
		null,
		"The polymerization of amino acids to form a polypeptide chain involves the _________ reaction (ie. removal of water molecule)",
		["C _ _ _ _ _ _ _ _ _ _ _"],
		["Condensation"]);

	var c4q4 = new Question(
		null,
		"What is the resulting amide bond linking the two amino acids called?",
		["P _ _ _ _ _ _ b _ _ _"],
		["Peptide bond"]);

	var c4q5 = new Question(
		"c4q5.jpg",
		"Which nonpolar amino acid is this?",
		["A _ _ _ _ _ _"],
		["Alanine"]);

	var c4q6 = new Question(
		"c4q6.jpg",
		"Which polar uncharged amino acid is this?",
		["G _ _ _ _ _ _"],
		["Glycine"]);

	var c4q7 = new Question(
		"c4q7.jpg",
		"Which nonpolar amino acid is this?",
		["T _ _ _ _ _ _ _ _ _"],
		["Tryptophan"]);

	var c4q8 = new Question(
		"c4q8.jpg",
		"Which polar, acidic amino acid is this?",
		["G _ _ _ _ _ _ _ _"],
		["Glutamate"]);

	var c4q9 = new Question(
		"c4q9.jpg",
		"Which group does this amino acid, Tyrosine belong to?",
		["P _ _ _ _   u _ _ _ _ _ _ _ _"],
		["Polar uncharged"]);

	var c4q10 = new Question(
		"c4q10.jpg",
		"Which group does this amino acid, Lysine belong to?",
		["P _ _ _ _   b _ _ _ _"],
		["Polar basic"]);

	var c5q1 = new Question(
		null,
		"Protein that contains a heme prosthetic group that reversibly binds oxygen",
		["M _ _ _ _ _ _ _ _"],
		["MYOGLOBIN"]);

	var c5q2 = new Question(
		null,
		"Conformational state of hemoglobin corresponding to deoxyhemoglobin",
		["T_ _ _ _"],
		["TENSE"]);

	var c5q3 = new Question(
		null,
		"Reduction of hemoglobin’s oxygenbinding affinity when the pH decreases",
		["B_ _ _   E_ _ _ _ _"],
		["BOHR EFFECT"]);

	var c5q4 = new Question(
		null,
		"Net assembly at one end of a microfilament is balances net dissociation at the other end",
		["T_ _ _ _ _ _ _ _ _ _ _"],
		["TREADMILLING"]);

	var c5q5 = new Question(
		null,
		"Structural proteins that are hollow tubes built from tubulin dimers",
		["M_ _ _ _ _ _ _ _ _ _ _"],
		["MICROTUBULES"]);

	var c5q6 = new Question(
		"c5q6.jpg",
		"Basic structural unit of an intermediate filament which is a dimer of αhelices that wind around each other",
		["C_ _ _ _ _   C_ _ _"],
		["COILED COIL"]);

	var c5q7 = new Question(
		null,
		"Most abundant animal protein",
		["C_ _ _ _ _ _ _"],
		["COLLAGEN"]);

	var c5q8 = new Question(
		"c5q8.jpg",
		"Intracellular scaffolding consisting of a variety of proteins",
		["C _ _ _ _ _ _ _ _ _ _ _"],
		["CYTOSKELETON"]);

	var c5q9 = new Question(
		null,
		"Proteins responsible for the movement of cells and organelles that operate along tracks provided by cytoskeletal fibers",
		["M _ _ _ _   P_ _ _ _ _ _ _"],
		["MOTOR PROTEINS"]);

	var c5q10 = new Question(
		"c5q10.jpg",
		"Microtubule-associated motor protein that transports cargo by moving processively along a microtubule track",
		["K_ _ _ _ _ _"],
		["KINESIN"]);

	var c6q1 = new Question(
		null,
		"Cleavage by water",
		["H_ _ _ _ _ _ _ _ _"],
		["HYDROLYSIS"]);

	var c6q2 = new Question(
		null,
		"Substance that participates in a chemical reaction yet emerges in the end in its original form",
		["C_ _ _ _ _ _ _"],
		["CATALYST"]);

	var c6q3 = new Question(
		null,
		"Area of the enzyme where the substrate binds",
		["A_ _ _ _ _   S_ _ _"],
		["ACTIVE SITE"]);

	var c6q4 = new Question(
		null,
		"Multiple enzymes catalyzing the same reaction",
		["I_ _ _ _ _ _ _"],
		["ISOZYMES"]);

	var c6q5 = new Question(
		null,
		"Point of highest energy in a reaction coordinate diagram",
		["T_ _ _ _ _ _ _ _ _   S_ _ _ _"],
		["TRANSITION STATE"]);

	var c6q6 = new Question(
		null,
		"Chemical catalytic mechanism in which a proton is transferred between the enzyme and substrate",
		["A_ _ _ - B_ _ _   C_ _ _ _ _ _ _ _"],
		["ACID-BASE CATALYSIS"]);

	var c6q7 = new Question(
		null,
		"Interconvertible isomers that differ in the placement of a hydrogen and a double bond",
		["T_ _ _ _ _ _ _ _"],
		["TAUTOMERS"]);

	var c6q8 = new Question(
		null,
		"Compound in which the carbon atom bears a negative charge",
		["C_ _ _ _ _ _ _ _"],
		["CARBANION"]);

	var c6q9 = new Question(
		null,
		"An electronrich group in search of an electronpoor center, which is usually the catalyst in covalent catalysis",
		["N_ _ _ _ _ _ _ _ _ _"],
		["NUCLEOPHILE"]);

	var c6q10 = new Question(
		null,
		"Phenomenon in which enzyme undergoes a prounounced conformational change to fully enclose substrate upon binding",
		["I_ _ _ _ _ _   F_ _"],
		["INDUCED FIT"]);

	var c7q1 = new Question(
		null,
		"Types of Inhibition",
		["C _ _ _ _ _ _ _ _ _ _","N _ _ _ _ _ _ _ _ _ _ _ _ _", "M _ _ _ _", "U _ _ _ _ _ _ _ _ _ _ _ _", "P _ _ _ _ _ _"],
		["Competitive", "Noncompetitive", "Mixed", "Uncompetitive", "Product"]);

	var c7q2 = new Question(
		null,
		"K m is also known as the: ",
		["M _ _ _ _ _ _ _ _    C _ _ _ _ _ _ _"],
		["Michaelis Constant"]);

	var c7q3 = new Question(
		null,
		"Kinds of Mechanisms in Bisubstrate Reactions",
		["R _ _ _ _ _","O _ _ _ _ _ _", "P _ _ _ _ _ _ _"],
		["Random", "Ordered", "Pingpong"]);

	var c7q4 = new Question(
		null,
		"Types of Reactions",
		["U _ _ _ _ _ _ _ _ _ _ _","M _ _ _ _ _ _ _ _ _ _ _ _ _", "M _ _ _ _ _ _ _ _", "N _ _ _ _ _ _ _ _ _ _ _ _", "F _ _ _ _ - O _ _ _ _", "S _ _ _ _ _ - O _ _ _ _"],
		["Unimolecular", "Multisubstrate", "Multistep", "Nonhyperbolic", "First-Order", "Second-Order"]);

	var c7q5 = new Question(
		null,
		"Ki is also known as the",
		["I _ _ _ _ _ _ _ _ _   C _ _ _ _ _ _ _"],
		["Inhibition Constant"]);

	var c7q6 = new Question(
		null,
		"The best known linear transformation of the velocity versus substrate curve is known as a",
		["L _ _ _ _ _ _ _ _ _ - B _ _ _ P _ _ _"],
		["Lineweaver-Burk Plot"]);

	var c7q7 = new Question(
		null,
		"Kcat is also known as the",
		["C _ _ _ _ _ _ _ _  C _ _ _ _ _ _ _", "T _ _ _ _ _ _ _   N _ _ _ _ _"],
		["Catalytic Constant", "Turnover Number"]);

	var c7q8 = new Question(
		null,
		"Means \"moving,\" From the greek word kinetos",
		["K _ _ _ _ _ _ _"],
		["Kinetics"]);

	var c7q9 = new Question(
		null,
		"The Michaelis-Menten equation was derived by",
		["L _ _ _ _ _   Michaelis", "M _ _ _ _   Menten"],
		["Leonor", "Maude"]);

	var c7q10 = new Question(
		null,
		"Types of Effector",
		["P _ _ _ _ _ _ _", "N _ _ _ _ _ _ _"],
		["Positive", "Negative"]);

	var c8q1 = new Question(
		null,
		"Two types of Fatty Acids",
		["S _ _ _ _ _ _ _ _", "U _ _ _ _ _ _ _ _ _ _"],
		["Saturated", "Unsaturated"]);

	var c8q2 = new Question(
		null,
		"Protein that has a structure that is fully buried in the lipid bilayer aka Intrinsic Membrane Protein",
		["I _ _ _ _ _ _ _"],
		["Integral"]);

	var c8q3 = new Question(
		null,
		"Two types of movement by membrane lipids",
		["T _ _ _ _ _ _ _ _ _   D _ _ _ _ _ _ _ _", "L _ _ _ _ _ _   D _ _ _ _ _ _ _ _"],
		["Transverse Diffusion", "Lateral Diffusion"]);

	var c8q4 = new Question(
		null,
		"The temperature of transition from an ordered crystalline state to a more fluid state",
		["M _ _ _ _ _ _   P _ _ _ _"],
		["Melting Point"]);

	var c8q5 = new Question(
		null,
		"Longchain carboxylic acids",
		["F _ _ _ _   A _ _ _ _"],
		["Fatty Acids"]);

	var c8q6 = new Question(
		"c8q6.jpg",
		"What is this?",
		["G _ _ _ _ _ _ _"],
		["Glycerol"]);

	var c8q7 = new Question(
		null,
		"A protein to which carbohydrate is covalently attached",
		["G _ _ _ _ _ _ _ _ _ _ _"],
		["Glycoprotein"]);

	var c8q8 = new Question(
		null,
		"A protein structure consisting of a Beta Sheet rolled into a cylinder",
		["B _ _ _   B _ _ _ _ _"],
		["Beta Barrel"]);

	var c8q9 = new Question(
		null,
		"Having both polar and nonpolar regions and therefore being both hydrophobic and hydrophilic",
		["A _ _ _ _ _ _ _ _ _, or", "A _ _ _ _ _ _ _ _ _ _"],
		["Amphiphilic", "Amphiphatic"]);

	var c8q10 = new Question(
		null,
		"A model of biological membranes in which integral membrane proteins float and diffuse laterally in a fluid lipid layer",
		["F _ _ _ _   M _ _ _ _ _   M _ _ _ _"],
		["Fluid Mosaic Model"]);

	var c9q1 = new Question(
		null,
		"Type of transmembrane channels",
		["V_ _ _ _ _ _ _ - g _ _ _ _   C_ _ _ _ _ _","M_ _ _ _ _ _ _ _ _ _ _ _ _ _ _    C_ _ _ _ _ _", "L_ _ _ _ _ _ - g _ _ _ _ C_ _ _ _ _ _", "A_ _ _ _ _ _ _ _ _", "P_ _ _ _ _ _ _ _ - I_ _   C _ _ _ _ _ _", "C_ _ _ _ _   F_ _ _ _ _ _ _   C _ - C_ _ _ _ _ _"],
		["Voltage-gated Channel", "Mechanosensitive Channel", "Ligand-gated Channel", "Aquaporins", "Potassium-ion Channel", "Cystic Fibrosis Cl-Channel"]);

	var c9q2 = new Question(
		null,
		"The difference in the chemical charge across a membrane",
		["M_ _ _ _ _ _ _ _   P_ _ _ _ _ _ _ _ "],
		["Membrane Potential"]);

	var c9q3 = new Question(
		null,
		"Active transporters that mediate transporter ion movement",
		["N _ , _ - _ _ _ _ _ _", "A _ _ - _ _ _ _ _ _ _   C_ _ _ _ _ _ _   T_ _ _ _ _ _ _ _ _ _ _"],
		["Na,K-ATPase", "ATP-binding Cassette Transporters"]);

	var c9q4 = new Question(
		null,
		"Passive transporters that mediate transporter ion movement",
		["U_ _ _ _ _ _   G_ _ _ _ _ _   T_ _ _ _ _ _ _ _ _ _ _", "R_ _   B_ _ _ _   C_ _ _   T_ _ _ _ _ _ _ _ _ _ _", "P_ _ _ _ _"],
		["Uniport Glucose Transporters", "Red Blood Cell Transporters", "Porins"]);

	var c9q5 = new Question(
		null,
		"Classifications of ligands",
		["U _ _ _ _ _ _", "S _ _ _ _ _ _", "A _ _ _ _ _ _ _"],
		["Uniport", "Symport", "Antiport"]);

	var c9q6 = new Question(
		null,
		"Reversal of membrane potential",
		["D _ _ _ _ _ _ _ _ _ _ _ _ _"],
		["Depolarization"]);

	var c9q7 = new Question(
		null,
		"Individual, unfolded proteins that spontaneously zip to form a four-helix complex",
		["S _ _ _ _   P_ _ _ _ _ _ _"],
		["SNARE Proteins"]);

	var c9q8 = new Question(
		null,
		"Addition of another phosphate group to a phosphorylated phosphatidylinositol is required during the production of a new _________.",
		["V _ _ _ _ _ _"],
		["Vesicle"]);

	var c9q9 = new Question(
		null,
		"Inward folding and budding of the plasma membrane to form a new intracellular vesicle.",
		["E _ _ _ _ _ _ _ _ _ _"],
		["Endocytosis"]);

	var c9q10 = new Question(
		null,
		"A neurotransmitter that is released when synaptic vesicles fuse with the plasma membrane.",
		["A _ _ _ _ _ _ _ _ _ _ _ _"],
		["Acetylcholine"]);

	var c10q1 = new Question(
		null,
		"Extracellular signals",
		["A_ _ _ _ _", "C_ _ _ _ _ _ _", "E_ _ _ _ _ _ _ _ _ _", "E_ _ _ _ _ _ _ _ _ _ _ _ _", "G_ _ _ _ _ H_ _ _ _ _ _", "G_ _ _ _ _ O_ _ _ _", "T_ _ _ _ _ _ _ _ _ _"],
		["Auxin", "Cortisol", "Epinephrine", "Erythropoietin", "Growth Hormone", "Growth Oxide", "Thromboxane"]);

	var c10q2 = new Question(
		null,
		"The interaction of different signal transduction pathways through activation of the same signaling components",
		["C_ _ _ _ - _ _ _ _"],
		["Cross-talk"]);

	var c10q3 = new Question(
		null,
		"A cell surface receptor whose intracellular domain becomes active as a Tyrspecific kinase as a results of extracellular ligand binding.",
		["R_ _ _ _ _ _ _   T_ _ _ _ _ _ _   K_ _ _ _ _"],
		["Receptor Tyrosine Kinase"]);

	var c10q4 = new Question(
		null,
		"A cell's adaptation to long-term stimulation through a reduce response to the stimulus",
		["D _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _"],
		["Desensitization"]);

	var c10q5 = new Question(
		null,
		"The ability of the cells to monitor population density by detecting the concentrations of extracellular substances",
		["Q _ _ _ _ _   S _ _ _ _ _ _"],
		["Quorum Sensing"]);

	var c10q6 = new Question(
		null,
		"GPCR meaning",
		["G   P _ _ _ _ _ _ - _ _ _ _ _ _ _   R _ _ _ _ _ _ _ _"],
		["G Protein-coupled Receptors"]);

	var c10q7 = new Question(
		null,
		"The level of cAMP determines the level of activity of _________",
		["P_ _ _ _ _ _    K_ _ _ _ _    A"],
		["Protein Kinase A"]);

	var c10q8 = new Question(
		null,
		"The signaling activity of the G protein is limited by the intrinsic ____________ of the alpha subunit, which converts the bound GTP to GDP",
		["G _ _ _ _ _"],
		["GTPase"]);

	var c10q9 = new Question(
		null,
		"The phosphorylation of kinase by another molecule of the same kinase.",
		["A _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _"],
		["Autophosphorylation"]);

	var c10q10 = new Question(
		null,
		"Compounds derived from the C20 fatty acid arachidonic acid, which act in or near the cells that produce them and mediate pain, fever and other physiological responses.",
		["E _ _ _ _ _ _ _ _"],
		["Eicosanoids"]);

	var c1 = new Category([c1q1, c1q2, c1q3, c1q4, c1q5, c1q6, c1q7, c1q8, c1q9, c1q10]);
	var c2 = new Category([c2q1, c2q2, c2q3, c2q4, c2q5, c2q6, c2q7, c2q8, c2q9, c2q10]);
	var c3 = new Category([c3q1, c3q2, c3q3, c3q4, c3q5, c3q6, c3q7, c3q8, c3q9, c3q10]);
	var c4 = new Category([c4q1, c4q2, c4q3, c4q4, c4q5, c4q6, c4q7, c4q8, c4q9, c4q10]);
	var c5 = new Category([c5q1, c5q2, c5q3, c5q4, c5q5, c5q6, c5q7, c5q8, c5q9, c5q10]);
	var c6 = new Category([c6q1, c6q2, c6q3, c6q4, c6q5, c6q6, c6q7, c6q8, c6q9, c6q10]);
	var c7 = new Category([c7q1, c7q2, c7q3, c7q4, c7q5, c7q6, c7q7, c7q8, c7q9, c7q10]);
	var c8 = new Category([c8q1, c8q2, c8q3, c8q4, c8q5, c8q6, c8q7, c8q8, c8q9, c8q10]);
	var c9 = new Category([c9q1, c9q2, c9q3, c9q4, c9q5, c9q6, c9q7, c9q8, c9q9, c9q10]);
	var c10 = new Category([c10q1, c10q2, c10q3, c10q4, c10q5, c10q6, c10q7, c10q8, c10q9, c10q10]);

	game = new Game([c1, c2, c3, c4, c5, c6, c7, c8, c9, c10]);
}

function Game(categories)
{
	this.categories = categories; //array
}

function Category(questions)
{
	this.questions = questions; //array
}

function Question(image, question, hints, answers)
{
	this.image = image; //string
	this.question = question; //string
	this.hints = hints; //array
	this.answers = answers; //array
}