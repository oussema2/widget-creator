if [ -z "$1" ]; then
  echo "Error: Commit message is required."
  echo "Usage: ./push_code.sh \"Your commit message\""
  exit 1
fi
commit_message="$1"

rm -rf dist
npm run build
git add .
git commit -m "$commit_message"
git push -u origin main