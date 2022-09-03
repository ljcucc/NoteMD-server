# NoteMD server

1. Create a file called `.env`, setup these value:

for example: 
```
AUTH_KEY=my_key_is_awesome
CROS_WHITELIST=https://notes.ljcu.cc
```

* AUTH_KEY is your secert key of your JWT
* CROS_WHITELIST is the white list of domain that can access to this note server.

2. Run the server by using: 

```bash
npm start
```

3. copy the jwt auth token from terminal (or console) output to https://notes.ljcu.cc settings, make sure you're already selected the "md-server" storage-strategy option. 

> mention that the JWT (JsonWebToken) is the access key to your server, keep it safe somewhere to keep your data safety.

4. reload the https://notes.ljuc.cc to apply changes, which should show a new folder call "server" at the drawer UI.