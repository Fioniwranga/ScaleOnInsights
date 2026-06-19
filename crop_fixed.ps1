Add-Type -AssemblyName System.Drawing

$sourcePath = 'C:\Users\asesh\.gemini\antigravity\brain\2b0bfd09-9a0b-4947-86d4-1500be775f7d\media__1780368074999.png'
$img = [System.Drawing.Bitmap]::FromFile($sourcePath)

function CropImage($x, $y, $w, $h, $filename) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    # Fill with white first in case bounds go off image
    $g.Clear([System.Drawing.Color]::White)
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $bmp.Save("c:\Users\asesh\Desktop\ss\image\$filename", [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
}

# Row 1 (Left Icon): y=0 to 168. x=20 to 220
CropImage 20 0 200 168 "icon1.png"

# Row 2 (Center Icon): y=168 to 337. x=430 to 630
CropImage 430 168 200 169 "icon2.png"

# Row 3 (Left Icon): y=337 to 505. x=30 to 230
CropImage 30 337 200 168 "icon3.png"

# Row 4 (Center Icon): y=505 to 674. x=450 to 650
CropImage 450 505 200 169 "icon4.png"

$img.Dispose()
Write-Output "Extracted all 4 icons precisely!"
