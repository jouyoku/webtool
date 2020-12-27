echo Usage: ./deploy-pug.sh [src] [dst]
pug -P -E php $1 -o $2
