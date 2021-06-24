import mapContent = require("../iana.json");
import { IanaName } from "./enums";

export const map: AliasMap = mapContent as any;

export type AliasMap = AliasMapEntry[];

export interface AliasMapEntry {
  name: string;
  description: string;
  alias: IanaName[];
}
