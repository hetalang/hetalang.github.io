using HetaSimulator, Plots

platform = load_platform(@__DIR__)
model = models(platform)[:nameless]
scenario = Scenario(model, (0., 1e4); observables = [:m3, :m2_type1, :m2_type2, :m2_type3])
sim(scenario; abstol = 1e-9) |> plot
