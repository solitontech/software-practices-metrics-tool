export interface IColumn {
  id: "name" | "title" | "creationDate" | "createdBy";
  label: string;
  width?: number;
  align?: "center" | "left" | "right";
}
