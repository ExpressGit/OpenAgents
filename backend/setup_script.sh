#!/bin/bash

# Install and setup Conda virtual environment
echo "Setting up the conda environment..."
# conda create -n openagents python=3.10 -y
conda activate openagents
# pip install -r requirements.txt

# Check if it's a macOS or Linux environment
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS

    # MongoDB setup for macOS
    echo "Setting up MongoDB for macOS..."
    brew tap mongodb/brew
    brew update
    brew install mongodb-community@6.0
    brew services start mongodb-community@6.0

    # MongoDB collection creation
    echo "Creating MongoDB collections..."
    mongosh --eval 'db = db.getSiblingDB("xlang"); db.createCollection("user"); db.createCollection("message"); db.createCollection("conversation"); db.createCollection("folder"); db.getCollectionNames();'

    # Redis setup for macOS
    echo "Setting up Redis for macOS..."
    brew install redis
    brew services start redis
else
    # Linux

     sudo tee  /etc/yum.repos.d/mongodb-org-7.0.repo <<EOL
[mongodb-org-7.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/7/mongodb-org/7.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-7.0.asc
EOL
    sudo yum install -y mongodb-org
    sudo systemctl daemon-reload
    sudo systemctl start mongod
    #mongod --dbpath /var/lib/mongo --logpath /var/log/mongodb/mongod.log --fork
    sudo systemctl enable mongod

    # MongoDB collection creation
    echo "Creating MongoDB collections..."
    mongosh --eval 'db = db.getSiblingDB("xlang"); db.createCollection("user"); db.createCollection("message"); db.createCollection("conversation"); db.createCollection("folder"); db.getCollectionNames();'

    # Redis setup for Linux
    # echo "Setting up Redis for Linux..."
    # sudo yum install -y epel-release
    # sudo yum update
    # sudo yum install -y redis
    # sudo systemctl start redis &
    # sudo systemctl enable redis
fi

# Setting up environment variables
echo "Setting up environment variables..."
export VARIABLE_REGISTER_BACKEND=redis
export MESSAGE_MEMORY_MANAGER_BACKEND=database
export JUPYTER_KERNEL_MEMORY_MANAGER_BACKEND=database
export MONGO_SERVER=127.0.0.1

echo "Deployment complete\!"
