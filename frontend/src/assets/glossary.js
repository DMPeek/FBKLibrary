// hardcoded database for glossary entries and dynamic mapping for the links in the monster cards

export const glossaryEntries = [
    {
        term: 'Abilities',
        definition: 'The passives monsters get; either in or out of combat. Each monster can have up to 3 abilities.',
    },
    {
        term: 'AP/Action Points',
        definition: 'This is the number of actions a monster can take in battle. Action points decrease when using the following commands: Attack, Special, Item, and Guard.',
    },
    {
        id: 'ap-drain',
        aliases: ['AP-Drain 2'],
        term: 'AP-Drain',
        definition: 'Augments basic attacks to have a 25% chance to decrease enemy AP by 1.',
    },
    {
        id: 'armor',
        term: 'Armor',
        definition: 'A monster ability that reduces damage taken by the enemy monster basic attacks and special attacks by 20%.',
    },
    {
        id: 'astral-barrier',
        term: 'Astral Barrier',
        definition: 'A monster ability Randomly assigns one of the three barrier status effects (A,B, or C) to the monster with this ability at the start of a battle.',
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
        definition: 'Positive status effect that deals damage to the enemy monster with damage based on the Attack stat of the affected monster. Lowers MaxHP stat of attacker but returns to normal after combat.',
    },
    {
        term: 'Barrier C',
        definition: 'Positive status effect that reduces the damage of non-combo special attacks that hit the affected monster by 25%.',
    },
    {
        term: 'Battle Arts Effect',
        definition: 'This determines any added effects to a monsters Basic Attack (A button attacks); such as status effects or bonus damage to specific monster classes.',
    },
    {
        id: 'beast-killer',
        aliases: ['Beast-Killer 2'],
        term: 'Beast-Killer',
        definition: 'Augments only basic attacks to deal more damage to the Beast monster class.',
    },
    {
        id: 'berserker-soul',
        term: 'Berserker Soul',
        definition: 'A monster ability that boosts the Attack stat of the monster with this ability by 1000 but applies the confusion status effect to the monster.',
    },
    {
        id: 'blind',
        term: 'Blind',
        definition: 'Negative status effect that increases the chance the afflicted monster will miss a non-combo special attack.',
    },
    {
        id: 'bulwark',
        term: 'Bulwark',
        definition: 'A monster ability that doubles the Defense stat of the monster with this ability.',
    },
    {
        term: 'Cannons',
        definition: 'Equipment that can be built at a base that will attack either Walking or Flying foes based on what kind of cannon is built; Anti-Ground or Anti-Air cannons, respectively.',
    },
    {
        id: 'castle-adept',
        term: 'Castle-Adept',
        definition: 'A monster ability that boosts monster stats in Castle battlefields. Boosted stats: Atk+500, DEF+500, AP+1, Speed-10.',
    },
    {
        term: 'Class',
        definition: 'This is the typing of the monster. It determines what equips the monster can use, as well as what weaknesses it has.',
    },
    {
        id: 'confusion',
        term: 'Confusion',
        definition: 'Negative status effect that restricts the afflicted monster into only using basic attacks.',
    },
    {
        term: 'Constructor',
        definition: 'Marshall ability that reduces the cost of building equipment by 25%.',
    },
    {
        id: 'control-magic',
        term: 'Control Magic',
        definition: 'A monster ability that allows for use of the control school of magic.',
    },
    {
        term: 'DEF/Defense',
        definition: 'The defense value of the monster. This value is only used when guarding and requires an opponent to beat this number with their attack value to break the guard.',
    },
    {
        id: 'defensive-magic',
        term: 'Defensive Magic',
        definition: 'A monster ability that allows for use of the defensive school of magic.',
    },
    {
        term: 'Discount',
        definition: 'Marshall ability that lowers the price of items in shops by 25%.',
    },
    {
        id: 'drain-touch',
        term: 'Drain Touch',
        definition: 'Augments only basic attacks to allow a monster to take away the item uses of the enemy monster, starting from top item in the inventory to the bottom. If guarding before attacking, boosts drain chance to 100%.',
    },
    {
        id: 'dragon-killer',
        aliases: ['Dragon-Killer 2'],
        term: 'Dragon-Killer',
        definition: 'Augments only basic attacks to deal more damage to the Dragon monster class.',
    },
    {
        id: 'durable',
        term: 'Durable',
        definition: 'A monster ability that boosts the Hit Points of a monster by 250.',
    },
    {
        term: 'Equipment',
        definition: 'Gear that can be built onto a base in the overworld to assist the player or enemy with stats, healing, or defensive cannons',
    },
    {
        id: 'field-adept',
        term: 'Field-Adept',
        definition: 'A monster ability that boosts monster stats in Field battlefields. Boosted stats: Atk+1000, DEF+1000.',
    },
    {
        id: 'fiend-killer',
        aliases: ['Fiend-Killer 2'],
        term: 'Fiend-Killer',
        definition: 'Augments only basic attacks to deal more damage to the Fiend monster class.',
    },
    {
        id: 'forest-adept',
        term: 'Forest-Adept',
        definition: 'A monster ability that boosts monster stats in Forest battlefields. Boosted stats: Atk+500, DEF+500, Speed-10, Luck+10.',
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
        id: 'lucky',
        term: 'Lucky',
        definition: 'A monster ability that boosts the luck of a monster by 10.',
    },
    {
        id: 'machine-killer',
        aliases: ['Machine-Killer 2'],
        term: 'Machine-Killer',
        definition: 'Augments only basic attacks to deal more damage to the Machine monster class.',
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
        id: 'mountain-adept',
        term: 'Mountain-Adept',
        definition: 'A monster ability that boosts monster stats in Mountain battlefields. Boosted stats: Atk+500, DEF+500, Speed-50.',
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
        id: 'night-adept',
        term: 'Night-Adept',
        definition: 'A monster ability that boosts monster stats during Nighttime. Stacks with other adepts. Boosted stats: Atk+250, DEF+250, AP+1, Luck+5.',
    },
    {
        id: 'offensive-magic',
        term: 'Offensive Magic',
        definition: 'A monster ability that allows for use of the offensive school of magic.',
    },
    {
        id: 'paralysis',
        term: 'Paralysis',
        definition: 'Negative status effect that prevents the afflicted monster from taking an action.',
    },
    {
        id: 'poison',
        aliases: ['Poison 1', 'Poison 2', 'Poison 3', 'Poison 4', 'Poison 5', 'Poison 6'],
        term: 'Poison',
        definition: 'Negative status effect that deals damage to the afflicted monster on each of their turns. Poison strength changes based on what applied the status.',
    },
    {
        term: 'Resupply',
        definition: 'Equipment that allows you to refresh item uses for your monsters at the cost of gold.',
    },
    {
        id: 'slime-reborn',
        term: 'Slime Reborn',
        definition: 'A monster ability that allows a monster to revive itself once per mission upon death.',
    },
    {
        id: 'slow',
        term: 'Slow',
        definition: 'Augments basic attacks to increase enemy speed by 20 (this is bad for the enemy).',
    },
    {
        id: 'solar-adept',
        term: 'Solar-Adept',
        definition: 'A monster ability that boosts monster stats during Nighttime. Stacks with other adepts. Boosted stats: Atk+250, DEF+250, AP+1, Luck+5.',
    },
    {
        term: 'Specials',
        definition: 'Monster attacks or support abilities used by pressing the Z button in combat. Costs 2 AP.',
    },
    {
        id: 'speed',
        term: 'Speed',
        definition: 'This decides the turn order of monsters. Every monster gets one action before the next turn begins. The lower the speed of a monster, the faster they act. This value has some slight variation; so turn order has some level of control, but not total control.',
    },
    {
        id: 'spellcaster-killer',
        aliases: ['Spellcaster-Killer 2'],
        term: 'Spellcaster-Killer',
        definition: 'Augments only basic attacks to deal more damage to the Spellcaster monster class.',
    },
    {
        id: 'spirit-killer',
        aliases: ['Spirit-Killer 2'],
        term: 'Spirit-Killer',
        definition: 'Augments only basic attacks to deal more damage to the Spirit monster class.',
    },
    {
        term: 'Status Effects',
        definition: 'Positive or negative effects given to a monster that have a chance to be removed each turn.',
    },
    {
        id: 'status-guard',
        term: 'Status Guard',
        definition: 'A monster ability that prevents any negative status effects from afflicting the monster with this ability.',
    },
    {
        id: 'super-stamina-ability',
        aliases: ['Super Stamina'],
        term: 'Super Stamina (Ability)',
        definition: 'A monster ability that applies the Super Stamina status effect to the monster with this ability at the start of a battle.',
    },
    {
        term: 'Super Stamina (Status)',
        definition: 'Positive status effect that heals the affected monster on each of their turns.',
    },
    {
        id: 'swift',
        term: 'Swift',
        definition: 'A monster ability that increases the overworld speed of a monster by one stage. Also decreases the battle speed of a monster by 20 in combat.',
    },
    {
        term: 'Trade Union',
        definition: 'Equipment that unlocks the use of the trader in a base to buy items.',
    },
    {
        id: 'undodgeable',
        term: 'Undodgeable',
        definition: 'Augments only basic attacks to never miss their target.',
    },
    {
        id: 'warrior-killer',
        aliases: ['Warrior-Killer 2'],
        term: 'Warrior-Killer',
        definition: 'Augments only basic attacks to deal more damage to the Warrior monster class.',
    },
    {
        id: 'wasteland-adept',
        term: 'Wasteland-Adept',
        definition: 'A monster ability that boosts monster stats in Wasteland battlefields. Boosted stats: AP+2, Luck+5',
    },
    {
        id: 'water-adept',
        term: 'Water-Adept',
        definition: 'A monster ability that boosts monster stats in Water battlefields. Boosted stats: Atk+500, DEF+500, AP+1, Speed-30.',
    },
    {
        term: 'Watchtower',
        definition: 'Equipment that doubles the effective range of cannons built at a base.',
    },
];