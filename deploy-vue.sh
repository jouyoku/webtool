echo Usage: ./deploy-vue.sh [src] [dst]
webpack --config webpack.config.vue.js --env.src=$1 --env.dst=$2
