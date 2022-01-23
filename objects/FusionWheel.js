function FusionWheel(name, weight, quantity, attack, defense, stamina, type, hasModeChange, modes, hasSpecificEnergyRing, requiredEnergyRing, synergies, spinDirection, generation, isClone, specialConditions) {
    this.name = name;
    this.weight = weight;
    this.quantity = quantity;
    this.attack = attack;
    this.defense = defense;
    this.stamina = stamina;
    this.type = type;
    this.hasModeChange = hasModeChange;
    this.modes = modes;
    this.hasSpecificEnergyRing = hasSpecificEnergyRing;
    this.requiredEnergyRing = requiredEnergyRing;
    this.synergies = synergies;
    this.spinDirection = spinDirection;
    this.generation = generation;
    this.isClone = isClone;
    this.specialConditions = specialConditions;
}

module.exports = { FusionWheel };