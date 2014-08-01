// copyright Jonathan Topf 2014

var LineText = {};

// ----------------------------------------------------------------------------------------------------
// letter data built using maya 
// ----------------------------------------------------------------------------------------------------

// generated using stutter_maya/scripts/maya_write_letter_json.py
LineText.char_points = {"!": {"data": [[[0.07142471594577382, 0.9477487751610234], [0.07142471594577382, 0.29274126660461386]], [[0.018566848916061307, 0.12431076440439393], [0.14021110050510943, 0.03073826318204964]], [[0.04335296557907031, 0.0213810130598151], [0.10885371643471209, 0.12431076440439393]]], "bbox": [1.0, 0.14843719370467434, 0.0, 0.0]}, " ": {"data": [], "bbox": [1, 0.5, 0, 0]}, "\"": {"data": [[[0.022746911543459092, 1.0630874276300217], [0.052010264246682425, 0.907016213212833]], [[0.10078251875205257, 1.0435785258278731], [0.13980032235634976, 0.9167706641139068]]], "bbox": [1.0, 0.17143662963053663, 0.0, 0.0]}, "'": {"data": [[[0.06689754917002366, 1.0483342944294134], [0.00828615122263665, 0.8390078731887463]]], "bbox": [1.0, 0.09915268814925438, 0.0, 0.0]}, "*": {"data": [[[0.050437958190660895, 0.6086872263016346], [0.6361916767424156, 0.34176148113880944]], [[0.5269555424372427, 0.7416329981979988], [0.15622534082220782, 0.2226107159369507]], [[0.41427065645844274, 0.18752062195478403], [0.258563971780128, 0.7732743405065394]]], "bbox": [1.0, 0.6983498687608901, 0.0, 0.0]}, ",": {"data": [[[0.08943242659314576, 0.11250199051366572], [0.02244797179613267, -0.1336022918292028]]], "bbox": [1.0, 0.1155808566677276, 0.0, 0.0]}, ".": {"data": [[[0.03414349399625277, 0.1594546979077336], [0.1178740624925198, 0.008739674614453463]], [[0.012510540449054613, 0.024271820550303858], [0.13899292938777427, 0.15833209998369968]]], "bbox": [1.0, 0.15829409481575818, 0.0, 0.0]}, "1": {"data": [[[0.02597431085772306, 0.8965163511226988], [0.09938264221686333, 0.997452806741516], [0.1085586836367558, -0.0027357080267684797]]], "bbox": [1.0, 0.13529465888989567, 0.0, 0.0]}, "0": {"data": [[[0.2690169418743551, 0.9684408508842757], [0.10260514168617005, 0.8739569979205855], [0.02126382353725642, 0.5129244135933444], [0.04879194779693474, 0.0816504668583955], [0.2723025755780497, 0.025913358647848966], [0.3863815660116463, 0.2586000278488569], [0.3974815217528498, 0.6230369106320546], [0.3148971489738166, 0.8799660703890453], [0.17986130168793357, 0.9789786116865506]], [[0.361458215764471, 0.9802216663166718], [0.04414459471085735, 0.010284714572829534]]], "bbox": [1.0, 0.4211447911113284, 0.0, 0.0]}, "3": {"data": [[[0.03203169359976761, 0.8123597546658217], [0.21090516891154062, 0.8935824080624717], [0.377316969099726, 0.7914028978135339], [0.4298871083588406, 0.5181642342903322], [0.15120156730610837, 0.4407894095363064], [0.17227708891065843, 0.48270312324088316], [0.40043506977785137, 0.40011875046184975], [0.40949244644548144, 0.10127587700028295], [0.2902039079868788, 0.027867545641142688], [0.03066997421738482, 0.0789573007656117]]], "bbox": [1.0, 0.4441442270371915, 0.0, 0.0]}, "2": {"data": [[[0.01433583365121309, 0.7218187307831909], [0.11322971019645633, 0.9145156006009338], [0.2783984557545218, 0.9420437248606108], [0.40686303563301696, 0.666762482263836], [0.04899742025720899, 0.024439582871359056], [0.3976869942131245, 0.024439582871359056]]], "bbox": [1.0, 0.43428732592610697, 0.0, 0.0]}, "5": {"data": [[[0.3714789809105534, 0.976637899239138], [0.022789406954637936, 0.9124056092998907], [0.031965448374530414, 0.4352514554654794], [0.27971856671162865, 0.5270118696644048], [0.39900710517023086, 0.2792587513273064], [0.3806550223304459, 0.01054877613791999], [0.0961977383137782, 0.01054877613791999], [0.05031753121431537, 0.18749833712838115]]], "bbox": [1.0, 0.42443042481502313, 0.0, 0.0]}, "4": {"data": [[[0.19731853566576485, 0.9946072557615699], [0.02557852270030958, 0.4578681650739884], [0.40179622091590295, 0.46704420649388045]], [[0.22745143393794498, 0.6322129520519459], [0.2641555996175149, 0.008242135499254788]]], "bbox": [1.0, 0.4277160585187183, 0.0, 0.0]}, "7": {"data": [[[0.025456278316336015, 0.9669060375658842], [0.3761884313458257, 0.9485539547260997], [0.04585094022969516, 0.012597729897062315]], [[0.10090718874905047, 0.4897518837314736], [0.3211321828264708, 0.5081039665712586]]], "bbox": [1.0, 0.3981453551854661, 0.0, 0.0]}, "6": {"data": [[[0.4317271549721874, 0.9464216413417375], [0.1175286132867499, 0.7022236724326709], [0.025376558484413447, 0.1727654349366703], [0.22610327400481456, 0.017232504221794676], [0.4239612623911202, 0.1936430337635826], [0.33655898219049263, 0.4592884615171682], [0.05290468274409088, 0.49679561176700426]]], "bbox": [1.0, 0.4507154944445807, 0.0, 0.0]}, "9": {"data": [[[0.3543058837327546, 0.3874220680785174], [0.07157113113294677, 0.4772333019899415], [0.01101055289806041, 0.7919708751240533], [0.19063302072091037, 0.9518619398372259], [0.3851625085498229, 0.7295712031959765], [0.3304494711774364, 0.41758579491963177], [0.09428134797102672, 0.010744596439625553]]], "bbox": [1.0, 0.40471662259285535, 0.0, 0.0]}, "8": {"data": [[[0.22777004500995443, 0.5087431464498402], [0.41581956174162094, 0.645022048365845], [0.4532045871123813, 0.8783895772580443], [0.14959569581247495, 0.9628978643583885], [0.04028272321721893, 0.6856927074403019], [0.4271568469873498, 0.3119611184849485], [0.38692971809955967, 0.05855492193617748], [0.1543617136508147, 0.028984218602925577], [0.021930640377433974, 0.21771459502578283], [0.11697668828005338, 0.4019162831148246], [0.24736518247986083, 0.513952694474847]]], "bbox": [1.0, 0.4704292966667484, 0.0, 0.0]}, "<": {"data": [[[0.25918396710512426, 0.34924010418225887], [0.03817684735424756, 0.5020725035377234], [0.25001000081899344, 0.6879998756125446]]], "bbox": [1.0, 0.33278219135649734, 0.0, 0.0]}, "?": {"data": [[[0.052258866687543204, 0.5872039696624769], [0.03127934400699495, 0.7814213891014579], [0.1810349673464664, 0.9052712310510043], [0.3376847114534849, 0.8257048889742198], [0.37271001466331555, 0.5942169545811871], [0.2211676236077187, 0.4320577115277837], [0.20902747494572615, 0.24104514721538495]], [[0.15755269392750737, 0.09126971318405186], [0.2604824452720855, 0.016411712206176432]], [[0.2324106949053828, 0.09126971318405186], [0.16690994404974102, -0.002302788038292425]]], "bbox": [1.0, 0.3948597214817714, 0.0, 0.0]}, ">": {"data": [[[0.05798157238785951, 0.34924010418225887], [0.28766176550228095, 0.5020725035377234], [0.06751555640881955, 0.6879998756125446]]], "bbox": [1.0, 0.33278219135649734, 0.0, 0.0]}, "A": {"data": [[[0.012919521784120924, 0.00572086720720362], [0.15971667480903218, 0.9932653511929679], [0.4132753936702418, 0.00572086720720362]], [[0.03960991324319574, 0.4594575220114743], [0.34654941502255543, 0.472802717741011]]], "bbox": [1.0, 0.4384250430714586, 0.0, 0.0]}, "C": {"data": [[[0.3949909069555724, 0.9324744825731728], [0.11804748732058656, 0.7946745143431577], [0.025733014108924257, 0.5149802149235784], [0.032834127432898264, 0.19239135405270444], [0.1535530539404566, 0.03616686092527603], [0.41629424692749506, 0.011824759661310094]]], "bbox": [1.0, 0.44088804134860027, 0.0, 0.0]}, "B": {"data": [[[0.07882586428108773, 0.8891549059612758], [0.007814731041347667, 0.008616853788497872], [0.2279492440845421, 0.02281908043644556], [0.3415670572681262, 0.13643689362002986], [0.3699715105640222, 0.29266138674745823], [0.24215147073248966, 0.3991780866070689], [0.05042141098519126, 0.4133803132550169], [0.2634548107044119, 0.441784766550913], [0.377072623887996, 0.5412003530865486], [0.362870397240048, 0.7471326394817954], [0.19954479078864606, 0.8891549059612758], [0.07882586428108773, 0.8891549059612758]]], "bbox": [1.0, 0.40394306719147555, 0.0, 0.0]}, "E": {"data": [[[0.286831128644236, 0.9376506814446628], [0.038292162305146094, 0.9305495681206885], [0.01698882233322463, 0.012066891049143338], [0.3010333552921852, 0.012066891049143338]], [[0.009887709009249956, 0.4523359171355321], [0.24422444870039306, 0.4594370304595065]]], "bbox": [1.0, 0.33243268111157365, 0.0, 0.0]}, "D": {"data": [[[0.046859203049310905, 0.947316359758097], [0.032656976401364, 0.027667432649195904], [0.18888146952879237, 0.05607188594509199], [0.28119594274045645, 0.1412852458327809], [0.3806115292760901, 0.3478962731993602], [0.3309037360082727, 0.727179290497752], [0.20308369617673927, 0.9260130197861753], [0.046859203049310905, 0.947316359758097]]], "bbox": [1.0, 0.4112878900002447, 0.0, 0.0]}, "G": {"data": [[[0.35325775271880255, 0.8922083446167479], [0.20616397834668865, 0.8922083446167479], [0.0891501672604611, 0.7487028988227711], [0.024133100759833548, 0.45451535007854316], [0.01800419349432958, 0.11742545047578234], [0.18917123678657766, 0.019362934227706297], [0.34656427241165977, 0.1358121722722968], [0.383337716004688, 0.3012926684409247], [0.1810837762430313, 0.3012926684409247]]], "bbox": [1.0, 0.4178591574076338, 0.0, 0.0]}, "F": {"data": [[[0.021567256968594517, 0.025374374413432932], [0.03995397876510909, 0.9250607967378549], [0.4142596821027831, 0.9311897040033598]], [[0.021567256968594517, 0.42988225393674573], [0.2483368257922698, 0.4543978829987647]]], "bbox": [1.0, 0.4572867618519699, 0.0, 0.0]}, "I": {"data": [[[0.017237180565154553, 0.9524537379726419], [0.04788171689267884, 0.019166114491009245]]], "bbox": [1.0, 0.0892957870381706, 0.0, 0.0]}, "H": {"data": [[[0.030723590747160134, 0.9557298232698908], [0.02487697000247291, 0.02490138228312022]], [[0.015622502654338816, 0.47400533178987847], [0.3446249417135552, 0.4801342390553833]], [[0.3171059654686601, 0.9479071968794739], [0.3171059654686601, 0.01264356775211073]]], "bbox": [1.0, 0.36200338444482527, 0.0, 0.0]}, "K": {"data": [[[0.05468953065280591, 0.9499945554777796], [0.035738235814655184, 0.006908299959999309]], [[0.04186714308016004, 0.33174038503175096], [0.32379687729337814, 0.5339943247934076]], [[0.1521874738592448, 0.42367399401432215], [0.3116031974832468, 0.02245174819470344]]], "bbox": [1.0, 0.35214648333374143, 0.0, 0.0]}, "J": {"data": [[[0.28092363112219765, 0.9625995180250564], [0.2926168726115703, 0.21568478646055467], [0.2619723362840469, 0.062462104822935904], [0.13939419097395245, 0.025688661229907428], [0.04133167472587651, 0.13600899200899286], [0.029073860194866796, 0.2095558791950498]]], "bbox": [1.0, 0.3258614137041844, 0.0, 0.0]}, "M": {"data": [[[0.016154039761637762, 0.005501104399759815], [0.05462120247957625, 0.9479465909892975], [0.20848985335134085, 0.011912298186083303], [0.3303025352914828, 0.9415353972029736], [0.4328816358726568, -0.007321283172886828]]], "bbox": [1.0, 0.4480452220721175, 0.0, 0.0]}, "L": {"data": [[[0.032468833253597396, 0.9460301659592347], [0.05170241461256797, 0.02281826072866766], [0.33379494121079656, 0.035640648301314415]]], "bbox": [1.0, 0.3652890181485199, 0.0, 0.0]}, "O": {"data": [[[0.2839897394915738, 0.893830045607247], [0.08556287935768037, 0.8362893751514027], [0.021450941494446596, 0.5606080423394975], [0.021450941494446596, 0.06053492700627361], [0.2330203364431176, 0.009245376715686482], [0.36765540595590895, 0.150291640014801], [0.39330018110120246, 0.534963267194204], [0.3548330183832631, 0.8362893751514027], [0.14887444911558434, 0.9041671675815288]]], "bbox": [1.0, 0.41457352370393974, 0.0, 0.0]}, "N": {"data": [[[0.04011996995508138, 0.021523415455645623], [0.03370877616875756, 0.9447353206862126], [0.3735020468438979, 0.015112221669322246], [0.4055580157755134, 0.9383241268998888]]], "bbox": [1.0, 0.43202789228045335, 0.0, 0.0]}, "Q": {"data": [[[0.36402590517189526, 0.9043125429837271], [0.14291975635427215, 0.845331209938289], [0.02094700079306122, 0.4939961406590304], [0.07632255289267292, 0.042087015533765176], [0.2838059460323201, 0.019887947713232074], [0.41202982175878766, 0.1349692886249212], [0.444085790690405, 0.3208939084282991], [0.48255295340834437, 0.6350424039581448], [0.40064809677573476, 0.8231321421177562], [0.23171602763640423, 0.9271519052885233]], [[0.21237216051228813, 0.3463981282512416], [0.4811166949414538, -0.1213379075056632]]], "bbox": [1.0, 0.5164281685184731, 0.0, 0.0]}, "P": {"data": [[[0.03624914811728974, 0.0176121854865553], [0.0234267605446421, 0.934412896930799], [0.35039764364713477, 0.9151793155718284], [0.42092077529669325, 0.748488277127421], [0.39527600015139885, 0.5561524635377195], [0.29910809335654776, 0.45998455674286853], [0.017015566758319167, 0.48562933188816204]]], "bbox": [1.0, 0.4441442270371908, 0.0, 0.0]}, "S": {"data": [[[0.4300928274676945, 0.8523837659627373], [0.2143752425831913, 0.9416462148804641], [0.020973269928116878, 0.6887359429469051], [0.11767425625565409, 0.4655798206525885], [0.38546160300883336, 0.3986329839642937], [0.43753136487750766, 0.10853002498168207], [0.2929135203874147, 0.005941594943186385], [0.043288882157549224, 0.056460263113008224], [0.028411807337928252, 0.16803832426016652]]], "bbox": [1.0, 0.4704292966667484, 0.0, 0.0]}, "R": {"data": [[[0.059880349513411646, 0.026764664143886452], [0.015001993009148451, 0.9627989569471003], [0.38685123261590343, 0.9307429880154829], [0.4317295891201666, 0.706351205494165], [0.38685123261590343, 0.5332489732634336], [0.2842721320347294, 0.5011930043318166], [0.04064676815444196, 0.5140153919044633], [0.44455197669281427, 0.020353470357563075]]], "bbox": [1.0, 0.4770005640741376, 0.0, 0.0]}, "U": {"data": [[[0.012559390324483388, 0.8859768050469075], [0.012559390324483388, 0.09005330219717822], [0.1092603766520206, 0.008229390689262095], [0.3026623493070968, 0.008229390689262095], [0.3547321111757711, 0.14956160147566266], [0.3919247982248244, 0.915730954686149]]], "bbox": [1.0, 0.4112878900002447, 0.0, 0.0]}, "T": {"data": [[[0.007767210214094433, 0.9342076774706531], [0.3796940807046223, 0.9267691400608431]], [[0.1788535706397365, 0.9565232897000853], [0.1714150332299269, 0.01926757606395546]]], "bbox": [1.0, 0.40800225629655007, 0.0, 0.0]}, "W": {"data": [[[0.010466401763737032, 0.9081297724485999], [0.15575087466335003, 0.010784498656869701], [0.34376607488637934, 0.8739451905898674], [0.4890505477859941, 0.01933064412155283], [0.6685196025443387, 0.8568528996605012]]], "bbox": [1.0, 0.6807098537032049, 0.0, 0.0]}, "V": {"data": [[[0.02090623792397417, 0.9114591435746495], [0.18328300175295298, 0.005567724318235601], [0.4225750747640815, 0.9370975799686985]]], "bbox": [1.0, 0.4441442270371915, 0.0, 0.0]}, "Y": {"data": [[[0.020368447119568325, 0.9588481680372889], [0.2356761375986708, 0.43031289318263577]], [[0.3536856094175961, 0.9529585122161779], [0.06311666361836832, 0.01288251110103178]]], "bbox": [1.0, 0.404716622592856, 0.0, 0.0]}, "X": {"data": [[[0.0289521302789133, 0.913451851403023], [0.3707979488662403, 0.01610657761129264]], [[0.03845439288850727, 0.009472666436430965], [0.3878902397956061, 0.887813415008974]]], "bbox": [1.0, 0.40800225629655007, 0.0, 0.0]}, "Z": {"data": [[[0.035127014204026086, 0.9102791501221077], [0.453888141973501, 0.9017330046574239], [0.018034723274658493, 0.004387730865693662], [0.43679585104413343, 0.012933876330376792]], [[0.13183033951502487, 0.4794060814788259], [0.42546366495158416, 0.47023004005893343]]], "bbox": [1.0, 0.4835718314815268, 0.0, 0.0]}};

