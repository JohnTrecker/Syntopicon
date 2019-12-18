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
const angel = { uri: 'photo-1554714915-9ee8b3bf57db', small: buildUrl('photo-1554714915-9ee8b3bf57db'), big: buildUrl('photo-1554714915-9ee8b3bf57db', regular), author: 'Simon Birt', handle: '@simonbirt' };
const animal = { uri: 'photo-1574451966652-62debbb4c221', small: buildUrl('photo-1574451966652-62debbb4c221'), big: buildUrl('photo-1574451966652-62debbb4c221', regular), author: 'Hans Veth', handle: '@hans_veth' }; //'photo-1554714915-9ee8b3bf57db';
const aristocracy = { uri: 'photo-1571571854913-a6d8b59377e0', small: buildUrl('photo-1571571854913-a6d8b59377e0'), big: buildUrl('photo-1571571854913-a6d8b59377e0', regular), author: '', handle: '' };
const art = { uri: 'photo-1557033051-1d426c3a4d42', small: buildUrl('photo-1557033051-1d426c3a4d42'), big: buildUrl('photo-1557033051-1d426c3a4d42', regular), author: '', handle: '' }; // photo-1573871669414-010dbf73ca84 // Hal Gatewood, @halgatewood
const astronomy_and_cosmology = { uri: 'photo-1543722530-d2c3201371e7', small: buildUrl('photo-1543722530-d2c3201371e7'), big: buildUrl('photo-1543722530-d2c3201371e7', regular), author: '', handle: '' };
const beauty = { uri: 'photo-1500964757637-c85e8a162699', small: buildUrl('photo-1500964757637-c85e8a162699'), big: buildUrl('photo-1500964757637-c85e8a162699', regular), author: '', handle: '' };
const being = { uri: 'photo-1541265313101-7043fb302244', small: buildUrl('photo-1541265313101-7043fb302244'), big: buildUrl('photo-1541265313101-7043fb302244', regular), author: '', handle: '' };
const cause = { uri: 'photo-1553363512-a89efdf7d6de', small: buildUrl('photo-1553363512-a89efdf7d6de'), big: buildUrl('photo-1553363512-a89efdf7d6de', regular), author: '', handle: '' }; //'photo-1512138664757-360e0aad5132';
const chance = { uri: 'photo-1568743966689-d37c04538535', small: buildUrl('photo-1568743966689-d37c04538535'), big: buildUrl('photo-1568743966689-d37c04538535', regular), author: '', handle: '' };
const change = { uri: 'photo-1573650757643-b0cda407d7c1', small: buildUrl('photo-1573650757643-b0cda407d7c1'), big: buildUrl('photo-1573650757643-b0cda407d7c1', regular), author: 'Liubov Ilchuk', handle: '@liubovilchuk' };
const citizen = { uri: 'photo-1566663972955-25cacaa61e38', small: buildUrl('photo-1566663972955-25cacaa61e38'), big: buildUrl('photo-1566663972955-25cacaa61e38', regular), author: '', handle: '' };
const logic = { uri: 'photo-1524086496832-aa348741b7b9', small: buildUrl('photo-1524086496832-aa348741b7b9'), big: buildUrl('photo-1524086496832-aa348741b7b9', regular), author: '', handle: '' };// photo-1509228468518-180dd4864904;
const constitution = { uri: 'photo-1506886009355-7f3af05dd5d2', small: buildUrl('photo-1506886009355-7f3af05dd5d2'), big: buildUrl('photo-1506886009355-7f3af05dd5d2', regular), author: '', handle: '' };
const courage = { uri: 'photo-1495602787267-96ab76127c2a', small: buildUrl('photo-1495602787267-96ab76127c2a'), big: buildUrl('photo-1495602787267-96ab76127c2a', regular), author: '', handle: '' };
const custom_and_convention = { uri: 'photo-1567539549213-cc1697632146', small: buildUrl('photo-1567539549213-cc1697632146'), big: buildUrl('photo-1567539549213-cc1697632146', regular), author: '', handle: '' }; // photo-1563971955910-766f995d78fd // Allie Smith, @creativegangsters
const definition = { uri: 'photo-1456081101716-74e616ab23d8', small: buildUrl('photo-1456081101716-74e616ab23d8'), big: buildUrl('photo-1456081101716-74e616ab23d8', regular), author: '', handle: '' };
const democracy = { uri: 'photo-1541543969587-06bf065f8784', small: buildUrl('photo-1541543969587-06bf065f8784'), big: buildUrl('photo-1541543969587-06bf065f8784', regular), author: '', handle: '' };
const desire = { uri: 'photo-1526404746352-668ded9b50ab', small: buildUrl('photo-1526404746352-668ded9b50ab'), big: buildUrl('photo-1526404746352-668ded9b50ab', regular), author: 'Sharon McCutcheon', handle: '@sharonmccutcheon' };
const dialectic = { uri: 'photo-1496902526517-c0f2cb8fdb6a', small: buildUrl('photo-1496902526517-c0f2cb8fdb6a'), big: buildUrl('photo-1496902526517-c0f2cb8fdb6a', regular), author: 'Nik MacMillan', handle: '@nikarthur' };
const duty = { uri: 'photo-1498898822751-a786e6e70dbd', small: buildUrl('photo-1498898822751-a786e6e70dbd'), big: buildUrl('photo-1498898822751-a786e6e70dbd', regular), author: '', handle: '' };
const education = { uri: 'photo-1488254491307-10ca8fa174c8', small: buildUrl('photo-1488254491307-10ca8fa174c8'), big: buildUrl('photo-1488254491307-10ca8fa174c8', regular), author: '', handle: '' };
const element = { uri: 'photo-1524999454668-adebce70bea9', small: buildUrl('photo-1524999454668-adebce70bea9'), big: buildUrl('photo-1524999454668-adebce70bea9', regular), author: '', handle: '' };
const emotion = { uri: 'photo-1523803326055-9729b9e02e5a', small: buildUrl('photo-1523803326055-9729b9e02e5a'), big: buildUrl('photo-1523803326055-9729b9e02e5a', regular), author: '', handle: '' };
const eternity = { uri: 'photo-1442323794357-25b2ec110967', small: buildUrl('photo-1442323794357-25b2ec110967'), big: buildUrl('photo-1442323794357-25b2ec110967', regular), author: '', handle: '' };
const evolution = { uri: 'photo-1574075896246-5ee5018d399d', small: buildUrl('photo-1574075896246-5ee5018d399d'), big: buildUrl('photo-1574075896246-5ee5018d399d', regular), author: 'Joshua Fuller', handle: '@joshuafuller' };
const experience = { uri: 'photo-1529564269951-ab1c08249552', small: buildUrl('photo-1529564269951-ab1c08249552'), big: buildUrl('photo-1529564269951-ab1c08249552', regular), author: '', handle: '' };
const family = { uri: 'photo-1574653344212-aa4f239f85cf', small: buildUrl('photo-1574653344212-aa4f239f85cf'), big: buildUrl('photo-1574653344212-aa4f239f85cf', regular), author: 'Christiana Rivers', handle: '@christiana' }; // 'photo-1438962136829-452260720431';
const fate = { uri: 'photo-1565492206137-0797f1ca6dc6', small: buildUrl('photo-1565492206137-0797f1ca6dc6'), big: buildUrl('photo-1565492206137-0797f1ca6dc6', regular), author: '', handle: '' };
const form = { uri: 'photo-1523730205978-59fd1b2965e3', small: buildUrl('photo-1523730205978-59fd1b2965e3'), big: buildUrl('photo-1523730205978-59fd1b2965e3', regular), author: '', handle: '' };
const god = { uri: 'photo-1470859685138-71dd60ed39b1', small: buildUrl('photo-1470859685138-71dd60ed39b1'), big: buildUrl('photo-1470859685138-71dd60ed39b1', regular), author: '', handle: '' }; // photo-1520187044487-b2efb58f0cba; photo-1500835176302-48dbd01f6437
const good_and_evil = { uri: 'photo-1500835176302-48dbd01f6437', small: buildUrl('photo-1500835176302-48dbd01f6437'), big: buildUrl('photo-1500835176302-48dbd01f6437', regular), author: '', handle: '' };
const government = { uri: 'photo-1532214950507-92ba44a2f6f7', small: buildUrl('photo-1532214950507-92ba44a2f6f7'), big: buildUrl('photo-1532214950507-92ba44a2f6f7', regular), author: '', handle: '' };
const habit = { uri: 'photo-1512067053627-3cb65e51a128', small: buildUrl('photo-1512067053627-3cb65e51a128'), big: buildUrl('photo-1512067053627-3cb65e51a128', regular), author: '', handle: '' };
const happiness = { uri: 'photo-1533227268428-f9ed0900fb3b', small: buildUrl('photo-1533227268428-f9ed0900fb3b'), big: buildUrl('photo-1533227268428-f9ed0900fb3b', regular), author: '', handle: '' };
const history = { uri: 'photo-1569943514245-df02f62cecf2', small: buildUrl('photo-1569943514245-df02f62cecf2'), big: buildUrl('photo-1569943514245-df02f62cecf2', regular), author: '', handle: '' };
const honor = { uri: 'photo-1529787730-bdcabd22a644', small: buildUrl('photo-1529787730-bdcabd22a644'), big: buildUrl('photo-1529787730-bdcabd22a644', regular), author: '', handle: '' };
const hypothesis = { uri: 'photo-1474325874720-4b395be870c4', small: buildUrl('photo-1474325874720-4b395be870c4'), big: buildUrl('photo-1474325874720-4b395be870c4', regular), author: '', handle: '' };
const idea = { uri: 'photo-1472739841375-d0ea9f0cb6a6', small: buildUrl('photo-1472739841375-d0ea9f0cb6a6'), big: buildUrl('photo-1472739841375-d0ea9f0cb6a6', regular), author: 'Caleb Jones', handle: '@dcalebjones' };
const immortality = { uri: 'photo-1567328515139-74160bc483fe', small: buildUrl('photo-1567328515139-74160bc483fe'), big: buildUrl('photo-1567328515139-74160bc483fe', regular), author: '', handle: '' }; // photo-1573853403795-8755533bcd87 // Fan Yang , @vindurriel
const induction = { uri: 'photo-1453487021979-5b739b2849f4', small: buildUrl('photo-1453487021979-5b739b2849f4'), big: buildUrl('photo-1453487021979-5b739b2849f4', regular), author: '', handle: '' };
const infinity = { uri: 'photo-1566555383396-e0b73b0c3e9f', small: buildUrl('photo-1566555383396-e0b73b0c3e9f'), big: buildUrl('photo-1566555383396-e0b73b0c3e9f', regular), author: '', handle: '' };
const judgment = { uri: 'photo-1555374018-13a8994ab246', small: buildUrl('photo-1555374018-13a8994ab246'), big: buildUrl('photo-1555374018-13a8994ab246', regular), author: '', handle: '' };
const justice = { uri: 'photo-1453945619913-79ec89a82c51', small: buildUrl('photo-1453945619913-79ec89a82c51'), big: buildUrl('photo-1453945619913-79ec89a82c51', regular), author: '', handle: '' };
const knowledge = { uri: 'photo-1570280375658-bc8083a218f0', small: buildUrl('photo-1570280375658-bc8083a218f0'), big: buildUrl('photo-1570280375658-bc8083a218f0', regular), author: '', handle: '' };
const labor = { uri: 'photo-1517347827035-8b3805dea38f', small: buildUrl('photo-1517347827035-8b3805dea38f'), big: buildUrl('photo-1517347827035-8b3805dea38f', regular), author: '', handle: '' };
const language = { uri: 'photo-1474459321707-0f6fac57151c', small: buildUrl('photo-1474459321707-0f6fac57151c'), big: buildUrl('photo-1474459321707-0f6fac57151c', regular), author: '', handle: '' };
const law = { uri: 'photo-1560780148-d8a687acdc5f', small: buildUrl('photo-1560780148-d8a687acdc5f'), big: buildUrl('photo-1560780148-d8a687acdc5f', regular), author: 'DDP', handle: '@moino007' };
const liberty = { uri: 'photo-1492217072584-7ff26c10eb75', small: buildUrl('photo-1492217072584-7ff26c10eb75'), big: buildUrl('photo-1492217072584-7ff26c10eb75', regular), author: '', handle: '' };
const life_and_death = { uri: 'photo-1501421018470-faf26f6b1bef', small: buildUrl('photo-1501421018470-faf26f6b1bef'), big: buildUrl('photo-1501421018470-faf26f6b1bef', regular), author: 'Jean-Phillipe Delberghe', handle: '@jipy32' }; // photo-1574434273760-54ce56c94c33 // Jonathan Borba, @jonathanborba
const love = { uri: 'photo-1494451930944-8998635c2123', small: buildUrl('photo-1494451930944-8998635c2123'), big: buildUrl('photo-1494451930944-8998635c2123', regular), author: '', handle: '' }; // photo-1542338492-41740e01673f
const man = { uri: 'photo-1539640038819-57bb520c7d2d', small: buildUrl('photo-1539640038819-57bb520c7d2d'), big: buildUrl('photo-1539640038819-57bb520c7d2d', regular), author: '', handle: '' };//photo-1560787313-5dff3307e257
const mathematics = { uri: 'photo-1573736419810-c0aa49e31fa2', small: buildUrl('photo-1573736419810-c0aa49e31fa2'), big: buildUrl('photo-1573736419810-c0aa49e31fa2', regular), author: 'CLark Van Der Beken', handle: '@snaps_by_clark' };
const matter = { uri: 'photo-1527409335569-f0e5c91fa707', small: buildUrl('photo-1527409335569-f0e5c91fa707'), big: buildUrl('photo-1527409335569-f0e5c91fa707', regular), author: '', handle: '' };
const mechanics = { uri: 'photo-1472035846169-06348f2377fa', small: buildUrl('photo-1472035846169-06348f2377fa'), big: buildUrl('photo-1472035846169-06348f2377fa', regular), author: '', handle: '' }; // photo-1558395932-2231f33572a9 // @plqml
const medicine = { uri: 'photo-1562243061-204550d8a2c9', small: buildUrl('photo-1562243061-204550d8a2c9'), big: buildUrl('photo-1562243061-204550d8a2c9', regular), author: '', handle: '' };
const memory_and_imagination = { uri: 'photo-1520516415634-922de22da03d', small: buildUrl('photo-1520516415634-922de22da03d'), big: buildUrl('photo-1520516415634-922de22da03d', regular), author: 'Nathan Dumlao', handle: '@nate_dumlao' }; // 'photo-1521979548744-463128ea80d8';
const metaphysics = { uri: 'photo-1512414584153-b9a3e3484950', small: buildUrl('photo-1512414584153-b9a3e3484950'), big: buildUrl('photo-1512414584153-b9a3e3484950', regular), author: '', handle: '' };
const mind = { uri: 'photo-1502230831726-fe5549140034', small: buildUrl('photo-1502230831726-fe5549140034'), big: buildUrl('photo-1502230831726-fe5549140034', regular), author: '', handle: '' };
const monarchy = { uri: 'photo-1551058639-e209197aba8b', small: buildUrl('photo-1551058639-e209197aba8b'), big: buildUrl('photo-1551058639-e209197aba8b', regular), author: '', handle: '' }; // photo-1554295295-2c44cff7508f // Louise Pilgaard, @toft_pilgaard
const nature = { uri: 'photo-1463107971871-fbac9ddb920f', small: buildUrl('photo-1463107971871-fbac9ddb920f'), big: buildUrl('photo-1463107971871-fbac9ddb920f', regular), author: '', handle: '' };//photo-1485795046599-702122cd1267
const necessity_and_contingency = { uri: 'photo-1462690417829-5b41247f6b0e', small: buildUrl('photo-1462690417829-5b41247f6b0e'), big: buildUrl('photo-1462690417829-5b41247f6b0e', regular), author: 'Christian Joudrey', handle: '@cjoudrey' };
const oligarchy = { uri: 'photo-1543840951-931bdaabb169', small: buildUrl('photo-1543840951-931bdaabb169'), big: buildUrl('photo-1543840951-931bdaabb169', regular), author: 'Joel Barwick', handle: '@joelbarwick' };
const one_and_many = { uri: 'photo-1464917423479-6bd9527d469f', small: buildUrl('photo-1464917423479-6bd9527d469f'), big: buildUrl('photo-1464917423479-6bd9527d469f', regular), author: 'Priscilla Du Preez', handle: '@priscilladupreez' };
const opinion = { uri: 'photo-1529739121416-921f4dae728e', small: buildUrl('photo-1529739121416-921f4dae728e'), big: buildUrl('photo-1529739121416-921f4dae728e', regular), author: 'Alvin Balemesa', handle: '@ainbal' };
const opposition = { uri: 'photo-1505958891520-0c2f2950693f', small: buildUrl('photo-1505958891520-0c2f2950693f'), big: buildUrl('photo-1505958891520-0c2f2950693f', regular), author: 'Jeremy Bishop', handle: '@jeremybishop' };
const philosophy = { uri: 'photo-1564737141443-04001033cb6c', small: buildUrl('photo-1564737141443-04001033cb6c'), big: buildUrl('photo-1564737141443-04001033cb6c', regular), author: 'MEAX', handle: '@meaxgang' }; // 'photo-1550016941-7717d5d1a38a'; // Jasper Smith, @jaspersmith
const physics = { uri: 'photo-1492962827063-e5ea0d8c01f5', small: buildUrl('photo-1492962827063-e5ea0d8c01f5'), big: buildUrl('photo-1492962827063-e5ea0d8c01f5', regular), author: 'Linus Mimeitz', handle: '@linusmimeitz' };
const pleasure_and_pain = { uri: 'photo-1524088484081-4ca7e08e3e19', small: buildUrl('photo-1524088484081-4ca7e08e3e19'), big: buildUrl('photo-1524088484081-4ca7e08e3e19', regular), author: 'Luis Galvez', handle: '@louiscesar' };
const quality = { uri: 'photo-1527167598984-8802d8028eea', small: buildUrl('photo-1527167598984-8802d8028eea'), big: buildUrl('photo-1527167598984-8802d8028eea', regular), author: 'Sharon McCutcheon', handle: '@sharonmccutcheon' }; //  ... photo-1532509561631-587d16b6d29f Markus Spiske, @markusspiske
const poetry = { uri: 'photo-1473186505569-9c61870c11f9', small: buildUrl('photo-1473186505569-9c61870c11f9'), big: buildUrl('photo-1473186505569-9c61870c11f9', regular), author: 'Álvaro Serrano', handle: '@alvaroserrano' };
const principle = { uri: 'photo-1511351817482-e0d6127f20bb', small: buildUrl('photo-1511351817482-e0d6127f20bb'), big: buildUrl('photo-1511351817482-e0d6127f20bb', regular), author: 'Mirjo Blicke', handle: '@mirkoblicke' };
const progress = { uri: 'photo-1531228040767-7a99c3ff4489', small: buildUrl('photo-1531228040767-7a99c3ff4489'), big: buildUrl('photo-1531228040767-7a99c3ff4489', regular), author: 'Sweet Ice Cream Photography', handle: '@sweeticecreamwedding' }; // 'photo-1541415203868-7279187bb7bb'; // Annie Spratt, @anniespratt
const prophecy = { uri: 'photo-1481709761765-0876c08d7d26', small: buildUrl('photo-1481709761765-0876c08d7d26'), big: buildUrl('photo-1481709761765-0876c08d7d26', regular), author: 'Gareth Harper', handle: '@garethharper' };
const prudence = { uri: 'photo-1477517787936-70ba786643fd', small: buildUrl('photo-1477517787936-70ba786643fd'), big: buildUrl('photo-1477517787936-70ba786643fd', regular), author: 'Raoul Ortega', handle: '@ra_oul' };
const punishment = { uri: 'photo-1545243894-2028accad3aa', small: buildUrl('photo-1545243894-2028accad3aa'), big: buildUrl('photo-1545243894-2028accad3aa', regular), author: 'Kyryll Ushakov', handle: '@ushakov_kyryll' };
const quantity = { uri: 'photo-1519673504889-344865afc163', small: buildUrl('photo-1519673504889-344865afc163'), big: buildUrl('photo-1519673504889-344865afc163', regular), author: 'Simon Basler ', handle: '@simonbasler' };
const reasoning = { uri: 'photo-1521866337281-e7207a7159c9', small: buildUrl('photo-1521866337281-e7207a7159c9'), big: buildUrl('photo-1521866337281-e7207a7159c9', regular), author: 'Victor G', handle: '@victor_g' };
const relation = { uri: 'photo-1518600942388-37b306a5544b', small: buildUrl('photo-1518600942388-37b306a5544b'), big: buildUrl('photo-1518600942388-37b306a5544b', regular), author: 'Georgy Rudikov', handle: '@rudakov_g' }; //  ... // photo-1551849515-5a5037b65ac3 // Maskedemann, @maskedemann
const religion = { uri: 'photo-1528568427128-2b4c062ea9c8', small: buildUrl('photo-1528568427128-2b4c062ea9c8'), big: buildUrl('photo-1528568427128-2b4c062ea9c8', regular), author: 'Blake Campbell', handle: '@blakecampbell' }; //  ... photo-1564576605017-f1d270c33460 // Adrian Dascal, @dascal
const revolution = { uri: 'photo-1553258318-c22356c14808', small: buildUrl('photo-1553258318-c22356c14808'), big: buildUrl('photo-1553258318-c22356c14808', regular), author: 'Markus Spiske ', handle: '@markusspiske' };
const rhetoric = { uri: 'photo-1521424159246-e4a66f267e4b', small: buildUrl('photo-1521424159246-e4a66f267e4b'), big: buildUrl('photo-1521424159246-e4a66f267e4b', regular), author: 'DESIGNECOLOGIST', handle: '@designecologist' };
const same_and_other = { uri: 'photo-1525286116112-b59af11adad1', small: buildUrl('photo-1525286116112-b59af11adad1'), big: buildUrl('photo-1525286116112-b59af11adad1', regular), author: 'Eloise Ambursley', handle: '@e_ambursley' }; //  ... photo-1573342560821-6ac96c880987 // Tim Mossholder, @timmossholder
const science = { uri: 'photo-1507413245164-6160d8298b31', small: buildUrl('photo-1507413245164-6160d8298b31'), big: buildUrl('photo-1507413245164-6160d8298b31', regular), author: 'Hal Gatewood', handle: '@halgatewood' };
const sense = { uri: 'photo-1569914512821-7005a6786982', small: buildUrl('photo-1569914512821-7005a6786982'), big: buildUrl('photo-1569914512821-7005a6786982', regular), author: 'Julian Dutton', handle: '@julian_dutton' };
const tyranny_and_despotism = { uri: 'photo-1574099951664-6ada1812c3f2', small: buildUrl('photo-1574099951664-6ada1812c3f2'), big: buildUrl('photo-1574099951664-6ada1812c3f2', regular), author: 'Luis Villasmil', handle: '@villxsmil' };
const sign_and_symbol = { uri: 'photo-1561059817-7fc87a9cd2fa', small: buildUrl('photo-1561059817-7fc87a9cd2fa'), big: buildUrl('photo-1561059817-7fc87a9cd2fa', regular), author: 'Ben Mater', handle: '@benjmater' }; //  ... photo-1551759138-d64d3db619b6, Josh Applegate, @joshapplegate ... // photo-1573231766958-e980d37845a5 // Peter Mode, @petermode
const sin = { uri: 'photo-1543880624-5795fe87a603', small: buildUrl('photo-1543880624-5795fe87a603'), big: buildUrl('photo-1543880624-5795fe87a603', regular), author: 'T Rader', handle: '@matthew_t_rader' }; // Matthew
const slavery = { uri: 'photo-1528108827304-51446e007137', small: buildUrl('photo-1528108827304-51446e007137'), big: buildUrl('photo-1528108827304-51446e007137', regular), author: 'Dirk Spijkers', handle: '@dspijkers' };
const soul = { uri: 'photo-1444069069008-83a57aac43ac', small: buildUrl('photo-1444069069008-83a57aac43ac'), big: buildUrl('photo-1444069069008-83a57aac43ac', regular), author: 'Angelina Litvin', handle: '@linalitvina' }; //  ... photo-1561618178-a1635b596bf0 // Start Digital, @startdig
const space = { uri: 'photo-1462331940025-496dfbfc7564', small: buildUrl('photo-1462331940025-496dfbfc7564'), big: buildUrl('photo-1462331940025-496dfbfc7564', regular), author: 'NASA', handle: '@nasa' };
const state = { uri: 'photo-1513023001678-6927b70dc4a0', small: buildUrl('photo-1513023001678-6927b70dc4a0'), big: buildUrl('photo-1513023001678-6927b70dc4a0', regular), author: 'Ryan Wallace', handle: '@accrualbowtie' };
const temperance = { uri: 'photo-1509490927285-34bd4d057c88', small: buildUrl('photo-1509490927285-34bd4d057c88'), big: buildUrl('photo-1509490927285-34bd4d057c88', regular), author: 'Nathan Dumlao', handle: '@nate_dumlao' };
const theology = { uri: 'photo-1564540400309-0745c2a66a11', small: buildUrl('photo-1564540400309-0745c2a66a11'), big: buildUrl('photo-1564540400309-0745c2a66a11', regular), author: 'Caleb Woods', handle: '@caleb_woods' };
const time = { uri: 'photo-1454793147212-9e7e57e89a4f', small: buildUrl('photo-1454793147212-9e7e57e89a4f'), big: buildUrl('photo-1454793147212-9e7e57e89a4f', regular), author: 'Henry Be', handle: '@henry_be' };
const truth = { uri: 'photo-1523586797235-580376c5d862', small: buildUrl('photo-1523586797235-580376c5d862'), big: buildUrl('photo-1523586797235-580376c5d862', regular), author: 'Jon Tyson', handle: '@jontyson' };
const universal_and_particular = { uri: 'photo-1574151087830-a9045bb71b8d', small: buildUrl('photo-1574151087830-a9045bb71b8d'), big: buildUrl('photo-1574151087830-a9045bb71b8d', regular), author: 'FOODISM360', handle: '@foodism360' };
const virtue_and_vice = { uri: 'photo-1570639224370-72eba2a0f9c7', small: buildUrl('photo-1570639224370-72eba2a0f9c7'), big: buildUrl('photo-1570639224370-72eba2a0f9c7', regular), author: 'Kelly Sikkema', handle: '@kellysikkema' }; //  ... photo-1572116618753-98d395f2d48f // Alistair MacRobert, @alistarmacrobert ... 'photo-1562104011-786544a6a166'; // Brian Kyed, @brnkd
const war_and_peace = { uri: 'photo-1526818614391-390bc085968b', small: buildUrl('photo-1526818614391-390bc085968b'), big: buildUrl('photo-1526818614391-390bc085968b', regular), author: 'Thomas Q', handle: '@thomasq' };
const wealth = { uri: 'photo-1516238840914-94dfc0c873ae', small: buildUrl('photo-1516238840914-94dfc0c873ae'), big: buildUrl('photo-1516238840914-94dfc0c873ae', regular), author: 'Sharon McCutcheon', handle: '@sharonmccutcheon' };
const will = { uri: 'photo-1517883405152-7067727fcdb3', small: buildUrl('photo-1517883405152-7067727fcdb3'), big: buildUrl('photo-1517883405152-7067727fcdb3', regular), author: 'Nathan Dumlao', handle: '@nate_dumlao' }; //  ... 'photo-1472487883843-090fcd92e0c8'; // Saksham Gangwar, @saksham
const wisdom = { uri: 'photo-1544648720-132573cb590d', small: buildUrl('photo-1544648720-132573cb590d'), big: buildUrl('photo-1544648720-132573cb590d', regular), author: 'Lorenzo Moschi', handle: '@lordesigner' };
const world = { uri: 'photo-1446776811953-b23d57bd21aa', small: buildUrl('photo-1446776811953-b23d57bd21aa'), big: buildUrl('photo-1446776811953-b23d57bd21aa', regular), author: 'NASA', handle: '@nasa' };

