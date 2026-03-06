import { useState, useRef, useEffect } from 'react';
import '../styles.css';
import { Monsters } from '../assets/monsters';
import { Marshalls } from '../assets/marshalls';

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

function findClosestMarshalls(monsterName, monsters, marshalls, topN = 15) {
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

    // Calculate differences for all marshalls
    const diffs = marshalls
        .map(m => {
            const rgb = hexToRGB(m.hex);
            if (!rgb) return { Name: m.marshallName, totalDiff: Infinity };
            const rdiff = Math.abs(targetRGB[0] - rgb[0]);
            const gdiff = Math.abs(targetRGB[1] - rgb[1]);
            const bdiff = Math.abs(targetRGB[2] - rgb[2]);
            const totalDiff = rdiff + gdiff + bdiff;
            return { Name: m, totalDiff, rgb, rdiff, gdiff, bdiff };
        });

    // Sort by ascending and get top N
    const closest = diffs
        .sort((a, b) => a.totalDiff - b.totalDiff)
        .slice(0, topN);
    return closest;
}

function findClosestMonstersByMarshall(marshallName, marshalls, monsters, topN = 15) {
    // Find the target marshall
    const target = marshalls.find(m => m.marshallName.toLowerCase() === marshallName.toLowerCase());
    if (!target) {
        console.log("Marshall not found.");
        return;
    }
    const targetRGB = hexToRGB(target.hex);
    if (!targetRGB) {
        console.log("Invalid hex for target marshall.");
        return;
    }

    // Calculate differences for all monsters
    const diffs = monsters
        .map(m => {
            const rgb = hexToRGB(m.hex);
            if (!rgb) return { Name: m.monsterName, totalDiff: Infinity };
            const rdiff = Math.abs(targetRGB[0] - rgb[0]);
            const gdiff = Math.abs(targetRGB[1] - rgb[1]);
            const bdiff = Math.abs(targetRGB[2] - rgb[2]);
            const totalDiff = rdiff + gdiff + bdiff;
            return { Name: m, totalDiff, rgb, rdiff, gdiff, bdiff };
        });

    // Sort by ascending and get top N
    const closest = diffs
        .sort((a, b) => a.totalDiff - b.totalDiff)
        .slice(0, topN);
    return closest;
}

// helper for team-to-marshall; sums color diffs for three monsters
function findClosestMarshallForTeam(monsters, marshalls, topN = 15) {
    const validMonsters = monsters.filter(m => m);
    if (validMonsters.length === 0) return [];

    const diffs = marshalls.map(m => {
        const rgb = hexToRGB(m.hex);
        if (!rgb) return { Name: m.marshallName, totalDiff: Infinity };

        // build arrays of R/G/B values (marshall + each monster)
        const rVals = [rgb[0]];
        const gVals = [rgb[1]];
        const bVals = [rgb[2]];

        let rdiff = 0;
        let gdiff = 0;
        let bdiff = 0;
        validMonsters.forEach(mon => {
            const monRGB = hexToRGB(mon.hex);
            if (!monRGB) {
                rdiff = gdiff = bdiff = Infinity;
                return;
            }
            rVals.push(monRGB[0]);
            gVals.push(monRGB[1]);
            bVals.push(monRGB[2]);
            rdiff += Math.abs(monRGB[0] - rgb[0]);
            gdiff += Math.abs(monRGB[1] - rgb[1]);
            bdiff += Math.abs(monRGB[2] - rgb[2]);
        });
        const totalDiff = rdiff + gdiff + bdiff;
        return { Name: m, totalDiff, rgb, rdiff, gdiff, bdiff, rVals, gVals, bVals };
    });

    return diffs
        .sort((a, b) => a.totalDiff - b.totalDiff)
        .slice(0, topN);
}

// findClosestMonsters("Ansatsu", Monsters); // update "ansatsu" with query from orb page

// ...existing imports and functions...

