#!/bin/bash

# Script para crear estructura de proyecto (context, lib, app)

set -e

if [ $# -ne 2 ]; then
    echo "Uso: $0 <tipo: context|lib|app> <nombre>"
    exit 1
fi

TIPO=$1
NOMBRE=$2

if [[ "$TIPO" != "context" && "$TIPO" != "lib" && "$TIPO" != "app" ]]; then
    echo "Tipo inválido. Debe ser 'context', 'lib' o 'app'."
    exit 1
fi

FOLDER="${TIPO}s" # context -> contexts, lib -> libs, app -> apps
DIR="./${FOLDER}/${NOMBRE}"

if [ -d "$DIR" ]; then
    echo "La carpeta $DIR ya existe."
    exit 1
fi

mkdir -p "$DIR/src"

# package.json
cat > "$DIR/package.json" <<EOF
{
    "name": "$NOMBRE",
    "version": "1.0.0",
    "main": "dist/index.js",
    "types": "dist/index.d.ts",
    "scripts": {
        "build": "tsc"
    }
}
EOF

# tsconfig.json
cat > "$DIR/tsconfig.json" <<EOF
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist"
  },
 "include": ["src"]
}
EOF

# src/index.ts
echo "// $TIPO $NOMBRE" > "$DIR/src/index.ts"
echo "console.log('[$FOLDER/$NOMBRE] módulo creado')" >> "$DIR/src/index.ts"


echo "Estructura creada en $DIR"