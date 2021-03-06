#!/bin/sh
psql -U $POSTGRES_USER $POSTGRES_DB<<- EOF
    CREATE USER $POSTGRES_INITDB_USERNAME WITH PASSWORD '$POSTGRES_INITDB_PASSWORD';
    GRANT ALL PRIVILEGES ON DATABASE consolidated_server TO $POSTGRES_INITDB_USERNAME;
    CREATE SCHEMA hapi_fhir AUTHORIZATION $POSTGRES_INITDB_USERNAME;
    CREATE SCHEMA keycloak AUTHORIZATION $POSTGRES_INITDB_USERNAME;
    CREATE SCHEMA datamart AUTHORIZATION $POSTGRES_INITDB_USERNAME;
    CREATE SCHEMA server_management AUTHORIZATION $POSTGRES_INITDB_USERNAME;
EOF

