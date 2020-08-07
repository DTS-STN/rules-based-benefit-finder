for file in *-en.njk; do
    echo "file: $file"
    git mv "$file" "${file/-en/}"
done