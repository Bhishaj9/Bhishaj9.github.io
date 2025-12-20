Write-Host "Starting Git Update..."
git add .
if ($?) {
    git commit -m "Launched MerchFlow AI and updated skills with emojis"
} else {
    Write-Error "Git add failed"
    exit 1
}
if ($?) {
    git push
} else {
    Write-Error "Git commit failed"
    exit 1
}
Write-Host "Git Update Complete"
