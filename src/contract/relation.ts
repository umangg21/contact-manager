export const Relation = [
    "",
    "Father",
    "Mother",
    "Spouse",
    "Daughter",
    "Brother",
    "Sister",
    "Friend",
    "Colleague",
    "Cousin",
    "Nephew"
]

export interface RelationView{
    index: number;
    relationName: string;
    isSelected: boolean;
}