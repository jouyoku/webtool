echo Usage: ./deploy-prettier.sh [src] [dst]
prettier -w $1;cp -R $1 $2
