import '../styles.css';

const glossaryEntries = [
    {
        term: 'Abilities',
        definition: 'The passives monsters get; either in or out of combat. Each monster can have up to 3 abilities.',
    },
    {
        term: 'Adept',
        definition: 'Monster abilities that boosts the stats of a monster on their respective adept battlefields. e.g. Castle-Adept, Water-Adept, Field-Adept, Night-Adept, etc etc.',
    },
    {
        term: 'AP/Action Points',
        definition: 'This is the number of actions a monster can take in battle. Action points decrease when using the following commands: Attack, Special, Item, and Guard.',
    },
    {
        term: 'Armor',
        definition: 'Reduces damage taken by the enemy monster basic attacks and special attacks by 20%.',
    },
    {
        term: 'Astral Barrier',
        definition: 'Randomly assigns one of the three barrier status effects (A,B, or C) to the monster with this ability at the start of a battle.',
    },
    {
        term: 'ATK/Attack',
        definition: 'The attack value of the monster. This determines how much damage the monster will do with attacks. The formula divides the monsters attack by 100 and adds some level of random variation.',
    },
    {
        term: 'Bases/Towns/Forts/Castles',
        definition: 'Key locations on the overworld maps that marshalls capture or defend. Equipment can be built at these locations.',
    },
    {
        term: 'Barricade',
        definition: 'Equipment that boosts the stats of monsters within a base.',
    },
    {
        term: 'Barrier A',
        definition: 'Positive status effect that lowers the Attack, Defense, and increases the Speed of the enemy monster that attacks the affected monster.',
    },
    {
        term: 'Barrier B',
        definition: 'Positive status effect that deals damage to the enemy monster with damage based on the Attack stat of the affected monster.',
    },
    {
        term: 'Barrier C',
        definition: 'Positive status effect that reduces the damage of non-combo special attacks that hit the affected monster by 50%.',
    },
    {
        term: 'Battle Arts Effect',
        definition: 'This determines any added effects to a monsters Basic Attack (A button attacks); such as status effects or bonus damage to specific monster classes.',
    },
    {
        term: 'Berserker Soul',
        definition: 'Boosts the Attack stat of the monster with this ability by 2000 but applies the confusion status effect to the monster.',
    },
    {
        term: 'Blind',
        definition: 'Negative status effect that increases the chance the afflicted monster will miss a non-combo special attack.',
    },
    {
        term: 'Bulwark',
        definition: 'Doubles the Defense stat of the monster with this ability.',
    },
    {
        term: 'Cannons',
        definition: 'Equipment that can be built at a base that will attack either Walking or Flying foes based on what kind of cannon is built; Anti-Ground or Anti-Air cannons, respectively.',
    },
    {
        term: 'Class',
        definition: 'This is the typing of the monster. It determines what equips the monster can use, as well as what weaknesses it has.',
    },
    {
        term: 'Class-Killer Abilities',
        definition: 'Augments only basic attacks to deal more damage to specific monster classes. e.g. Machine-Killer, Dragon-Killer, Spellcaster-Killer, etc etc.',
    },
    {
        term: 'Confusion',
        definition: 'Negative status effect that restricts the afflicted monster into only using basic attacks.',
    },
    {
        term: 'Constructor',
        definition: 'Marshall ability that reduces the cost of building equipment by 25%.',
    },
    {
        term: 'Control Magic',
        definition: 'A monster ability that allows for use of the control school of magic.',
    },
    {
        term: 'DEF/Defense',
        definition: 'The defense value of the monster. This value is only used when guarding and requires an opponent to beat this number with their attack value to break the guard.',
    },
    {
        term: 'Defensive Magic',
        definition: 'A monster ability that allows for use of the defensive school of magic.',
    },
    {
        term: 'Discount',
        definition: 'Marshall ability that lowers the price of items in shops by 25%.',
    },
    {
        term: 'Durable',
        definition: 'A monster ability that boosts the Hit Points of a monster by 250.',
    },
    {
        term: 'Equipment',
        definition: 'Gear that can be built onto a base in the overworld to assist the player or enemy with stats, healing, or defensive cannons',
    },
    {
        term: 'GT/Growth Tree',
        definition: 'This determines how the stats of a monster increase with each level up. This values changes at certain level thresholds within the specific growth tree.',
    },
    {
        term: 'Healer (Equipment)',
        definition: 'Equipment that boosts the passive healing amount that a monster receives when in a base.',
    },
    {
        term: 'Healer (Marshall Ability)',
        definition: 'Marshall ability that doubles the healing amount of passive healing in bases for ONLY the monsters assigned to the Healer Marshall.',
    },
    {
        term: 'HP/Hit Points',
        definition: 'The health value of the monster. Once this number reaches 0, the monster is eliminated until revival or mission clear',
    },
    {
        term: 'Items',
        definition: 'Consumables that a monster can bring into combat for healing or other various effects. Items can also be permanent stat boosts instead of a consumable; such as Legendary Sword.',
    },
    {
        term: 'Luck',
        definition: 'Determines a monsters accuracy, chance to dodge, and critical chance. Value is quadrupled when guarding.',
    },
    {
        term: 'Lucky',
        definition: 'A monster ability that boosts the luck of a monster by 10.',
    },
    {
        term: 'Marshall',
        definition: 'Leaders who command the monsters deployed in combat. Sometimes have their own abilities.',
    },
    {
        term: 'Master of the Egyptian Gods',
        definition: 'Marshall ability that permits the use of items that summon the Egyptian Gods.',
    },
    {
        term: 'Movement Type',
        definition: 'Determines whether a leading monster for a marshall team will be Walking (W), Flying (F), or Swimming (S)',
    },
    {
        term: 'Navy',
        definition: 'Marshall ability that boosts the overworld speed of Swimming type monsters by one stage.',
    },
    {
        term: 'Offensive Magic',
        definition: 'A monster ability that allows for use of the offensive school of magic.',
    },
    {
        term: 'Paralyze',
        definition: 'Negative status effect that prevents the afflicted monster from taking an action.',
    },
    {
        term: 'Poison',
        definition: 'Negative status effect that deals damage to the afflicted monster on each of their turns. Poison strength changes based on what applied the status.',
    },
    {
        term: 'Resupply',
        definition: 'Equipment that allows you to refresh item uses for your monsters at the cost of gold.',
    },
    {
        term: 'Specials',
        definition: 'Monster attacks or support abilities used by pressing the Z button in combat. Costs 2 AP.',
    },
    {
        term: 'Speed',
        definition: 'This decides the turn order of monsters. Every monster gets one action before the next turn begins. The lower the speed of a monster, the faster they act. This value has some slight variation; so turn order has some level of control, but not total control.',
    },
    {
        term: 'Status Effects',
        definition: 'Positive or negative effects given to a monster that have a chance to be removed each turn.',
    },
    {
        term: 'Status Guard',
        definition: 'A monster ability that prevents any negative status effects from afflicting the monster with this ability.',
    },
    {
        term: 'Super Stamina (Ability)',
        definition: 'A monster ability that applies the Super Stamina status effect to the monster with this ability at the start of a battle.',
    },
    {
        term: 'Super Stamina (Status)',
        definition: 'Positive status effect that heals the affected monster on each of their turns.',
    },
    {
        term: 'Swift',
        definition: 'Increases the overworld speed of a monster by one stage. Also decreases the battle speed of a monster by 20 in combat.',
    },
    {
        term: 'Trade Union',
        definition: 'Equipment that unlocks the use of the trader in a base to buy items.',
    },
    {
        term: 'Undodgeable',
        definition: 'Augments only basic attacks to never miss their target.',
    },
    {
        term: 'Watchtower',
        definition: 'Equipment that doubles the effective range of cannons built at a base.',
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


















