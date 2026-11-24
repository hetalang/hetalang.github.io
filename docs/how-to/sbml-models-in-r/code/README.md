# Article code

The article uses the Ribba2012 glioma model from BioModels (BIOMD0000000521). All model files and scripts are in `ribba2012/`; article images are in `../img/`.

Run the article scripts from `content/sbml-models-in-r`:

- `ribba2012/run-1.R`: short baseline simulation of the original SBML.
- `ribba2012/index.heta`: original SBML plus additive treatment cycles at months 2, 4, 6, 8, and 10.
- `ribba2012/run-2.R`: comparison of one cycle with six cycles, including the initial exposure.
- `ribba2012/run-0.R`: reference-image comparison, numerical convergence checks, and baseline evidence.

See [the model README](ribba2012/README.md) for source provenance, execution details, and documented differences between the BioModels version and the original publication.