# Run SLURM with HetaSimulator

*This guide shows how to run 120 Monte Carlo simulations across SLURM workers and save the results to CSV.*

## 0. Get access to the cluster

You will usually need SSH access to the cluster's login node. Contact the cluster administrator or the team providing access to obtain an account and connection instructions.

Connect to the cluster and run the following shell commands there.

## 1. Make Julia available

Ask the administrator which Julia version is installed and how to start it on the login and compute nodes. On a cluster using environment modules, loading Julia may look like this:

```bash
module load julia/1.11.5
```

This is an example: the module name and version may differ, or Julia may already be available without loading a module. Use the setup recommended for your cluster, including in **submit.sh** below.

## 2. Install the packages

Package installation also depends on the cluster. Packages may be preinstalled, provided through a shared environment, or installed in your own Julia environment. Ask the administrator where and how to install them so they are available on all compute nodes used by the job.

If you can install packages yourself, one option is to run this after making Julia available:

```bash
julia -e 'using Pkg; Pkg.add(["HetaSimulator", "SlurmClusterManager", "CSV", "DataFrames"])'
```

Do this once before submitting the job. The main process and all workers must use compatible Julia and package environments.

## 3. Prepare the model

Place these files in a shared directory accessible from all allocated nodes:

```text
run-in-slurm/
├── index.heta     # model
├── run.jl         # distributed Monte Carlo simulations
└── submit.sh      # SLURM batch script
```

Create **index.heta**:

```heta
/* Conversion and reversible binding in two compartments. */
comp1 @Compartment .= 1.1;
comp2 @Compartment .= 2.2;

a @Species { compartment: comp1, output: true } .= 10;
b @Species { compartment: comp1, output: true } .= 0;
c @Species { compartment: comp1, output: true } .= 1;
d @Species { compartment: comp2 } .= 0;

r1 @Reaction { actors: a => b } := k1 * a;
r2 @Reaction { actors: b + c <=> d } := k2 * b * c - k3 * d;

k1 @Const = 1e-3;
k2 @Const = 1e-4;
k3 @Const = 2.2e-2;

/* Add to a at time 50. */
sw1 @TimeSwitcher { start: 50 };
a [sw1]= a + 1;
```

## 4. Prepare the Julia script

Create **run.jl**:

```julia
using HetaSimulator, CSV, DataFrames
using Distributed, SlurmClusterManager

platform = load_platform(".")
model = models(platform)[:nameless]
scenario = Scenario(model, (0., 200.))

addprocs(SlurmManager())
@everywhere using HetaSimulator

result = mc(
    scenario,
    [:k2 => Normal(1e-3, 1e-4), :k3 => Normal(1e-4, 1e-5)],
    120;
    parallel_type = EnsembleDistributed(), verbose = true
)
CSV.write(joinpath(@__DIR__, "out.csv"), DataFrame(result))
```

[`SlurmManager()`](https://github.com/JuliaParallel/SlurmClusterManager.jl#usage) starts Julia workers using the resources allocated by SLURM. `@everywhere` loads HetaSimulator on those workers, and `EnsembleDistributed()` distributes the 120 simulations between them. Each simulation samples `k2` and `k3` from the specified normal distributions; the main process saves the results to **out.csv**.

## 5. Prepare the batch script

Create **submit.sh**:

```bash
#!/bin/bash
#SBATCH --job-name=heta-mc
#SBATCH --output=heta-mc.%j.out
#SBATCH --error=heta-mc.%j.err
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=4
#SBATCH --cpus-per-task=1

set -e
cd "$SLURM_SUBMIT_DIR"

# Example: adapt or remove this line for your cluster.
module load julia/1.11.5
julia run.jl
```

Save **submit.sh** with Unix (LF) line endings. This example requests two nodes with four tasks per node and one CPU per task.

Adjust the Julia setup from step 1 and add any partition, account, time, or memory settings required by your administrator.

## 6. Submit the job

From the directory containing **submit.sh** and **run.jl**, submit the job:

```bash
sbatch submit.sh
```

SLURM returns a job ID. The job may wait in the queue before resources become available. Run the following command periodically and find your job in the output:

```bash
squeue
```

`PD` means pending; `R` means running. Submit **submit.sh** rather than running **run.jl** directly on the login node.

## 7. Collect the results

When the job leaves the queue, check **heta-mc.JOB_ID.out** for progress and **heta-mc.JOB_ID.err** for errors, replacing `JOB_ID` with the returned number. Leaving the queue does not by itself mean the job succeeded.

After successful completion, **out.csv** appears next to **run.jl**. It contains the simulation identifiers, time points, and output values for the Monte Carlo runs. Copy it back for analysis or plotting; no interactive plotting is needed on the compute nodes.
