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
        [float]$contrast = 1.0
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

    $targetBmp = [System.Drawing.Bitmap]::new($cropped.Width, $cropped.Height)
    $g = [System.Drawing.Graphics]::FromImage($targetBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

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

    $g.Dispose()
    $targetBmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $targetBmp.Dispose()
    Write-Host "Created: $dstPath"
}

function Generate-Portrait {
    param (
        [string]$dstPath,
        [string]$initials,
        [string]$name,
        [string]$title,
        [int]$bgType = 1
    )

    $width = 600
    $height = 800
    $bmp = [System.Drawing.Bitmap]::new($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    # Background gradient
    $c1 = [System.Drawing.Color]::FromArgb(255, 10, 10, 10)
    if ($bgType -eq 1) { $c2 = [System.Drawing.Color]::FromArgb(255, 18, 60, 58) }
    elseif ($bgType -eq 2) { $c2 = [System.Drawing.Color]::FromArgb(255, 36, 26, 23) }
    elseif ($bgType -eq 3) { $c2 = [System.Drawing.Color]::FromArgb(255, 30, 45, 55) }
    else { $c2 = [System.Drawing.Color]::FromArgb(255, 45, 35, 25) }

    $rect = [System.Drawing.Rectangle]::new(0, 0, $width, $height)
    $brush = [System.Drawing.Drawing2D.LinearGradientBrush]::new($rect, $c1, $c2, 45.0)
    $g.FillRectangle($brush, $rect)
    $brush.Dispose()

    # Subtle inner border
    $pen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(60, 232, 211, 162), 2)
    $g.DrawRectangle($pen, 20, 20, $width - 40, $height - 40)
    $pen.Dispose()

    # Monogram Circle
    $circleSize = 200
    $circleX = ($width - $circleSize) / 2
    $circleY = 220
    $circleBrush = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
        [System.Drawing.Rectangle]::new($circleX, $circleY, $circleSize, $circleSize),
        [System.Drawing.Color]::FromArgb(100, 232, 211, 162),
        [System.Drawing.Color]::FromArgb(30, 232, 211, 162),
        90.0
    )
    $g.FillEllipse($circleBrush, $circleX, $circleY, $circleSize, $circleSize)
    $circleBrush.Dispose()

    $circlePen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(180, 232, 211, 162), 2)
    $g.DrawEllipse($circlePen, $circleX, $circleY, $circleSize, $circleSize)
    $circlePen.Dispose()

    # Initials
    $fontStyle = [System.Drawing.FontStyle]"Bold, Italic"
    $fontInitials = [System.Drawing.Font]::new("Georgia", 64, $fontStyle)
    $goldBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 232, 211, 162))
    $sf = [System.Drawing.StringFormat]::new()
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Center

    $g.DrawString($initials, $fontInitials, $goldBrush, [System.Drawing.RectangleF]::new($circleX, $circleY, $circleSize, $circleSize), $sf)
    $fontInitials.Dispose()

    # Name
    $fontName = [System.Drawing.Font]::new("Georgia", 26, [System.Drawing.FontStyle]::Bold)
    $whiteBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 247, 243, 234))
    $g.DrawString($name, $fontName, $whiteBrush, [System.Drawing.RectangleF]::new(40, 480, $width - 80, 50), $sf)
    $fontName.Dispose()

    # Title
    $fontTitle = [System.Drawing.Font]::new("Arial", 13, [System.Drawing.FontStyle]::Bold)
    $titleBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 184, 154, 98))
    $g.DrawString($title.ToUpper(), $fontTitle, $titleBrush, [System.Drawing.RectangleF]::new(40, 535, $width - 80, 40), $sf)
    $fontTitle.Dispose()

    $whiteBrush.Dispose()
    $goldBrush.Dispose()
    $titleBrush.Dispose()
    $sf.Dispose()
    $g.Dispose()

    $bmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Generated portrait: $dstPath"
}

# Base source paths
$brainDir = "C:\Users\russe\.gemini\antigravity-ide\brain\2dbfcc98-ca6f-4119-be89-242deed3b81f"
$outDir = "c:\Users\russe\Desktop\watch-Jwellery\assets\images"

