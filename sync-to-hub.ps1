# Đồng bộ bản deploy trong hub (multiverse.meomoe.com/fit/) từ nguồn canonical này.
# Chạy mỗi khi sửa index.html / sw.js / manifest / icon ở đây:  pwsh ./sync-to-hub.ps1
$src = $PSScriptRoot
$hub = Join-Path $src '..\meomoe-multiverse\fit'
New-Item -ItemType Directory -Force -Path $hub | Out-Null
foreach ($f in 'index.html','manifest.webmanifest','sw.js','icon.svg') {
  Copy-Item (Join-Path $src $f) (Join-Path $hub $f) -Force
}
Write-Host "Đã sync 4 file sang hub/fit. Nhớ commit & push repo hub. 🐾"
