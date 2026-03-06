import { useState, useRef, useEffect, useMemo } from 'react';
import '../styles.css';
import { Monsters } from '../assets/monsters';
import { calc, hpCalc, atkDefCalc, apCalc } from '../utils/lvl_calc';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend);

// get stat array for a monster
function getStatGrowthArrays(monster) {
  // setting up variables/arrays for stats
  const maxLevel = 99;
  let hpArr = [], atkArr = [], defArr = [], apArr = [];
  let baseHp = monster.hp, baseAtk = monster.atk, baseDef = monster.def, baseAp = monster.ap;
  let gt = monster.gt;

  for (let lvl = 1; lvl <= maxLevel; lvl++) {
    let hp = baseHp + hpCalc(gt, lvl);
    let atk = baseAtk + atkDefCalc(gt, lvl);
    let def = baseDef + atkDefCalc(gt, lvl);
    let ap = baseAp + apCalc(gt, lvl);
    hpArr.push(Math.ceil(hp));
    atkArr.push(atk);
    defArr.push(def);
    apArr.push(ap);
  }
  return { hpArr, atkArr, defArr, apArr };
}

// displays null/useless values in the DB as "-"
function displayValue(val) {
  if (val === -1 || val === "No Effect") return "-";
  return val;
}


// sets up comparison specific monster cards
function MonsterCard({ monster, level, onLevelChange, statCompare }) {

  //establish useState and useEffect for changes
  if (!monster) return null;
  const [stats, setStats] = useState(calc(monster, level));
  useEffect(() => {
    setStats(calc(monster, level));
  }, [monster, level]);


  //sets colors for the higher and lower numbers of a stat for both cards
  function getStatColor(statName) {
    if (!statCompare) return {};
    if (statCompare[statName] === 'high') return { color: '#39ff14', fontWeight: 'bold' };
    if (statCompare[statName] === 'low') return { color: '#ff3b3b', fontWeight: 'bold' };
    return { color: 'inherit', fontWeight: 'normal' };
  }


  //building the card itself, returns elements for user viewing
  return (
    <div className="monster-card">
      <img className="monster-portrait" src={monster.portrait} alt={`${monster.monsterName} portrait`} />

      <div className="level-calc-container">
        <label htmlFor="level-input" className="level-label">Level:</label>

        <input
          type="number"
          min={1}
          max={99}
          value={level === null ? '' : level}
          onChange={e => {
            const val = e.target.value;
            if (val === '') {
              onLevelChange(null); // allows for field clearing
            } else {
              const num = Number(val);
              if (!isNaN(num) && num >= 1 && num <= 99) {
                onLevelChange(num); // only runs within range
              }
            }
          }}
          className="level-input"
        />
      </div>


      <h2>{monster.monsterName}</h2>
      <div className="monster-fields-grid">
        <div className="monster-field"><span>Class:</span> <span>{displayValue(monster.class)}</span></div>
        <div className="monster-field"><span>GT:</span> <span>{displayValue(monster.gt)}</span></div>
        <div className="monster-field"><span>HP:</span> <span style={getStatColor('hp')}>{displayValue(stats[0])}</span></div>
        <div className="monster-field"><span>AP:</span> <span style={getStatColor('ap')}>{displayValue(stats[3])}</span></div>
        <div className="monster-field"><span>ATK:</span> <span style={getStatColor('atk')}>{displayValue(stats[1])}</span></div>
        <div className="monster-field"><span>DEF:</span> <span style={getStatColor('def')}>{displayValue(stats[2])}</span></div>
        <div className="monster-field"><span>Luck:</span> <span>{displayValue(monster.luck)}</span></div>
        <div className="monster-field"><span>Speed:</span> <span>{displayValue(monster.speed)}</span></div>
      </div>
      <div className="monster-field"><span>Battle Arts Effect:</span> <span>{displayValue(monster.attackEffect)} ({displayValue(monster.attackEffectUnlockLvl)})</span></div>
      <div className="monster-field"><span>Special Name:</span> <span>{displayValue(monster.specialName)}</span></div>
      <div className="monster-field"><span>Special Description:</span> <span>{displayValue(monster.specialEffect)}</span></div>
      <div className="monster-field"><span>Ability 1:</span> <span>{displayValue(monster.ability1)} ({displayValue(monster.ability1UnlockLvl)})</span></div>
      <div className="monster-field"><span>Ability 2:</span> <span>{displayValue(monster.ability2)} ({displayValue(monster.ability2UnlockLvl)})</span></div>
      <div className="monster-field"><span>Ability 3:</span> <span>{displayValue(monster.ability3)} ({displayValue(monster.ability3UnlockLvl)})</span></div>
    </div> // ^^^^^^^^^^^^ builds out the monster stats on the card from the hardcoded DB, plus stat colors for this one
  );
}



