echo Usage: ./watch-pug.sh [src] [dst]
pug -w -P -E php $1 -o $2
