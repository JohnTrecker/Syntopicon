// sizes
const full = '&fm=jpg&q=80';
const regular = '&fm=jpg&fit=crop&w=1080&q=80&fit=max';
const small = '&fm=jpg&w=400&fit=max';
const thumb = '&fm=jpg&w=200&fit=max';

// constants
const domain = 'https://images.unsplash.com/';
const meta = '?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9';

// helper
function buildUrl(resource, size = small) {
  return `${domain}${resource}${meta}${size}`
};

// topics
const angel = { uri: 'photo-1554714915-9ee8b3bf57db', author: 'Simon Birt', handle: '@simonbirt' };
const animal = { uri: 'photo-1574451966652-62debbb4c221', author: 'Hans Veth', handle: '@hans_veth' }; //'photo-1554714915-9ee8b3bf57db';
const aristocracy = { uri: 'photo-1571571854913-a6d8b59377e0', author: '', handle: '' };
const art = { uri: 'photo-1557033051-1d426c3a4d42', author: '', handle: '' }; // photo-1573871669414-010dbf73ca84 // Hal Gatewood, @halgatewood
const astronomyAndCosmology = { uri: 'photo-1543722530-d2c3201371e7', author: '', handle: '' };
const beauty = { uri: 'photo-1500964757637-c85e8a162699', author: '', handle: '' };
const being = { uri: 'photo-1541265313101-7043fb302244', author: '', handle: '' };
const cause = { uri: 'photo-1553363512-a89efdf7d6de', author: '', handle: '' }; //'photo-1512138664757-360e0aad5132';
const chance = { uri: 'photo-1568743966689-d37c04538535', author: '', handle: '' };
const change = { uri: 'photo-1573650757643-b0cda407d7c1', author: 'Liubov Ilchuk', handle: '@liubovilchuk' };
const citizen = { uri: 'photo-1566663972955-25cacaa61e38', author: '', handle: '' };
const logic = { uri: 'photo-1524086496832-aa348741b7b9', author: '', handle: '' };// photo-1509228468518-180dd4864904;
const constitution = { uri: 'photo-1506886009355-7f3af05dd5d2', author: '', handle: '' };
const courage = { uri: 'photo-1495602787267-96ab76127c2a', author: '', handle: '' };
const customAndConvention = { uri: 'photo-1567539549213-cc1697632146', author: '', handle: '' }; // photo-1563971955910-766f995d78fd // Allie Smith, @creativegangsters
const definition = { uri: 'photo-1456081101716-74e616ab23d8', author: '', handle: '' };
const democracy = { uri: 'photo-1541543969587-06bf065f8784', author: '', handle: '' };
const desire = { uri: 'photo-1526404746352-668ded9b50ab', author: 'Sharon McCutcheon', handle: '@sharonmccutcheon' };
const dialectic = { uri: 'photo-1496902526517-c0f2cb8fdb6a', author: 'Nik MacMillan', handle: '@nikarthur' };
const duty = { uri: 'photo-1498898822751-a786e6e70dbd', author: '', handle: '' };
const education = { uri: 'photo-1488254491307-10ca8fa174c8', author: '', handle: '' };
const element = { uri: 'photo-1524999454668-adebce70bea9', author: '', handle: '' };
const emotion = { uri: 'photo-1523803326055-9729b9e02e5a', author: '', handle: '' };
const eternity = { uri: 'photo-1442323794357-25b2ec110967', author: '', handle: '' };
const evolution = { uri: 'photo-1574075896246-5ee5018d399d', author: 'Joshua Fuller', handle: '@joshuafuller' };
const experience = { uri: 'photo-1529564269951-ab1c08249552', author: '', handle: '' };
const family = { uri: 'photo-1574653344212-aa4f239f85cf', author: 'Christiana Rivers', handle: '@christiana' }; // 'photo-1438962136829-452260720431';
const fate = { uri: 'photo-1565492206137-0797f1ca6dc6', author: '', handle: '' };
const form = { uri: 'photo-1523730205978-59fd1b2965e3', author: '', handle: '' };
const god = { uri: 'photo-1470859685138-71dd60ed39b1', author: '', handle: '' }; // photo-1520187044487-b2efb58f0cba; photo-1500835176302-48dbd01f6437
const goodAndEvil = { uri: 'photo-1500835176302-48dbd01f6437', author: '', handle: '' };
const government = { uri: 'photo-1532214950507-92ba44a2f6f7', author: '', handle: '' };
const habit = { uri: 'photo-1512067053627-3cb65e51a128', author: '', handle: '' };
const happiness = { uri: 'photo-1533227268428-f9ed0900fb3b', author: '', handle: '' };
const history = { uri: 'photo-1569943514245-df02f62cecf2', author: '', handle: '' };
const honor = { uri: 'photo-1529787730-bdcabd22a644', author: '', handle: '' };
const hypothesis = { uri: 'photo-1474325874720-4b395be870c4', author: '', handle: '' };
const idea = { uri: 'photo-1472739841375-d0ea9f0cb6a6', author: 'Caleb Jones', handle: '@dcalebjones' };
const immortality = { uri: 'photo-1567328515139-74160bc483fe', author: '', handle: '' }; // photo-1573853403795-8755533bcd87 // Fan Yang , @vindurriel
const induction = { uri: 'photo-1453487021979-5b739b2849f4', author: '', handle: '' };
const infinity = { uri: 'photo-1566555383396-e0b73b0c3e9f', author: '', handle: '' };
const judgment = { uri: 'photo-1555374018-13a8994ab246', author: '', handle: '' };
const justice = { uri: 'photo-1453945619913-79ec89a82c51', author: '', handle: '' };
const knowledge = { uri: 'photo-1570280375658-bc8083a218f0', author: '', handle: '' };
const labor = { uri: 'photo-1517347827035-8b3805dea38f', author: '', handle: '' };
const language = { uri: 'photo-1474459321707-0f6fac57151c', author: '', handle: '' };
const law = { uri: 'photo-1560780148-d8a687acdc5f', author: 'DDP', handle: '@moino007' };
const liberty = { uri: 'photo-1492217072584-7ff26c10eb75', author: '', handle: '' };
const lifeAndDeath = { uri: 'photo-1501421018470-faf26f6b1bef', author: 'Jean-Phillipe Delberghe', handle: '@jipy32' }; // photo-1574434273760-54ce56c94c33 // Jonathan Borba, @jonathanborba
const love = { uri: 'photo-1494451930944-8998635c2123', author: '', handle: '' }; // photo-1542338492-41740e01673f
const man = { uri: 'photo-1539640038819-57bb520c7d2d', author: '', handle: '' };//photo-1560787313-5dff3307e257
const mathematics = { uri: 'photo-1573736419810-c0aa49e31fa2', author: 'CLark Van Der Beken', handle: '@snaps_by_clark' };
const matter = { uri: 'photo-1527409335569-f0e5c91fa707', author: '', handle: '' };
const mechanics = { uri: 'photo-1472035846169-06348f2377fa', author: '', handle: '' }; // photo-1558395932-2231f33572a9 // @plqml
const medicine = { uri: 'photo-1562243061-204550d8a2c9', author: '', handle: '' };
const memoryAndImagination = { uri: 'photo-1520516415634-922de22da03d', author: 'Nathan Dumlao', handle: '@nate_dumlao' }; // 'photo-1521979548744-463128ea80d8';
const metaphysics = { uri: 'photo-1512414584153-b9a3e3484950', author: '', handle: '' };
const mind = { uri: 'photo-1502230831726-fe5549140034', author: '', handle: '' };
const monarchy = { uri: 'photo-1551058639-e209197aba8b', author: '', handle: '' }; // photo-1554295295-2c44cff7508f // Louise Pilgaard, @toft_pilgaard
const nature = { uri: 'photo-1463107971871-fbac9ddb920f', author: '', handle: '' };//photo-1485795046599-702122cd1267
const necessityAndContingency = { uri: 'photo-1462690417829-5b41247f6b0e', author: 'Christian Joudrey', handle: '@cjoudrey' };
const oligarchy = { uri: 'photo-1543840951-931bdaabb169', author: 'Joel Barwick', handle: '@joelbarwick' };
const oneAndMany = { uri: 'photo-1464917423479-6bd9527d469f', author: 'Priscilla Du Preez', handle: '@priscilladupreez' };
const opinion = { uri: 'photo-1529739121416-921f4dae728e', author: 'Alvin Balemesa', handle: '@ainbal' };
const opposition = { uri: 'photo-1505958891520-0c2f2950693f', author: 'Jeremy Bishop', handle: '@jeremybishop' };
const philosophy = { uri: 'photo-1564737141443-04001033cb6c', author: 'MEAX', handle: '@meaxgang' }; // 'photo-1550016941-7717d5d1a38a'; // Jasper Smith, @jaspersmith
const physics = { uri: 'photo-1492962827063-e5ea0d8c01f5', author: 'Linus Mimeitz', handle: '@linusmimeitz' };
const pleasureAndPain = { uri: 'photo-1524088484081-4ca7e08e3e19', author: 'Luis Galvez', handle: '@louiscesar' };
const quality = { uri: 'photo-1527167598984-8802d8028eea', author: 'Sharon McCutcheon', handle: '@sharonmccutcheon' }; //  ... photo-1532509561631-587d16b6d29f Markus Spiske, @markusspiske
const poetry = { uri: 'photo-1473186505569-9c61870c11f9', author: 'Álvaro Serrano', handle: '@alvaroserrano' };
const principle = { uri: 'photo-1511351817482-e0d6127f20bb', author: 'Mirjo Blicke', handle: '@mirkoblicke' };
const progress = { uri: 'photo-1531228040767-7a99c3ff4489', author: 'Sweet Ice Cream Photography', handle: '@sweeticecreamwedding' }; // 'photo-1541415203868-7279187bb7bb'; // Annie Spratt, @anniespratt
const prophecy = { uri: 'photo-1481709761765-0876c08d7d26', author: 'Gareth Harper', handle: '@garethharper' };
const prudence = { uri: 'photo-1477517787936-70ba786643fd', author: 'Raoul Ortega', handle: '@ra_oul' };
const punishment = { uri: 'photo-1545243894-2028accad3aa', author: 'Kyryll Ushakov', handle: '@ushakov_kyryll' };
const quantity = { uri: 'photo-1519673504889-344865afc163', author: 'Simon Basler ', handle: '@simonbasler' };
const reasoning = { uri: 'photo-1521866337281-e7207a7159c9', author: 'Victor G', handle: '@victor_g' };
const relation = { uri: 'photo-1518600942388-37b306a5544b', author: 'Georgy Rudikov', handle: '@rudakov_g' }; //  ... // photo-1551849515-5a5037b65ac3 // Maskedemann, @maskedemann
const religion = { uri: 'photo-1528568427128-2b4c062ea9c8', author: 'Blake Campbell', handle: '@blakecampbell' }; //  ... photo-1564576605017-f1d270c33460 // Adrian Dascal, @dascal
const revolution = { uri: 'photo-1553258318-c22356c14808', author: 'Markus Spiske ', handle: '@markusspiske' };
const rhetoric = { uri: 'photo-1521424159246-e4a66f267e4b', author: 'DESIGNECOLOGIST', handle: '@designecologist' };
const sameAndOther = { uri: 'photo-1525286116112-b59af11adad1', author: 'Eloise Ambursley', handle: '@e_ambursley' }; //  ... photo-1573342560821-6ac96c880987 // Tim Mossholder, @timmossholder
const science = { uri: 'photo-1507413245164-6160d8298b31', author: 'Hal Gatewood', handle: '@halgatewood' };
const sense = { uri: 'photo-1569914512821-7005a6786982', author: 'Julian Dutton', handle: '@julian_dutton' };
const tyrannyAndDespotism = { uri: 'photo-1574099951664-6ada1812c3f2', author: 'Luis Villasmil', handle: '@villxsmil' };
const signAndSymbol = { uri: 'photo-1561059817-7fc87a9cd2fa', author: 'Ben Mater', handle: '@benjmater' }; //  ... photo-1551759138-d64d3db619b6, Josh Applegate, @joshapplegate ... // photo-1573231766958-e980d37845a5 // Peter Mode, @petermode
const sin = { uri: 'photo-1543880624-5795fe87a603', author: 'T Rader', handle: '@matthew_t_rader' }; // Matthew
const slavery = { uri: 'photo-1528108827304-51446e007137', author: 'Dirk Spijkers', handle: '@dspijkers' };
const soul = { uri: 'photo-1444069069008-83a57aac43ac', author: 'Angelina Litvin', handle: '@linalitvina' }; //  ... photo-1561618178-a1635b596bf0 // Start Digital, @startdig
const space = { uri: 'photo-1462331940025-496dfbfc7564', author: 'NASA', handle: '@nasa' };
const state = { uri: 'photo-1513023001678-6927b70dc4a0', author: 'Ryan Wallace', handle: '@accrualbowtie' };
const temperance = { uri: 'photo-1509490927285-34bd4d057c88', author: 'Nathan Dumlao', handle: '@nate_dumlao' };
const theology = { uri: 'photo-1564540400309-0745c2a66a11', author: 'Caleb Woods', handle: '@caleb_woods' };
const time = { uri: 'photo-1454793147212-9e7e57e89a4f', author: 'Henry Be', handle: '@henry_be' };
const truth = { uri: 'photo-1523586797235-580376c5d862', author: 'Jon Tyson', handle: '@jontyson' };
const universalAndParticular = { uri: 'photo-1574151087830-a9045bb71b8d', author: 'FOODISM360', handle: '@foodism360' };
const virtueAndVice = { uri: 'photo-1570639224370-72eba2a0f9c7', author: 'Kelly Sikkema', handle: '@kellysikkema' }; //  ... photo-1572116618753-98d395f2d48f // Alistair MacRobert, @alistarmacrobert ... 'photo-1562104011-786544a6a166'; // Brian Kyed, @brnkd
const warAndPeace = { uri: 'photo-1526818614391-390bc085968b', author: 'Thomas Q', handle: '@thomasq' };
const wealth = { uri: 'photo-1516238840914-94dfc0c873ae', author: 'Sharon McCutcheon', handle: '@sharonmccutcheon' };
const will = { uri: 'photo-1517883405152-7067727fcdb3', author: 'Nathan Dumlao', handle: '@nate_dumlao' }; //  ... 'photo-1472487883843-090fcd92e0c8'; // Saksham Gangwar, @saksham
const wisdom = { uri: 'photo-1544648720-132573cb590d', author: 'Lorenzo Moschi', handle: '@lordesigner' };
const world = { uri: 'photo-1446776811953-b23d57bd21aa', author: 'NASA', handle: '@nasa' };

