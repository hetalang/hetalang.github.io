using HetaSimulator, Plots

platform = load_platform(@__DIR__)
model = models(platform)[:nameless]
Scenario(model, (0., 600.)) |> sim |> plot
