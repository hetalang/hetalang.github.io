using HetaSimulator, Plots

platform = load_platform(@__DIR__)
m0 = models(platform)[:nameless]
m1 = models(platform)[:variant1]
m2 = models(platform)[:variant2]

results0 = Scenario(m0, (0., 3000.); observables = [:s1, :s2]) |> sim
results1 = Scenario(m1, (0., 3000.); observables = [:s1, :s2]) |> sim
results2 = Scenario(m2, (0., 3000.); observables = [:s1, :s2, :s3]) |> sim

#=
plot(
    plot(results0; title = "Base model"),
    plot(results1; title = "Different kinetics"),
    plot(results2; title = "Additional species");
    layout = (1, 3), ylims = (0, 20)
)
=#

comparison = plot(
    plot(results0; title = "Base model"),
    plot(results1; title = "Different kinetics"),
    plot(results2; title = "Additional species");
    layout = (1, 3), size = (1050, 380),
    margin = 5 * Plots.mm, titlefontsize = 12, ylims = (0, 20),
    xlabel = "Time", ylabel = "Concentration"
)

output_dir = joinpath(@__DIR__, "..", "img")
mkpath(output_dir)
savefig(comparison, joinpath(output_dir, "model-variants.png"))

@assert Set(keys(models(platform))) == Set([:nameless, :variant1, :variant2])
println("Simulated all three models and saved model-variants.png")