function OrbCard({ monster, cardRGB }) {
    if (!monster) return null;
    const name = monster.monsterName || monster.marshallName;
    return (
        <div className='orb-card monster-card'>
            <img className="monster-portrait" src={monster.portrait} alt={`${name} portrait`} />
            <h2>{name}</h2>
            <div className="orb-fields-grid">
                <div className="orb-field r-value"><span>R Value:</span> <span>{cardRGB && cardRGB[0]}</span></div>
                <div className="orb-field g-value"><span>G Value:</span> <span>{cardRGB && cardRGB[1]}</span></div>
                <div className="orb-field b-value"><span>B Value:</span> <span>{cardRGB && cardRGB[2]}</span></div>
            </div>
        </div>
    );
}

// utility: compute battles-to-sync from either diffs or value arrays
function computeBattlesToSync(rv, gv, bv, rVals, gVals, bVals) {
    if (rVals && gVals && bVals) {
        const range = arr => Math.max(...arr) - Math.min(...arr);
        const maxRange = Math.max(range(rVals), range(gVals), range(bVals));
        return Math.ceil(maxRange / 2);
    }
    const maxDiff = Math.max(rv || 0, gv || 0, bv || 0);
    return Math.ceil(maxDiff / 2);
}

function ResultCard({ monster, tDiff, cardRGB, rv, gv, bv, rVals, gVals, bVals }) {
    if (!monster) return null;
    const name = monster.monsterName || monster.marshallName;
    const battles = computeBattlesToSync(rv, gv, bv, rVals, gVals, bVals);
    return (
        <div className='orb-card monster-card'>
            <img className="monster-portrait" src={monster.portrait} alt={`${name} portrait`} />
            <h2>{name}</h2>
            <div className='monster-field total-value'><span>Total Diff:</span> <span>{tDiff}</span></div>
            <div className='orb-fields-grid'>
                <div className="orb-field r-value"><span>R Value:</span> <span>{cardRGB && cardRGB[0]}</span></div>
                <div className="orb-field g-value"><span>G Value:</span> <span>{cardRGB && cardRGB[1]}</span></div>
                <div className="orb-field b-value"><span>B Value:</span> <span>{cardRGB && cardRGB[2]}</span></div>
                <div className="orb-field r-value"><span>R Diff:</span> <span>{rv}</span></div>
                <div className="orb-field g-value"><span>G Diff:</span> <span>{gv}</span></div>
                <div className="orb-field b-value"><span>B Diff:</span> <span>{bv}</span></div>
                <div className="orb-field total-value" style={{ gridColumn: 'span 3' }}><span>Battles to Fully Sync:</span> <span>{battles}</span></div>
            </div>
        </div>
    );
}

