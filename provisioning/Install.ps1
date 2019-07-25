[CmdletBinding()]
Param(
  [Parameter(Mandatory=$False,Position=1)]
  [string]$Module = "SPO"
);

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force;

. "$PSScriptRoot\lib\Functions.ps1";

Install-PackageProvider -Name NuGet -Force -Scope "CurrentUser" | Out-Null;

$PnPModuleName = "SharePointPnPPowerShell$Module";

$modules = Get-Module -Name $PnPModuleName -ListAvailable;
If ($null -eq $modules) {
  $rmod = Get-Module -Name SharePointPnPPowerShell* -ListAvailable;
  If ($null -ne $rmod) {
    Remove-Module -ModuleInfo $rmod -Force;
    Uninstall-Module -Name $rmod.Name;
  }
  Install-Module -Name $PnPModuleName -Scope CurrentUser -Force -MaximumVersion 2.28.1807.0;
  Import-Module -Name $PnPModuleName -DisableNameChecking;
}

# Additional dependencies
$Dependencies = @(
  "Set-PsEnv"
);

Foreach ($Module in $Dependencies) {
  Install-CustomModule($Module)
}
