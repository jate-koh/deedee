#!/bin/bash

url=$WEBHOOK_URL

curl -H  "Content-Type: application/json" -X POST -d `
    {"embeds": 
        [
            { 
                "title": "**JK-Linux Server Status** :computer:", 
                "description": *Minecraft Server is now online*
            }
        ] 
    }` $url