// routes
const search = { uri: 'photo-1485847791529-09ed2263da0b', small: buildUrl('photo-1485847791529-09ed2263da0b'), big: buildUrl('photo-1485847791529-09ed2263da0b', regular), author: '', handle: '' };
const searchBig = buildUrl(search.uri, full);

// img sources
const variables = {
  angel,
  animal,
  aristocracy,
  art,
  astronomy_and_cosmology,
  beauty,
  being,
  cause,
  chance,
  change,
  citizen,
  logic,
  constitution,
  courage,
  custom_and_convention,
  definition,
  democracy,
  desire,
  dialectic,
  duty,
  education,
  element,
  emotion,
  eternity,
  evolution,
  experience,
  family,
  fate,
  form,
  god,
  good_and_evil,
  government,
  habit,
  happiness,
  history,
  honor,
  hypothesis,
  idea,
  immortality,
  induction,
  infinity,
  judgment,
  justice,
  knowledge,
  labor,
  language,
  law,
  liberty,
  life_and_death,
  love,
  man,
  mathematics,
  matter,
  mechanics,
  medicine,
  memory_and_imagination,
  metaphysics,
  mind,
  monarchy,
  nature,
  necessity_and_contingency,
  oligarchy,
  one_and_many,
  opinion,
  opposition,
  philosophy,
  physics,
  pleasure_and_pain,
  quality,
  poetry,
  principle,
  progress,
  prophecy,
  prudence,
  punishment,
  quantity,
  reasoning,
  relation,
  religion,
  revolution,
  rhetoric,
  same_and_other,
  science,
  sense,
  tyranny_and_despotism,
  sign_and_symbol,
  sin,
  slavery,
  soul,
  space,
  state,
  temperance,
  theology,
  time,
  truth,
  universal_and_particular,
  virtue_and_vice,
  war_and_peace,
  wealth,
  will,
  wisdom,
  world
}

export default variables;