function PerformanceTip(name, fullName, weight, quantity, attack, defense, stamina, type, isCustom, notes) {
    this.name = name;
    this.fullName = fullName;
    this.weight = weight;
    this.quantity = quantity;
    this.attack = attack;
    this.defense = defense;
    this.stamina = stamina;
    this.type = type;
    this.isCustom = isCustom;
    this.notes = notes;
}

module.exports = { PerformanceTip };