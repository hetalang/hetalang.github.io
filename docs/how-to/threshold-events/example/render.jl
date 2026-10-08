# Run the reader's example and save the article plot.
threshold_plot = include(joinpath(@__DIR__, "run.jl"))
plot!(threshold_plot;
    size = (750, 380), margin = 5 * Plots.mm,
    title = "Response to a threshold crossing", titlefontsize = 12,
    xlabel = "Time", ylabel = "Concentration / response"
)
hline!(threshold_plot, [3.]; label = "threshold", linestyle = :dash, color = :gray)

# Check the crossing time against B(t) = 10 * (1 - exp(-0.01 * t)).
result = sim(Scenario(model, (0., 120.)); abstol = 1e-10, reltol = 1e-8)
event_index = findfirst(>(0.5), result[:response, :])
@assert !isnothing(event_index)
event_time = times(result)[event_index]
@assert isapprox(event_time, -log(0.7) / 1e-2; atol = 1e-4)
@assert last(result[:response, :]) == 1
println("Threshold crossing verified at t = ", event_time)

# Test both atStart settings with B already above the threshold.
source = read(joinpath(@__DIR__, "index.heta"), String)
initial_results = Dict{Bool, Any}()
for at_start in (false, true)
    mktempdir() do test_dir
        test_source = replace(source,
            "B @Species { compartment: cell, output: true } .= 0;" =>
                "B @Species { compartment: cell, output: true } .= 5;",
            "atStart: false" => "atStart: $at_start")
        write(joinpath(test_dir, "index.heta"), test_source)
        test_model = models(load_platform(test_dir))[:nameless]
        # Loading inside this callback defines new model methods.
        test_scenario = Base.invokelatest(Scenario, test_model, (0., 120.))
        test_result = Base.invokelatest(sim, test_scenario)
        @assert last(test_result[:response, :]) == (at_start ? 1. : 0.)
        if at_start
            first_active = findfirst(>(0.5), test_result[:response, :])
            @assert times(test_result)[first_active] == 0.
        else
            @assert all(iszero, test_result[:response, :])
        end
        initial_results[at_start] = test_result
        println("Verified B(0) = 5 with atStart = ", at_start)
    end
end

output_dir = joinpath(@__DIR__, "..", "img")
mkpath(output_dir)
savefig(threshold_plot, joinpath(output_dir, "threshold-event.png"))
println("Saved threshold-event.png")

# The concentration is identical in both runs; only the response differs.
initial_false = initial_results[false]
initial_true = initial_results[true]
concentration_plot = plot(times(initial_false), initial_false[:B, :];
    label = "B (both settings)", ylabel = "Concentration",
    title = "B starts above the threshold", titlefontsize = 12, linewidth = 2
)
hline!(concentration_plot, [3.]; label = "threshold", linestyle = :dash, color = :gray)
response_plot = plot(times(initial_false), initial_false[:response, :];
    label = "atStart: false", ylabel = "Response", xlabel = "Time",
    linewidth = 2, color = :blue, ylims = (-0.15, 1.2), yticks = [0, 1],
    legend = :right
)
plot!(response_plot, times(initial_true), initial_true[:response, :];
    label = "atStart: true", linewidth = 2, color = :orangered
)
initial_plot = plot(concentration_plot, response_plot;
    layout = (2, 1), size = (750, 520), margin = 5 * Plots.mm,
    xlims = (-2, 120), xticks = 0:20:120, link = :x
)
savefig(initial_plot, joinpath(output_dir, "initial-state.png"))
println("Saved initial-state.png")