//building individual monster graphs for stat scaling per level
function StatGraph({ monster }) {
  const chartRef = useRef(null);

  //builds and renders individual stat graph in canvas element when monster is selected
  //ctx takes chartRef variable above to reference canvas element with useRef(). The canvas element is where the chart will render
  //getStatGrowthArrays gets your 1-99 iterations for stat values
  //ctx gets the current context of the canvas element, which you need to render the chart
  //chart variable makes a new Chart.js with the ctx variable's context. Chart is stored in chart variable.
  
  const wrapLabel = (str, maxLen = 20) => {
    if (str.length <= maxLen) return [str]; // short enough, just return the string
    const words = str.split(" ");
    let lines = [];
    let current = "";

    words.forEach(word => {
      if ((current + word).length > maxLen) {
        lines.push(current.trim());
        current = word + " ";
      } else {
        current += word + " ";
      }
    });
    if (current) lines.push(current.trim());
    return lines;
  };

  useEffect(() => {
    if (!monster) return;
    const { hpArr, atkArr, defArr } = getStatGrowthArrays(monster);
    const ctx = chartRef.current.getContext('2d');
    const yAxisLabel = wrapLabel(`Stat Value (${monster.monsterName || ""})`, 25);
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        //labels creates a new array with a length of 99. "_" is the unused value, which is the array element itself and not needed here. "i" is the iteration.
        labels: Array.from({ length: 99 }, (_, i) => i + 1),
        datasets: [
          { label: 'HP', data: hpArr, borderColor: '#00eaff', backgroundColor: 'rgba(0,234,255,0.1)', tension: 0.2 },
          { label: 'ATK', data: atkArr, borderColor: '#ff6384', backgroundColor: 'rgba(255,99,132,0.1)', tension: 0.2 },
          { label: 'DEF', data: defArr, borderColor: '#00ff00', backgroundColor: 'rgba(0,255,0,0.1)', tension: 0.2 }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#fff',
              font: { size: 16, weight: 'bold' }
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            title: { display: true, text: 'Level', color: '#fff', font: { size: 16, weight: 'bold' } },
            ticks: { color: '#fff', font: { size: 14, weight: 'bold' } }
          },
          y: {
            title: { display: true, text: yAxisLabel, color: '#fff', font: { size: 16, weight: 'bold' } },
            ticks: { color: '#fff', font: { size: 14, weight: 'bold' } }
          }
        }
      }
    });
    return () => chart.destroy(); // removes chart and its listeners when it's time to bring a new one in (selecting new monster)
  }, [monster]);

  //renders chart
  return <canvas ref={chartRef} width={400} height={200}></canvas>;
}



//builds and renders 4 graphs for comparing stats between up to 3 selected monsters from levels 1-99
//requires at least 2 monsters to be selected but follows same rules as graphs above
function ComparisonGraph({ monsters, stat, id }) {
  const chartRef = useRef(null);

  useEffect(() => {
    // Count how many monsters are selected
    const selectedCount = [monsters[0], monsters[1], monsters[2]].filter(m => m !== null).length;
    if (selectedCount < 2) return; // Need at least 2 monsters
    
    // Build datasets array based on which monsters are selected
    const datasets = [];
    const colors = ['#00eaff', '#ff6384', '#33ff33'];
    const bgColors = ['rgba(0,234,255,0.1)', 'rgba(255,99,132,0.1)', 'rgba(51,255,51,0.1)'];
    
    for (let i = 0; i < 3; i++) {
      if (monsters[i] !== null && monsters[i] !== undefined) {
        const stats = getStatGrowthArrays(monsters[i]);
        datasets.push({
          label: monsters[i].monsterName,
          data: stats[stat + 'Arr'],
          borderColor: colors[i],
          backgroundColor: bgColors[i],
          tension: 0.2
        });
      }
    }
    
    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 99 }, (_, i) => i + 1),
        datasets: datasets
      },
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#fff',
              font: { size: 16, weight: 'bold' }
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            title: { display: true, text: 'Level', color: '#fff', font: { size: 16, weight: 'bold' } },
            ticks: { color: '#fff', font: { size: 14, weight: 'bold' } }
          },
          y: {
            title: { display: true, text: `Stat Value ${stat.toUpperCase()}`, color: '#fff', font: { size: 16, weight: 'bold' } },
            ticks: { color: '#fff', font: { size: 14, weight: 'bold' } }
          }
        }
      }
    });
    return () => chart.destroy();
  }, [monsters, stat]);

  return <canvas ref={chartRef} width={480} height={110}></canvas>;
}


