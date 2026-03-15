---
layout: cheat-sheet
---

<div><!-- This is for 3 column layout -->

# What is Heta?

<https://hetalang.github.io>

[Heta](/) is an open-source modeling language and toolchain designed for building, organizing, and transforming quantitative models used in systems pharmacology, systems biology, and related fields.

- **Heta language** — a domain-specific language for describing models.
- **Heta compiler** — a tool for compiling and converting models to other formats.
- **HetaSimulator.jl** — a simulation framework based on Julia for running and analyzing models.

# Model example

```heta
/* Simple model with two species A and B, 
one reaction r1, and a time event sw1 */
comp1 @Compartment .= 1;

A @Species { compartment: comp1 } .= 2;
B @Species { compartment: comp1 } .= 0;
r1 @Reaction { actors: A => 2B } := k1 * A * comp1;

k1 @Const = 1.2e-1;
dose1 @Const = 1;

sw1 @TimeSwitcher { start: 12, period: 24 };
A [sw1]= A + dose1 / comp1;
```

# Base classes

## Const

`Const` describes fixed values
```heta
k1 @Const { units: 1/second } = 1.2e-1;
```

## Record

`Record` describes values which may vary over time
```heta
p1 @Record {
    units: 1/second,   // optional
    boundary: false,   // default - false
    output: true       // default - false
} := x * y;
```

## Process

`Process` describes income and outcome of records. Inherits from `Record`.
```heta
p1 @Process {
    actors: in => out,
    units: 1/second,   // optional
    output: true       // default - false
} := k1 * in;
```

## Compartment

`Compartment` describes physical volumes. Inherits from `Record`.
```heta
comp1 @Compartment {
    units: liter,    // optional
    boundary: true,  // default - false
    output: true     // default - false
} .= 1;
```

## Species

`Species` describes concentrations or amounts of substances. Inherits from `Record`.
```heta
Aamt @Species {
    compartment: comp1,
    units: mole,        // optional
    isAmount: true,     // default - false
    boundary: false,    // default - false
    output: true        // default - false
} .= 10;
```

## Reaction
`Reaction` describes chemical reactions. Inherits from `Process`.
```heta
r1 @Reaction {
    actors: A <=> 2B,
    units: mole/second,  // optional
    reversible: true,    // default - false
    modifiers: [C, D],   // default - []
    output: true         // default - false
} := k1 * A * C * D * comp1;
```

## Actors expression

Set stoichiometry of a `Process` or `Reaction` using the `actors` property.

| | |
|---|---|
| `A => B` | irreversible reaction |
| `A => 2B + C` | reaction with stoichiometry |
| `=> A` | source (production) |
| `A =>` | sink (degradation) |
| `A <=> B` | reversible reaction |

</div>
<div>

# Annotations

## Comments
```heta
// This is a single-line comment
/* This is a
multi-line comment */
```

## Semantic annotations
```heta
'''Here you can write the component notes'''
A @Species 'Title for component A' {
    compartment: comp1,
    tags: [tag1, tag2],   // user-defined tags
    aux: { key1: value1 } // user-defined metadata
} .= 10;
```

# Mathematic expressions

Math expression can be used in `Record`, `Process`, `Compartment`, `Species`, `Reaction` **assignment** and `Switcher` **trigger** properties.

## Assignments

| | |
|---|---|
| `=` | assign number, for `Const` only |
| `.=` | initial assignment, calculate value at time 0 only, for `Record`, `Compartment`, `Species` |
| `:=` | rule assignment, calculate value at each time step, for `Record`, `Process`, `Compartment`, `Species`, `Reaction` |
| `[sw1]=` | assignment when switcher `sw1` is active, for `Record`, `Compartment`, `Species` |

## Numbers and operators

| | |
|---|---|
| `1`, `1.2e-1`, `1E-1` | numbers |
| `pi`, `e` | mathematical constants |
| `Infinity`, `-Infinity`, `NaN` | special values |
|  `+`, `-`, `*`, `/`, `^` | basic math operators |
| `true`, `false`, `1`, `0` | boolean values |
| `and`, `or`, `xor`, `not` | boolean operators |
| `==`, `!=`, `<`, `>`, `<=`, `>=` | comparison operators |
| `x > 5 ? 1 : 0` | Ternary operator |