export default function Orbs() {
    const [query, setSearch] = useState(() => localStorage.getItem('fbk_orbs_query') || '');
    const [selectedMonsters, setSelectedMonsters] = useState(() => {
        const saved = localStorage.getItem('fbk_orbs_selectedMonster');
        return saved ? [JSON.parse(saved), null] : [null, null];
    });
    const [monRGB, setMonRGB] = useState(null);
    // dropdown open flags for up to three inputs (team mode uses all three)
    const [isDropdownOpen, setIsDropdownOpen] = useState([false, false, false]);
    const [orbResults, setResults] = useState([]);
    const [comparisonMode, setComparisonMode] = useState(() => {
        const saved = localStorage.getItem('fbk_orbs_comparisonMode');
        return saved ? parseInt(saved) : 0;
    });

    // team-mode state: three monster searches/selection
    const [teamSearches, setTeamSearches] = useState(() => {
        const saved = localStorage.getItem('fbk_orbs_teamSearches');
        return saved ? JSON.parse(saved) : ['', '', ''];
    });
    const [teamSelected, setTeamSelected] = useState(() => {
        const saved = localStorage.getItem('fbk_orbs_teamSelected');
        return saved ? JSON.parse(saved) : [null, null, null];
    });
    const [teamRGBs, setTeamRGBs] = useState([null, null, null]);
    
    // Save query to localStorage
    useEffect(() => {
        localStorage.setItem('fbk_orbs_query', query);
    }, [query]);

    // Save selected monster to localStorage
    useEffect(() => {
        if (selectedMonsters[0]) {
            localStorage.setItem('fbk_orbs_selectedMonster', JSON.stringify(selectedMonsters[0]));
        } else {
            localStorage.removeItem('fbk_orbs_selectedMonster');
        }
    }, [selectedMonsters[0]]);

    // Save comparison mode to localStorage
    useEffect(() => {
        localStorage.setItem('fbk_orbs_comparisonMode', comparisonMode.toString());
    }, [comparisonMode]);

    // persist team inputs
    useEffect(() => {
        localStorage.setItem('fbk_orbs_teamSearches', JSON.stringify(teamSearches));
    }, [teamSearches]);
    useEffect(() => {
        localStorage.setItem('fbk_orbs_teamSelected', JSON.stringify(teamSelected));
    }, [teamSelected]);
    // keep rgb values in sync whenever selection array changes
    useEffect(() => {
        const rgbs = teamSelected.map(m => (m ? hexToRGB(m.hex) : null));
        setTeamRGBs(rgbs);
    }, [teamSelected]);
    // clear team state when leaving team mode
    useEffect(() => {
        if (comparisonMode !== 3) {
            setTeamSearches(['', '', '']);
            setTeamSelected([null, null, null]);
            setTeamRGBs([null, null, null]);
            localStorage.removeItem('fbk_orbs_teamSearches');
            localStorage.removeItem('fbk_orbs_teamSelected');
        }
    }, [comparisonMode]);
    
    // Determine what to show in dropdown based on comparison mode
    const dropdownItems = comparisonMode === 1 ? Marshalls : Monsters;
    const filteredMonsters = dropdownItems.filter(m => {
        const name = comparisonMode === 1 ? m.marshallName : m.monsterName;
        return name.toLowerCase().includes(query.toLowerCase());
    });

    // reusable filter function for arbitrary input value (used by team inputs)
    const getFilteredItems = (searchTerm) => {
        return dropdownItems.filter(m => {
            const name = comparisonMode === 1 ? m.marshallName : m.monsterName;
            return name.toLowerCase().includes(searchTerm.toLowerCase());
        });
    };

    // Update orbResults when selectedMonsters[0] changes or comparisonMode changes
    useEffect(() => {
        if (comparisonMode === 3) {
            // team to marshall mode uses teamSelected array
            const results = findClosestMarshallForTeam(teamSelected, Marshalls) || [];
            setResults(results);
            return;
        }

        if (selectedMonsters[0]) {
            let results = [];
            
            if (comparisonMode === 0) {
                // Monster to Monster
                results = findClosestMonsters(selectedMonsters[0].monsterName, Monsters) || [];
            } else if (comparisonMode === 1) {
                // Marshall to Monster
                results = findClosestMonstersByMarshall(selectedMonsters[0].marshallName, Marshalls, Monsters) || [];
            } else if (comparisonMode === 2) {
                // Monster to Marshall
                results = findClosestMarshalls(selectedMonsters[0].monsterName, Monsters, Marshalls) || [];
            }
            
            setResults(results);
        } else {
            setResults([]);
        }
    }, [selectedMonsters[0], comparisonMode, teamSelected]);

    return (
        <div>
            <header className="header-bar">
                <div className="header-left">
                    <a href="/" className="logo">FBK Labs</a>
                </div>
                <nav className="header-right">
                    <a href="/">Calculator</a>
                    <a href="/Orbs">Orbs</a>
                    <a href="/TeamBuilder">Team Builder</a>
                </nav>
            </header>
            <main className="main-content compare-layout" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '100vh', width: '100vw', marginTop: '56px' }}>
                <h2 style={{marginBottom: '24px', textAlign: 'center', marginLeft: '100px', marginRight: '100px'}}>Looks up RGB values of orbs to return top 15 mons or marshalls with the closest orb colors to your selection. "Team to Marshall" uses a team of 3 monsters to find the 15 closest marshall orbs to that team's orbs.</h2>
                <div className="mode-selector-buttons" style={{ display: 'flex', gap: '12px', marginBottom: '24px', justifyContent: 'center' }}>
                    <button
                        className={`mode-button ${comparisonMode === 0 ? 'active' : ''}`}
                        onClick={() => {
                            setComparisonMode(0);
                            setSearch('');
                            setSelectedMonsters([null, null]);
                            setMonRGB(null);
                            setResults([]);
                            setIsDropdownOpen([false, false, false]);
                            // clear any previous team data
                            setTeamSearches(['', '', '']);
                            setTeamSelected([null, null, null]);
                            setTeamRGBs([null, null, null]);
                            localStorage.removeItem('fbk_orbs_teamSearches');
                            localStorage.removeItem('fbk_orbs_teamSelected');
                        }}
                    >
                        Monster to Monster
                    </button>
                    <button
                        className={`mode-button ${comparisonMode === 1 ? 'active' : ''}`}
                        onClick={() => {
                            setComparisonMode(1);
                            setSearch('');
                            setSelectedMonsters([null, null]);
                            setMonRGB(null);
                            setResults([]);
                            setIsDropdownOpen([false, false, false]);
                            // clear team state
                            setTeamSearches(['', '', '']);
                            setTeamSelected([null, null, null]);
                            setTeamRGBs([null, null, null]);
                            localStorage.removeItem('fbk_orbs_teamSearches');
                            localStorage.removeItem('fbk_orbs_teamSelected');
                        }}
                    >
                        Marshall to Monster
                    </button>
                    <button
                        className={`mode-button ${comparisonMode === 2 ? 'active' : ''}`}
                        onClick={() => {
                            setComparisonMode(2);
                            setSearch('');
                            setSelectedMonsters([null, null]);
                            setMonRGB(null);
                            setResults([]);
                            setIsDropdownOpen([false, false, false]);
                            // clear team state
                            setTeamSearches(['', '', '']);
                            setTeamSelected([null, null, null]);
                            setTeamRGBs([null, null, null]);
                            localStorage.removeItem('fbk_orbs_teamSearches');
                            localStorage.removeItem('fbk_orbs_teamSelected');
                        }}
                    >
                        Monster to Marshall
                    </button>
                    <button
                        className={`mode-button ${comparisonMode === 3 ? 'active' : ''}`}
                        onClick={() => {
                            setComparisonMode(3);
                            setSearch('');
                            setSelectedMonsters([null, null]);
                            setMonRGB(null);
                            setResults([]);
                            setIsDropdownOpen([false, false, false]);
                            // keep team state preserved but clear results
                        }}
                    >
                        Team to Marshall
                    </button>
                </div>
                <div className="orb-holder">
                    {comparisonMode === 3 ? (
                        <> {/* Team mode: three columns each with search bar and card */}
                            <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginBottom: '16px' }}>
                                {[0, 1, 2].map(i => (
                                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div className='orb-search-bar' style={{ flex: '0 0 auto' }}>
                                            <div className="monster-search">
                                                <input
                                                    type="text"
                                                    value={teamSearches[i]}
                                                    onChange={e => {
                                                        const val = e.target.value;
                                                        const arr = [...teamSearches];
                                                        arr[i] = val;
                                                        setTeamSearches(arr);
                                                        setIsDropdownOpen(prev => {
                                                            const newArr = [...prev];
                                                            newArr[i] = true;
                                                            return newArr;
                                                        });
                                                    }}
                                                    onFocus={() => setIsDropdownOpen(prev => { const a=[...prev]; a[i]=true; return a; })}
                                                    onBlur={() => setTimeout(() => setIsDropdownOpen(prev => { const a=[...prev]; a[i]=false; return a; }), 120)}
                                                    onKeyDown={e => {
                                                        if (e.key === "Enter") {
                                                            setIsDropdownOpen(prev => { const a=[...prev]; a[i]=false; return a; });
                                                            const match = Monsters.find(m => m.monsterName.toLowerCase() === e.target.value.toLowerCase());
                                                            if (match) {
                                                                const sel = [...teamSelected];
                                                                sel[i] = match;
                                                                setTeamSelected(sel);
                                                                const rgbs = [...teamRGBs];
                                                                rgbs[i] = hexToRGB(match.hex);
                                                                setTeamRGBs(rgbs);
                                                                const names = [...teamSearches];
                                                                names[i] = match.monsterName;
                                                                setTeamSearches(names);
                                                            }
                                                        }
                                                    }}
                                                    placeholder="Search monster..."
                                                    autoComplete="off"
                                                />
                                                <ul className={`monster-dropdown dropdown-list${isDropdownOpen[i] && getFilteredItems(teamSearches[i]).length > 0 ? ' show' : ''}`}>
                                                    {getFilteredItems(teamSearches[i]).map(item => (
                                                        <li key={item.monsterName} onMouseDown={() => {
                                                            const sel = [...teamSelected];
                                                            sel[i] = item;
                                                            setTeamSelected(sel);
                                                            const rgbs = [...teamRGBs];
                                                            rgbs[i] = hexToRGB(item.hex);
                                                            setTeamRGBs(rgbs);
                                                            const names = [...teamSearches];
                                                            names[i] = item.monsterName;
                                                            setTeamSearches(names);
                                                            setIsDropdownOpen(prev => { const a=[...prev]; a[i]=false; return a; });
                                                        }}>{item.monsterName}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <OrbCard monster={teamSelected[i]} cardRGB={teamRGBs[i]} />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <> {/* original single-search layout */}
                            <div className='orb-search-bar'>
                                <div className="monster-search">
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={e => {
                                            setSearch(e.target.value);
                                            setIsDropdownOpen([true, isDropdownOpen[1], isDropdownOpen[2]]);
                                        }}
                                        onFocus={() => setIsDropdownOpen([true, isDropdownOpen[1], isDropdownOpen[2]])}
                                        onBlur={() => setTimeout(() => setIsDropdownOpen([false, isDropdownOpen[1], isDropdownOpen[2]]), 120)}
                                        onKeyDown={e => {
                                            if (e.key === "Enter") {
                                                setIsDropdownOpen([false, isDropdownOpen[1], isDropdownOpen[2]]);
                                                
                                                let match;
                                                if (comparisonMode === 1) {
                                                    // Marshall to Monster
                                                    match = Marshalls.find(m => m.marshallName.toLowerCase() === e.target.value.toLowerCase());
                                                } else {
                                                    // Monster to Monster or Monster to Marshall
                                                    match = Monsters.find(m => m.monsterName.toLowerCase() === e.target.value.toLowerCase());
                                                }
                                                
                                                if (match) {
                                                    setSelectedMonsters([match, selectedMonsters[1]]);
                                                    setMonRGB(hexToRGB(match.hex));
                                                    const displayName = comparisonMode === 1 ? match.marshallName : match.monsterName;
                                                    setSearch(displayName);
                                                }
                                            }
                                        }}
                                        placeholder="Search monster..."
                                        autoComplete="off"
                                    />
                                    <ul className={`monster-dropdown dropdown-list${isDropdownOpen[0] && filteredMonsters.length > 0 ? ' show' : ''}`}>
                                        {filteredMonsters.map(item => {
                                            const displayName = comparisonMode === 1 ? item.marshallName : item.monsterName;
                                            return (
                                                <li key={item.monsterName || item.marshallName} onMouseDown={() => {
                                                    setSelectedMonsters([item, selectedMonsters[1]]);
                                                    setMonRGB(hexToRGB(item.hex));
                                                    setSearch(displayName);
                                                    setIsDropdownOpen([false, isDropdownOpen[1], isDropdownOpen[2]]);
                                                }}>{displayName}</li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <OrbCard
                                monster={selectedMonsters[0]}
                                cardRGB={monRGB}
                            />
                        </>
                    )}
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
                                    rVals={result.rVals}
                                    gVals={result.gVals}
                                    bVals={result.bVals}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
