library(DynMSR)
#heta_check() # to check heta installation
library(mrgsolve)

# compile SBML as platform, get the model, and build for mrgsolve
platform <- sbml_load("ribba2012/BIOMD0000000521_url.xml")
model <- get_model(platform, 1)
mrgs_model <- build_mrgsolve(model, observables = "Pstar")

# simulate and plot results
sim1 <- mrgsim(mrgs_model, end = 100, delta = 0.1)
plot(sim1, Pstar ~ time, ylim = c(20, 120),
     xlab = "Time (months)", ylab = "Mean tumour diameter (mm)")