// prepares Compare webpage for export to use in App.jsx
export default function Compare() {
  // set up useState variables for component
  const [search1, setSearch1] = useState(() => localStorage.getItem('fbk_calculator_search1') || '');
  const [search2, setSearch2] = useState(() => localStorage.getItem('fbk_calculator_search2') || '');
  const [search3, setSearch3] = useState(() => localStorage.getItem('fbk_calculator_search3') || '');
  const [selectedMonsters, setSelectedMonsters] = useState(() => {
    const saved = localStorage.getItem('fbk_calculator_selectedMonsters');
    return saved ? JSON.parse(saved) : [null, null, null];
  });
  const [levels, setLevels] = useState(() => {
    const saved = localStorage.getItem('fbk_calculator_levels');
    return saved ? JSON.parse(saved) : [null, null, null];
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState([false, false, false]);
  const blurTimeoutsRef = useRef([null, null, null]); // Track pending blur timeouts for each search
  const filteredMonsters1 = Monsters.filter(m => m.monsterName.toLowerCase().includes(search1.toLowerCase()));
  const filteredMonsters2 = Monsters.filter(m => m.monsterName.toLowerCase().includes(search2.toLowerCase()));
  const filteredMonsters3 = Monsters.filter(m => m.monsterName.toLowerCase().includes(search3.toLowerCase()));

  // Save search inputs to localStorage
  useEffect(() => {
    localStorage.setItem('fbk_calculator_search1', search1);
  }, [search1]);

  useEffect(() => {
    localStorage.setItem('fbk_calculator_search2', search2);
  }, [search2]);

  useEffect(() => {
    localStorage.setItem('fbk_calculator_search3', search3);
  }, [search3]);

  // Save selected monsters to localStorage
  useEffect(() => {
    localStorage.setItem('fbk_calculator_selectedMonsters', JSON.stringify(selectedMonsters));
  }, [selectedMonsters]);

  // Save levels to localStorage
  useEffect(() => {
    localStorage.setItem('fbk_calculator_levels', JSON.stringify(levels));
  }, [levels]);

  // Helper to handle focus: clear other timeouts and open the focused dropdown
  const handleSearchFocus = (idx) => {
    // Clear all pending blur timeouts
    blurTimeoutsRef.current.forEach((timeout, i) => {
      if (timeout) clearTimeout(timeout);
    });
    blurTimeoutsRef.current = [null, null, null];
    
    // Close all dropdowns except the one being focused
    const newState = [false, false, false];
    newState[idx] = true;
    setIsDropdownOpen(newState);
  };

  // Helper to handle blur: delay closing so clicks on dropdown items register
  const handleSearchBlur = (idx) => {
    const timeoutId = setTimeout(() => {
      setIsDropdownOpen(prev => {
        const newState = [...prev];
        newState[idx] = false;
        return newState;
      });
    }, 120);
    blurTimeoutsRef.current[idx] = timeoutId;
  };

  // Stat comparison logic for 3 monsters
  function getStatCompare(idx) {
    const m0 = selectedMonsters[0];
    const m1 = selectedMonsters[1];
    const m2 = selectedMonsters[2];
    const l0 = levels[0] ?? 1;
    const l1 = levels[1] ?? 1;
    const l2 = levels[2] ?? 1;
    
    // Require at least 2 monsters to compare; if less, return null
    const monstersSelected = [m0, m1, m2].filter(m => m !== null).length;
    if (monstersSelected < 2) return null;
    
    // Get stats for all 3 monsters (or null if not selected)
    const s0 = m0 ? calc(m0, l0) : null;
    const s1 = m1 ? calc(m1, l1) : null;
    const s2 = m2 ? calc(m2, l2) : null;
    
    // Build list of stat values for the monster at idx
    const statIndices = { hp: 0, ap: 3, atk: 1, def: 2 };
    const result = {};
    
    for (const [statName, statIdx] of Object.entries(statIndices)) {
      const values = [];
      if (s0) values.push(s0[statIdx]);
      if (s1) values.push(s1[statIdx]);
      if (s2) values.push(s2[statIdx]);
      
      // Find max and min values among selected monsters for this stat
      const maxValue = Math.max(...values);
      const minValue = Math.min(...values);
      
      // Get the value for the current monster (idx)
      const currentValue = idx === 0 ? s0?.[statIdx] : idx === 1 ? s1?.[statIdx] : s2?.[statIdx];
      
      // If all selected monsters have equal stats for this stat, return null (neutral color)
      if (maxValue === minValue) {
        result[statName] = null;
      } else if (currentValue === maxValue) {
        // If current monster's stat equals the max (and not all equal), mark as 'high' (green)
        result[statName] = 'high';
      } else {
        // Otherwise mark as 'low' (red)
        result[statName] = 'low';
      }
    }
    
    return result;
  }


  //webpage content
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
        <h2 style={{marginBottom: '24px', textAlign: 'center', marginLeft: '100px', marginRight: '100px'}}>Select mons to look up stats for. Can pick 1-3 for comparing and contrasting. Highest numbers for HP, ATK, DEF, and AP for the monsters will be highlighted <span style={{color:'#39ff14'}}>GREEN</span> while lower numbers are <span style={{color:'#ff3b3b'}}>RED</span></h2>
        <button
          onClick={() => {
            setSearch1('');
            setSearch2('');
            setSearch3('');
            setSelectedMonsters([null, null, null]);
            setLevels([null, null, null]);
            localStorage.removeItem('fbk_calculator_search1');
            localStorage.removeItem('fbk_calculator_search2');
            localStorage.removeItem('fbk_calculator_search3');
            localStorage.removeItem('fbk_calculator_selectedMonsters');
            localStorage.removeItem('fbk_calculator_levels');
          }}
          className="mode-button"
          style={{ marginBottom: '24px' }}
        >
          Clear All Selections
        </button>
        <div className="cards-row" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '0px', flexWrap: 'wrap' }}>
          <div className="card-holder">
            <div className="monster-search">
              <input
                type="text"
                value={search1}
                onChange={e => {
                  setSearch1(e.target.value);
                  setIsDropdownOpen([true, isDropdownOpen[1], isDropdownOpen[2]]);
                }}
                onFocus={() => handleSearchFocus(0)}
                onBlur={() => handleSearchBlur(0)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    setIsDropdownOpen([false, isDropdownOpen[1], isDropdownOpen[2]]);
                    const match = Monsters.find(m => m.monsterName.toLowerCase() === e.target.value.toLowerCase());
                    if (match) {
                      setSelectedMonsters([match, selectedMonsters[1], selectedMonsters[2]]);
                      setLevels([1, levels[1], levels[2]]);
                      setSearch1(match.monsterName);
                    }
                  }
                }}
                placeholder="Search monster 1..."
                autoComplete="off"
              />
              <ul className={`monster-dropdown dropdown-list${isDropdownOpen[0] && filteredMonsters1.length > 0 ? ' show' : ''}`}> 
                {filteredMonsters1.map(monster => {
                  return <li key={monster.monsterName} onMouseDown={() => {
                    setSelectedMonsters([monster, selectedMonsters[1], selectedMonsters[2]]);
                    setSearch1(monster.monsterName);
                    setLevels([1, levels[1], levels[2]]);
                    setIsDropdownOpen([false, isDropdownOpen[1], isDropdownOpen[2]]);
                  }}>{monster.monsterName}</li>;
                })}
              </ul>
            </div>
            <MonsterCard
              monster={selectedMonsters[0]}
              level={levels[0]}
              onLevelChange={lvl => setLevels([lvl, levels[1], levels[2]])}
              statCompare={getStatCompare(0)}
            />
          </div>
          <div className="card-holder">
            <div className="monster-search">
              <input
                type="text"
                value={search2}
                onChange={e => {
                  setSearch2(e.target.value);
                  setIsDropdownOpen([isDropdownOpen[0], true, isDropdownOpen[2]]);
                }}
                onFocus={() => handleSearchFocus(1)}
                onBlur={() => handleSearchBlur(1)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    setIsDropdownOpen([isDropdownOpen[0], false, isDropdownOpen[2]]);
                    const match = Monsters.find(m => m.monsterName.toLowerCase() === e.target.value.toLowerCase());
                    if (match) {
                      setSelectedMonsters([selectedMonsters[0], match, selectedMonsters[2]]);
                      setLevels([levels[0], 1, levels[2]]);
                      setSearch2(match.monsterName);
                    }
                  }
                }}
                placeholder="Search monster 2..."
                autoComplete="off"
              />
              <ul className={`monster-dropdown dropdown-list${isDropdownOpen[1] && filteredMonsters2.length > 0 ? ' show' : ''}`}> 
                {filteredMonsters2.map(monster => {
                  return <li key={monster.monsterName} onMouseDown={() => {
                    setSelectedMonsters([selectedMonsters[0], monster, selectedMonsters[2]]);
                    setSearch2(monster.monsterName);
                    setLevels([levels[0], 1, levels[2]]);
                    setIsDropdownOpen([isDropdownOpen[0], false, isDropdownOpen[2]]);
                  }}>{monster.monsterName}</li>;
                })}
              </ul>
            </div>
            <MonsterCard
              monster={selectedMonsters[1]}
              level={levels[1]}
              onLevelChange={lvl => setLevels([levels[0], lvl, levels[2]])}
              statCompare={getStatCompare(1)}
            />
          </div>
          <div className="card-holder">
            <div className="monster-search">
              <input
                type="text"
                value={search3}
                onChange={e => {
                  setSearch3(e.target.value);
                  setIsDropdownOpen([isDropdownOpen[0], isDropdownOpen[1], true]);
                }}
                onFocus={() => handleSearchFocus(2)}
                onBlur={() => handleSearchBlur(2)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    setIsDropdownOpen([isDropdownOpen[0], isDropdownOpen[1], false]);
                    const match = Monsters.find(m => m.monsterName.toLowerCase() === e.target.value.toLowerCase());
                    if (match) {
                      setSelectedMonsters([selectedMonsters[0], selectedMonsters[1], match]);
                      setLevels([levels[0], levels[1], 1]);
                      setSearch3(match.monsterName);
                    }
                  }
                }}
                placeholder="Search monster 3..."
                autoComplete="off"
              />
              <ul className={`monster-dropdown dropdown-list${isDropdownOpen[2] && filteredMonsters3.length > 0 ? ' show' : ''}`}> 
                {filteredMonsters3.map(monster => {
                  return <li key={monster.monsterName} onMouseDown={() => {
                    setSelectedMonsters([selectedMonsters[0], selectedMonsters[1], monster]);
                    setSearch3(monster.monsterName);
                    setLevels([levels[0], levels[1], 1]);
                    setIsDropdownOpen([isDropdownOpen[0], isDropdownOpen[1], false]);
                  }}>{monster.monsterName}</li>;
                })}
              </ul>
            </div>
            <MonsterCard
              monster={selectedMonsters[2]}
              level={levels[2]}
              onLevelChange={lvl => setLevels([levels[0], levels[1], lvl])}
              statCompare={getStatCompare(2)}
            />
          </div>
        </div>
        {/* Individual stat graphs row below cards */}
        <div className="individual-graphs-row" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '32px', margin: '32px 0 0 0', flexWrap: 'wrap' }}>
          <div style={{ width: '500px', display: 'flex', justifyContent: 'center' }}>
            <StatGraph monster={selectedMonsters[0]} idx={0} />
          </div>
          <div style={{ width: '500px', display: 'flex', justifyContent: 'center' }}>
            <StatGraph monster={selectedMonsters[1]} idx={1} />
          </div>
          <div style={{ width: '500px', display: 'flex', justifyContent: 'center' }}>
            <StatGraph monster={selectedMonsters[2]} idx={2} />
          </div>
        </div>
        {/* Comparison graphs section, always below individual graphs */}
        <div style={{ width: '100%', marginTop: '48px', display: 'flex', flexDirection: 'row', justifyItems: 'center', alignItems: 'flex-start' }}>
          <div className="comparison-graphs-grid" style={{ width: '100%', margin: '0 auto' }}>
            <ComparisonGraph monsters={selectedMonsters} stat="hp" id="hp-comparison-graph" />
            <ComparisonGraph monsters={selectedMonsters} stat="ap" id="ap-comparison-graph" />
            <ComparisonGraph monsters={selectedMonsters} stat="atk" id="atk-comparison-graph" />
            <ComparisonGraph monsters={selectedMonsters} stat="def" id="def-comparison-graph" />
          </div>
        </div>
      </main>
    </div>
  );
}
