---
layout: cheat-sheet
---

# What is Heta?

[Heta](/) is an open-source modeling language and toolchain designed for building, organizing, and transforming quantitative models used in systems pharmacology, systems biology, and related fields.

A Heta model describes the structure of a dynamical system in a compact, human-readable form. The Heta compiler translates these models into multiple formats used in scientific computing and modeling environments.

Heta is designed to help modelers:
- write models in a clear and modular way
- reuse model components across projects
- convert models between different tools and ecosystems
- integrate models with simulation workflows and analysis tools

The Heta ecosystem currently consists of three main components:

- **Heta language** — a domain-specific language for describing models.

- **Heta compiler** — a tool for compiling and converting models to other formats.

- **HetaSimulator.jl** — a simulation framework based on Julia for running and analyzing models.

Together these components form a flexible workflow for developing and working with quantitative models.

Heta was created in 2017.

# Minimal model example

```heta
comp1 @Compartment .= 1;

A @Species { compartment: comp1 } .= 10;
B @Species { compartment: comp1 } .= 0;
r1 @Reaction { actors: A => 2B } := k1 * A * comp1;

k1 @Const = 1.2e-1;

sw1 @TimeSwitcher { start: 10, period: 5 };
A [sw1]= A + 1.1;
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

`Process` describes processes which change the system
```heta
p1 @Process {
    actors: in => out,
    units: 1/second,
    output: true     // default - false
} := k1 * in;
```

## Compartment

`Compartment` describes physical spaces. Inherits from `Record`.
```heta
comp1 @Compartment {
    units: liter,
    output: true     // default - false
} .= 1;
```

## Species
`Species` describes chemical species. Inherits from `Record`.
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
} := k1 * A * comp1;
```

# Switchers

## @TimeSwitcher

`TimeSwitcher` describes changes at specific time points
```heta
sw1 @TimeSwitcher {
    start: 10,
    period: 6,    // default - 0
    stop: 10,     // default - 0
    active: false // default - true
};
```

## @CSwitcher

`CSwitcher` manages changes triggered by exact conditions when negative hits zero towards positive values
```heta
sw1 @CSwitcher {
    trigger: 5 - x,
    active: false   // default - true
};
```

## @DSwitcher

`DSwitcher` manages changes triggered when conditions are met at solver steps
```heta
sw1 @DSwitcher {
    trigger: x > 5,
    active: false   // default - true
};
```

# Units

## Units expression

| | |
|---|---|
| `second` | simple units |
| `1/second` | unit expressions |
| `liter/second` | complex units |
| `liter/second^2` | complex unit expressions |
| `(1e-9 mole)` | units with prefixes |
| `(1e-9 mole)^2/(60 second)` | complex units with prefixes |

##  Core Units

| |
| --- |
| mole, litre, second, kilogram, katal, item, joule, metre, dimensionless, watt, 
volt, ampere, newton, becquerel, candela, coulomb, farad, gram, gray, henry, 
hertz, kelvin, lumen, lux, ohm, pascal, radian, siemens, sievert, steradian,
tesla, weber, year, day, hour, minute, avogadro |

# Mathematic expressions

Math expression can be used in `Record`, `Process`, `Compartment`, `Species`, `Reaction` **assignment** and switcher **trigger**.

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
| `x > 5 ? 1 : 0` | Ternary operator |
| `true`, `false`, `1`, `0` | boolean values |
| `and`, `or`, `xor`, `not` | boolean operators |
| `==`, `!=`, `<`, `>`, `<=`, `>=` | comparison operators |

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


## Piecewise functions

```heta
piecewise(value1, cond1, value2, cond2, ..., otherwise)
```
