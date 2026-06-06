Add-Type -AssemblyName System.Drawing

$sourcePath = 'C:\Users\asesh\.gemini\antigravity\brain\2b0bfd09-9a0b-4947-86d4-1500be775f7d\media__1780368074999.png'
$img = [System.Drawing.Bitmap]::FromFile($sourcePath)

function ExtractIcon($x, $y, $w, $h, $filename) {
    $minX = $x + $w; $maxX = 0; $minY = $y + $h; $maxY = 0;
    
    for ($i = $x; $i -lt ($x + $w); $i++) {
        for ($j = $y; $j -lt ($y + $h); $j++) {
            $p = $img.GetPixel($i, $j)
            if ($p.R -lt 240 -or $p.G -lt 240 -or $p.B -lt 240) {
                if ($i -lt $minX) { $minX = $i }
                if ($i -gt $maxX) { $maxX = $i }
                if ($j -lt $minY) { $minY = $j }
                if ($j -gt $maxY) { $maxY = $j }
            }
        }
    }
    
    # Add 5px padding
    $minX = [Math]::Max(0, $minX - 5)
    $minY = [Math]::Max(0, $minY - 5)
    $maxX = [Math]::Min($img.Width - 1, $maxX + 5)
    $maxY = [Math]::Min($img.Height - 1, $maxY + 5)
    
    $cropW = $maxX - $minX + 1
    $cropH = $maxY - $minY + 1
    
    $rect = New-Object System.Drawing.Rectangle($minX, $minY, $cropW, $cropH)
    $bmp = New-Object System.Drawing.Bitmap($cropW, $cropH)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $bmp.Save("c:\Users\asesh\Desktop\ss\image\$($filename)", [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Output "Saved $($filename) W=$cropW, H=$cropH"
}

ExtractIcon 0 0 300 168 "icon1.png"
ExtractIcon 400 168 300 169 "icon2.png"
ExtractIcon 0 337 300 168 "icon3.png"
ExtractIcon 400 505 300 169 "icon4.png"

$img.Dispose()
