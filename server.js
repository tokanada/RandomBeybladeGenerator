let FaceBoltList = new Array();
let EnergyRingList = new Array();
let FusionWheelList = new Array();
let SpinTrackList = new Array();
let PerformanceTipList = new Array();

function resolveAfter1Second() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 500);
    });
}

function parseCsvToArray(csvFile) {
    const FileReader = require('fs');
    const CsvReader = require('csv-reader');
    const AutoDetectDecoderStream = require('autodetect-decoder-stream');

    let array = new Array();
    let inputStream = FileReader.createReadStream(csvFile)
        .pipe(new AutoDetectDecoderStream({ defaultEncoding: '1255' }));

    inputStream
        .pipe(new CsvReader({ parseNumbers: true, parseBooleans: true, trim: true, asObject: true }))
        .on('data', function(row) {
            array.push(row);
        })
        // .on('end', function() {
        //     console.log('csv read complete')
        // });

    return array;
}

function generateListOfParts() {
    generateListOfFaceBolts();
    generateListOfEnergyRings();
    generateListOfFusionWheels();
    generateListOfSpinTracks();
    generateListOfPerformanceTips();
}

function generateListOfFaceBolts() {
    FaceBoltList = parseCsvToArray('csv/FaceBolt.csv');
}

function generateListOfEnergyRings() {
    EnergyRingList = parseCsvToArray('csv/EnergyRing.csv');
}

function generateListOfFusionWheels() {
    FusionWheelList = parseCsvToArray('csv/FusionWheel.csv');
}

function generateListOfSpinTracks() {
    SpinTrackList = parseCsvToArray('csv/SpinTrack.csv');
}

