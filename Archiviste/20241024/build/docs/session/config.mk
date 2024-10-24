# config.mk - Configuration et installation

npm-install:
	@echo "Installation des dépendances..."
	@npm install

python-install:
	@echo "Installation des dépendances Python..."
	@pip install -r requirements.txt
