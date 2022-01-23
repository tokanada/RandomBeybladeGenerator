function SpinTrack(name, fullName, height, quantity, weight, attack, defense, stamina, type, hasModeChange, modes, synergies, generation, isCustom, acceptsTip, notes, specialConditions) {
    this.name = name;
    this.fullName = fullName;
    this.height = height;
    this.quantity = quantity;
    this.weight = weight;
    this.attack = attack;
    this.defense = defense;
    this.stamina = stamina;
    this.type = type;
    this.hasModeChange = hasModeChange;
    this.modes = modes;
    this.synergies = synergies;
    this.generation = generation;
    this.isCustom = isCustom;
    this.acceptsTip = acceptsTip;
    this.notes = notes;
    this.specialConditions = specialConditions;
}

module.exports = { SpinTrack };