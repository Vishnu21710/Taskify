import { card, list } from "@prisma/client";

export type ListWithCards = list & {cards: card[]}

export type CardWithList = card & {list: list}