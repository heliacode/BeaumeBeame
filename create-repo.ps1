# Script to create GitHub repository via API
param(
    [Parameter(Mandatory=$true)]
    [string]$Token,
    [string]$Org = "heliacode",
    [string]$RepoName = "BeaumeBeaume"
)

$headers = @{
    "Authorization" = "token $Token"
    "Accept" = "application/vnd.github.v3+json"
}

$body = @{
    name = $RepoName
    description = "Landing page builder with drag-and-drop, save/load, undo/redo, and multiple component types"
    private = $false
    auto_init = $false
} | ConvertTo-Json

try {
    Write-Host "Creating repository $RepoName in organization $Org..." -ForegroundColor Cyan
    $response = Invoke-RestMethod -Uri "https://api.github.com/orgs/$Org/repos" -Method Post -Headers $headers -Body $body -ContentType "application/json"
    Write-Host "Repository created successfully!" -ForegroundColor Green
    Write-Host "Repository URL: $($response.html_url)" -ForegroundColor Green
    return $true
} catch {
    Write-Host "Error creating repository: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Red
    }
    return $false
}

