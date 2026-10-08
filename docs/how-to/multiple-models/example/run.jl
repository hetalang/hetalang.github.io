using HetaSimulator, Plots

platform = load_platform(@__DIR__)
conversion = models(platform)[:conversion]
elimination = models(platform)[:elimination]

results1 = Scenario(conversion, (0., 3000.); observables = [:s1, :s2]) |> sim
results2 = Scenario(elimination, (0., 3000.); observables = [:s1]) |> sim

plot(
    plot(results1; title = "Conversion"),
    plot(results2; title = "Elimination");
    layout = (1, 2), ylims = (0, 20)
)