## Functions

| |
| --- |
| `exp(x)`, `pow(x, n)` |
| `sqrt(x)`, `nthRoot(x, n)` | n-th root of x |
| `ln(x)`, `log(x)`, `logbase(x, base)`, `log10(x)`,`log2(x)` |
| `abs(x)`, `ceil(x)`, `floor(x)`, `sign(x)` | 
| `max(x, y)`, `max(x, y, z)`, `min(x, y)`,`min(x, y, z)` |
| `factorial(n)` |
| `cos(x)`, `cot(x)`, `csc(x)`, `sec(x)`, `sin(x)`, `tan(x)` |
| `acos(x)`, `acot(x)`, `acsc(x)`, `asec(x)`, `asin(x)`, `atan(x)`|


## Piecewise function

Return `value1` if `cond1` is true, `value2` if `cond2` is true, and so on. If no conditions are true, return `otherwise` value.

```heta
piecewise(value1, cond1, value2, cond2, ..., otherwise)
```

# Main actions

| | |
|---|---|
| `#insert c1 @Compartment .= 1;` | Insert component into platform |
| `#update c1 {units: liter};` | Update component properties |
| `#upsert c1 @Compartment {units: liter} .= 1;` | Insert or update component depending on `@Class` presence |
| `c1 @Compartment {units: liter} .= 1;` | Same as `#upsert` but shorter syntax |
| `#delete c1;` | Delete component from platform |
| `#include {source: module.xlsx, type: table, sheet: 0};` | Include module into platform, works as `include` statement |
| `#defineUnit uM {units: (1e-6 mole)/liter};` | Define user unit |
| `#defineFunction squares {arguments: [x, y], math: "x^2 + y^2"};` | Define user function |

</div>

<div>

# Switchers

Switcher can update `Record`, `Compartment`, or `Species` if specified in 
`[<switcher id>]=` assignment operator.

```heta
A [sw1]= A + dose1 / comp1;
Bamt [sw2]= Bamt + dose2;
```

## @TimeSwitcher

`TimeSwitcher` manages changes triggered at specific time points.
```heta
sw1 @TimeSwitcher {
    start: 10,
    period: 6,    // default - 0, no repeat
    stop: 10,     // default - 0, no stop
    active: false // default - true
};
```

## @CSwitcher

`CSwitcher` manages changes triggered when negative hits zero towards positive values.
```heta
sw2 @CSwitcher {
    trigger: 5 - x,
    active: false   // default - true
};
```

## @DSwitcher

`DSwitcher` manages changes triggered when conditions are met at solver steps.
```heta
sw1 @DSwitcher {
    trigger: x > 5,
    active: false   // default - true
};
```

# Units

## Units expression

Used in `units` property to describe units of `Const`, `Record`, `Process`, `Compartment`, `Species`, `Reaction`.

| | |
|---|---|
| `second` | simple units expr. |
| `1/liter/second*mole^2` | complex units expr. |
| `(1e-9 mole)^2/(60 second)*metre` | complex units with prefixes |

##  Core Units

| |
| --- |
| mole, litre, second, kilogram, katal, **item**, joule, metre, **dimensionless**, watt, 
volt, ampere, newton, becquerel, candela, coulomb, farad, gram, gray, henry, 
hertz, kelvin, lumen, lux, ohm, pascal, radian, siemens, sievert, steradian,
tesla, weber, year, day, hour, minute, avogadro |

## User-defined units

```heta
#defineUnit uM {
    units: (1e-6 mole)/liter
};
```

</div>
<div>

# Heta modules

## What is a module?

Modules are files that contain model components and can be included in a Heta project.
Every project must include at least one module. Other modules may be included in the main module or in each other.

```
my-project/
  |-- src/
      |-- index.heta
      |-- pk.heta
      |-- doses.heta
      |-- cells.xml
      |-- annotation.xlsx
```

