echo Usage: ./watch-vue.sh [src] [dst]
webpack --watch --config webpack.config.vue.js --env.src=$1 --env.dst=$2

#webpack --env.file=$1 --watch