function generateListOfPerformanceTips() {
    PerformanceTipList = parseCsvToArray('csv/PerformanceTip.csv');
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function isEnergyFusionCompat(energyRing, fusionWheel) {
    if (energyRing.HasSpecificFusion == true) {
        let requiredFusionWheel = energyRing.RequiredFusion;
        if (fusionWheel.Name != requiredFusionWheel) {
            return false;
        }
    }

    if (fusionWheel.HasSpecificEnergyRing == true) {
        let requiredEnergyRing = fusionWheel.requiredEnergyRing;
        if (energyRing.Name != requiredEnergyRing) {
            return false;
        }
    }
    return true;
}

function doesSpinTrackRequireTip(spinTrack) {
    if (spinTrack.AcceptsTip) {
        return true;
    }
    return false;
}

function generateRandomBeyblade() {
    let facebolt = FaceBoltList[getRandomNumber(FaceBoltList.length)];

    let energyRing;
    let fusionWheel;
    while (true) {
        energyRing = EnergyRingList[getRandomNumber(EnergyRingList.length)];
        fusionWheel = FusionWheelList[getRandomNumber(FusionWheelList.length)];

        if (isEnergyFusionCompat(energyRing, fusionWheel)) {
            break;
        }
    }

    let spinTrack = SpinTrackList[getRandomNumber(SpinTrackList.length)];

    if (doesSpinTrackRequireTip(spinTrack)) {
        let performanceTip = PerformanceTipList[getRandomNumber(PerformanceTipList.length)];
        let beyblade = [facebolt, energyRing, fusionWheel, spinTrack, performanceTip];

        return beyblade;
    }

    let beyblade = [facebolt, energyRing, fusionWheel, spinTrack];

    return beyblade;
}

function generateBeybladeName(beyblade) {
    try {
        let name = beyblade[0].Name + " " + beyblade[2].Name + " " + beyblade[1].Name + " " + beyblade[3].Name + beyblade[4].Name;
        return name;
    } catch (error) {
        let name = beyblade[0].Name + " " + beyblade[2].Name + " " + beyblade[1].Name + " " + beyblade[3].Name;
        return name;
    }

}

function calculateStat(beyblade) {
    let attack = 0;
    let defense = 0;
    let stamina = 0;
    let weight = 0;
    let height = 0;

    beyblade.forEach(part => {
        attack = attack + part.Attack;
        defense = defense + part.Defense;
        stamina = stamina + part.Stamina;
        weight = weight + part.Weight;
    })

    height = beyblade[3].Height;

    const beyStat = { Attack: attack, Defense: defense, Stamina: stamina, Weight: weight, Height: height }
    return beyStat;
}

function calculateAggregateScore(beyStat) {
    let attack = beyStat.Attack;
    let defense = beyStat.Defense;
    let stamina = beyStat.Stamina;

    let aggregateScore = (attack + defense + stamina - Math.min(attack, defense, stamina)) / 2

    return aggregateScore;
}

function calculateMaxValue(obj) {
    let keys = Object.keys(obj);
    let max = keys[0];

    for (let i = 1, n = keys.length; i < n; ++i) {
        let k = keys[i];
        if (obj[k] > obj[max]) {
            max = k;
        }
    }

    let beyType = [max]
    if (obj[max] == obj[keys[1]] && max != keys[1]) {
        beyType.push(keys[1]);
    } else if (obj[max] == obj[keys[2]] && max != keys[2]) {
        beyType.push(keys[2]);
    }

    return beyType;
}

function generateWinner(beyStat, beyStat2) {
    const beybladeStat = { Attack: beyStat.Attack, Defense: beyStat.Defense, Stamina: beyStat.Stamina };
    const beybladeStat2 = { Attack: beyStat2.Attack, Defense: beyStat2.Defense, Stamina: beyStat2.Stamina };

    let points1 = 0;
    let points2 = 0;

    let aggregateScore1 = calculateAggregateScore(beyStat);
    let aggregateScore2 = calculateAggregateScore(beyStat2);

    let beyType1;
    let beyType2;

    let weight1 = beyStat.Weight
    let weight2 = beyStat2.Weight

    // Step One - Compare Aggregate Scores
    if (aggregateScore1 > aggregateScore2) {
        points1++;
    } else {
        points2++;
    }

    // Step Two - Adjust Stats
    if (weight1 > weight2) {
        let weightDif = weight1 - weight2;
        weightDif = Math.floor(weightDif / 10);
        beybladeStat.Attack += weightDif / 2;
        beybladeStat.Defense += weightDif;
        beybladeStat.Stamina -= weightDif / 2;
    } else {
        let weightDif = weight2 - weight1;
        weightDif = Math.floor(weightDif / 10);
        beybladeStat2.Attack += weightDif / 2;
        beybladeStat2.Defense += weightDif;
        beybladeStat2.Stamina -= weightDif / 2;
    }

    // Step Three A: Determine Beyblade Type
    beyType1 = calculateMaxValue(beybladeStat);
    beyType2 = calculateMaxValue(beybladeStat2);
    console.log(beyType1, ' vs ', beyType2);

    // Step Three B: Compare Beyblade Types
    for (let i = 0; i < beyType1.length; i++) {
        for (let j = 0; j < beyType2.length; j++) {
            let type = beyType1[i];
            let type2 = beyType2[j];
            if (type == 'Attack' && type2 == 'Stamina' || type == 'Defense' && type2 == 'Attack' || type == 'Stamina' && type2 == 'Defense') {
                points1++;
            } else if (type2 == 'Attack' && type == 'Stamina' || type2 == 'Defense' && type == 'Attack' || type2 == 'Stamina' && type == 'Defense') {
                points2++;
            } else if (type == 'Attack' && type2 == 'Attack') {
                let atkdiff = beybladeStat.Attack - beybladeStat2.Attack;
                if (atkdiff < 0) {
                    points2++;
                } else if (atkdiff > 0) {
                    points1++;
                }
            } else if (type == 'Defense' && type2 == 'Defense') {
                let staminadiff = beybladeStat.Stamina - beybladeStat2.Stamina;
                if (staminadiff < 0) {
                    points2++;
                } else if (staminadiff > 0) {
                    points1++;
                }
            } else if (type == 'Stamina' && type2 == 'Stamina') {
                let atkdiff = beybladeStat.Attack - beybladeStat2.Attack;
                if (atkdiff < -4) {
                    points2++;
                } else if (atkdiff > 4) {
                    points1++;
                } else {
                    let staminadiff = beybladeStat.Stamina - beybladeStat2.Stamina;
                    if (staminadiff < 0) {
                        points2++;
                    } else if (staminadiff > 0) {
                        points1++;
                    }
                }
            }

            if (type == 'Stamina' && type2 == 'Defense') {
                let atkdiff = beybladeStat.Attack - beybladeStat2.Attack;
                if (atkdiff > -4) {
                    points1++;
                }
            } else if (type2 == 'Stamina' && type == 'Defense') {
                let atkdiff = beybladeStat.Attack - beybladeStat2.Attack;
                if (atkdiff < 4) {
                    points2++;
                }
            }
        }
    }

    // Step Four: Height
    if (beyStat2.Height > beyStat.Height) {
        let addPoints = Math.floor((beyStat2.Height - beyStat.Height) / 40);
        points2 += addPoints;
        if (addPoints != 0 && beyType2.includes('Stamina') && beyType1.includes('Attack')) {
            points1--;
        } else if (addPoints == 0 && beyType2.includes('Stamina') && beyType1.includes('Attack')) {
            points1++;
        }
    } else if (beyStat.Height > beyStat2.Height) {
        let addPoints = Math.floor((beyStat.Height - beyStat2.Height) / 40);
        points1 += addPoints;
        if (addPoints != 0 && beyType1.includes('Stamina') && beyType2.includes('Attack')) {
            points2--;
        } else if (addPoints == 0 && beyType1.includes('Stamina') && beyType2.includes('Attack')) {
            points2++;
        }
    }

    // Step Five: Weight
    if (weight1 > weight2) {
        points1++;
        let weightdiff = Math.floor((beyStat.Weight - beyStat2.Weight) / 10);
        if (beyType1.includes('Stamina') && beyType2.includes('Attack')) {
            points1 += weightdiff / 2;
        } else if ((beyType1.includes('Attack') || beyType1.includes('Defense') && (beyType2.includes('Attack') || beyType2.includes('Defense')))) {
            points1 += weightdiff;
        }
    } else if (weight2 > weight1) {
        points2++;
        let weightdiff = Math.floor((beyStat2.Weight - beyStat.Weight) / 10);
        if (beyType2.includes('Stamina') && beyType1.includes('Attack')) {
            points2 += weightdiff / 2;
        } else if ((beyType1.includes('Attack') || beyType1.includes('Defense') && (beyType2.includes('Attack') || beyType2.includes('Defense')))) {
            points2 += weightdiff;
        }
    }
    console.log(points1 + ' vs ' + points2);
}

async function main() {
    generateListOfParts();
    const result = await resolveAfter1Second();

    let beyblade = generateRandomBeyblade();
    let beyblade2 = generateRandomBeyblade();

    let beybladeStat = calculateStat(beyblade);
    let beyblade2Stat = calculateStat(beyblade2);

    console.log(generateBeybladeName(beyblade) + " vs " + generateBeybladeName(beyblade2));
    console.log(beybladeStat, ' vs ', beyblade2Stat);
    console.log("Aggregate Score: ", calculateAggregateScore(beybladeStat), ' vs ', calculateAggregateScore(beyblade2Stat));
    generateWinner(beybladeStat, beyblade2Stat);
}

main();