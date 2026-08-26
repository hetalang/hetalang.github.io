# Build Heta models in Julia

*This guide shows how to create and build Heta projects directly from Julia with the compiler included in HetaSimulator.*

## Why use the compiler from Julia?

HetaSimulator provides Julia functions for the main `heta-compiler` commands. This approach is useful when you already work in Julia because:

- you do not need to install `heta-compiler` as a separate application;
- the compiler and simulator versions stay compatible;
- you can switch compiler versions by changing the HetaSimulator version;
- different projects can use different versions through local Julia environments.

## Set up the project environment

Open Julia in your model directory.

```julia
] add HetaSimulator
using HetaSimulator
```

## Check the compiler version

Run:

```julia
heta_version()
```

This prints the version of `heta-compiler` included in the installed HetaSimulator package. It is the Julia equivalent of:

```bash
heta --version
```

Make sure this version is allowed by the `builderVersion` field in **platform.yml**. See [Manage software versions](/how-to/software-version-management/) for details.

## Create a Heta project

To create a project in the current directory, run:

```julia
heta_init(".")
```

This is equivalent to `heta init`. It creates the project template, including **platform.yml** and **src/index.heta**.

## Build the model

Build the project in the current directory and check the consistency of units:

```julia
heta_build("."; units_check = true)
```

This is equivalent to:

```bash
heta build --units-check
```

## Build with custom options

Arguments passed to `heta_build` can override settings from **platform.yml**. For example, the following build reads an Excel model, checks units, exports SBML and JSON, and writes the results to a custom directory:

```julia
heta_build(
    ".";
    source = "src/table.xlsx",
    type = "xlsx",
    units_check = true,
    export_ = "{format:SBML,version:L3V1},JSON",
    dist_dir = "generated",
    log_mode = "always"
)
```

Use `heta_help("build")` to see the available build options from Julia.

## Manage the installed version

Use Julia's package mode to inspect or change HetaSimulator:

```julia
] status HetaSimulator
```

Shows the installed HetaSimulator version.

```julia
] add HetaSimulator
```

Installs a compatible current release.

```julia
] add HetaSimulator@0.8.3
```

Installs the exact version `0.8.3`.

## Command reference

| Julia | Command line | Purpose |
| --- | --- | --- |
| `heta_version()` | `heta --version` | Show the included compiler version. |
| `heta_init(".")` | `heta init` | Create a project template. |
| `heta_build(".")` | `heta build` | Build and export a project. |
| `heta_help("build")` | `heta help build` | Show build options. |

For every supported argument, see the [Heta compiler functions](https://hetalang.github.io/HetaImporter.jl/dev/api/#Heta-Compiler-CLI) and the [command-line reference](https://hetalang.github.io/hetacompiler/cli-references.html).
