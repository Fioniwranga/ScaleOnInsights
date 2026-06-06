Add-Type -AssemblyName System.Drawing

$sourcePath = 'C:\Users\asesh\.gemini\antigravity\brain\2b0bfd09-9a0b-4947-86d4-1500be775f7d\media__1780368074999.png'
$img = [System.Drawing.Image]::FromFile($sourcePath)

$w = [int]($img.Width / 2)
$h = [int]($img.Height / 4)

Write-Output "Image size: $($img.Width)x$($img.Height). Crop size: ${w}x${h}"

# Row 1: Left image
$rect1 = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$bmp1 = New-Object System.Drawing.Bitmap($w, $h)
$g1 = [System.Drawing.Graphics]::FromImage($bmp1)
$g1.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), $rect1, [System.Drawing.GraphicsUnit]::Pixel)
$bmp1.Save('c:\Users\asesh\Desktop\ss\image\value1.png', [System.Drawing.Imaging.ImageFormat]::Png)
$g1.Dispose()
$bmp1.Dispose()

# Row 2: Right image
$rect2 = New-Object System.Drawing.Rectangle($w, $h, $w, $h)
$bmp2 = New-Object System.Drawing.Bitmap($w, $h)
$g2 = [System.Drawing.Graphics]::FromImage($bmp2)
$g2.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), $rect2, [System.Drawing.GraphicsUnit]::Pixel)
$bmp2.Save('c:\Users\asesh\Desktop\ss\image\value2.png', [System.Drawing.Imaging.ImageFormat]::Png)
$g2.Dispose()
$bmp2.Dispose()

# Row 3: Left image
$rect3 = New-Object System.Drawing.Rectangle(0, ($h * 2), $w, $h)
$bmp3 = New-Object System.Drawing.Bitmap($w, $h)
$g3 = [System.Drawing.Graphics]::FromImage($bmp3)
$g3.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), $rect3, [System.Drawing.GraphicsUnit]::Pixel)
$bmp3.Save('c:\Users\asesh\Desktop\ss\image\value3.png', [System.Drawing.Imaging.ImageFormat]::Png)
$g3.Dispose()
$bmp3.Dispose()

# Row 4: Right image
$rect4 = New-Object System.Drawing.Rectangle($w, ($h * 3), $w, $h)
$bmp4 = New-Object System.Drawing.Bitmap($w, $h)
$g4 = [System.Drawing.Graphics]::FromImage($bmp4)
$g4.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), $rect4, [System.Drawing.GraphicsUnit]::Pixel)
$bmp4.Save('c:\Users\asesh\Desktop\ss\image\value4.png', [System.Drawing.Imaging.ImageFormat]::Png)
$g4.Dispose()
$bmp4.Dispose()

$img.Dispose()
Write-Output "Done cropping 4 images!"
