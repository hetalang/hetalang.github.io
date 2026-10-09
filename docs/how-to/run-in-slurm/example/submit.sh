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
