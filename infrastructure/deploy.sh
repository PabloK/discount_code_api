#!/bin/bash
APP_NAME=$(az functionapp list --query "[?contains(name, 'discount')].[name]" -o tsv --subscription "$1")
func azure functionapp publish "$APP_NAME"