LineText.key_outline = [[-0.5179021055426402, 1.109176177049986, 0.0], [-0.5145144387695061, -0.14426052900962094, 0.0], [-0.3959461017098136, -0.27299186638871564, 0.0], [0.8303892701647206, -0.27299186638871586, 0.0], [0.9455699404512797, -0.1374851954633528, 0.0], [0.9320192733587426, 1.1057885102768517, 0.0], [0.8032879359796475, 1.2345198476559467, 0.0], [-0.37900776784414336, 1.2243568473365443, 0.0], [-0.5179021055426402, 1.109176177049986, 0.0]];
    

// ----------------------------------------------------------------------------------------------------
// Character
// ----------------------------------------------------------------------------------------------------

LineText.Character = function (character, args)
{
    this.character = character;

    this.width = LineText.char_points[this.character]["bbox"][1];
    this.jitter_freq = 3;
    this.jitter_mult = 1;
    this.color = 0xffffff;
    this.cycle_color = false;
    this.sparkle = false;
    this.num_sparkles = 2;
    this.key_outline = false;
    this.visible = false;
    this.ofset_char = 0;

    Utils.namedArgs(this, args);   
    
    // state
    this.jitter_phase = 0;

    // THREE objects
    this.scene_object = new THREE.Object3D();

    this.material = new THREE.LineBasicMaterial({
        color: this.color,
        linewidth: 1,
        linejoin: "mitre"
    });

    this.material.visible = this.visible;

    this.letter_object = new THREE.Object3D();
    this.scene_object.add(this.letter_object);
    this.letter_geo = [];

    var char_data = LineText.char_points[this.character]["data"].slice(0);

    // key outline
    if (this.key_outline)
    {
        char_data.push(LineText.key_outline);
        this.width = 1.5;
        this.ofset_char = 0.5;
    }

    // letter geo
    for (var j = 0; j < char_data.length; j++)
    {
        var line_geo = new THREE.Geometry();
        line_geo.base_geo = char_data[j]; // add original geo as an attr to allow jittering

        for (var l = 0; l < line_geo.base_geo.length; l++)
        {
            var vert = line_geo.base_geo[l];
            line_geo.vertices.push(new THREE.Vector3(vert[0] + this.ofset_char, vert[1], 0));
        }

        var line = new THREE.Line(line_geo, this.material);
        this.letter_object.add(line);
        this.letter_geo.push(line);
    }

    // sparkle geo
    if (this.sparkle)
    {
        this.sparkle_object = new THREE.Object3D();
        this.scene_object.add(this.sparkle_object);
        this.sparkle_geo = [];

        for (var i = 0; i < this.num_sparkles; i++)
        {
            var sparkle_geo = new THREE.Geometry();
            sparkle_geo.vertices.push(new THREE.Vector3(0,0,0));
            sparkle_geo.vertices.push(new THREE.Vector3(0,0,0));
            var line = new THREE.Line(sparkle_geo, this.material);
            this.sparkle_object.add(line);
            this.sparkle_geo.push(line);
        }
    }
}


