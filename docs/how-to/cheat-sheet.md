---
layout: cheat-sheet
---

<div><!-- This is for 3 column layout -->

# What is Heta?

[Heta](/) is an open-source modeling language and toolchain designed for building, organizing, and transforming quantitative models used in systems pharmacology, systems biology, and related fields.

The Heta ecosystem currently consists of three main components:
- **Heta language** — a domain-specific language for describing models.
- **Heta compiler** — a tool for compiling and converting models to other formats.
- **HetaSimulator.jl** — a simulation framework based on Julia for running and analyzing models.

# Model example

```heta
/* Simple model with two species A and B, 
one reaction r1, and a time event sw1 */
comp1 @Compartment .= 1;

A @Species { compartment: comp1 } .= 10;
B @Species { compartment: comp1 } .= 0;
r1 @Reaction { actors: A => 2B } := k1 * A * comp1;

k1 @Const = 1.2e-1;

sw1 @TimeSwitcher { start: 10, period: 5 };
A [sw1]= A + 5.1/comp1;
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
    units: 1/second,
    output: true     // default - false
} := x * y;
```

## Process

`Process` describes income and outcome of records. Inherits from `Record`.
```heta
p1 @Process {
    actors: in => out,
    units: 1/second,
    output: true     // default - false
} := k1 * in;
```

## Compartment

`Compartment` describes physical volumes. Inherits from `Record`.
```heta
comp1 @Compartment {
    units: liter,
    output: true     // default - false
} .= 1;
```

## Species

`Species` describes concentrations or amounts of substances. Inherits from `Record`.
```heta
A @Species {
    compartment: comp1,
    units: mole,
    isAmount: true,     // default - false
    output: true        // default - false
} .= 10;
```

## Reaction
`Reaction` describes chemical reactions. Inherits from `Process`.
```heta
r1 @Reaction {
    actors: A <=> 2B,
    units: mole/second,
    reversible: true,
    modifiers: [C, D],  // default - []
    output: true        // default - false
} := k1 * A * C * D * comp1;
```

</div>
<div>

# Mathematic expressions

Math expression can be used in `Record`, `Process`, `Compartment`, `Species`, `Reaction` **assignment** and `Switcher` **trigger** properties.

## Assignments

| | |
|---|---|
| `=` | assign number, for `Const`, numbers only |
| `:=` | expression assignment, calculate value at each time step (rule type), for `Record`, `Process`, `Compartment`, `Species`, `Reaction` |
| `.=` | expression assignment, calculate value at time 0 only, for `Record`, `Compartment`, `Species` |
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
| `#update c1 { units: liter };` | Update component properties |
| `#upsert c1 @Compartment { units: liter } .= 1;` | Insert or update component depending on `@Class` presence |
| `c1 @Compartment { units: liter } .= 1;` | Insert or update component depending on `@Class` presence, shorter syntax |
| `#delete c1;` | Delete component from platform |
| `#include { source: ./my-module.heta };` | Include module into platform |
| `#defineUnit uM { units: (1e-6 mole)/liter };` | Define user unit |
| `#defineFunction squares { arguments: [x, y], math: "x^2 + y^2" };` | Define user function |

# Modules

Modules are files which can be included in platform with `#include` action. The source file must be formatted in Heta-compatible format.

| | |
|---|---|
| `#include { source: ./my-module.heta };` | Heta module |
| `#include { source: ./my-module.csv, type: table };`   | Table module |
| `#include { source: ./my-module.xlsx, type: table, sheet: 0, omitRows: 0 };` | Table module |
| `#include { source: ./my-module.json, type: json };`  | JSON module |
| `#include { source: ./my-module.yml, type: yaml };`  | YAML module |
| `#include { source: ./my-module.xml, type: sbml };`    | SBML module |

</div>

<div>

# Switchers

Switcher in Heta is a component that manages descrete events at simulation time. To update values of `Record`, `Compartment`, `Species` when switcher is active, use `[<switcher id>]=` assignment operator.

```heta
A_amt [dosage_1]= A_amt + dose1;
A_amt [dosage_2]= A_amt + dose2;
```

## @TimeSwitcher

`TimeSwitcher` manages changes triggered at specific time points.
```heta
sw1 @TimeSwitcher {
    start: 10,
    period: 6,    // default - 0
    stop: 10,     // default - 0
    active: false // default - true
};
```

## @CSwitcher

`CSwitcher` manages changes triggered when negative hits zero towards positive values.
```heta
sw1 @CSwitcher {
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

##  Core Units

| |
| --- |
| mole, litre, second, kilogram, katal, **item**, joule, metre, **dimensionless**, watt, 
volt, ampere, newton, becquerel, candela, coulomb, farad, gram, gray, henry, 
hertz, kelvin, lumen, lux, ohm, pascal, radian, siemens, sievert, steradian,
tesla, weber, year, day, hour, minute, avogadro |

## Units expression

Used in `units` property to describe units of `Const`, `Record`, `Process`, `Compartment`, `Species`, `Reaction`.

| | |
|---|---|
| `second` | simple units expr. |
| `1/liter/second*mole^2` | complex units expr. |
| `(1e-9 mole)` | units with prefixes |
| `(1e-9 mole)^2/(60 second)*metre` | complex units with prefixes |

## User-defined units

```heta
#difineUnit uM {
    units: (1e-6 mole)/liter
};
```

</div>

<div>

# Heta-compiler

## qsp-units.heta

**heta-compiler** `init` provides pre-defined units, which can be included in platform as:
```heta
#include { source: ./qsp-units.heta };
```

| |
| --- |
| UL, percent, cell, kcell |
| fmole, pmole, nmole, umole, mmole, fM, pM, nM, uM, mM, M, kM |
| fL, pL, nL, uL, mL, dL, L, fg, pg, ng, ug, mg, g, kg, fm, pm, nm, um, mm, cm, m |
| fs, ps, ns, us, ms, s, h, week |
| kat, cal, kcal |

</div>