import { useState, useRef, useEffect } from 'react';
import '../styles.css';
import { Monsters } from '../assets/monsters';

//converts hex to numerical RGB values
function hexToRGB(hex_code) {
    if (hex_code[0] === '#') hex_code = hex_code.slice(1);
    if (hex_code.length !== 6) return null;
    const r = parseInt(hex_code.slice(0, 2), 16);
    const g = parseInt(hex_code.slice(2, 4), 16);
    const b = parseInt(hex_code.slice(4, 6), 16);
    return [r, g, b];
}

function findClosestMonsters(monsterName, monsters, topN = 15) {
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
            return { Name: m, totalDiff, rgb, rdiff, gdiff, bdiff };
        });

    // Sort by ascending and get top 10
    const closest = diffs
        .sort((a, b) => a.totalDiff - b.totalDiff)
        .slice(0, topN);
    return closest;
}

// findClosestMonsters("Ansatsu", Monsters); // update "ansatsu" with query from orb page

// ...existing imports and functions...

function OrbCard({ monster, cardRGB }) {
    if (!monster) return null;
    return (
        <div className='orb-card monster-card'>
            <img className="monster-portrait" src={monster.portrait} alt={`${monster.monsterName} portrait`} />
            <h2>{monster.monsterName}</h2>
            <div className="orb-fields-grid">
                <div className="orb-field r-value"><span>R Value:</span> <span>{cardRGB && cardRGB[0]}</span></div>
                <div className="orb-field g-value"><span>G Value:</span> <span>{cardRGB && cardRGB[1]}</span></div>
                <div className="orb-field b-value"><span>B Value:</span> <span>{cardRGB && cardRGB[2]}</span></div>
            </div>
        </div>
    );
}

function ResultCard({ monster, tDiff, cardRGB, rv, gv, bv }) {
    if (!monster) return null;
    return (
        <div className='orb-card monster-card'>
            <img className="monster-portrait" src={monster.portrait} alt={`${monster.monsterName} portrait`} />
            <h2>{}{monster.monsterName}</h2>
            <div className='monster-field total-value'><span>Total Diff:</span> <span>{tDiff}</span></div>
            <div className='orb-fields-grid'>
                <div className="orb-field r-value"><span>R Value:</span> <span>{cardRGB && cardRGB[0]}</span></div>
                <div className="orb-field g-value"><span>G Value:</span> <span>{cardRGB && cardRGB[1]}</span></div>
                <div className="orb-field b-value"><span>B Value:</span> <span>{cardRGB && cardRGB[2]}</span></div>
                <div className="orb-field r-value"><span>R Diff:</span> <span>{rv}</span></div>
                <div className="orb-field g-value"><span>G Diff:</span> <span>{gv}</span></div>
                <div className="orb-field b-value"><span>B Diff:</span> <span>{bv}</span></div>
            </div>
        </div>
    );
}

export default function Orbs() {
    const [query, setSearch] = useState('');
    const [selectedMonsters, setSelectedMonsters] = useState([null, null]);
    const [monRGB, setMonRGB] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState([false, false]);
    const [orbResults, setResults] = useState([]);
    const filteredMonsters = Monsters.filter(m => m.monsterName.toLowerCase().includes(query.toLowerCase()));

    // Update orbResults when selectedMonsters[0] changes
    useEffect(() => {
        if (selectedMonsters[0]) {
            setResults(findClosestMonsters(selectedMonsters[0].monsterName, Monsters) || []);
        } else {
            setResults([]);
        }
    }, [selectedMonsters[0]]);

    return (
        <div>
            <header className="header-bar">
                <div className="header-left">
                    <a href="/" className="logo">FBKaizo Labs</a>
                </div>
                <nav className="header-right">
                    <a href="/">Calculator</a>
                    <a href="/Orbs">Orbs</a>
                </nav>
            </header>
            <main className="main-content compare-layout" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '100vh', width: '100vw', marginTop: '56px' }}>
                <div className="orb-holder">
                    <div className='orb-search-bar'>
                        <div className="monster-search">
                            <input
                                type="text"
                                value={query}
                                onChange={e => {
                                    setSearch(e.target.value);
                                    setIsDropdownOpen([true, isDropdownOpen[1]]);
                                }}
                                onFocus={() => setIsDropdownOpen([true, isDropdownOpen[1]])}
                                onBlur={() => setTimeout(() => setIsDropdownOpen([false, isDropdownOpen[1]]), 120)}
                                onKeyDown={e => {
                                    if (e.key === "Enter") {
                                        setIsDropdownOpen([false, isDropdownOpen[1]]);
                                        const match = Monsters.find(m => m.monsterName.toLowerCase() === e.target.value.toLowerCase());
                                        if (match) {
                                            setSelectedMonsters([match, selectedMonsters[1]]);
                                            setMonRGB(hexToRGB(match.hex));
                                            setSearch(match.monsterName);
                                        }
                                    }
                                }}
                                placeholder="Search monster..."
                                autoComplete="off"
                            />
                            <ul className={`monster-dropdown dropdown-list${isDropdownOpen[0] && filteredMonsters.length > 0 ? ' show' : ''}`}>
                                {filteredMonsters.map(monster => (
                                    <li key={monster.monsterName} onMouseDown={() => {
                                        setSelectedMonsters([monster, selectedMonsters[1]]);
                                        setMonRGB(hexToRGB(monster.hex));
                                        setSearch(monster.monsterName);
                                        setIsDropdownOpen([false, isDropdownOpen[1]]);
                                    }}>{monster.monsterName}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <OrbCard
                        monster={selectedMonsters[0]}
                        cardRGB={monRGB}
                    />
                    <div style={{ width: '100%', marginTop: '48px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <div className='orb-results-grid'>
                            {orbResults.map((result, idx) => (
                                <ResultCard
                                    key={idx}
                                    monster={result.Name}
                                    cardRGB={result.rgb}
                                    tDiff={result.totalDiff}
                                    rv={result.rdiff}
                                    gv={result.gdiff}
                                    bv={result.bdiff}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
