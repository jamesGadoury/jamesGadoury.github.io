#!/bin/bash
rm -rf blog
pelican content -o blog -s pelicanconf.py
