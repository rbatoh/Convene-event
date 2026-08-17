$ErrorActionPreference = "Stop"

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "   Event Registration System Auto-Deployer    " -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

Write-Host "`n[1/4] Building AWS Serverless Application..." -ForegroundColor Yellow
sam build
if ($LASTEXITCODE -ne 0) {
    Write-Host "SAM Build failed. Please ensure Docker is running (if required) and sam is installed." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "`n[2/4] Deploying Backend & Infrastructure to AWS..." -ForegroundColor Yellow
sam deploy --stack-name event-registration-backend --resolve-s3 --capabilities CAPABILITY_IAM --region us-east-1 --no-fail-on-empty-changeset
if ($LASTEXITCODE -ne 0) {
    Write-Host "SAM Deploy failed." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "`n[3/4] Linking Infrastructure to Codebase..." -ForegroundColor Yellow
$outputs = aws cloudformation describe-stacks --stack-name event-registration-backend --query "Stacks[0].Outputs" --output json | ConvertFrom-Json

$configPath = "..\frontend\src\config.js"
$configContent = Get-Content $configPath -Raw
$foundCount = 0
$frontendBucket = ""
$frontendUrl = ""

foreach ($output in $outputs) {
    $key = $output.OutputKey
    $value = $output.OutputValue
    
    if ($key -eq "EventsFunctionUrl") {
        $configContent = $configContent -replace "API_EVENTS:\s*'.*'", "API_EVENTS: '$value'"
        $foundCount++
    }
    if ($key -eq "RegisterFunctionUrl") {
        $configContent = $configContent -replace "API_REGISTER:\s*'.*'", "API_REGISTER: '$value'"
        $foundCount++
    }
    if ($key -eq "RegistrationsFunctionUrl") {
        $configContent = $configContent -replace "API_REGISTRATIONS:\s*'.*'", "API_REGISTRATIONS: '$value'"
        $foundCount++
    }
    if ($key -eq "CancelFunctionUrl") {
        $configContent = $configContent -replace "API_CANCEL:\s*'.*'", "API_CANCEL: '$value'"
        $foundCount++
    }
    if ($key -eq "FrontendBucketName") {
        $frontendBucket = $value
    }
    if ($key -eq "FrontendUrl") {
        $frontendUrl = $value
    }
}

if ($foundCount -gt 0) {
    Set-Content -Path $configPath -Value $configContent
    Write-Host "SUCCESS! Automatically injected $foundCount API endpoints into frontend/src/config.js." -ForegroundColor Green
} else {
    Write-Host "WARNING: Could not find any Function URLs in the CloudFormation outputs." -ForegroundColor Yellow
}

if ($frontendBucket -eq "") {
    Write-Host "WARNING: Could not find FrontendBucketName in the CloudFormation outputs. Skipping frontend deployment." -ForegroundColor Yellow
    exit 0
}

Write-Host "`n[4/4] Building and Deploying Frontend..." -ForegroundColor Yellow
Push-Location "..\frontend"
Write-Host "Installing frontend dependencies..."
npm install
Write-Host "Building frontend assets..."
npm run build
Write-Host "Uploading to S3 Bucket: $frontendBucket"
aws s3 sync dist/ "s3://$frontendBucket/" --delete
Pop-Location

Write-Host "`n==============================================" -ForegroundColor Cyan
Write-Host "   DEPLOYMENT COMPLETE!                       " -ForegroundColor Green
Write-Host "   Your live site is available at:            " -ForegroundColor White
Write-Host "   $frontendUrl                               " -ForegroundColor Cyan
Write-Host "==============================================`n" -ForegroundColor Cyan
