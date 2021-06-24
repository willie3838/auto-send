import { IanaName, Territory, WindowsZoneName } from "./enums";
import { map as ianaAliasMap } from "./iana-aliases";
import { map as timeZoneMap } from "./time-zone-map";

export const findIana = (
  windowsTimeZone: WindowsZoneName | string,
  territory: Territory | string = Territory["001"],
): IanaName[] | undefined => {
  const windowsZoneNameEnum = windowsTimeZone as WindowsZoneName;
  const territoryEnum = territory as Territory;

  const entry = timeZoneMap.find(
    ({ windowsName: itemName, territory: itemTerritory }) =>
      itemName === windowsZoneNameEnum && itemTerritory === territoryEnum,
  );

  if (typeof entry === "undefined") return undefined;

  const result: IanaName[] = [];

  entry.iana.map(findAlias).forEach(aliasSet => {
    if (typeof aliasSet === "undefined") return;
    result.push(...aliasSet);
  });

  return result;
};

export const findOneIana = (
  windowsTimeZone: WindowsZoneName | string,
  territory: Territory | string = Territory["001"],
): IanaName | undefined => {
  const result = findIana(windowsTimeZone, territory);
  if (typeof result === "undefined") return undefined;
  return result[0];
};

export const findWindows = (ianaTimeZone: IanaName | string): WindowsZoneName | undefined => {
  let result: WindowsZoneName | undefined;

  const aliases = findAlias(ianaTimeZone);
  if (typeof aliases === "undefined") return undefined;

  aliases.find(alias => {
    const entry = timeZoneMap.find(({ iana: itemName }) => itemName.includes(alias));
    if (typeof entry === "undefined") return false;

    result = entry.windowsName;
    return true;
  });

  return result;
};

export const findAlias = (ianaTimeZone: IanaName | string): IanaName[] | undefined => {
  const ianaNameEnum = ianaTimeZone as IanaName;
  const entry = ianaAliasMap.find(({ alias }) => alias.includes(ianaNameEnum));
  if (typeof entry === "undefined") return undefined;

  return entry.alias;
};

export const getAllIanaWindowsMap = (): Map<IanaName, WindowsZoneName> => {
  const map = new Map<IanaName, WindowsZoneName>();

  for (const IanaKeyName in IanaName) {
    if (IanaName.hasOwnProperty(IanaKeyName)) {
      const ianaKeyName = IanaKeyName as keyof typeof IanaName;
      const windowsAlias = findWindows(IanaName[ianaKeyName]);

      if (typeof windowsAlias !== "undefined") {
        map.set(IanaName[ianaKeyName], windowsAlias);
      }
    }
  }

  return map;
};
