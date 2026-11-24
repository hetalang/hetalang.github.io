# Run from the article directory, this model directory, or the repository root.
# The original BioModels SBML is used unchanged, with its supplied initial values.
library(DynMSR)
library(mrgsolve)

model_dirs <- c('code/ribba2012', '.', 'content/sbml-models-in-r/code/ribba2012')
model_dirs <- model_dirs[file.exists(file.path(model_dirs, 'BIOMD0000000521_url.xml'))]
if (!length(model_dirs)) stop('Run from the article, model, or repository directory.')
model_dir <- normalizePath(model_dirs[[1]], winslash = '/')
img_dir <- normalizePath(file.path(model_dir, '../../img'), winslash = '/')
results_dir <- file.path(model_dir, 'results')
dir.create(results_dir, showWarnings = FALSE)

# Heta exports and C++ compilation use temporary files on the local disk.
platform <- sbml_load(file.path(model_dir, 'BIOMD0000000521_url.xml'), skip_updates = TRUE)
model <- get_model(platform, 1)
mrgs_model <- build_mrgsolve(model, observables = c('C', 'P', 'Q', 'Qp', 'Pstar'))
sim1 <- mrgsim(mrgs_model, end = 100, delta = 0.1)
trajectory <- as.data.frame(sim1)[, c('time', 'C', 'P', 'Q', 'Qp', 'Pstar')]
write.csv(trajectory, file.path(results_dir, 'baseline.csv'), row.names = FALSE)

draw_baseline <- function() {
  par(mar = c(4.5, 4.7, 3.5, 1), las = 1)
  plot(trajectory$time, trajectory$Pstar, type = 'l', lwd = 2.5,
       col = '#1769AA', xlim = c(0, 100), ylim = c(20, 120),
       xlab = 'Time (months)', ylab = 'Mean tumour diameter (mm)',
       main = 'Ribba2012: original BioModels model')
  grid(col = '#E8E8E8')
  lines(trajectory$time, trajectory$Pstar, col = '#1769AA', lwd = 2.5)
}
png(file.path(img_dir, 'ribba2012-baseline.png'), width = 1200, height = 800, res = 150)
draw_baseline()
invisible(dev.off())
if (interactive()) draw_baseline()

# Check numerical convergence separately from raster-reference agreement.
tight <- as.data.frame(mrgsim(mrgs_model, end = 100, delta = 0.1,
                             rtol = 1e-11, atol = 1e-13))
variables <- c('C', 'P', 'Q', 'Qp', 'Pstar')
convergence <- data.frame(
  variable = variables,
  max_abs_difference = vapply(variables, function(v) max(abs(trajectory[[v]] - tight[[v]])), numeric(1))
)
write.csv(convergence, file.path(results_dir, 'solver-convergence.csv'), row.names = FALSE)

# The reference contains pixels, not a time grid or exact numerical values.
# Read the supplied digitization; rerun digitize-reference.py only if needed.
reference <- read.csv(file.path(model_dir, 'reference-digitized.csv'))
reference$simulated_mm <- approx(trajectory$time, trajectory$Pstar,
                               xout = reference$time_months)$y
reference$residual_mm <- reference$simulated_mm - reference$Pstar_mm
write.csv(reference, file.path(results_dir, 'reference-comparison.csv'), row.names = FALSE)

png(file.path(img_dir, 'ribba2012-reference-comparison.png'),
    width = 1200, height = 1000, res = 150)
par(mfrow = c(2, 1), mar = c(4, 4.7, 2.8, 1), las = 1)
plot(trajectory$time, trajectory$Pstar, type = 'l', lwd = 2.5,
     col = '#1769AA', xlim = c(0, 100), ylim = c(20, 120),
     xlab = 'Time (months)', ylab = 'Mean tumour diameter (mm)',
     main = 'DynMSR / mrgsolve vs BioModels curation curve')
points(reference$time_months, reference$Pstar_mm, col = '#E58B23', pch = 1, cex = 0.5)
legend('topleft', c('DynMSR / mrgsolve', 'Digitized BioModels PNG'),
       col = c('#1769AA', '#E58B23'), lty = c(1, NA), pch = c(NA, 1), bty = 'n')
plot(reference$time_months, reference$residual_mm, type = 'l', col = '#1769AA',
     xlab = 'Time (months)', ylab = 'Simulation - raster (mm)',
     main = 'Residuals include pixel and axis-calibration uncertainty')
abline(h = 0, lty = 2, col = 'grey50')
invisible(dev.off())

summary_lines <- c(
  paste('Run date:', Sys.Date()),
  paste('R:', getRversion()),
  paste('DynMSR:', packageVersion('DynMSR')),
  paste('mrgsolve:', packageVersion('mrgsolve')),
  paste('Heta Compiler:', paste(system2('heta', '--version', stdout = TRUE), collapse = ' ')),
  'Source: unchanged BIOMD0000000521_url.xml; supplied parameters; no additional doses.',
  paste('Baseline solver rtol:', mrgs_model@rtol, 'atol:', mrgs_model@atol),
  'Tighter solver: rtol=1e-11; atol=1e-13; output step=0.1 months; end=100 months.',
  sprintf('Initial Pstar: %.6f mm', trajectory$Pstar[1]),
  sprintf('Minimum Pstar: %.6f mm at %.1f months (output grid)',
          min(trajectory$Pstar), trajectory$time[which.min(trajectory$Pstar)]),
  sprintf('Final Pstar: %.6f mm', tail(trajectory$Pstar, 1)),
  sprintf('Raster reference points: %d', nrow(reference)),
  sprintf('Raster reference RMSE: %.6f mm', sqrt(mean(reference$residual_mm^2))),
  sprintf('Raster reference maximum absolute residual: %.6f mm', max(abs(reference$residual_mm))),
  sprintf('Vertical calibration: %.6f mm/pixel', 100 / 316),
  'This compares a BioModels curation image, not original patient data or full-paper reproduction.'
)
writeLines(summary_lines, file.path(results_dir, 'summary.txt'))
writeLines(capture.output(sessionInfo()), file.path(results_dir, 'sessionInfo.txt'))
cat(paste(summary_lines, collapse = '\n'), '\n')