LineText.Character.prototype.update = function (tick)
{
    if (this.visible)
    {
        // jitter letters
        if (this.jitter_phase == 0)
        {
            this.jitter_phase += 1;
            for (var i = 0; i < this.letter_object.children.length; i++) // innerate over letter_object children
            {
                var child = this.letter_object.children[i];
                for (var v = 0; v < child.geometry.base_geo.length; v++) // itterate over verts
                {
                    child.geometry.vertices[v].x = child.geometry.base_geo[v][0] + (Math.random() * (0.04 * this.jitter_mult));
                    child.geometry.vertices[v].y = child.geometry.base_geo[v][1] + (Math.random() * (0.04 * this.jitter_mult));
                }
                child.geometry.verticesNeedUpdate = true;
            }
        } else if (this.jitter_phase == this.jitter_freq) {
            this.jitter_phase = 0;
        } else {
            this.jitter_phase += 1;
        }

        // jitter_sparkles
        if (this.sparkle)
        {
            for (var i = 0; i < this.num_sparkles; i++)
            {
                point_1 = [Math.random(), Math.random()];
                this.sparkle_geo[i].geometry.vertices[0].x = point_1[0];
                this.sparkle_geo[i].geometry.vertices[0].y = point_1[1];
                this.sparkle_geo[i].geometry.vertices[1].x = point_1[0] + Math.random() * 0.05;
                this.sparkle_geo[i].geometry.vertices[1].y = point_1[1] + Math.random() * 0.05;
                this.sparkle_geo[i].geometry.verticesNeedUpdate = true;
            }
        }

        // cycle colors
        if (this.cycle_color)
        {
            this.material.color.offsetHSL(0.05, 0, 0);
        }
    }
}


