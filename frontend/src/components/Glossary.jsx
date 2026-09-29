import '../styles.css';

const glossaryEntries = [
    {
        term: 'AP/Action Points',
        definition: 'This is the number of actions a monster can take in battle. Action points decrease when using the following commands: Attack, Special, Item, and Guard',
    },
    {
        term: 'ATK/Attack',
        definition: 'The attack value of the monster. This determines how much damage the monster will do with attacks. The formula divides the monsters attack by 100 and adds some level of random variation.',
    },
    {
        term: 'Class',
        definition: 'This is the typing of the monster. It determines what equips the monster can use, as well as what weaknesses it has.',
    },
    {
        term: 'DEF/Defense',
        definition: 'The defense value of the monster. This value is only used when guarding and requires an opponent to beat this number with their attack value to break the guard.',
    },
    {
        term: 'GT/Growth Tree',
        definition: 'This determines how the stats of a monster increase with each level up. This values changes at certain level thresholds within the specific growth tree.',
    },
    {
        term: 'HP/Hit Points',
        definition: 'The health value of the monster. Once this number reaches 0, the monster is eliminated until revival or mission clear',
    },
    {
        term: 'Luck',
        definition: 'Determines a monsters accuracy, chance to dodge, and critical chance. Value is quadrupled when guarding.',
    },
    {
        term: 'Speed',
        definition: 'This decides the turn order of monsters. Every monster gets one action before the next turn begins. The lower the speed of a monster, the faster they act. This value has some slight variation; so turn order has some level of control, but not total control.',
    },
];

export default function Glossary() {
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
                    <a href="/Glossary">Glossary</a>
                </nav>
            </header>
            <main className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw', minHeight: 'calc(100vh - 56px)', boxSizing: 'border-box', marginTop: '56px', padding: '32px 24px' }}>
                <section aria-labelledby="glossary-title" style={{ width: 'min(100%, 1080px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderTop: '4px solid #ffb300', background: 'rgba(24, 20, 62, 0.88)', boxShadow: '0 12px 36px rgba(0, 0, 0, 0.24)' }}>
                    <h1 id="glossary-title" style={{ padding: '20px 24px 16px', color: '#ffb300', fontSize: '1.5rem', textAlign: 'left' }}>FBK Vocabulary Glossary</h1>
                    <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse', color: '#fff', fontSize: '1rem', lineHeight: 1.5 }}>
                        <colgroup>
                            <col style={{ width: '20%' }} />
                            <col style={{ width: '80%' }} />
                        </colgroup>
                        <thead style={{ background: 'linear-gradient(90deg, #6a1b9a 0%, #283593 100%)', color: '#ffb300', textAlign: 'left' }}>
                            <tr>
                                <th scope="col" style={{ padding: '16px 20px' }}>Term</th>
                                <th scope="col" style={{ padding: '16px 20px' }}>Definition</th>
                            </tr>
                        </thead>
                        <tbody>
                            {glossaryEntries.map(({ term, definition }, index) => (
                                <tr key={term} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.16)', background: index % 2 === 1 ? 'rgba(255, 255, 255, 0.045)' : 'transparent' }}>
                                    <th scope="row" style={{ width: '20%', padding: '16px 20px', borderRight: '1px solid rgba(255, 179, 0, 0.38)', color: '#ffd45b', textAlign: 'left', verticalAlign: 'top', overflowWrap: 'anywhere' }}>{term}</th>
                                    <td style={{ width: '80%', padding: '16px 20px', verticalAlign: 'top', overflowWrap: 'anywhere' }}>{definition}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};


