## Types of modules

Modules are included using the `include` statement (or the alternative `#include` action).

| | |
|---|---|
| `include my-module.heta;` | Heta code |
| `include my-module.csv type table;`   | Table (CSV) |
| `include my-module.xlsx type table with { sheet: 0, omitRows: 0 };` | Table (Excel) |
| `include my-module.json type json;`  | JSON |
| `include my-module.yml type yaml;`  | YAML |
| `include my-module.xml type sbml;`    | SBML |

```heta
include my-module.heta;                  // Heta code
include my-module.csv type table;        // Table (CSV)
include my-module.xlsx type table with { // Table (Excel)
    sheet: 0, 
    omitRows: 0
}; 
include my-module.json type json;        // JSON
include my-module.yml type yaml;         // YAML
include my-module.xml type sbml;         // SBML
```

## Table modules

- Same structure as the Heta code, but in a tabular format.
- First line is a header with property names.
- Support various formats: CSV, TSV, Excel, etc.
- use `heta init` to generate template table.

| id | class | actors | assignmnents.ode_ |
|---|---|---|---|
|r1|Reaction|`A => B`|`k1 * A * comp1`|
|r2|Reaction|`B => C`|`k2 * B * comp1`|
|r3|Reaction|`C => A`|`k3 * C * comp1`|

</div>
<div>

# Heta-compiler

## Typical workflow

Heta-compiler works from console: bash, cmd, PowerShell, etc.

1. Install **heta-compiler** and check with `heta -v`.
2. `heta init` — initialize project with default files.
3. Edit **src/index.heta** and add model components.
4. Edit **platform.yml** to set build options and export formats.
5. `heta build` — compile model and export to formats.

## Compile with options

Build options override **platform.yml** settings (if exist) for current build.

| | |
|---|---|
| `heta build -h` | Show build options |
| `heta build --source=src/model.heta` | Compile from file (default: **index.heta**) |
| `heta build --export=SBML,Dot,Simbio` | Export to formats |
| `heta build --units-check` | Check units consistency |

## Export formats

Can be used in `--export` build option or **platform.yml** `export` settings.

| | |
|---|---|
| `SBML` | Systems Biology Markup Language L2/L3 |
| `Simbio` | MATLAB SimBiology format |
| `Mrgsolve` | Model code for the R package **mrgsolve** |
| `DBSolve` | Model format for DBSolve simulation software |
| `Julia` | Julia code for **HetaSimulator.jl** |
| `Matlab` | MATLAB code representation of the model |
| `Table` | Heta table representation of model components (CSV/TSV/Excel) |
| `XLSX` | Spreadsheet representation of the model |
| `JSON` | Heta JSON structured model format |
| `YAML` | Heta YAML structured model format |
| `Dot` | Graphviz Dot file for model structure visualization |
| `Summary` | Human-readable text summary of the model |

Compiled files are written to the **dist/** directory.

## platform.yml

File storing build options and metadata of the project.

```yaml
{
  builderVersion: ^0.10.0,
  id: my-project,
  notes: My project description,
  version: v1.2.0,
  license: MIT,
  options: {
    unitsCheck: true
  },
  importModule: { source: src/index.heta },
  export: [
    { format: JSON, omit: [], useUnitsExpr: false },
    #{ format: YAML, omit: [], useUnitsExpr: false },
    #{ format: DBSolve, powTransform: keep, version: 26 },
    { format: SBML, version: L2V4 },
    { format: Dot },
  ]
}
```

## qsp-units.heta

`heta init` provides pre-defined units, which can be than loaded in **index.heta**. 

```heta
include qsp-units.heta;
```

| |
| --- |
| **UL** (unitless), percent, cell, kcell |
| fmole, pmole, nmole, umole, mmole, fM, pM, nM, uM, mM, M, kM |
| fL, pL, nL, uL, mL, dL, L, fg, pg, ng, ug, mg, g, kg, fm, pm, nm, um, mm, cm, m |
| fs, ps, ns, us, ms, s, h, week |
| kat, cal, kcal |

</div>