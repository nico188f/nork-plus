import z from "zod";

export const kitchenAndHall276 = {
   id: 20114,
   name: "Book 276 Kitchen/Hall",
} as const;
export const kitchen176 = { id: 20117, name: "Book 176 Kitchen" } as const;
export const hall176 = { id: 20118, name: "Book 176 Hall" } as const;
export const cinema = { id: 20120, name: "Book Cinema" } as const;
export const fitnessRooms = [
   { id: 20121, name: "Book Fitness 1" } as const,
   { id: 23659, name: "Book Fitness 2" } as const,
   { id: 23660, name: "Book Fitness 3" } as const,
   { id: 23661, name: "Book Fitness 4" } as const,
] as const;
export const groupRoom1 = { id: 20123, name: "Rent 276" } as const;

export const ResourceIdSchema = z.union([
   z.literal(kitchenAndHall276.id),
   z.literal(kitchen176.id),
   z.literal(hall176.id),
   z.literal(cinema.id),
   ...fitnessRooms.map((room) => z.literal(room.id)),
   z.literal(groupRoom1.id),
]);

export type ResourceId = z.infer<typeof ResourceIdSchema>;

export const ResourceNameSchema = z.union([
   z.literal(kitchenAndHall276.name),
   z.literal(kitchen176.name),
   z.literal(hall176.name),
   z.literal(cinema.name),
   ...fitnessRooms.map((room) => z.literal(room.name)),
   z.literal(groupRoom1.name),
]);

export type ResourceName = z.infer<typeof ResourceNameSchema>;

const resourceNameToIdMap: Record<ResourceName, ResourceId> = {
   [kitchenAndHall276.name]: kitchenAndHall276.id,
   [kitchen176.name]: kitchen176.id,
   [hall176.name]: hall176.id,
   [cinema.name]: cinema.id,
   ...Object.fromEntries(fitnessRooms.map((room) => [room.id])),
   [groupRoom1.name]: groupRoom1.id,
};

export function resourceToResourceId(resourceName: ResourceName): ResourceId {
   return resourceNameToIdMap[resourceName];
}
