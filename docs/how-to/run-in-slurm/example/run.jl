using HetaSimulator, CSV, DataFrames
using Distributed, SlurmClusterManager

platform = load_platform(@__DIR__)
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
