export type Group = {
  id: number;
  name: string;
  description: string;
  membersIds: number[];
  ownerId: number;
};

export type CreateGroupDto = Omit<Group, "id">;

export type UpdateGroupDto = Pick<Group, "id"> & Partial<CreateGroupDto>;
