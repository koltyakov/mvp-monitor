[CmdletBinding()]
Param(
  [Parameter(Mandatory=$False)]
  [string]$Template = "$PSScriptRoot\templates\Model.xml",

  [Parameter(Mandatory=$False)]
  [string]$Handlers = "All"
);

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force;

. "$PSScriptRoot\Settings.ps1";
. "$PSScriptRoot\lib\Functions.ps1";

# Private config
$PrivateFilePath = If ($env:PRIVATE_JSON) { $env:PRIVATE_JSON } Else { "$PSScriptRoot\..\config\private.json" } # env var or default setting
Try { Resolve-Path -Path $PrivateFilePath -ErrorAction Stop | Out-Null; } Catch { sp-auth init -p $PrivateFilePath; } # test path if no private file start wizard

$SETTINGS_PrivateFilePath = Resolve-Path -Path $PrivateFilePath; # Private connection config file path

Set-PnPTraceLog -on -level Debug;

$StartTime = Get-Date;

$Context = Get-SpAuthContext $SETTINGS_PrivateFilePath;
$Connection = Get-SpConnection $Context.siteUrl $Context;

Print-InfoMessage "Applying template to $($Context.siteUrl)";

Apply-PnPProvisioningTemplate `
  -Path $Template `
  -ProvisionContentTypesToSubWebs:$True `
  -ProvisionFieldsToSubWebs:$True `
  -Connection $Connection `
  -Handlers $Handlers;

$EndTime = Get-Date;
$TimeSpan = New-TimeSpan $StartTime $EndTime;
Print-SuccessMessage "Execution time: $timespan";
