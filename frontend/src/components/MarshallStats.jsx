import '../styles.css';
import { Marshalls } from '../assets/marshalls';

const statLabels = ['ATK/DEF', 'HP', 'AP'];

export default function MarshallStats() {
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
                    <a href="/MarshallStats">Marshall Stats</a>
                </nav>
            </header>
            <main className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw', minHeight: 'calc(100vh - 56px)', boxSizing: 'border-box', marginTop: '56px', padding: '32px 24px' }}>
                <section aria-labelledby="marshall-stats-title" style={{ width: 'min(100%, 1080px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderTop: '4px solid #ffb300', background: 'rgba(24, 20, 62, 0.88)', boxShadow: '0 12px 36px rgba(0, 0, 0, 0.24)' }}>
                    <h1 id="marshall-stats-title" style={{ padding: '20px 24px 16px', color: '#ffb300', fontSize: '1.5rem', textAlign: 'left' }}>Marshall Stats</h1>
                    <p style={{ padding: '0 24px 16px', margin: 0, color: '#fff', lineHeight: 1.5 }}>
                        Values show the level required to reach each stat quantity. A dash means that quantity is not available.
                    </p>
                    <div role="region" aria-label="Marshall stat growth table" tabIndex={0} style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', minWidth: '1080px', tableLayout: 'fixed', borderCollapse: 'collapse', color: '#fff', fontSize: '0.9rem', lineHeight: 1.5 }}>
                            <colgroup>
                                <col style={{ width: '13%' }} />
                                <col style={{ width: '15%' }} />
                                <col style={{ width: '10%' }} />
                                {Array.from({ length: 10 }, (_, index) => (
                                    <col key={index + 1} style={{ width: '6.2%' }} />
                                ))}
                            </colgroup>
                            <thead style={{ background: 'linear-gradient(90deg, #6a1b9a 0%, #283593 100%)', color: '#ffb300', textAlign: 'left' }}>
                                <tr>
                                    <th scope="col" rowSpan="2" style={{ padding: '12px 10px' }}>Marshall</th>
                                    <th scope="col" rowSpan="2" style={{ padding: '12px 10px' }}>Ability</th>
                                    <th scope="col" rowSpan="2" style={{ padding: '12px 10px' }}>Stat</th>
                                    <th scope="colgroup" colSpan="10" style={{ padding: '12px 10px', textAlign: 'center' }}>Stat quantity</th>
                                </tr>
                                <tr>
                                    {Array.from({ length: 10 }, (_, index) => (
                                        <th key={index + 1} scope="col" style={{ padding: '8px 4px', textAlign: 'center' }}>{index + 1}</th>
                                    ))}
                                </tr>
                            </thead>
                            {Marshalls.map(({ marshallName, ability, statGrowth }, marshallIndex) => (
                                <tbody key={marshallName}>
                                    {statLabels.map((statLabel, statIndex) => (
                                        <tr
                                            key={statLabel}
                                            style={{
                                                borderBottom: statIndex === statLabels.length - 1 ? '1px solid rgba(255, 255, 255, 0.24)' : '1px solid rgba(255, 255, 255, 0.1)',
                                                background: marshallIndex % 2 === 1 ? 'rgba(255, 255, 255, 0.045)' : 'transparent'
                                            }}
                                        >
                                            {statIndex === 0 && (
                                                <>
                                                    <th scope="rowgroup" rowSpan={statLabels.length} style={{ padding: '12px 10px', borderRight: '1px solid rgba(255, 179, 0, 0.38)', color: '#ffd45b', textAlign: 'left', verticalAlign: 'top', overflowWrap: 'anywhere' }}>
                                                        {marshallName}
                                                    </th>
                                                    <td rowSpan={statLabels.length} style={{ padding: '12px 10px', verticalAlign: 'top', overflowWrap: 'anywhere' }}>
                                                        {ability}
                                                    </td>
                                                </>
                                            )}
                                            <th scope="row" style={{ padding: '12px 10px', color: '#ffd45b', textAlign: 'left', verticalAlign: 'top' }}>
                                                {statLabel}
                                            </th>
                                            {statGrowth[statLabel].map((level, index) => (
                                                <td key={index + 1} style={{ padding: '12px 4px', textAlign: 'center', verticalAlign: 'top' }}>
                                                    {level}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            ))}
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};