// routes
const search = { uri: 'photo-1485847791529-09ed2263da0b', author: '', handle: '' };
const searchBig = buildUrl(search.uri, full);

// img sources
const variables = {
  angel:  buildUrl(angel.uri),
  animal:  buildUrl(animal.uri),
  aristocracy:  buildUrl(aristocracy.uri),
  art:  buildUrl(art.uri),
  astronomyAndCosmology: buildUrl(astronomyAndCosmology.uri),
  beauty:  buildUrl(beauty.uri),
  being:  buildUrl(being.uri),
  cause:  buildUrl(cause.uri),
  chance:  buildUrl(chance.uri),
  change:  buildUrl(change.uri),
  citizen:  buildUrl(citizen.uri),
  logic:  buildUrl(logic.uri),
  constitution:  buildUrl(constitution.uri),
  courage:  buildUrl(courage.uri),
  customAndConvention:  buildUrl(customAndConvention.uri),
  definition:  buildUrl(definition.uri),
  democracy:  buildUrl(democracy.uri),
  desire:  buildUrl(desire.uri),
  dialectic:  buildUrl(dialectic.uri),
  duty:  buildUrl(duty.uri),
  education:  buildUrl(education.uri),
  element:  buildUrl(element.uri),
  emotion:  buildUrl(emotion.uri),
  eternity:  buildUrl(eternity.uri),
  evolution:  buildUrl(evolution.uri),
  experience:  buildUrl(experience.uri),
  family:  buildUrl(family.uri),
  fate:  buildUrl(fate.uri),
  form:  buildUrl(form.uri),
  god:  buildUrl(god.uri),
  goodAndEvil:  buildUrl(goodAndEvil.uri),
  government:  buildUrl(government.uri),
  habit:  buildUrl(habit.uri),
  happiness:  buildUrl(happiness.uri),
  history:  buildUrl(history.uri),
  honor:  buildUrl(honor.uri),
  hypothesis:  buildUrl(hypothesis.uri),
  idea:  buildUrl(idea.uri),
  immortality:  buildUrl(immortality.uri),
  induction:  buildUrl(induction.uri),
  infinity:  buildUrl(infinity.uri),
  judgment:  buildUrl(judgment.uri),
  justice:  buildUrl(justice.uri),
  knowledge:  buildUrl(knowledge.uri),
  labor:  buildUrl(labor.uri),
  language:  buildUrl(language.uri),
  law:  buildUrl(law.uri),
  liberty:  buildUrl(liberty.uri),
  lifeAndDeath:  buildUrl(lifeAndDeath.uri),
  love:  buildUrl(love.uri),
  man:  buildUrl(man.uri),
  mathematics:  buildUrl(mathematics.uri),
  matter:  buildUrl(matter.uri),
  mechanics:  buildUrl(mechanics.uri),
  medicine:  buildUrl(medicine.uri),
  memoryAndImagination:  buildUrl(memoryAndImagination.uri),
  metaphysics:  buildUrl(metaphysics.uri),
  mind:  buildUrl(mind.uri),
  monarchy:  buildUrl(monarchy.uri),
  nature:  buildUrl(nature.uri),
  necessityAndContingency:  buildUrl(necessityAndContingency.uri),
  oligarchy:  buildUrl(oligarchy.uri),
  oneAndMany:  buildUrl(oneAndMany.uri),
  opinion:  buildUrl(opinion.uri),
  opposition:  buildUrl(opposition.uri),
  philosophy:  buildUrl(philosophy.uri),
  physics:  buildUrl(physics.uri),
  pleasureAndPain:  buildUrl(pleasureAndPain.uri),
  quality:  buildUrl(quality.uri),
  poetry:  buildUrl(poetry.uri),
  principle:  buildUrl(principle.uri),
  progress:  buildUrl(progress.uri),
  prophecy:  buildUrl(prophecy.uri),
  prudence:  buildUrl(prudence.uri),
  punishment:  buildUrl(punishment.uri),
  quantity:  buildUrl(quantity.uri),
  reasoning:  buildUrl(reasoning.uri),
  relation:  buildUrl(relation.uri),
  religion:  buildUrl(religion.uri),
  revolution:  buildUrl(revolution.uri),
  rhetoric:  buildUrl(rhetoric.uri),
  sameAndOther:  buildUrl(sameAndOther.uri),
  science:  buildUrl(science.uri),
  sense:  buildUrl(sense.uri),
  tyrannyAndDespotism:  buildUrl(tyrannyAndDespotism.uri),
  signAndSymbol:  buildUrl(signAndSymbol.uri),
  sin:  buildUrl(sin.uri),
  slavery:  buildUrl(slavery.uri),
  soul:  buildUrl(soul.uri),
  space:  buildUrl(space.uri),
  state:  buildUrl(state.uri),
  temperance:  buildUrl(temperance.uri),
  theology:  buildUrl(theology.uri),
  time:  buildUrl(time.uri),
  truth:  buildUrl(truth.uri),
  universalAndParticular:  buildUrl(universalAndParticular.uri),
  virtueAndVice:  buildUrl(virtueAndVice.uri),
  warAndPeace:  buildUrl(warAndPeace.uri),
  wealth:  buildUrl(wealth.uri),
  will:  buildUrl(will.uri),
  wisdom:  buildUrl(wisdom.uri),
  world:  buildUrl(world.uri),
  angelBig:  buildUrl(angel.uri, regular),
  animalBig:  buildUrl(animal.uri, regular),
  aristocracyBig:  buildUrl(aristocracy.uri, regular),
  artBig:  buildUrl(art.uri, regular),
  astronomyAndCosmologyBig:  buildUrl(astronomyAndCosmology.uri, regular),
  beautyBig:  buildUrl(beauty.uri, regular),
  beingBig:  buildUrl(being.uri, regular),
  causeBig:  buildUrl(cause.uri, regular),
  chanceBig:  buildUrl(chance.uri, regular),
  changeBig:  buildUrl(change.uri, regular),
  citizenBig:  buildUrl(citizen.uri, regular),
  logicBig:  buildUrl(logic.uri, regular),
  constitutionBig:  buildUrl(constitution.uri, regular),
  courageBig:  buildUrl(courage.uri, regular),
  customAndConventionBig:  buildUrl(customAndConvention.uri, regular),
  definitionBig:  buildUrl(definition.uri, regular),
  democracyBig:  buildUrl(democracy.uri, regular),
  desireBig:  buildUrl(desire.uri, regular),
  dialecticBig:  buildUrl(dialectic.uri, regular),
  dutyBig:  buildUrl(duty.uri, regular),
  educationBig:  buildUrl(education.uri, regular),
  elementBig:  buildUrl(element.uri, regular),
  emotionBig:  buildUrl(emotion.uri, regular),
  eternityBig:  buildUrl(eternity.uri, regular),
  evolutionBig:  buildUrl(evolution.uri, regular),
  experienceBig:  buildUrl(experience.uri, regular),
  familyBig:  buildUrl(family.uri, regular),
  fateBig:  buildUrl(fate.uri, regular),
  formBig:  buildUrl(form.uri, regular),
  godBig:  buildUrl(god.uri, regular),
  goodAndEvilBig:  buildUrl(goodAndEvil.uri, regular),
  governmentBig:  buildUrl(government.uri, regular),
  habitBig:  buildUrl(habit.uri, regular),
  happinessBig:  buildUrl(happiness.uri, regular),
  historyBig:  buildUrl(history.uri, regular),
  honorBig:  buildUrl(honor.uri, regular),
  hypothesisBig:  buildUrl(hypothesis.uri, regular),
  ideaBig:  buildUrl(idea.uri, regular),
  immortalityBig:  buildUrl(immortality.uri, regular),
  inductionBig:  buildUrl(induction.uri, regular),
  infinityBig:  buildUrl(infinity.uri, regular),
  judgmentBig:  buildUrl(judgment.uri, regular),
  justiceBig:  buildUrl(justice.uri, regular),
  knowledgeBig:  buildUrl(knowledge.uri, regular),
  laborBig:  buildUrl(labor.uri, regular),
  languageBig:  buildUrl(language.uri, regular),
  lawBig:  buildUrl(law.uri, regular),
  libertyBig:  buildUrl(liberty.uri, regular),
  lifeAndDeathBig:  buildUrl(lifeAndDeath.uri, regular),
  loveBig:  buildUrl(love.uri, regular),
  manBig:  buildUrl(man.uri, regular),
  mathematicsBig:  buildUrl(mathematics.uri, regular),
  matterBig:  buildUrl(matter.uri, regular),
  mechanicsBig:  buildUrl(mechanics.uri, regular),
  medicineBig:  buildUrl(medicine.uri, regular),
  memoryAndImaginationBig:  buildUrl(memoryAndImagination.uri, regular),
  metaphysicsBig:  buildUrl(metaphysics.uri, regular),
  mindBig:  buildUrl(mind.uri, regular),
  monarchyBig:  buildUrl(monarchy.uri, regular),
  natureBig:  buildUrl(nature.uri, regular),
  necessityAndContingencyBig:  buildUrl(necessityAndContingency.uri, regular),
  oligarchyBig:  buildUrl(oligarchy.uri, regular),
  oneAndManyBig:  buildUrl(oneAndMany.uri, regular),
  opinionBig:  buildUrl(opinion.uri, regular),
  oppositionBig:  buildUrl(opposition.uri, regular),
  philosophyBig:  buildUrl(philosophy.uri, regular),
  physicsBig:  buildUrl(physics.uri, regular),
  pleasureAndPainBig:  buildUrl(pleasureAndPain.uri, regular),
  qualityBig:  buildUrl(quality.uri, regular),
  poetryBig:  buildUrl(poetry.uri, regular),
  principleBig:  buildUrl(principle.uri, regular),
  progressBig:  buildUrl(progress.uri, regular),
  prophecyBig:  buildUrl(prophecy.uri, regular),
  prudenceBig:  buildUrl(prudence.uri, regular),
  punishmentBig:  buildUrl(punishment.uri, regular),
  quantityBig:  buildUrl(quantity.uri, regular),
  reasoningBig:  buildUrl(reasoning.uri, regular),
  relationBig:  buildUrl(relation.uri, regular),
  religionBig:  buildUrl(religion.uri, regular),
  revolutionBig:  buildUrl(revolution.uri, regular),
  rhetoricBig:  buildUrl(rhetoric.uri, regular),
  sameAndOtherBig:  buildUrl(sameAndOther.uri, regular),
  scienceBig:  buildUrl(science.uri, regular),
  senseBig:  buildUrl(sense.uri, regular),
  tyrannyAndDespotismBig:  buildUrl(tyrannyAndDespotism.uri, regular),
  signAndSymbolBig:  buildUrl(signAndSymbol.uri, regular),
  sinBig:  buildUrl(sin.uri, regular),
  slaveryBig:  buildUrl(slavery.uri, regular),
  soulBig:  buildUrl(soul.uri, regular),
  spaceBig:  buildUrl(space.uri, regular),
  stateBig:  buildUrl(state.uri, regular),
  temperanceBig:  buildUrl(temperance.uri, regular),
  theologyBig:  buildUrl(theology.uri, regular),
  timeBig:  buildUrl(time.uri, regular),
  truthBig:  buildUrl(truth.uri, regular),
  universalAndParticularBig:  buildUrl(universalAndParticular.uri, regular),
  virtueAndViceBig:  buildUrl(virtueAndVice.uri, regular),
  warAndPeaceBig:  buildUrl(warAndPeace.uri, regular),
  wealthBig:  buildUrl(wealth.uri, regular),
  willBig:  buildUrl(will.uri, regular),
  wisdomBig:  buildUrl(wisdom.uri, regular),
  worldBig:  buildUrl(world.uri, regular),
}

export default variables;