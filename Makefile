# Define variables
NODE_ENV = development
NODE_PORT = 5144
NODE_APP = index.js

menu :
	@echo "welcom to Prison de la Bastille, https://boutique.elysee.fr"."
	@echo""
	@echo"╔═════════════════════════════════════╗     ╔═════════════════════════════════════════════════════════════════════╗"
	@echo"╠═══════════-- 🤖 adoPi --════════════╣     ║  [💫] [🏛] [🤗] [💬] [📚] [💻] [📱] [🏦] [📡]<               >[🛰]║"
	@echo"║                                     ║     ╠═════════════════════════════════════════════════════════════════════╣"
	@echo"║                                     ║     ║                                                                     ║"
	@echo"║                                     ║     ║                                                                     ║"
	@echo"║                                     ║     ║                                                                     ║"
	@echo"║                                     ║     ║                                                                     ║"
	@echo"║                                     ║     ║                                                                     ║"
	@echo"║                                     ║     ║                                                                     ║"
	@echo"║                                     ║     ║                                                                     ║"
	@echo"║                                     ║     ║                                                                     ║"
	@echo"║                                     ║     ║                                                                     ║"
	@echo"║                                     ║     ║                                                                     ║"
	@echo"║                                     ║     ║                                                                     ║"
	@echo"║                                     ║     ║                                                                     ║"
	@echo"║                                     ║     ║                                                                     ║"
	@echo"║                                     ║     ║                                                                     ║"
	@echo"║                                     ║     ║                                                                     ║"
	@echo"║                                     ║     ║                                                                     ║"
	@echo"║                                     ║     ║                                                                     ║"
	@echo"║                                     ║     ║                                                                     ║"
	@echo"║                                     ║     ║                                                                     ║"
	@echo"╠═════════════════════════════════════╣     ╠═════════════════════════════════════════════════════════════════════╣"
	@echo"║(PS1)                                ║     ║[PS2]:/<                                                          /%>║"
	@echo"╚═════════════════════════════════════╝     ╚═════════════════════════════════════════════════════════════════════╝"	
	@echo""

MAGIC_TARGETS := codex build rep file script clean

dev:

all: $(MAGIC_TARGETS)
# Magic COMPILER groq quantum


update:
	@echo "✨ Mise en état du dossier de l'enquête sur les partie Politique de la Macronnie ✨"
	@git add .
	@git commit -m "test"
	@git push


codex:
	@echo "Quantum Universe reveal a story to be told"
	@node data/welcom-umc.js

build: buildHtml buildCss buildJS buildJson
# Fabrication de la magie
buildHtml:
	@echo "Crafting web's fabric with quantum threads so bold"
	@node models/worksJS-html.js

buildCss:
	@echo "Shaping beauty with qubits in every fold"
	@node models/modelcss.js

buildJS:
	@echo "Weaving the logic with quantum entanglements we behold"@node javascript.js
	@node "data/knowledge.js"

buildJson:
	@echo "Encoding knowledge in cosmic structures, truths to uphold"
	@node src/wirefram.js
rep:
	@echo "Perceiving the quantum realm's Cosmic ia Consciencius World && vast landscape"
	@vim -a build/build.sh &&
	@vim -wq

file:
	@echo "Revealing hidden X11 dimensions, secrets to escape"
	@bash src/sh/build.sh && 
	@touch build/files.sh

script:
	@echo "Unleashing quantum Magic Mafile with every script we shape"
	@bash src/sh/build.sh && 
	@touch build/files.sh

server:
	@node srv/Telegram/server.js
	@echo "Unleashing quantum Magic Mafile with every script we shape" 
# Ouvrez-vous aux dimensions cachées
clean-r:
	@echo "Returning the quantum realm to pristine state"
	@rm -rf data/* build/* src/* data/*

clean-R:
	@echo "Unweaving the fabric, a celestial fate"@rm -rf output/ build/ src/ data/

clean: clean-r clean-R
