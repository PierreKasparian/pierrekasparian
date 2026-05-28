#!/bin/bash

# Activation de l'environnement virtuel
source .venv/bin/activate

# Récupère le premier paramètre ($1) passé au script. 
# S'il est vide, on assigne la valeur 7 par défaut.
DAYS=${1:-7}

# Lancement du script Python avec le paramètre
python3 tldr_aggregator.py --days "$DAYS"