$s_watch1       = "$brainDir\hero_watch_1_1786422878315.png"
$s_watch2       = "$brainDir\hero_watch_1_1786426621663.png"
$s_jewellery1   = "$brainDir\hero_jewellery_2_1786423119487.png"
$s_jewellery2   = "$brainDir\hero_jewellery_2_1786426657297.png"
$s_showroom1    = "$brainDir\hero_slider_3_1786423327871.png"
$s_showroom2    = "$brainDir\hero_watches_collection_1786426686281.png"
$s_edit_watch   = "$brainDir\editorial_watch_1786426706100.png"
$s_edit_diamond = "$brainDir\editorial_diamond_1786426725453.png"
$s_craftsman    = "$brainDir\about_craftsman_1786423300856.png"
$s_diamond_coll = "$brainDir\diamond_collection_1786423314266.png"
$s_gifting      = "$brainDir\gifting_service_1786424414441.png"
$s_gold_coll    = "$brainDir\gold_collection_1786423131430.png"
$s_store        = "$brainDir\store_interior_1786424432770.png"

# --- INDEX.HTML (11 images) ---
Transform-Image $s_watch1        "$outDir\idx-hero-watch.png"              0.0 0.0 1.0 1.0 $false 1.0 1.0
Transform-Image $s_jewellery2    "$outDir\idx-hero-jewellery.png"          0.0 0.0 1.0 1.0 $false 1.0 1.0
Transform-Image $s_showroom2     "$outDir\idx-hero-showroom.png"           0.0 0.0 1.0 1.0 $false 1.0 1.0
Transform-Image $s_edit_watch    "$outDir\idx-editorial-tourbillon.png"    0.0 0.0 1.0 1.0 $false 1.0 1.05
Transform-Image $s_edit_diamond  "$outDir\idx-editorial-diamond.png"       0.0 0.0 1.0 1.0 $false 1.0 1.05
Transform-Image $s_gold_coll     "$outDir\idx-editorial-gold.png"          0.0 0.0 1.0 1.0 $false 1.0 1.05
Transform-Image $s_watch2        "$outDir\idx-product-tourbillon.png"      0.1 0.1 0.8 0.8 $false 1.05 1.1
Transform-Image $s_diamond_coll  "$outDir\idx-product-diamond-solitaire.png" 0.0 0.0 1.0 1.0 $false 1.0 1.0
Transform-Image $s_gold_coll     "$outDir\idx-product-gold-cuff.png"       0.1 0.1 0.8 0.8 $true  1.05 1.0
Transform-Image $s_showroom1     "$outDir\idx-product-gmt-chrono.png"      0.15 0.1 0.7 0.8 $false 1.0 1.1
Transform-Image $s_gifting       "$outDir\idx-gifting-concierge.png"       0.0 0.0 1.0 1.0 $false 1.0 1.0

# --- HOME2.HTML (9 images) ---
Transform-Image $s_showroom2     "$outDir\h2-hero-parallax.png"            0.0 0.2 1.0 0.8 $true  0.95 1.1
Transform-Image $s_craftsman    "$outDir\h2-about-heritage.png"           0.0 0.0 0.9 1.0 $false 1.0 1.0
Transform-Image $s_diamond_coll  "$outDir\h2-masonry-1-diamond.png"        0.1 0.0 0.9 0.9 $true  1.0 1.1
Transform-Image $s_gold_coll     "$outDir\h2-masonry-2-gold.png"           0.0 0.2 1.0 0.8 $false 1.05 1.0
Transform-Image $s_jewellery1    "$outDir\h2-masonry-3-sapphire.png"       0.0 0.0 1.0 1.0 $false 0.95 1.05
Transform-Image $s_gifting       "$outDir\h2-masonry-4-gifting.png"        0.1 0.1 0.8 0.8 $false 1.0 1.0
Transform-Image $s_watch1        "$outDir\h2-masonry-5-prestige.png"       0.2 0.2 0.7 0.7 $true  1.1 1.1
Transform-Image $s_edit_watch    "$outDir\h2-masonry-6-bespoke.png"        0.1 0.0 0.8 0.9 $false 1.0 1.1
Transform-Image $s_gifting       "$outDir\h2-gifting-showcase.png"         0.0 0.0 0.9 0.9 $true  1.0 1.05

