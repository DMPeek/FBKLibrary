//refactor code later
import { useState } from 'react';
import '../styles.css';
import { Monsters } from '../assets/monsters';
import { Marshalls } from '../assets/marshalls';

function MonsterDropdown({ items, onSelect, isOpen, setIsOpen, nameKey = 'monsterName', portraitKey = 'portrait' }) {
    const [search, setSearch] = useState('');
    const filtered = items.filter(m => m[nameKey].toLowerCase().includes(search.toLowerCase()));
    return isOpen ? (
        <div style={{ position: 'relative', width: '100%' }}>
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
                placeholder={`Search ${nameKey === 'monsterName' ? 'monster' : 'marshall'}...`}
                className="monster-search-input"
                style={{ width: '100%' }}
            />
            <ul className={`monster-dropdown dropdown-list${filtered.length > 0 ? ' show' : ''}`}>
                {filtered.map(item => (
                    <li key={item[nameKey]} onMouseDown={() => {
                        onSelect(item);
                        setSearch('');
                        setIsOpen(false);
                    }}>
                        {item[nameKey]}
                    </li>
                ))}
            </ul>
        </div>
    ) : null;
}

function TeamBuilderCard({ openDropdownIdx, setOpenDropdownIdx }) {
    const [leader, setLeader] = useState(null);
    const [members, setMembers] = useState([null, null, null]);

    // Handler for member selection
    const handleMemberSelect = (idx, monster) => {
        const newMembers = [...members];
        newMembers[idx] = monster;
        setMembers(newMembers);
    };

    return (
        <div className="monster-card team-builder-card" style={{ width: 340, minHeight: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.2rem 0.8rem', margin: '0 0 32px 0' }}>
            {/* Team Leader Button */}
            <div style={{ marginBottom: '0.5rem', width: 88, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <button
                    className="portrait-btn"
                    style={{
                        width: 88,
                        height: 88,
                        border: '2px solid #ffb300',
                        borderRadius: 10,
                        background: '#222',
                        cursor: 'pointer',
                        marginBottom: '0.3rem',
                        outline: 'none',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}
                    onClick={() => setOpenDropdownIdx(0)}
                >
                    {leader && leader.portrait
                        ? <img src={leader.portrait} alt={leader.marshallName || leader.monsterName} style={{ width: 88, height: 88, objectFit: 'cover', borderRadius: 10 }} />
                        : <span style={{ color: '#ffb300' }}>Select Leader</span>
                    }
                </button>
                {leader && <div className="leader-name" style={{ color: '#ffb300', fontWeight: 'bold', fontSize: '1rem', marginTop: '0.2rem', textAlign: 'center', width: '200px'}}>{leader.marshallName || leader.monsterName}</div>}
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 220,
                    zIndex: 20
                }}>
                    <MonsterDropdown
                        items={Marshalls}
                        onSelect={m => { setLeader(m); setOpenDropdownIdx(null); }}
                        isOpen={openDropdownIdx === 0}
                        setIsOpen={open => setOpenDropdownIdx(open ? 0 : null)}
                        nameKey="marshallName"
                        portraitKey="portrait"
                    />
                </div>
            </div>
            {/* Team Member Buttons */}
            <div className="team-members-row" style={{ display: 'flex', gap: '16px', marginTop: '0.6rem' }}>
                {[0, 1, 2].map(idx => (
                    <div key={idx} style={{ position: 'relative' }}>
                        <button
                            className="portrait-btn"
                            style={{
                                width: 88,
                                height: 88,
                                border: '2px solid #ffb300',
                                borderRadius: 10,
                                background: '#222',
                                cursor: 'pointer',
                                outline: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            }}
                            onClick={() => setOpenDropdownIdx(idx + 1)}
                        >
                            {members[idx] && members[idx].portrait
                                ? <img src={members[idx].portrait} alt={members[idx].monsterName} style={{ width: 88, height: 88, objectFit: 'cover', borderRadius: 10 }} />
                                : <span style={{ color: '#ffb300' }}>Select</span>
                            }
                        </button>
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 220,
                            zIndex: 20
                        }}>
                            <MonsterDropdown
                                items={Monsters}
                                onSelect={m => { handleMemberSelect(idx, m); setOpenDropdownIdx(null); }}
                                isOpen={openDropdownIdx === idx + 1}
                                setIsOpen={open => setOpenDropdownIdx(open ? idx + 1 : null)}
                                nameKey="monsterName"
                                portraitKey="portrait"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function TeamBuilder() {
    // Track which dropdown is open globally
    const [openDropdownIdx, setOpenDropdownIdx] = useState(null);

    // Create an array of 10 cards
    const cards = Array.from({ length: 10 }, (_, i) =>
        <TeamBuilderCard key={i} openDropdownIdx={openDropdownIdx === null ? null : openDropdownIdx === i * 4 ? 0 : openDropdownIdx === i * 4 + 1 ? 1 : openDropdownIdx === i * 4 + 2 ? 2 : openDropdownIdx === i * 4 + 3 ? 3 : null} setOpenDropdownIdx={idx => setOpenDropdownIdx(idx !== null ? i * 4 + idx : null)} />
    );

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
            <main className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '56px' }}>
                <h2 style={{marginBottom: '24px'}}>Build you some teams</h2>
                {[0, 1, 2].map(row => (
                    <div key={row} style={{ display: 'flex', gap: '32px', marginBottom: '32px', justifyContent: 'center' }}>
                        {cards.slice(row * 3, row * 3 + 3)}
                    </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
                    {cards[9]}
                </div>
            </main>
        </div>
    );
}
