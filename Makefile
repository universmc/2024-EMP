# Cibles

all: mkB js

mkB:
	@bash build.sh

js:
	@node gdev.js

clean-r:
	@rm -rf data/* models/* build/* src/*
clean-R:
	@rm -rf data/ models/ build/ src/
clean: clean-r clean-R