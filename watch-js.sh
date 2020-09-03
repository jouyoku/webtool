echo Usage: ./watch-js.sh [src] [dst]
watch "prettier -w $1; cp -R $1 $2" $1
