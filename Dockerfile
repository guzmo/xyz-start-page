# Use the standard nodejs image as a base
FROM dockerfile/nodejs

ADD . /app
# Install production dependencies.
RUN cd /app && npm install --production

# Set working directory for the app:
WORKDIR /app

# Expose the correct port for your app. This will be picked up by "Katalog" who
# will make sure Nginx redirects to this port.
EXPOSE 9000

CMD node /app/server/server.js
