# Generate the article image from the reader's simulation code.
blood_plot = include(joinpath(@__DIR__, "run.jl"))
plot!(blood_plot;
    size = (750, 380), margin = 5 * Plots.mm,
    title = "Blood and intracellular species", titlefontsize = 12,
    xlabel = "Time", ylabel = "Concentration"
)

output_dir = joinpath(@__DIR__, "..", "img")
mkpath(output_dir)
savefig(blood_plot, joinpath(output_dir, "blood-pool.png"))
println("Loaded models: ", collect(keys(models(platform))))
println("Saved blood-pool.png")
