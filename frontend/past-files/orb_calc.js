import {Monsters} from "../src/assets/monsters.js"

//converts hex to numerical RGB values
function hexToRGB(hex_code) {
    if (hex_code[0] === '#') hex_code = hex_code.slice(1);
    if (hex_code.length !== 6) return null;
    const r = parseInt(hex_code.slice(0, 2), 16);
    const g = parseInt(hex_code.slice(2, 4), 16);
    const b = parseInt(hex_code.slice(4, 6), 16);
    return [r, g, b];
}

function findClosestMonsters(monsterName, monsters, topN = 10) {
    // Find the target monster
    const target = monsters.find(m => m.monsterName.toLowerCase() === monsterName.toLowerCase());
    if (!target) {
        console.log("Monster not found.");
        return;
    }
    const targetRGB = hexToRGB(target.hex);
    if (!targetRGB) {
        console.log("Invalid hex for target monster.");
        return;
    }

    // Calculate differences for all other monsters
    const diffs = monsters
        .filter(m => m.id !== target.id)
        .map(m => {
            const rgb = hexToRGB(m.hex); // calls hex function
            if (!rgb) return { Name: m.monsterName, totalDiff: Infinity };
            const rdiff = Math.abs(targetRGB[0] - rgb[0]);
            const gdiff = Math.abs(targetRGB[1] - rgb[1]);
            const bdiff = Math.abs(targetRGB[2] - rgb[2]);
            const totalDiff = rdiff + gdiff + bdiff;
            return { Name: m.monsterName, totalDiff, rdiff, gdiff, bdiff };
        });

    // Sort by ascending and get top 10
    const closest = diffs
        .sort((a, b) => a.totalDiff - b.totalDiff)
        .slice(0, topN);

    console.log(`Top ${topN} closest monsters to "${target.monsterName}":`);
    console.log(closest);
    return closest;
}

findClosestMonsters("Ansatsu", Monsters); // update "ansatsu" with query from orb page