LineText.Character.prototype.show = function()
{
    this.material.visible = true;
    this.visible = true;
}

LineText.Character.prototype.hide = function()
{
    this.material.visible = false;
    this.visible = false;
}


// ----------------------------------------------------------------------------------------------------
// Bufer
// ----------------------------------------------------------------------------------------------------

LineText.Buffer = function (){
    this.chars = [];
    this.scene_object = new THREE.Object3D();
    this.busy = false;
    this.init()
}


LineText.Buffer.prototype.init = function ()
{
    for (var i = 0; i < this.chars.length; i++)
    {
        this.scene_object.remove(this.chars[i].scene_object);
    }
    this.chars = [];

    // set default state
    this.line_height = 1.3;
    this.kerning = 0.15;
    this.cursor = [0,-1];
    this.height = 1;
    this.sing = false;

    this.scene_object.position.z = 578;
    this.scene_object.position.x = -8.5;
}


LineText.Buffer.prototype.append = function(text, args)
{
    this.busy = true;
    // create new char objects
    var safe_text = text.toUpperCase()

    for (var i = 0; i < safe_text.length; i++)
    {
        var character = safe_text.charAt(i);
        if (character == '\n'){ 
            this.cursor[0] = 0;
            this.cursor[1] -= this.line_height;
            this.height += this.line_height;
            this.scene_object.position.y = this.height / 2;

        } else {
            var character_object = new LineText.Character(safe_text.charAt(i), args);
            character_object.scene_object.position.x = this.cursor[0];
            character_object.scene_object.position.y = this.cursor[1];
            this.cursor[0] += character_object.width + this.kerning;
            this.scene_object.add(character_object.scene_object);
            this.chars.push(character_object);
        }
    }
}


LineText.Buffer.prototype.update = function(tick)
{
    // show the latest char
    if (this.chars.length > 0)
    {
        if (this.busy == true)
        {
            if (this.chars[this.chars.length -1].visible == false)
            {
                this.visibilityCycle();
            } else {
                this.busy = false;
            }
        }

        // update children 
        for (var i = 0; i < this.chars.length; i++)
        {
            this.chars[i].update(tick);
        }
    }
}


LineText.Buffer.prototype.visibilityCycle = function ()
{
    for (var i = 0; i < this.chars.length; i++)
    {
        // console.log(i)
        if (this.chars[i].visible == false)
        {
            this.chars[i].show();
            return;
        }
    }
}


