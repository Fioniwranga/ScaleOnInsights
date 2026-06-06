Add-Type -AssemblyName System.Drawing
$img = new-object System.Drawing.Bitmap 'c:\Users\asesh\Desktop\ss\image\Abouty.png'
$color = $img.GetPixel(0,0)
Write-Host "Color: R=$($color.R) G=$($color.G) B=$($color.B)"
