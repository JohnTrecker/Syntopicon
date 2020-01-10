#!/bin/bash
ENV="${SYNTOPICON_ENV:-stage}"
export SYNTOPICON_PASSWORD=$(aws ssm get-parameter --name /syntopicon/$ENV/db --region us-west-2 --with-decryption --output text --query Parameter.Value)