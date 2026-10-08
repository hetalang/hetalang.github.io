# Generate the article image from the reader's example.
comparison = include(joinpath(@__DIR__, "run.jl"))
plot!(comparison;
    size = (800, 380), margin = 5 * Plots.mm, titlefontsize = 12,
    xlabel = "Time", ylabel = "Concentration"
)

output_dir = joinpath(@__DIR__, "..", "img")
mkpath(output_dir)
savefig(comparison, joinpath(output_dir, "multiple-models.png"))

println("Loaded models: ", collect(keys(models(platform))))
println("Saved multiple-models.png")