# --- ABOUT.HTML (5 images) ---
Transform-Image $s_craftsman    "$outDir\about-hero-watchmaker.png"       0.0 0.0 1.0 1.0 $false 0.9 1.1
Generate-Portrait "$outDir\about-team-edmund.png"   "EA" "Sir Edmund Ashworth" "Founder & Master Horologist" 1
Generate-Portrait "$outDir\about-team-caroline.png" "CA" "Lady Caroline Ashworth" "Co-Founder & Creative Director" 2
Generate-Portrait "$outDir\about-team-james.png"    "JW" "James Whitfield" "Head of Watch Acquisitions" 3
Generate-Portrait "$outDir\about-team-amira.png"    "AA" "Amira Al-Rashid" "Director, Middle East & Asia" 4

# --- SERVICES.HTML (2 images) ---
Transform-Image $s_craftsman    "$outDir\services-hero-workshop.png"      0.0 0.2 1.0 0.8 $true  0.95 1.05
Transform-Image $s_edit_watch    "$outDir\services-repair-mastery.png"     0.05 0.05 0.9 0.9 $false 1.05 1.15

# --- BLOG.HTML (12 images) ---
Transform-Image $s_watch2        "$outDir\blog-hero-journal.png"           0.0 0.0 1.0 0.85 $false 0.9 1.1
Transform-Image $s_craftsman    "$outDir\blog-featured-tourbillon.png"    0.1 0.0 0.8 1.0 $false 1.0 1.0
Transform-Image $s_jewellery2    "$outDir\blog-post-1-diamond.png"         0.1 0.1 0.8 0.8 $false 1.0 1.0
Transform-Image $s_gold_coll     "$outDir\blog-post-2-gold.png"            0.0 0.0 0.9 0.9 $false 1.0 1.05
Transform-Image $s_gifting       "$outDir\blog-post-3-gifting.png"         0.0 0.1 0.9 0.8 $true  1.0 1.0
Transform-Image $s_store        "$outDir\blog-post-4-vault.png"           0.0 0.0 1.0 1.0 $false 1.0 1.0
Transform-Image $s_craftsman    "$outDir\blog-recent-1-tourbillon.png"    0.2 0.2 0.6 0.6 $false 1.0 1.0
Transform-Image $s_jewellery1    "$outDir\blog-recent-2-diamond.png"       0.2 0.2 0.6 0.6 $false 1.0 1.0
Transform-Image $s_gold_coll     "$outDir\blog-recent-3-gold.png"          0.2 0.2 0.6 0.6 $false 1.0 1.0
Transform-Image $s_watch1        "$outDir\blog-cat-horology.png"           0.0 0.3 1.0 0.7 $false 0.9 1.1
Transform-Image $s_jewellery2    "$outDir\blog-cat-jewellery.png"          0.0 0.3 1.0 0.7 $false 0.9 1.1
Transform-Image $s_gifting       "$outDir\blog-cat-gifting.png"            0.0 0.3 1.0 0.7 $false 0.9 1.1

# --- BLOG-DETAIL.HTML (5 images) ---
Transform-Image $s_craftsman    "$outDir\bdetail-hero-tourbillon.png"     0.0 0.0 1.0 0.9 $false 0.85 1.1
Transform-Image $s_edit_watch    "$outDir\bdetail-article-flying-tourbillon.png" 0.0 0.0 1.0 1.0 $true 1.0 1.1
Generate-Portrait "$outDir\bdetail-author-edmund.png" "EA" "Sir Edmund Ashworth" "Founder & Author" 1
Transform-Image $s_diamond_coll  "$outDir\bdetail-related-diamond.png"     0.0 0.1 0.9 0.8 $false 1.0 1.0
Transform-Image $s_gold_coll     "$outDir\bdetail-related-gold.png"        0.1 0.0 0.8 0.9 $true  1.0 1.0

# --- CONTACT.HTML (1 image) ---
Transform-Image $s_store        "$outDir\contact-hero-storefront.png"     0.0 0.0 1.0 1.0 $false 0.9 1.1

# --- MAINTENANCE.HTML (1 image) ---
Transform-Image $s_watch1        "$outDir\maintenance-bg-clockwork.png"     0.0 0.0 1.0 1.0 $false 0.7 1.2

Write-Host "All 46 images generated successfully!"
