Add-Type -AssemblyName System.Drawing

function Transform-Image {
    param (
        [string]$srcPath,
        [string]$dstPath,
        [double]$xNorm = 0.0,
        [double]$yNorm = 0.0,
        [double]$wNorm = 1.0,
        [double]$hNorm = 1.0,
        [bool]$flipH = $false,
        [float]$brightness = 1.0,
        [float]$contrast = 1.0,
        [string]$overlayText = ""
    )

    if (-not (Test-Path $srcPath)) {
        Write-Host "Missing source: $srcPath"
        return
    }

    $bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
    $origW = $bmp.Width
    $origH = $bmp.Height

    $cropX = [int]($origW * $xNorm)
    $cropY = [int]($origH * $yNorm)
    $cropW = [int]($origW * $wNorm)
    $cropH = [int]($origH * $hNorm)

    # Ensure bounds
    if ($cropX + $cropW -gt $origW) { $cropW = $origW - $cropX }
    if ($cropY + $cropH -gt $origH) { $cropH = $origH - $cropY }
    if ($cropW -le 0) { $cropW = 10 }
    if ($cropH -le 0) { $cropH = 10 }

    $cropRect = [System.Drawing.Rectangle]::new($cropX, $cropY, $cropW, $cropH)
    $cropped = $bmp.Clone($cropRect, $bmp.PixelFormat)
    $bmp.Dispose()

    if ($flipH) {
        $cropped.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipX)
    }

    # Create target graphics
    $targetBmp = [System.Drawing.Bitmap]::new($cropped.Width, $cropped.Height)
    $g = [System.Drawing.Graphics]::FromImage($targetBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

    # Color matrix for brightness/contrast
    $cm = [System.Drawing.Imaging.ColorMatrix]::new()
    $cm.Matrix00 = $contrast
    $cm.Matrix11 = $contrast
    $cm.Matrix22 = $contrast
    $cm.Matrix40 = ($brightness - 1.0)
    $cm.Matrix41 = ($brightness - 1.0)
    $cm.Matrix42 = ($brightness - 1.0)

    $ia = [System.Drawing.Imaging.ImageAttributes]::new()
    $ia.SetColorMatrix($cm)

    $destRect = [System.Drawing.Rectangle]::new(0, 0, $cropped.Width, $cropped.Height)
    $g.DrawImage($cropped, $destRect, 0, 0, $cropped.Width, $cropped.Height, [System.Drawing.GraphicsUnit]::Pixel, $ia)
    $cropped.Dispose()

    if ($overlayText -ne "") {
        $font = [System.Drawing.Font]::new("Georgia", 24, [System.Drawing.FontStyle]::Bold)
        $brush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(180, 232, 211, 162))
        $g.DrawString($overlayText, $font, $brush, 20, 20)
    }

    $g.Dispose()
    $targetBmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $targetBmp.Dispose()
    Write-Host "Created: $dstPath"
}

Write-Host "Helper defined."
