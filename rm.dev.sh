# Push out latest changes
git push origin
git push twolfson

# Move to export branch
git branch -D dev/implement.halo.squashed
git checkout -b dev/implement.halo.squashed

# Remove this script
rm rm.dev.sh

# Commit changes
git add -A
git commit -m "Removed dev items"

# Squash commits
git rebase gh-pages -i

# Push changes to remote
git push origin dev/implement.halo.squashed --force
git push twolfson dev/implement.halo.squashed --force