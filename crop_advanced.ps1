Add-Type -AssemblyName System.Drawing

$sourcePath = 'C:\Users\asesh\.gemini\antigravity\brain\2b0bfd09-9a0b-4947-86d4-1500be775f7d\media__1780368074999.png'
$img = [System.Drawing.Bitmap]::FromFile($sourcePath)

$h = [int]($img.Height / 4)

for ($row = 0; $row -lt 4; $row++) {
    $startY = $row * $h
    
    # Find start X (first non-white pixel from left)
    $startX = 0
    $foundStart = $false
    for ($x = 0; $x -lt $img.Width; $x++) {
        for ($y = $startY; $y -lt ($startY + $h); $y++) {
            $pixel = $img.GetPixel($x, $y)
            if ($pixel.R -lt 240 -or $pixel.G -lt 240 -or $pixel.B -lt 240) {
                $startX = $x
                $foundStart = $true
                break
            }
        }
        if ($foundStart) { break }
    }
    
    # Find end X (search for a wide white gap)
    $endX = $startX
    $gapCount = 0
    for ($x = $startX; $x -lt $img.Width; $x++) {
        $isColumnWhite = $true
        for ($y = $startY; $y -lt ($startY + $h); $y++) {
            $pixel = $img.GetPixel($x, $y)
            if ($pixel.R -lt 240 -or $pixel.G -lt 240 -or $pixel.B -lt 240) {
                $isColumnWhite = $false
                break
            }
        }
        if ($isColumnWhite) {
            $gapCount++
            if ($gapCount -gt 35) { # 35 pixel wide gap implies we reached the text
                $endX = $x - 35
                break
            }
        } else {
            $gapCount = 0
            $endX = $x
        }
    }
    
    # Find top Y
    $topY = $startY
    $foundTop = $false
    for ($y = $startY; $y -lt ($startY + $h); $y++) {
        for ($x = $startX; $x -le $endX; $x++) {
            $pixel = $img.GetPixel($x, $y)
            if ($pixel.R -lt 240 -or $pixel.G -lt 240 -or $pixel.B -lt 240) {
                $topY = $y
                $foundTop = $true
                break
            }
        }
        if ($foundTop) { break }
    }
    
    # Find bottom Y
    $bottomY = $startY + $h - 1
    $foundBottom = $false
    for ($y = $startY + $h - 1; $y -ge $startY; $y--) {
        for ($x = $startX; $x -le $endX; $x++) {
            $pixel = $img.GetPixel($x, $y)
            if ($pixel.R -lt 240 -or $pixel.G -lt 240 -or $pixel.B -lt 240) {
                $bottomY = $y
                $foundBottom = $true
                break
            }
        }
        if ($foundBottom) { break }
    }
    
    # Pad by 5 pixels
    $startX = [Math]::Max(0, $startX - 5)
    $endX = [Math]::Min($img.Width - 1, $endX + 5)
    $topY = [Math]::Max($startY, $topY - 5)
    $bottomY = [Math]::Min($startY + $h - 1, $bottomY + 5)
    
    $cropW = $endX - $startX + 1
    $cropH = $bottomY - $topY + 1
    
    $rect = New-Object System.Drawing.Rectangle($startX, $topY, $cropW, $cropH)
    $bmp = New-Object System.Drawing.Bitmap($cropW, $cropH)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $idx = $row + 1
    $bmp.Save("c:\Users\asesh\Desktop\ss\image\icon$($idx).png", [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    
    Write-Output "Row $($row): Extracted icon$($idx).png at X:$($startX) Y:$($topY) W:$($cropW) H:$($cropH)"
}
$img.Dispose()
