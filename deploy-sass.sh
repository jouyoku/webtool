echo Usage: ./deploy-sass.sh [src] [dst]
sass --style=compressed --no-source-map $1:$2
