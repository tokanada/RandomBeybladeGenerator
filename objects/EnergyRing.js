function EnergyRing(name, weight, quantity, attack, defense, stamina, type, hasModeChange, modes, hasSpecificFusionWheel, requiredFusionWheel, synergies, spinDirection, generation, isClone, notes) {
    this.name = name;
    this.weight = weight;
    this.quantity = quantity;
    this.attack = attack;
    this.defense = defense;
    this.stamina = stamina;
    this.type = type;
    this.hasModeChange = hasModeChange;
    this.modes = modes;
    this.hasSpecificFusionWheel = hasSpecificFusionWheel;
    this.requiredFusionWheel = requiredFusionWheel;
    this.synergies = synergies;
    this.spinDirection = spinDirection;
    this.generation = generation;
    this.isClone = isClone;
    this.notes = notes;
}

module.exports = { EnergyRing };