echo Usage: ./watch-terser.sh [src] [dst]
watch "terser-folder $1 -o $2 -e $@" $1
