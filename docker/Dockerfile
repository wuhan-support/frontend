FROM nginx:latest

RUN mkdir -p /var/www/wuhan-support
RUN rm -f /etc/nginx/conf.d/*
COPY dist /var/www/wuhan-support
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
CMD /bin/bash -c "exec nginx -g 'daemon off;'"
