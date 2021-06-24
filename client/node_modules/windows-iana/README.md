[![Build Status](https://travis-ci.org/rubenillodo/windows-iana.svg?branch=master)](https://travis-ci.org/rubenillodo/windows-iana)
[![Coverage Status](https://coveralls.io/repos/github/rubenillodo/windows-iana/badge.svg)](https://coveralls.io/github/rubenillodo/windows-iana)

This library exports two functions to help convert from Windows time zones to IANA time zones (based on [this mapping definition](https://github.com/unicode-org/cldr/blob/master/common/supplemental/windowsZones.xml) and [this list of IANA aliases](https://github.com/unicode-org/cldr/blob/master/common/bcp47/timezone.xml)).

# Installation

Add the dependency to your project with `npm install --save windows-iana` or `yarn add windows-iana`.

# Usage

The library exports:

- `findIana()`: will return an array of possible IANA time zones, including all their aliases.
- `findOneIana()`: will return just one string.
- `findWindows()`: will return a string with a Windows time zone.
- `findAlias()`: will an array of all IANA aliases, including the one passed as a parameter.
- `getAllIanaWindowsMap()`: will return an map of all IANA time zones as key, and a Windows time zone as value.

## `findOneIana()`

```
import { findOneIana } from "windows-iana";

const result = findOneIana("Romance Standard Time");
console.log(result); // "Europe/Paris"
```

You may also pass the territory code as a second parameter (have a look again at the [mapping by unicode.org](https://unicode.org/repos/cldr/trunk/common/supplemental/windowsZones.xml) for more details).

```
import { findOneIana } from "windows-iana";

const result = findOneIana("Romance Standard Time", "ES");
console.log(result); // "Europe/Madrid"
```

## `findIana()`

```
import { findIana } from "windows-iana";

const result = findIana("Romance Standard Time");
console.log(result); // ["Europe/Paris"]
```

You may also pass the territory code to `findIana()`.

```
import { findIana } from "windows-iana";

const result = findIana("Romance Standard Time", "ES");
console.log(result); // ["Europe/Madrid", "Africa/Ceuta"]
```

## `findWindows()`

```
import { findWindows } from "windows-iana";

const result = findWindows("America/New_York");
console.log(result); // Eastern Standard Time
```

There is no territory code for this function because all IANA names map to exactly one territory.

## `findAlias()`

```
import { findAlias } from "windows-iana";

const result = findAlias("America/New_York");
console.log(result); // ["America/New_York", "US/Eastern"]
```

## `getAllIanaWindowsMap()`

```
import { getAllIanaWindowsMap } from "windows-iana";

const result = getAllIanaWindowsMap();
console.log(result.get('America/New_York')); // Eastern Standard Time
```
