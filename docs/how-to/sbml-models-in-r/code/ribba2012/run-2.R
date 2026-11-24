# Run from content/sbml-models-in-r/code.
library(DynMSR)
library(mrgsolve)

# Load and compile once.
mrgs_model <- heta_load('ribba2012') |>
  get_model(1) |>
  build_mrgsolve(observables = c('C', 'Pstar'))

# One cycle: periodic event off.
single <- param(mrgs_model, repeat_cycle__active__ = 0) |>
  mrgsim_df(end = 100, delta = 0.1)
# Six cycles: periodic event on.
repeated <- param(mrgs_model, repeat_cycle__active__ = 1) |>
  mrgsim_df(end = 100, delta = 0.1)

# Compare exposure and tumour response.
comparison <- rbind(
  transform(single, scenario = 'One cycle'),
  transform(repeated, scenario = 'Six cycles')
)
plot_sims(comparison, C, Pstar, .dots = list(
  groups = comparison$scenario,
  layout = c(1, 2),
  xlab = 'Time (months)',
  auto.key = list(space = 'top', lines = TRUE, points = FALSE)
))

