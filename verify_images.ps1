$htmlFiles = Get-ChildItem "c:\Users\russe\Desktop\watch-Jwellery\*.html"
$imgSources = @()

foreach ($file in $htmlFiles) {
    $text = Get-Content $file.FullName -Raw
    $regex = '<img[^>]+src=["'']assets/images/([a-zA-Z0-9_\-\.]+)["'']'
    $matches = [regex]::Matches($text, $regex)
    foreach ($m in $matches) {
        $imgPath = $m.Groups[1].Value
        $imgSources += [PSCustomObject]@{
            Page = $file.Name
            Image = $imgPath
        }
    }
}

Write-Host "Total <img src='...'> tags across site: $($imgSources.Count)"
$uniqueImgNames = ($imgSources | Select-Object -ExpandProperty Image | Select-Object -Unique)
Write-Host "Total Unique Image Files used in <img> tags: $($uniqueImgNames.Count)"

$crossDuplicates = $imgSources | Group-Object Image | Where-Object { $_.Count -gt 1 }

if ($crossDuplicates.Count -gt 0) {
    Write-Host "WARNING: The following images are reused across multiple <img> tags:"
    $crossDuplicates | Format-Table -Property Count, Name, @{Name="Pages";Expression={ ($_.Group | Select-Object -ExpandProperty Page) -join ", " }}
} else {
    Write-Host "CONGRATULATIONS! EVERY SINGLE <img> TAG ACROSS THE ENTIRE WEBSITE USES A 100% UNIQUE IMAGE FILE! ZERO REPEATED IMAGES!"
}

