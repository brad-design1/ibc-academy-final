param(
    [Parameter(Mandatory)]
    [string]$Title,
    [Parameter(Mandatory)]
    [string]$OutputPath
)

$apiKey = Get-Content "$env:USERPROFILE\.config\gemini\api_key"

$prompt = @"
Create a professional Open Graph social media image (1200x630 pixels) for "IBC Academy" with the article title: "$Title"

Design requirements:
- 1200x630 pixel dimensions (Facebook/LinkedIn/Twitter OG format)
- IBC Academy branding with professional typography
- Clean, modern design with white/blue color scheme
- Article title prominently displayed and readable
- Subtle financial/banking theme elements
- Professional, trustworthy appearance suitable for financial education
- Text should be large enough to read when scaled down
- Include "IBC Academy" brand name
- Maintain clean hierarchy with title as primary focus
"@

$body = @{
    contents = @(@{ 
        parts = @(@{ text = $prompt }) 
    })
    generationConfig = @{ 
        responseModalities = @("TEXT", "IMAGE") 
    }
} | ConvertTo-Json -Depth 10

try {
    Write-Host "Generating OG image for: $Title"
    $response = Invoke-RestMethod -Uri "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=$apiKey" `
        -Method POST -ContentType "application/json" -Body $body

    # Extract image from response
    $imagePart = $response.candidates[0].content.parts | Where-Object { $_.inlineData }
    if ($imagePart) {
        $bytes = [Convert]::FromBase64String($imagePart.inlineData.data)
        [IO.File]::WriteAllBytes($OutputPath, $bytes)
        Write-Host "SUCCESS: OG image saved to: $OutputPath"
        return $true
    } else {
        Write-Host "ERROR: No image data in response"
        return $false
    }
} catch {
    Write-Host "ERROR: Error generating image: $($_.Exception.Message)"
    return $false
}