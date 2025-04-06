#!/bin/bash
zip -r website.zip . -x ".git/*" "__pycache__/*" ".venv/*"
